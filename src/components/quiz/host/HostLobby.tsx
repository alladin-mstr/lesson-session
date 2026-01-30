interface HostLobbyProps {
  players: { id: string; nickname: string }[];
  onStart: () => void;
  onReset: () => void;
}

export function HostLobby({ players, onStart, onReset }: HostLobbyProps) {
  const joinUrl = `${window.location.origin}/#/quiz/play`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="font-display text-6xl text-foreground">Learning Quiz</h1>

      <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-md w-full">
        <p className="text-muted-foreground text-sm mb-2 uppercase tracking-wider">
          Join at
        </p>
        <p className="text-primary font-mono text-lg break-all">{joinUrl}</p>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          {players.length} player{players.length !== 1 ? "s" : ""} joined
        </p>

        <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
          {players.map((p, i) => (
            <div
              key={p.id}
              className="quiz-player-chip px-4 py-2 rounded-full text-sm font-medium"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {p.nickname}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={players.length === 0}
        className="mt-4 px-12 py-4 rounded-2xl font-bold text-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Start Game
      </button>

      <button
        onClick={onReset}
        className="px-8 py-2 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/50 transition-all"
      >
        Reset Quiz
      </button>
    </div>
  );
}
