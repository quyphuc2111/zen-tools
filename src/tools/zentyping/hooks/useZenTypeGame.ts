import { useEffect, useMemo, useReducer, useRef } from 'react';
import { getSnippetPool } from '../data/snippets';
import { KeySoundPlayer } from '../core/audio';
import { hashString, seededIndex } from '../core/random';
import { buildResult, deriveStats } from '../core/scoring';
import { CHALLENGE_TARGET, GameConfig, GameResult, Snippet, SnippetRun, TypedChar } from '../types/game';

type HitFeedback = 'idle' | 'correct' | 'wrong';

interface EngineState {
  seed: number;
  lastSnippetId: string;
  currentSnippet: Snippet;
  currentEntries: TypedChar[];
  completedRuns: SnippetRun[];
  totalChallengeTimeLeft: number;
  timeLeft: number;
  challengeTimeLeft: number;
  challengeTimeTotal: number;
  started: boolean;
  challengeStarted: boolean;
  finished: boolean;
  hitFeedback: HitFeedback;
  shakeToken: number;
  pulseToken: number;
}

type EngineAction =
  | { type: 'key'; key: string | 'backspace'; pool: Snippet[] }
  | { type: 'tick' }
  | { type: 'clear-hit' };

interface UseZenTypeGameOptions {
  config: GameConfig;
  onFinished: (result: GameResult) => void;
}

const TAB_SIZE = 4;

function pickNextSnippet(pool: Snippet[], seed: number, previousId: string): { snippet: Snippet; seed: number } {
  const pick = seededIndex(seed, pool.length);
  let index = pick.index;

  if (pool.length > 1 && pool[index].id === previousId) {
    index = (index + 1) % pool.length;
  }

  return {
    snippet: pool[index],
    seed: pick.seed,
  };
}

function runSummary(
  snippetId: string,
  title: string,
  entries: TypedChar[],
  challengeTimeTotal: number,
  challengeTimeLeft: number,
): SnippetRun {
  const correctChars = entries.reduce((sum, entry) => sum + (entry.correct ? 1 : 0), 0);
  const mistakes = entries.length - correctChars;

  return {
    snippetId,
    title,
    entries,
    correctChars,
    mistakes,
    challengeTimeLeft,
    challengeTimeSpent: Math.max(0, challengeTimeTotal - challengeTimeLeft),
  };
}

function estimateChallengeTime(snippet: Snippet): number {
  const base = Math.round(snippet.code.length / 3.2) + 12;
  return Math.min(150, Math.max(32, base));
}

function createInitialState(config: GameConfig, pool: Snippet[]): EngineState {
  const baseSeed = hashString(`${config.language}:${Date.now()}`);
  const pick = seededIndex(baseSeed, pool.length);
  const currentSnippet = pool[pick.index];
  const challengeTimeTotal = estimateChallengeTime(currentSnippet);

  return {
    seed: pick.seed,
    lastSnippetId: currentSnippet.id,
    currentSnippet,
    currentEntries: [],
    completedRuns: [],
    totalChallengeTimeLeft: 0,
    timeLeft: config.time,
    challengeTimeLeft: challengeTimeTotal,
    challengeTimeTotal,
    started: false,
    challengeStarted: false,
    finished: false,
    hitFeedback: 'idle',
    shakeToken: 0,
    pulseToken: 0,
  };
}

