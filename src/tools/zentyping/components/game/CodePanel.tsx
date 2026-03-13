import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { LiveStats, Snippet, TypedChar } from '../../types/game';

interface CodePanelProps {
  snippet: Snippet;
  entries: TypedChar[];
  hitFeedback: 'idle' | 'correct' | 'wrong';
  shakeToken: number;
  pulseToken: number;
  started: boolean;
  challengeTimeLeft: number;
  challengeTimeTotal: number;
  totalChallengeTimeLeft: number;
  completedChallenges: number;
  challengeTarget: number;
  stats: LiveStats;
  onExit: () => void;
}

interface LineMeta {
  line: string;
  start: number;
  hasNewline: boolean;
}

function toVisible(char: string) {
  if (char === ' ') return '\u00A0';
  if (char === '\t') return '⇥';
  return char;
}

function charClass(index: number, cursor: number, entries: TypedChar[]) {
  if (index < entries.length) {
    return entries[index].correct
      ? 'text-[#F2F2F7] bg-[#2C2C2E]'
      : 'text-[#FECACA] bg-[#7F1D1D]';
  }

  if (index === cursor) {
    return 'text-[#F2F2F7] bg-[#3A3A3C] ring-1 ring-[#8E8E93] zen-caret';
  }

  return 'text-[#8E8E93]';
}

function buildLines(code: string): LineMeta[] {
  const parts = code.split('\n');
  let cursor = 0;

  return parts.map((line, index) => {
    const hasNewline = index < parts.length - 1;
    const meta: LineMeta = {
      line,
      start: cursor,
      hasNewline,
    };

    cursor += line.length + (hasNewline ? 1 : 0);
    return meta;
  });
}

