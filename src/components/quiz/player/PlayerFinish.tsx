interface PlayerFinishProps {
  rank: number;
  score: number;
  totalPlayers: number;
}

export function PlayerFinish({ rank, score, totalPlayers }: PlayerFinishProps) {
  const medal =
    rank === 1 ? "\uD83E\uDD47" : rank === 2 ? "\uD83E\uDD48" : rank === 3 ? "\uD83E\uDD49" : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
      {medal && <span className="text-7xl">{medal}</span>}
      <h2 className="font-display text-4xl text-foreground">
        {rank === 1 ? "You won!" : `#${rank}`}
      </h2>
      <p className="text-primary text-3xl font-bold font-mono">
        {score.toLocaleString()} pts
      </p>
      <p className="text-muted-foreground text-sm mt-4">
        Out of {totalPlayers} players
      </p>
    </div>
  );
}
