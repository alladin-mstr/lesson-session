interface HostFinishProps {
  rankings: { nickname: string; score: number; rank: number }[];
}

const PODIUM_COLORS = [
  "from-yellow-400 to-amber-500",
  "from-gray-300 to-gray-400",
  "from-orange-400 to-orange-600",
];
const PODIUM_HEIGHTS = ["h-48", "h-36", "h-28"];
const PODIUM_ORDER = [1, 0, 2]; // 2nd, 1st, 3rd on stage

export function HostFinish({ rankings }: HostFinishProps) {
  const podium = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="font-display text-5xl text-foreground confetti-text">
        Final Results
      </h1>

      {/* Podium */}
      <div className="flex items-end gap-4 mt-8">
        {PODIUM_ORDER.map((idx) => {
          const r = podium[idx];
          if (!r) return <div key={idx} className="w-40" />;
          return (
            <div
              key={r.nickname}
              className="flex flex-col items-center gap-2 fade-up"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <span className="text-foreground font-bold text-lg">
                {r.nickname}
              </span>
              <span className="text-primary font-mono font-bold">
                {r.score.toLocaleString()}
              </span>
              <div
                className={`w-40 ${PODIUM_HEIGHTS[idx]} rounded-t-2xl bg-gradient-to-b ${PODIUM_COLORS[idx]} flex items-start justify-center pt-4`}
              >
                <span className="text-4xl font-bold text-white/90">
                  {idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Remaining rankings */}
      {rest.length > 0 && (
        <div className="w-full max-w-md space-y-2 mt-4">
          {rest.map((r) => (
            <div
              key={r.nickname}
              className="flex items-center justify-between px-4 py-2 rounded-lg bg-card border border-border"
            >
              <span className="text-muted-foreground font-mono w-8">
                {r.rank}
              </span>
              <span className="flex-1 text-foreground font-medium">
                {r.nickname}
              </span>
              <span className="font-mono text-primary">
                {r.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
