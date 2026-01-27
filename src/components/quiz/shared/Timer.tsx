import { useEffect, useState } from "react";

interface TimerProps {
  startTime: number;
  timeLimit: number; // seconds
  onExpired?: () => void;
}

export function Timer({ startTime, timeLimit, onExpired }: TimerProps) {
  const [remaining, setRemaining] = useState(timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const left = Math.max(0, timeLimit - elapsed);
      setRemaining(left);
      if (left <= 0) {
        clearInterval(interval);
        onExpired?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, timeLimit, onExpired]);

  const fraction = remaining / timeLimit;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fraction);

  const color =
    remaining > timeLimit * 0.5
      ? "hsl(142, 70%, 50%)"
      : remaining > timeLimit * 0.25
        ? "hsl(45, 90%, 55%)"
        : "hsl(0, 80%, 55%)";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <span className="absolute text-2xl font-bold font-mono text-foreground">
        {Math.ceil(remaining)}
      </span>
    </div>
  );
}