function createReducer(timeLimit: number, challengeTarget: number) {
  return (state: EngineState, action: EngineAction): EngineState => {
    switch (action.type) {
      case 'clear-hit': {
        if (state.hitFeedback === 'idle') {
          return state;
        }

        return {
          ...state,
          hitFeedback: 'idle',
        };
      }
      case 'tick': {
        if (!state.started || !state.challengeStarted || state.finished) {
          return state;
        }

        const nextSessionTime = Math.max(0, state.timeLeft - 1);
        if (nextSessionTime === 0) {
          return {
            ...state,
            timeLeft: 0,
            finished: true,
            hitFeedback: 'idle',
          };
        }

        const nextChallengeTime = Math.max(0, state.challengeTimeLeft - 1);
        if (nextChallengeTime === 0) {
          return {
            ...state,
            timeLeft: nextSessionTime,
            currentEntries: [],
            challengeTimeLeft: state.challengeTimeTotal,
            challengeStarted: false,
            hitFeedback: 'wrong',
            shakeToken: state.shakeToken + 1,
          };
        }

        return {
          ...state,
          timeLeft: nextSessionTime,
          challengeTimeLeft: nextChallengeTime,
        };
      }
      case 'key': {
        if (state.finished) {
          return state;
        }

        if (action.key === 'backspace') {
          if (state.currentEntries.length === 0) {
            return state;
          }

          return {
            ...state,
            currentEntries: state.currentEntries.slice(0, -1),
            started: true,
            hitFeedback: 'idle',
          };
        }

        if (state.currentEntries.length >= state.currentSnippet.code.length) {
          return state;
        }

        const keyResolution = resolveTypedKey(
          action.key,
          state.currentSnippet.code,
          state.currentEntries.length,
        );

        if (!keyResolution.isCorrect) {
          return {
            ...state,
            started: true,
            challengeStarted: true,
            hitFeedback: 'wrong',
            shakeToken: state.shakeToken + 1,
          };
        }

        const nextEntries: TypedChar[] = [...state.currentEntries, ...keyResolution.typed];

        // Fast-path indentation: when Enter matches a newline, auto-fill leading
        // spaces/tabs on the next line so users don't have to press space repeatedly.
        if (action.key === '\n') {
          let cursor = nextEntries.length;
          while (cursor < state.currentSnippet.code.length) {
            const nextExpected = state.currentSnippet.code[cursor];
            if (nextExpected !== ' ' && nextExpected !== '\t') {
              break;
            }

            nextEntries.push({
              input: nextExpected,
              expected: nextExpected,
              correct: true,
            });
            cursor += 1;
          }
        }

        const baseState: EngineState = {
          ...state,
          currentEntries: nextEntries,
          started: true,
          challengeStarted: true,
          hitFeedback: 'correct',
          shakeToken: state.shakeToken,
          pulseToken: state.pulseToken + 1,
        };

        if (nextEntries.length < state.currentSnippet.code.length) {
          return baseState;
        }

        const summary = runSummary(
          state.currentSnippet.id,
          state.currentSnippet.title,
          nextEntries,
          state.challengeTimeTotal,
          state.challengeTimeLeft,
        );
        const isPerfectRun = summary.mistakes === 0;

        if (!isPerfectRun) {
          return {
            ...baseState,
            currentEntries: [],
            challengeTimeLeft: state.challengeTimeTotal,
            challengeStarted: false,
            hitFeedback: 'wrong',
            shakeToken: state.shakeToken + 1,
            pulseToken: state.pulseToken,
          };
        }

        const nextCompletedRuns = [...state.completedRuns, summary];
        const completedTarget = nextCompletedRuns.length >= challengeTarget;

        if (completedTarget) {
          return {
            ...baseState,
            currentEntries: [],
            completedRuns: nextCompletedRuns,
            totalChallengeTimeLeft: state.totalChallengeTimeLeft + state.challengeTimeLeft,
            challengeStarted: false,
            finished: true,
            timeLeft: Math.min(state.timeLeft, timeLimit),
          };
        }

        const nextSnippet = pickNextSnippet(action.pool, state.seed, state.currentSnippet.id);
        const nextChallengeTimeTotal = estimateChallengeTime(nextSnippet.snippet);

        return {
          ...baseState,
          currentEntries: [],
          completedRuns: nextCompletedRuns,
          totalChallengeTimeLeft: state.totalChallengeTimeLeft + state.challengeTimeLeft,
          currentSnippet: nextSnippet.snippet,
          challengeTimeLeft: nextChallengeTimeTotal,
          challengeTimeTotal: nextChallengeTimeTotal,
          challengeStarted: false,
          seed: nextSnippet.seed,
          lastSnippetId: state.currentSnippet.id,
          timeLeft: Math.min(state.timeLeft, timeLimit),
        };
      }
      default:
        return state;
    }
  };
}

function normalizeKey(event: KeyboardEvent): string | 'backspace' | null {
  if (event.key === 'Backspace') {
    return 'backspace';
  }

  if (event.key === 'Enter') {
    return '\n';
  }

  if (event.key === 'Tab') {
    return '\t';
  }

  if (event.key.length === 1) {
    return event.key;
  }

  return null;
}

