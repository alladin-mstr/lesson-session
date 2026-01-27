import { useEffect, useState, useCallback } from "react";
import { useWebSocket } from "../../hooks/useWebSocket";
import { QuizLayout } from "./shared/QuizLayout";
import { PlayerJoin } from "./player/PlayerJoin";
import { PlayerWaiting } from "./player/PlayerWaiting";
import { PlayerAnswer } from "./player/PlayerAnswer";
import { PlayerResult } from "./player/PlayerResult";
import { PlayerFinish } from "./player/PlayerFinish";
import type { ServerMessage } from "../../types/quiz";

type Phase = "join" | "waiting" | "question" | "answered" | "result" | "leaderboard_wait" | "finished";

interface QuestionInfo {
  questionIndex: number;
  totalQuestions: number;
  options: string[];
  isBonus?: boolean;
}

interface ResultInfo {
  correct: boolean;
  points: number;
  totalScore: number;
  streak: number;
}

interface FinishInfo {
  rank: number;
  score: number;
  totalPlayers: number;
}

export function QuizPlayer() {
  const { send, on, connected } = useWebSocket();
  const [phase, setPhase] = useState<Phase>("join");
  const [nickname, setNickname] = useState("");
  const [questionInfo, setQuestionInfo] = useState<QuestionInfo | null>(null);
  const [resultInfo, setResultInfo] = useState<ResultInfo | null>(null);
  const [finishInfo, setFinishInfo] = useState<FinishInfo | null>(null);

  useEffect(() => {
    const unsubs = [
      on("joined", () => {
        setPhase("waiting");
      }),
      on("game_started", () => {
        // Will receive question next
      }),
      on("question", (msg: ServerMessage) => {
        if (msg.type === "question") {
          setPhase("question");
          setQuestionInfo({
            questionIndex: msg.questionIndex,
            totalQuestions: msg.totalQuestions,
            options: msg.options,
            isBonus: msg.isBonus,
          });
        }
      }),
      on("answer_reveal", (msg: ServerMessage) => {
        if (msg.type === "answer_reveal" && msg.playerResult) {
          setPhase("result");
          setResultInfo({
            correct: msg.playerResult.correct,
            points: msg.playerResult.points,
            totalScore: msg.playerResult.totalScore,
            streak: msg.playerResult.streak,
          });
        }
      }),
      on("leaderboard", () => {
        setPhase("leaderboard_wait");
      }),
      on("finished", (msg: ServerMessage) => {
        if (msg.type === "finished") {
          setPhase("finished");
          setFinishInfo({
            rank: msg.playerRank ?? 0,
            score: msg.playerScore ?? 0,
            totalPlayers: msg.rankings.length,
          });
        }
      }),
      on("error", (msg: ServerMessage) => {
        if (msg.type === "error") {
          alert(msg.message);
        }
      }),
    ];

    return () => unsubs.forEach((u) => u());
  }, [on]);

  const handleJoin = useCallback(
    (name: string) => {
      setNickname(name);
      send({ type: "player_join", nickname: name });
    },
    [send]
  );

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      setPhase("answered");
      send({ type: "submit_answer", answerIndex });
    },
    [send]
  );

  return (
    <QuizLayout>
      {!connected && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-mono">
          Connecting...
        </div>
      )}

      {phase === "join" && <PlayerJoin onJoin={handleJoin} />}

      {phase === "waiting" && <PlayerWaiting nickname={nickname} />}

      {(phase === "question" || phase === "answered") && questionInfo && (
        <PlayerAnswer
          questionIndex={questionInfo.questionIndex}
          totalQuestions={questionInfo.totalQuestions}
          options={questionInfo.options}
          isBonus={questionInfo.isBonus}
          onAnswer={handleAnswer}
        />
      )}

      {phase === "result" && resultInfo && <PlayerResult {...resultInfo} />}

      {phase === "leaderboard_wait" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <p className="text-muted-foreground animate-pulse">
            Showing leaderboard...
          </p>
        </div>
      )}

      {phase === "finished" && finishInfo && <PlayerFinish {...finishInfo} />}
    </QuizLayout>
  );
}