export function CodePanel({
  snippet,
  entries,
  hitFeedback,
  shakeToken,
  pulseToken,
  started,
  challengeTimeLeft,
  challengeTimeTotal,
  totalChallengeTimeLeft,
  completedChallenges,
  challengeTarget,
  stats,
  onExit,
}: CodePanelProps) {
  const lines = useMemo(() => buildLines(snippet.code), [snippet.code]);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [rollFrom, setRollFrom] = useState(1);
  const [rollTo, setRollTo] = useState(1);
  const [isRollingChallenge, setIsRollingChallenge] = useState(false);
  const previousCompletedRef = useRef(completedChallenges);
  const cursorIndex = entries.length;
  const cursorMeta = useMemo(() => {
    const typed = snippet.code.slice(0, cursorIndex);
    const split = typed.split('\n');
    const line = split.length;
    const column = (split[split.length - 1]?.length ?? 0) + 1;
    return { line, column };
  }, [cursorIndex, snippet.code]);

  useEffect(() => {
    const previousCompleted = previousCompletedRef.current;
    const progressed = completedChallenges > previousCompleted;
    const hasNextChallenge = completedChallenges < challengeTarget;
    const previousChallengeNumber = Math.min(previousCompleted + 1, challengeTarget);
    const nextChallengeNumber = Math.min(completedChallenges + 1, challengeTarget);

    if (!progressed) {
      previousCompletedRef.current = completedChallenges;
      return;
    }

    if (hasNextChallenge) {
      setRollFrom(previousChallengeNumber);
      setRollTo(nextChallengeNumber);
      setShowChallengeModal(true);
      setIsRollingChallenge(true);
      const rollId = window.setTimeout(() => {
        setIsRollingChallenge(false);
      }, 520);
      const modalId = window.setTimeout(() => {
        setShowChallengeModal(false);
      }, 900);

      previousCompletedRef.current = completedChallenges;
      return () => {
        window.clearTimeout(rollId);
        window.clearTimeout(modalId);
      };
    }

    previousCompletedRef.current = completedChallenges;
  }, [completedChallenges, challengeTarget]);

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-[#3A3A3C] bg-[#1C1C1E]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3A3A3C] bg-[#2C2C2E] px-4 py-2 md:flex-nowrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExit}
            aria-label="Back to language selection"
            className="group relative inline-flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full bg-[#FF5F57]"
          >
            <X className="h-2.5 w-2.5 text-[#5B1010] opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <p className="text-xs font-semibold text-[#F2F2F7]">ZenType Editor</p>
          <span className="rounded border border-[#48484A] bg-[#3A3A3C] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D1D1D6]">
            {snippet.language}
          </span>
        </div>

        <div className="w-full max-w-[420px] md:ml-auto md:w-auto md:min-w-[340px]">
          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            <span className="inline-flex rounded-md border border-[#48484A] bg-[#3A3A3C] px-3 py-1.5 text-sm font-bold text-[#F2F2F7]">
              <span className="mr-1">Challenge</span>
              <span className="[font-variant-numeric:tabular-nums]">
                {Math.min(completedChallenges + 1, challengeTarget)}/{challengeTarget}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-24 z-20 flex flex-wrap items-center justify-end gap-2 md:top-14">
        <div className="rounded-md border border-[#48484A] bg-[#2C2C2E] px-3 py-2 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#AEAEB2]">Time</p>
          <p className="text-lg font-bold leading-none text-[#F2F2F7]">{challengeTimeLeft}s</p>
        </div>
        <div className="rounded-md border border-[#48484A] bg-[#2C2C2E] px-3 py-2 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#AEAEB2]">Score</p>
          <p className="text-lg font-bold leading-none text-[#F2F2F7]">{stats.score.toLocaleString()}</p>
        </div>
      </div>

      <div
        key={`${shakeToken}-${pulseToken}`}
        className={cn(
          'relative flex min-h-0 flex-1 flex-col transition-colors duration-150',
          hitFeedback === 'wrong' && 'animate-zen-shake',
        )}
      >
        {showChallengeModal && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#0000004D]">
            <div className="rounded-md border border-[#48484A] bg-[#1C1C1E] px-5 py-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#AEAEB2]">Challenge Clear</p>
              <p className="mt-2 text-lg font-bold text-[#F2F2F7]">
                Next{' '}
                <span className="inline-flex h-[1.1rem] min-w-[1.1rem] items-center justify-center overflow-hidden align-middle [font-variant-numeric:tabular-nums]">
                  {isRollingChallenge ? (
                    <span className="animate-zen-challenge-roll flex flex-col">
                      <span className="h-[1.1rem] leading-[1.1rem]">{rollFrom}</span>
                      <span className="h-[1.1rem] leading-[1.1rem]">{rollTo}</span>
                    </span>
                  ) : (
                    <span className="h-[1.1rem] leading-[1.1rem]">{rollTo}</span>
                  )}
                </span>
                /{challengeTarget}
              </p>
            </div>
          </div>
        )}

        <div className="border-b border-[#3A3A3C] bg-[#2C2C2E] px-4 py-2">
          <span className="inline-flex rounded-t-md border border-[#3A3A3C] border-b-0 bg-[#1C1C1E] px-3 py-1 text-xs font-semibold text-[#F2F2F7]">
            {snippet.title}.code
          </span>
        </div>

        <div className={cn('relative min-h-0 flex-1 overflow-auto bg-[#1E1E1E] p-3', hitFeedback === 'wrong' && 'ring-1 ring-inset ring-[#FF453A]')}>
        <div className="relative">
          {lines.map((meta, lineIndex) => (
            <div key={`${lineIndex}-${meta.start}`} className="grid grid-cols-[42px_1fr] gap-3 font-mono text-[13.5px] leading-6 sm:text-[15px]">
              <span className="select-none text-right text-[#8E8E93]">{lineIndex + 1}</span>
              <span className="whitespace-pre-wrap break-words">
                {meta.line.split('').map((char, charIndex) => {
                  const index = meta.start + charIndex;
                  return (
                    <span key={index} className={cn('rounded-[3px] px-[1px]', charClass(index, cursorIndex, entries))}>
                      {toVisible(char)}
                    </span>
                  );
                })}

                {meta.hasNewline && (
                  <span
                    className={cn('rounded-[3px] px-[1px] text-[#8E8E93]', charClass(meta.start + meta.line.length, cursorIndex, entries))}
                  >
                    ↵
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#3A3A3C] bg-[#2C2C2E] px-4 py-2 text-[11px] font-semibold text-[#AEAEB2]">
        <span>{started ? 'Typing in progress' : 'Idle'}</span>
        <div className="flex items-center gap-3">
          <span>Ln {cursorMeta.line}, Col {cursorMeta.column}</span>
          <span>{entries.length}/{snippet.code.length} chars</span>
        </div>
      </div>
    </section>
  );
}
