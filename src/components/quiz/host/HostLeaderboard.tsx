interface HostLeaderboardProps {
  rankings: { nickname: string; score: number; rank: number }[];
  questionIndex: number;
  totalQuestions: number;
  onNext: () => void;
}

export function HostLeaderboard({
  rankings,
  questionIndex,
  totalQuestions,
  onNext,
}: HostLeaderboardProps) {
  const top = rankings.slice(0, 8);
  const maxScore = top[0]?.score || 1;

  const isLast = questionIndex + 1 >= totalQuestions;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
      <h2 className="font-display text-4xl text-foreground">Leaderboard</h2>
      <p className="text-muted-foreground font-mono text-sm">
        After question {questionIndex + 1} of {totalQuestions}
      </p>

      <div className="w-full max-w-2xl space-y-3 mt-4">
        {top.map((r, i) => (
          <div
            key={r.nickname}
            className="flex items-center gap-4"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="w-8 text-right text-muted-foreground font-mono font-bold">
              {r.rank}
            </span>
            <div className="flex-1 relative h-12 rounded-xl overflow-hidden bg-card border border-border">
              <div
                className="absolute inset-y-0 left-0 rounded-xl bg-primary/30 bar-grow"
                style={{ width: `${(r.score / maxScore) * 100}%` }}
              />
              <div className="relative flex items-center justify-between h-full px-4">
                <span className="font-bold text-foreground">{r.nickname}</span>
                <span className="font-mono text-primary font-bold score-pop">
                  {r.score.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="mt-6 px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        {isLast ? "Final Results →" : "Next Question →"}
      </button>
    </div>
  );
}
