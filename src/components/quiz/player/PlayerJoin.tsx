import { useState } from "react";

interface PlayerJoinProps {
  onJoin: (nickname: string) => void;
}

export function PlayerJoin({ onJoin }: PlayerJoinProps) {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onJoin(nickname.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <h1 className="font-display text-4xl text-foreground">Join Quiz</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your nickname"
          maxLength={20}
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!nickname.trim()}
          className="w-full py-3 rounded-xl font-bold text-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Join
        </button>
      </form>
    </div>
  );
}
