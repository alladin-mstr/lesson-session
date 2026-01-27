interface PlayerWaitingProps {
  nickname: string;
}

export function PlayerWaiting({ nickname }: PlayerWaitingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
      <div className="text-5xl">✓</div>
      <h2 className="font-display text-3xl text-foreground">You're in!</h2>
      <p className="text-muted-foreground text-lg">{nickname}</p>
      <p className="text-muted-foreground text-sm mt-8 animate-pulse">
        Waiting for the host to start...
      </p>
    </div>
  );
}
