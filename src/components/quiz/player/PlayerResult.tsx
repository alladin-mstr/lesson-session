interface PlayerResultProps {
  correct: boolean;
  points: number;
  totalScore: number;
  streak: number;
}

export function PlayerResult({
  correct,
  points,
  totalScore,
  streak,
}: PlayerResultProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
      <div
        className={`text-6xl ${correct ? "quiz-correct-bounce" : "quiz-wrong-shake"}`}
      >
        {correct ? "\u2713" : "\u2717"}
      </div>
      <h2
        className={`font-display text-3xl ${correct ? "text-green-400" : "text-red-400"}`}
      >
        {correct ? "Correct!" : "Wrong!"}
      </h2>

      {correct && (
        <>
          <p className="text-foreground text-4xl font-bold score-pop">
            +{points}
          </p>
          {streak > 1 && (
            <p className="text-primary font-mono text-sm">
              {streak} streak! 🔥
            </p>
          )}
        </>
      )}

      <p className="text-muted-foreground mt-4">
        Total: <span className="text-foreground font-bold">{totalScore.toLocaleString()}</span>
      </p>
    </div>
  );
}
