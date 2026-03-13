import { GameResult } from '../types/game';

const BEST_RUN_KEY = 'zentype.best-run.v1';
const RECENT_RUNS_KEY = 'zentype.recent-runs.v1';
const RECENT_LIMIT = 6;

export interface BestRunRecord {
  score: number;
  rank: string;
  wpm: number;
  accuracy: number;
  date: string;
}

export interface RecentRunRecord {
  score: number;
  wpm: number;
  accuracy: number;
  language: string;
  date: string;
}

export function loadBestRun(): BestRunRecord | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(BEST_RUN_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as BestRunRecord;
    if (typeof parsed.score !== 'number') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function persistBestRun(result: GameResult): BestRunRecord {
  const record: BestRunRecord = {
    score: result.score,
    rank: result.rank,
    wpm: result.finalWpm,
    accuracy: result.finalAccuracy,
    date: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(BEST_RUN_KEY, JSON.stringify(record));
  }

  return record;
}

export function loadRecentRuns(): RecentRunRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(RECENT_RUNS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as RecentRunRecord[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => typeof item.score === 'number').slice(0, RECENT_LIMIT);
  } catch {
    return [];
  }
}

export function persistRecentRun(result: GameResult): RecentRunRecord[] {
  const record: RecentRunRecord = {
    score: result.score,
    wpm: result.finalWpm,
    accuracy: result.finalAccuracy,
    language: result.config.language,
    date: new Date().toISOString(),
  };

  const updated = [record, ...loadRecentRuns()].slice(0, RECENT_LIMIT);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(RECENT_RUNS_KEY, JSON.stringify(updated));
  }

  return updated;
}
