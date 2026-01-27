const BASE_POINTS = 1000;
const MAX_TIME_BONUS = 500;
const STREAK_BONUS = 100;
const MAX_STREAK_MULTIPLIER = 5;

export function calculateScore(
  correct: boolean,
  answerTimeMs: number,
  timeLimitMs: number,
  currentStreak: number
): { points: number; newStreak: number } {
  if (!correct) {
    return { points: 0, newStreak: 0 };
  }

  const clampedTime = Math.max(0, Math.min(answerTimeMs, timeLimitMs));
  const timeBonus = Math.round(
    MAX_TIME_BONUS * (1 - clampedTime / timeLimitMs)
  );

  const streak = Math.min(currentStreak, MAX_STREAK_MULTIPLIER);
  const streakBonus = streak * STREAK_BONUS;

  const points = BASE_POINTS + timeBonus + streakBonus;

  return { points, newStreak: currentStreak + 1 };
}
