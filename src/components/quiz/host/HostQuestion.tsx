import { Timer } from "../shared/Timer";

const OPTION_COLORS = [
  "bg-quiz-red",
  "bg-quiz-blue",
  "bg-quiz-yellow",
  "bg-quiz-green",
];
const OPTION_SHAPES = ["\u25B2", "\u25C6", "\u25CF", "\u25A0"];

interface HostQuestionProps {
  questionIndex: number;
  totalQuestions: number;
  question: string;
  options: string[];
  image?: string;
  isBonus?: boolean;
  timeLimit: number;
  startTime: number;
  answerCount: number;
  totalPlayers: number;
  onNext: () => void;
}

export function HostQuestion({
  questionIndex,
  totalQuestions,
  question,
  options,
  image,
  isBonus,
  timeLimit,
  startTime,
  answerCount,
  totalPlayers,
  onNext,
}: HostQuestionProps) {
  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground font-mono text-sm">
          {questionIndex + 1} / {totalQuestions}
          {isBonus && (
            <span className="ml-2 px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">
              BONUS
            </span>
          )}
        </span>
        <Timer startTime={startTime} timeLimit={timeLimit} />
        <span className="text-muted-foreground font-mono text-sm">
          {answerCount} / {totalPlayers} answered
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {image && (
          <img
            src={image}
            alt=""
            className="max-h-48 rounded-xl object-cover"
          />
        )}
        <h2 className="font-display text-4xl text-center text-foreground max-w-3xl">
          {question}
        </h2>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {options.map((opt, i) => (
          <div
            key={i}
            className={`${OPTION_COLORS[i]} rounded-xl p-6 text-white font-bold text-xl flex items-center gap-4`}
          >
            <span className="text-2xl opacity-80">{OPTION_SHAPES[i]}</span>
            {opt}
          </div>
        ))}
      </div>

      {/* Skip / force reveal */}
      <button
        onClick={onNext}
        className="mt-4 self-center px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Reveal Answer →
      </button>
    </div>
  );
}
