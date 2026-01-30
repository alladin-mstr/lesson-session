import type { WebSocket } from "ws";
import { quizQuestions } from "../src/data/quiz-questions.js";
import type {
  GamePhase,
  Player,
  ClientMessage,
  ServerMessage,
} from "../src/types/quiz.js";
import { calculateScore } from "./scoring.js";

interface ConnectedClient {
  ws: WebSocket;
  playerId: string | null;
  isHost: boolean;
}

const TIME_LIMIT = 20; // seconds

export class GameManager {
  private phase: GamePhase = "lobby";
  private currentQuestionIndex = 0;
  private players: Map<string, Player> = new Map();
  private clients: Set<ConnectedClient> = new Set();
  private questionStartTime: number | null = null;
  private answers: Map<string, { answerIndex: number; time: number }> =
    new Map();
  private playerIdCounter = 0;

  addClient(ws: WebSocket): ConnectedClient {
    const client: ConnectedClient = { ws, playerId: null, isHost: false };
    this.clients.add(client);
    return client;
  }

  removeClient(client: ConnectedClient) {
    this.clients.delete(client);
  }

  handleMessage(client: ConnectedClient, msg: ClientMessage) {
    switch (msg.type) {
      case "host_join":
        client.isHost = true;
        this.sendLobbyUpdate();
        break;

      case "player_join":
        if (this.phase !== "lobby") {
          this.send(client.ws, {
            type: "error",
            message: "Game already in progress",
          });
          return;
        }
        const playerId = `p${++this.playerIdCounter}`;
        const player: Player = {
          id: playerId,
          nickname: msg.nickname.trim().slice(0, 20),
          score: 0,
          streak: 0,
          lastAnswerCorrect: null,
          lastPoints: 0,
          currentAnswer: null,
          answerTime: null,
        };
        this.players.set(playerId, player);
        client.playerId = playerId;
        this.send(client.ws, { type: "joined", playerId });
        this.sendLobbyUpdate();
        break;

      case "start_game":
        if (!client.isHost || this.phase !== "lobby") return;
        if (this.players.size === 0) {
          this.send(client.ws, {
            type: "error",
            message: "Need at least one player",
          });
          return;
        }
        this.currentQuestionIndex = 0;
        this.broadcast({ type: "game_started" });
        this.sendQuestion();
        break;

      case "reset_game":
        if (!client.isHost) return;
        this.resetGame();
        break;

      case "next":
        if (!client.isHost) return;
        if (this.phase === "question") {
          this.revealAnswer();
        } else if (this.phase === "answer_reveal") {
          this.showLeaderboard();
        } else if (this.phase === "leaderboard") {
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex >= quizQuestions.length) {
            this.showFinished();
          } else {
            this.sendQuestion();
          }
        }
        break;

      case "submit_answer":
        if (this.phase !== "question" || !client.playerId) return;
        if (this.answers.has(client.playerId)) return; // already answered
        const now = Date.now();
        const elapsed = this.questionStartTime
          ? now - this.questionStartTime
          : 0;
        this.answers.set(client.playerId, {
          answerIndex: msg.answerIndex,
          time: elapsed,
        });

        // Update player
        const p = this.players.get(client.playerId);
        if (p) {
          p.currentAnswer = msg.answerIndex;
          p.answerTime = elapsed;
        }

        // Broadcast answer count to host
        this.broadcastToHosts({
          type: "answer_count",
          count: this.answers.size,
          total: this.players.size,
        });

        // Tell the player we received it (no correct answer revealed yet)
        this.send(client.ws, {
          type: "answer_count",
          count: this.answers.size,
          total: this.players.size,
        });
        break;
    }
  }

  private resetGame() {
    // Reset game state
    this.phase = "lobby";
    this.currentQuestionIndex = 0;
    this.questionStartTime = null;
    this.answers.clear();

    // Reset all players' scores and streaks
    for (const player of this.players.values()) {
      player.score = 0;
      player.streak = 0;
      player.lastAnswerCorrect = null;
      player.lastPoints = 0;
      player.currentAnswer = null;
      player.answerTime = null;
    }

    // Notify everyone to go back to lobby
    this.sendLobbyUpdate();
  }

  private sendQuestion() {
    this.phase = "question";
    this.answers.clear();
    this.questionStartTime = Date.now();

    const q = quizQuestions[this.currentQuestionIndex];

    // Reset current answers
    for (const p of this.players.values()) {
      p.currentAnswer = null;
      p.answerTime = null;
    }

    // Send question to everyone - but NOT the correctIndex
    const questionMsg: ServerMessage = {
      type: "question",
      questionIndex: this.currentQuestionIndex,
      totalQuestions: quizQuestions.length,
      question: q.question,
      options: q.options,
      image: q.image,
      isBonus: q.isBonus,
      timeLimit: TIME_LIMIT,
      startTime: this.questionStartTime,
    };

    this.broadcast(questionMsg);
  }

  private revealAnswer() {
    this.phase = "answer_reveal";
    const q = quizQuestions[this.currentQuestionIndex];

    // Calculate distribution
    const distribution = [0, 0, 0, 0];
    for (const answer of this.answers.values()) {
      if (answer.answerIndex >= 0 && answer.answerIndex < 4) {
        distribution[answer.answerIndex]++;
      }
    }

    // Calculate scores
    const playersCorrect: string[] = [];
    for (const [playerId, answer] of this.answers) {
      const player = this.players.get(playerId);
      if (!player) continue;

      const correct = answer.answerIndex === q.correctIndex;
      const { points, newStreak } = calculateScore(
        correct,
        answer.time,
        TIME_LIMIT * 1000,
        player.streak
      );

      player.score += points;
      player.streak = newStreak;
      player.lastAnswerCorrect = correct;
      player.lastPoints = points;

      if (correct) playersCorrect.push(player.nickname);
    }

    // Players who didn't answer get streak reset
    for (const [playerId, player] of this.players) {
      if (!this.answers.has(playerId)) {
        player.streak = 0;
        player.lastAnswerCorrect = false;
        player.lastPoints = 0;
      }
    }

    // Send results to host
    this.broadcastToHosts({
      type: "answer_reveal",
      correctIndex: q.correctIndex,
      distribution,
      playersCorrect,
      revealImage: q.revealImage,
    });

    // Send personalized results to each player
    for (const client of this.clients) {
      if (client.playerId) {
        const player = this.players.get(client.playerId);
        if (player) {
          this.send(client.ws, {
            type: "answer_reveal",
            correctIndex: q.correctIndex,
            distribution,
            playersCorrect,
            revealImage: q.revealImage,
            playerResult: {
              correct: player.lastAnswerCorrect ?? false,
              points: player.lastPoints,
              totalScore: player.score,
              streak: player.streak,
            },
          });
        }
      }
    }
  }

  private showLeaderboard() {
    this.phase = "leaderboard";
    const rankings = this.getRankings();

    this.broadcastToHosts({ type: "leaderboard", rankings });

    // Send personalized rank to each player
    for (const client of this.clients) {
      if (client.playerId) {
        const rank = rankings.findIndex(
          (r) =>
            r.nickname ===
            this.players.get(client.playerId!)?.nickname
        );
        this.send(client.ws, {
          type: "leaderboard",
          rankings,
          playerRank: rank >= 0 ? rank + 1 : undefined,
        });
      }
    }
  }

  private showFinished() {
    this.phase = "finished";
    const rankings = this.getRankings();

    this.broadcastToHosts({ type: "finished", rankings });

    for (const client of this.clients) {
      if (client.playerId) {
        const player = this.players.get(client.playerId);
        const rank = rankings.findIndex(
          (r) => r.nickname === player?.nickname
        );
        this.send(client.ws, {
          type: "finished",
          rankings,
          playerRank: rank >= 0 ? rank + 1 : undefined,
          playerScore: player?.score ?? 0,
        });
      }
    }
  }

  private getRankings() {
    const sorted = [...this.players.values()].sort(
      (a, b) => b.score - a.score
    );
    return sorted.map((p, i) => ({
      nickname: p.nickname,
      score: p.score,
      rank: i + 1,
    }));
  }

  private sendLobbyUpdate() {
    const players = [...this.players.values()].map((p) => ({
      id: p.id,
      nickname: p.nickname,
    }));
    this.broadcast({ type: "lobby_update", players });
  }

  private broadcast(msg: ServerMessage) {
    const data = JSON.stringify(msg);
    for (const client of this.clients) {
      if (client.ws.readyState === 1) {
        client.ws.send(data);
      }
    }
  }

  private broadcastToHosts(msg: ServerMessage) {
    const data = JSON.stringify(msg);
    for (const client of this.clients) {
      if (client.isHost && client.ws.readyState === 1) {
        client.ws.send(data);
      }
    }
  }

  private send(ws: WebSocket, msg: ServerMessage) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(msg));
    }
  }
}