function resolveTypedKey(
  key: string | 'backspace',
  code: string,
  cursor: number,
): { isCorrect: boolean; typed: TypedChar[] } {
  const expected = code[cursor] ?? '';
  if (key === 'backspace') {
    return { isCorrect: false, typed: [] };
  }

  if (key !== '\t') {
    if (key !== expected) {
      return { isCorrect: false, typed: [] };
    }

    return {
      isCorrect: true,
      typed: [
        {
          input: key,
          expected,
          correct: true,
        },
      ],
    };
  }

  const tabSegment = code.slice(cursor, cursor + TAB_SIZE);
  if (tabSegment !== ' '.repeat(TAB_SIZE)) {
    return { isCorrect: false, typed: [] };
  }

  return {
    isCorrect: true,
    typed: Array.from({ length: TAB_SIZE }, () => ({
      input: ' ',
      expected: ' ',
      correct: true,
    })),
  };
}

function flattenEntries(completedRuns: SnippetRun[], currentEntries: TypedChar[]): TypedChar[] {
  const fromCompleted = completedRuns.flatMap((run) => run.entries);
  return [...fromCompleted, ...currentEntries];
}

export function useZenTypeGame({ config, onFinished }: UseZenTypeGameOptions) {
  const pool = useMemo(() => getSnippetPool(config.language), [config.language]);

  const reducer = useMemo(() => createReducer(config.time, CHALLENGE_TARGET), [config.time]);
  const [state, dispatch] = useReducer(reducer, createInitialState(config, pool));
  const soundRef = useRef(new KeySoundPlayer());
  const hasReportedRef = useRef(false);

  const allEntries = useMemo(
    () => flattenEntries(state.completedRuns, state.currentEntries),
    [state.completedRuns, state.currentEntries],
  );

  const liveStats = useMemo(
    () => deriveStats(allEntries, state.completedRuns, config.time, state.timeLeft),
    [allEntries, state.completedRuns, config.time, state.timeLeft],
  );

  const snippetProgress =
    state.currentSnippet.code.length === 0
      ? 0
      : Math.min(1, state.currentEntries.length / state.currentSnippet.code.length);

  const timerProgress = 1 - state.timeLeft / config.time;
  const comboCharge = Math.min(1, liveStats.currentStreak / 24);

  useEffect(() => {
    if (!state.started || state.finished) {
      return;
    }

    const timerId = window.setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [state.started, state.finished]);

  useEffect(() => {
    if (state.hitFeedback === 'idle') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'clear-hit' });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [state.hitFeedback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.finished) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = normalizeKey(event);
      if (!key) {
        return;
      }

      event.preventDefault();

      if (key !== 'backspace' && config.soundEnabled) {
        const keyResolution = resolveTypedKey(
          key,
          state.currentSnippet.code,
          state.currentEntries.length,
        );
        const hitType = keyResolution.isCorrect ? 'correct' : 'wrong';
        void soundRef.current.play(hitType);
      }

      dispatch({ type: 'key', key, pool });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [config.soundEnabled, pool, state.currentEntries.length, state.currentSnippet.code, state.finished]);

  useEffect(() => {
    if (!state.finished || hasReportedRef.current) {
      return;
    }

    hasReportedRef.current = true;
    onFinished(buildResult(config, liveStats));
  }, [config, liveStats, onFinished, state.finished]);

  return {
    started: state.started,
    finished: state.finished,
    timeLeft: state.timeLeft,
    challengeTimeLeft: state.challengeTimeLeft,
    challengeTimeTotal: state.challengeTimeTotal,
    totalChallengeTimeLeft: state.totalChallengeTimeLeft,
    currentSnippet: state.currentSnippet,
    currentEntries: state.currentEntries,
    completedRuns: state.completedRuns,
    hitFeedback: state.hitFeedback,
    shakeToken: state.shakeToken,
    pulseToken: state.pulseToken,
    liveStats,
    snippetProgress,
    timerProgress,
    comboCharge,
    challengeTarget: CHALLENGE_TARGET,
  };
}
