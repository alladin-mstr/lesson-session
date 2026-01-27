const OPTION_COLORS = [
  "bg-quiz-red",
  "bg-quiz-blue",
  "bg-quiz-yellow",
  "bg-quiz-green",
];

interface HostResultsProps {
  question: string;
  options: string[];
  correctIndex: number;
  distribution: number[];
  playersCorrect: string[];
  revealImage?: string;
  onNext: () => void;
}

export function HostResults({
  question,
  options,
  correctIndex,
  distribution,
  playersCorrect,
  revealImage,
  onNext,
}: HostResultsProps) {
  const totalAnswers = distribution.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <h2 className="font-display text-3xl text-center text-foreground mb-8">
        {question}
      </h2>

      {revealImage && (
        <div className="flex justify-center mb-6">
          <img
            src={revealImage}
            alt=""
            className="max-h-48 rounded-xl object-cover quiz-reveal-image"
          />
        </div>
      )}

      {/* Distribution bars */}
      <div className="flex-1 flex items-end justify-center gap-6 mb-8 max-w-3xl mx-auto w-full">
        {options.map((opt, i) => {
          const pct = totalAnswers > 0 ? (distribution[i] / totalAnswers) * 100 : 0;
          const isCorrect = i === correctIndex;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-foreground font-mono text-sm">
                {distribution[i]}
              </span>
              <div
                className={`w-full rounded-t-lg transition-all bar-grow ${OPTION_COLORS[i]} ${
                  isCorrect ? "ring-4 ring-white/50" : "opacity-40"
                }`}
                style={{ height: `${Math.max(pct * 2, 8)}px` }}
              />
              <span
                className={`text-sm font-medium text-center ${
                  isCorrect ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {isCorrect ? "\u2713 " : ""}
                {opt}
              </span>
            </div>
          );
        })}
      </div>

      {/* Who got it right */}
      {playersCorrect.length > 0 && (
        <p className="text-center text-muted-foreground mb-4">
          <span className="text-foreground font-bold">
            {playersCorrect.length}
          </span>{" "}
          got it right: {playersCorrect.join(", ")}
        </p>
      )}

      <button
        onClick={onNext}
        className="self-center px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Leaderboard →
      </button>
    </div>
  );
}
