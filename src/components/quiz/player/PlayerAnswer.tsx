import { useState } from "react";

const OPTION_COLORS = [
  "bg-quiz-red",
  "bg-quiz-blue",
  "bg-quiz-yellow",
  "bg-quiz-green",
];
const OPTION_SHAPES = ["\u25B2", "\u25C6", "\u25CF", "\u25A0"];

interface PlayerAnswerProps {
  questionIndex: number;
  totalQuestions: number;
  options: string[];
  isBonus?: boolean;
  onAnswer: (index: number) => void;
}

export function PlayerAnswer({
  questionIndex,
  totalQuestions,
  options,
  isBonus,
  onAnswer,
}: PlayerAnswerProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    onAnswer(i);
  };

  if (selected !== null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
        <div
          className={`w-24 h-24 rounded-2xl ${OPTION_COLORS[selected]} flex items-center justify-center text-white text-4xl`}
        >
          {OPTION_SHAPES[selected]}
        </div>
        <p className="text-foreground font-bold text-lg">Answer locked in!</p>
        <p className="text-muted-foreground text-sm animate-pulse">
          Waiting for reveal...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 gap-3">
      <p className="text-center text-muted-foreground font-mono text-sm">
        Q{questionIndex + 1}/{totalQuestions}
        {isBonus && (
          <span className="ml-2 px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">
            BONUS
          </span>
        )}
      </p>
      <div className="flex-1 grid grid-cols-1 gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`${OPTION_COLORS[i]} rounded-2xl p-5 text-white font-bold text-lg flex items-center gap-3 active:scale-95 transition-transform`}
          >
            <span className="text-2xl opacity-80">{OPTION_SHAPES[i]}</span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
