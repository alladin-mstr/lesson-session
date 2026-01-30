export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  image?: string;
  revealImage?: string;
  isBonus?: boolean;
}

export type GamePhase =
  | "lobby"
  | "question"
  | "answer_reveal"
  | "leaderboard"
  | "finished";

export interface Player {
  id: string;
  nickname: string;
  score: number;
  streak: number;
  lastAnswerCorrect: boolean | null;
  lastPoints: number;
  currentAnswer: number | null;
  answerTime: number | null;
}

export interface GameState {
  phase: GamePhase;
  currentQuestionIndex: number;
  totalQuestions: number;
  players: Player[];
  questionStartTime: number | null;
  timeLimit: number; // seconds
  answers: Record<string, { answerIndex: number; time: number }>;
}

// Messages from client to server
export type ClientMessage =
  | { type: "host_join" }
  | { type: "player_join"; nickname: string }
  | { type: "start_game" }
  | { type: "reset_game" }
  | { type: "next" }
  | { type: "submit_answer"; answerIndex: number };

// Messages from server to client
export type ServerMessage =
  | { type: "lobby_update"; players: Pick<Player, "id" | "nickname">[] }
  | { type: "game_started" }
  | {
      type: "question";
      questionIndex: number;
      totalQuestions: number;
      question: string;
      options: string[];
      image?: string;
      isBonus?: boolean;
      timeLimit: number;
      startTime: number;
    }
  | { type: "answer_count"; count: number; total: number }
  | {
      type: "answer_reveal";
      correctIndex: number;
      distribution: number[];
      playerResult?: {
        correct: boolean;
        points: number;
        totalScore: number;
        streak: number;
      };
      revealImage?: string;
      playersCorrect: string[];
    }
  | {
      type: "leaderboard";
      rankings: { nickname: string; score: number; rank: number }[];
      playerRank?: number;
    }
  | {
      type: "finished";
      rankings: { nickname: string; score: number; rank: number }[];
      playerRank?: number;
      playerScore?: number;
    }
  | { type: "error"; message: string }
  | { type: "joined"; playerId: string }
  | { type: "game_reset" };
