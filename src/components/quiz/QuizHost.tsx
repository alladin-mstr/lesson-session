import { useEffect, useState, useCallback } from "react";
import { useWebSocket } from "../../hooks/useWebSocket";
import { QuizLayout } from "./shared/QuizLayout";
import { HostLobby } from "./host/HostLobby";
import { HostQuestion } from "./host/HostQuestion";
import { HostResults } from "./host/HostResults";
import { HostLeaderboard } from "./host/HostLeaderboard";
import { HostFinish } from "./host/HostFinish";
import type { ServerMessage } from "../../types/quiz";

type Phase = "lobby" | "question" | "answer_reveal" | "leaderboard" | "finished";

interface QuestionData {
  questionIndex: number;
  totalQuestions: number;
  question: string;
  options: string[];
  image?: string;
  isBonus?: boolean;
  timeLimit: number;
  startTime: number;
}

interface RevealData {
  correctIndex: number;
  distribution: number[];
  playersCorrect: string[];
  revealImage?: string;
}

interface RankEntry {
  nickname: string;
  score: number;
  rank: number;
}

export function QuizHost() {
  const { send, on, connected } = useWebSocket();
  const [phase, setPhase] = useState<Phase>("lobby");
  const [players, setPlayers] = useState<{ id: string; nickname: string }[]>([]);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [answerCount, setAnswerCount] = useState(0);
  const [revealData, setRevealData] = useState<RevealData | null>(null);
  const [rankings, setRankings] = useState<RankEntry[]>([]);

  // Register as host on connect
  useEffect(() => {
    if (connected) {
      send({ type: "host_join" });
    }
  }, [connected, send]);

  // Message handlers
  useEffect(() => {
    const unsubs = [
      on("lobby_update", (msg: ServerMessage) => {
        if (msg.type === "lobby_update") {
          setPlayers(msg.players);
        }
      }),
      on("game_started", () => {
        setPhase("question");
      }),
      on("question", (msg: ServerMessage) => {
        if (msg.type === "question") {
          setPhase("question");
          setAnswerCount(0);
          setQuestionData({
            questionIndex: msg.questionIndex,
            totalQuestions: msg.totalQuestions,
            question: msg.question,
            options: msg.options,
            image: msg.image,
            isBonus: msg.isBonus,
            timeLimit: msg.timeLimit,
            startTime: msg.startTime,
          });
        }
      }),
      on("answer_count", (msg: ServerMessage) => {
        if (msg.type === "answer_count") {
          setAnswerCount(msg.count);
        }
      }),
      on("answer_reveal", (msg: ServerMessage) => {
        if (msg.type === "answer_reveal") {
          setPhase("answer_reveal");
          setRevealData({
            correctIndex: msg.correctIndex,
            distribution: msg.distribution,
            playersCorrect: msg.playersCorrect,
            revealImage: msg.revealImage,
          });
        }
      }),
      on("leaderboard", (msg: ServerMessage) => {
        if (msg.type === "leaderboard") {
          setPhase("leaderboard");
          setRankings(msg.rankings);
        }
      }),
      on("finished", (msg: ServerMessage) => {
        if (msg.type === "finished") {
          setPhase("finished");
          setRankings(msg.rankings);
        }
      }),
    ];

    return () => unsubs.forEach((u) => u());
  }, [on]);

  const handleNext = useCallback(() => {
    send({ type: "next" });
  }, [send]);

  const handleStart = useCallback(() => {
    send({ type: "start_game" });
  }, [send]);

  const handleReset = useCallback(() => {
    send({ type: "reset_game" });
    setPhase("lobby");
    setQuestionData(null);
    setAnswerCount(0);
    setRevealData(null);
    setRankings([]);
  }, [send]);

  return (
    <QuizLayout>
      {!connected && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-mono">
          Connecting to server...
        </div>
      )}

      {phase === "lobby" && (
        <HostLobby players={players} onStart={handleStart} onReset={handleReset} />
      )}

      {phase === "question" && questionData && (
        <HostQuestion
          {...questionData}
          answerCount={answerCount}
          totalPlayers={players.length}
          onNext={handleNext}
        />
      )}

      {phase === "answer_reveal" && revealData && questionData && (
        <HostResults
          question={questionData.question}
          options={questionData.options}
          correctIndex={revealData.correctIndex}
          distribution={revealData.distribution}
          playersCorrect={revealData.playersCorrect}
          revealImage={revealData.revealImage}
          onNext={handleNext}
        />
      )}

      {phase === "leaderboard" && questionData && (
        <HostLeaderboard
          rankings={rankings}
          questionIndex={questionData.questionIndex}
          totalQuestions={questionData.totalQuestions}
          onNext={handleNext}
        />
      )}

      {phase === "finished" && <HostFinish rankings={rankings} />}
    </QuizLayout>
  );
}
