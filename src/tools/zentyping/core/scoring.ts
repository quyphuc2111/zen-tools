import { GameResult, GameConfig, RankInfo, RankTitle, SnippetRun, TypedChar } from '../types/game';

const RANKS: RankInfo[] = [
  {
    title: 'Keyboard Intern',
    minScore: 0,
    colorClass: 'text-slate-300',
    glowClass: 'shadow-[0_0_24px_rgba(148,163,184,0.35)]',
  },
  {
    title: 'Semicolon Warrior',
    minScore: 1200,
    colorClass: 'text-cyan-300',
    glowClass: 'shadow-[0_0_24px_rgba(34,211,238,0.4)]',
  },
  {
    title: 'Syntax Runner',
    minScore: 2300,
    colorClass: 'text-violet-300',
    glowClass: 'shadow-[0_0_24px_rgba(196,181,253,0.45)]',
  },
  {
    title: 'Refactor Ninja',
    minScore: 3600,
    colorClass: 'text-emerald-300',
    glowClass: 'shadow-[0_0_24px_rgba(52,211,153,0.45)]',
  },
  {
    title: 'Production Wizard',
    minScore: 5200,
    colorClass: 'text-amber-300',
    glowClass: 'shadow-[0_0_30px_rgba(251,191,36,0.55)]',
  },
];

export interface DerivedStats {
  wpm: number;
  accuracy: number;
  totalCorrect: number;
  totalMistakes: number;
  totalTyped: number;
  snippetsCompleted: number;
  currentStreak: number;
  bestStreak: number;
  totalTypingTime: number;
  totalChallengeTimeLeft: number;
  score: number;
}

export function deriveStats(
  allEntries: TypedChar[],
  completedRuns: SnippetRun[],
  timeTotal: number,
  timeLeft: number,
): DerivedStats {
  const snippetsCompleted = completedRuns.length;
  const totalTyped = allEntries.length;
  const totalCorrect = allEntries.reduce((sum, entry) => sum + (entry.correct ? 1 : 0), 0);
  const totalMistakes = totalTyped - totalCorrect;
  const accuracy = totalTyped === 0 ? 100 : (totalCorrect / totalTyped) * 100;
  const elapsed = Math.max(1, timeTotal - timeLeft);
  const wpm = (totalCorrect / 5) / (elapsed / 60);
  const totalTypingTime = completedRuns.reduce((sum, run) => sum + run.challengeTimeSpent, 0);
  const totalChallengeTimeLeft = completedRuns.reduce((sum, run) => sum + run.challengeTimeLeft, 0);

  const { currentStreak, bestStreak } = streakStats(allEntries);

  const baseScore = totalCorrect * 10;
  const challengeBonus = snippetsCompleted * 180;
  const timeBonus = totalChallengeTimeLeft * 22;
  const streakBonus = bestStreak * 10;

  const score = Math.max(
    0,
    Math.round(baseScore + challengeBonus + timeBonus + streakBonus),
  );

  return {
    wpm: Number.isFinite(wpm) ? wpm : 0,
    accuracy,
    totalCorrect,
    totalMistakes,
    totalTyped,
    snippetsCompleted,
    currentStreak,
    bestStreak,
    totalTypingTime,
    totalChallengeTimeLeft,
    score,
  };
}

export function resolveRank(score: number, wpm: number): RankInfo {
  if (wpm < 22 && score < 900) {
    return RANKS[0];
  }

  let active = RANKS[0];
  for (const rank of RANKS) {
    if (score >= rank.minScore) {
      active = rank;
    }
  }
  return active;
}

export function buildResult(config: GameConfig, stats: DerivedStats): GameResult {
  const rankInfo = resolveRank(stats.score, stats.wpm);

  return {
    config,
    finalWpm: round2(stats.wpm),
    finalAccuracy: round2(stats.accuracy),
    totalCorrect: stats.totalCorrect,
    totalMistakes: stats.totalMistakes,
    snippetsCompleted: stats.snippetsCompleted,
    bestStreak: stats.bestStreak,
    totalTypingTime: stats.totalTypingTime,
    totalChallengeTimeLeft: stats.totalChallengeTimeLeft,
    score: stats.score,
    rank: rankInfo.title,
    achievements: computeAchievements(stats),
  };
}

export function rankVisuals(rank: RankTitle): RankInfo {
  return RANKS.find((item) => item.title === rank) ?? RANKS[0];
}

function streakStats(entries: TypedChar[]) {
  let running = 0;
  let bestStreak = 0;

  for (const entry of entries) {
    if (entry.correct) {
      running += 1;
      bestStreak = Math.max(bestStreak, running);
    } else {
      running = 0;
    }
  }

  let trailing = 0;
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    if (!entries[index].correct) {
      break;
    }
    trailing += 1;
  }

  return {
    currentStreak: trailing,
    bestStreak,
  };
}

function computeAchievements(stats: DerivedStats): string[] {
  const badges: string[] = [];

  if (stats.snippetsCompleted >= 3) badges.push('3 Snippets Cleared');
  if (stats.totalChallengeTimeLeft >= 40) badges.push('Time Saver');
  if (stats.bestStreak >= 30) badges.push('Combo Master');
  if (stats.score >= 4500) badges.push('Noob No More');

  return badges.length > 0 ? badges : ['Warmed Up'];
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}
