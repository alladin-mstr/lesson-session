import type { ReactNode } from "react";

export function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grain-overlay relative min-h-screen bg-background overflow-hidden">
      {/* Ambient glow blobs */}
      <div
        className="ambient-glow"
        style={{ top: "-150px", left: "-100px", background: "hsl(280, 80%, 60%)" }}
      />
      <div
        className="ambient-glow"
        style={{ bottom: "-150px", right: "-100px", background: "hsl(36, 80%, 56%)" }}
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
