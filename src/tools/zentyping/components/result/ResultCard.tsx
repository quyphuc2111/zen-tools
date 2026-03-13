import { motion } from 'motion/react';
import {
  Activity,
  Clock3,
  Flame,
  Gamepad2,
  Gem,
  Layers3,
  Medal,
  Shield,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { LANGUAGE_LABELS } from '../../data/snippets';
import { BestRunRecord } from '../../core/storage';
import { GameResult } from '../../types/game';
import { RankBadge } from '../shared/RankBadge';

interface ResultCardProps {
  result: GameResult;
  bestRun: BestRunRecord | null;
  isNewBest: boolean;
  onPlayAgain: () => void;
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#3A3A3C] bg-[#2C2C2E] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#F2F2F7]">{value}</p>
    </div>
  );
}

function formatTypingTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function lootIcon(badge: string) {
  if (badge.includes('Time')) return Clock3;
  if (badge.includes('Combo')) return Flame;
  if (badge.includes('Noob')) return Gem;
  if (badge.includes('Snippets')) return Sparkles;
  return Star;
}

export function ResultCard({ result, bestRun, isNewBest, onPlayAgain }: ResultCardProps) {
  const challengesDone = result.snippetsCompleted;
  const challengeProgress = Math.min(100, Math.round((challengesDone / 5) * 100));
  const avgSecondsPerChallenge = challengesDone > 0 ? (result.totalTypingTime / challengesDone).toFixed(1) : '0.0';
  const scorePerSecond = (result.score / Math.max(1, result.totalTypingTime)).toFixed(1);
  const challengeBonus = challengesDone * 180;
  const timeBonus = result.totalChallengeTimeLeft * 22;
  const streakBonus = result.bestStreak * 10;
  const typingCore = Math.max(0, result.score - challengeBonus - timeBonus - streakBonus);
  const breakdownMax = Math.max(1, typingCore, challengeBonus, timeBonus, streakBonus);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex h-full min-h-0 flex-col gap-4 overflow-auto rounded-xl border border-[#3A3A3C] bg-[#1C1C1E] p-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-[#48484A] bg-[#2C2C2E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D1D1D6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]" />
            Level Clear
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#AEAEB2]">Match Results</p>
          <h2 className="mt-1 text-4xl font-black tracking-tight text-[#F2F2F7]">{result.score.toLocaleString()} pts</h2>
          <div className="mt-3">
            <RankBadge rank={result.rank} />
          </div>
        </div>

        <div className="rounded-md border border-[#3A3A3C] bg-[#2C2C2E] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">Language</p>
          <p className="mt-2 text-sm font-semibold text-[#F2F2F7]">{LANGUAGE_LABELS[result.config.language]}</p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatTile label="Total Typing Time" value={formatTypingTime(result.totalTypingTime)} />
        <StatTile label="Total Score" value={result.score.toLocaleString()} />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <StatTile label="Challenges Cleared" value={`${challengesDone}/5`} />
        <StatTile label="Avg Sec / Challenge" value={avgSecondsPerChallenge} />
        <StatTile label="Score / Sec" value={scorePerSecond} />
      </div>

      <div className="rounded-md border border-[#3F5360] bg-[#28343C] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">
            <Activity className="h-3.5 w-3.5" />
            Challenge Progress
          </p>
          <p className="text-xs font-bold text-[#F2F2F7]">{challengeProgress}%</p>
        </div>
        <div className="h-2 overflow-hidden rounded-sm border border-[#48484A] bg-[#1C1C1E]">
          <div className="h-full bg-[#D1D1D6] transition-[width] duration-500" style={{ width: `${challengeProgress}%` }} />
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-md border border-[#594A70] bg-[#312B3A] p-4">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">
            <Layers3 className="h-3.5 w-3.5" />
            Score Breakdown
          </p>
          <div className="space-y-2">
            {[
              { label: 'Typing Core', value: typingCore },
              { label: 'Challenge Bonus', value: challengeBonus },
              { label: 'Time Bonus', value: timeBonus },
              { label: 'Streak Bonus', value: streakBonus },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-[#D1D1D6]">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-sm border border-[#48484A] bg-[#1C1C1E]">
                  <div
                    className="h-full bg-[#8E8E93] transition-[width] duration-500"
                    style={{ width: `${Math.round((item.value / breakdownMax) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-[#4C5B6A] bg-[#2A333B] p-4">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">
            <Clock3 className="h-3.5 w-3.5" />
            Run Timeline
          </p>
          <div className="space-y-2 text-xs text-[#D1D1D6]">
            <p className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Started typing and cleared first challenge.</p>
            <p className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Maintained flow for {challengesDone}/5 challenges.</p>
            <p className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Saved +{result.totalChallengeTimeLeft}s as time bonus.</p>
            <p className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Finished with rank: {result.rank}.</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-[#6A5839] bg-[#362D22] p-4">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">
          <Zap className="h-3.5 w-3.5" />
          Run Loot
        </p>
        <div className="flex flex-wrap gap-2">
          {result.achievements.map((badge) => {
            const Icon = lootIcon(badge);
            return (
              <span key={badge} className="inline-flex items-center gap-1.5 rounded-md border border-[#48484A] bg-[#3A3A3C] px-3 py-1 text-xs font-semibold text-[#F2F2F7]">
                <Icon className="h-3.5 w-3.5 text-[#FCD34D]" />
                {badge}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-md border border-[#45624D] bg-[#26362B] p-4">
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">
            <Shield className="h-3.5 w-3.5" />
            Mode Snapshot
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#F2F2F7]">
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Language: {LANGUAGE_LABELS[result.config.language]}</span>
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Challenges: 5</span>
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Typing Time: {formatTypingTime(result.totalTypingTime)}</span>
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Score: {result.score.toLocaleString()}</span>
          </div>
        </div>

        <div className="rounded-md border border-[#4A5A79] bg-[#293243] p-4">
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">
            <Activity className="h-3.5 w-3.5" />
            Quick Stats
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#D1D1D6]">
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">WPM: {result.finalWpm.toFixed(1)}</span>
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Accuracy: {result.finalAccuracy.toFixed(1)}%</span>
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Best Streak: {result.bestStreak}</span>
            <span className="rounded-sm border border-[#48484A] bg-[#3A3A3C] px-2 py-1">Score/sec: {scorePerSecond}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#3A3A3C] bg-[#2C2C2E] p-4">
        <div className="space-y-1 text-sm text-[#F2F2F7]">
          <p className="inline-flex items-center gap-2 font-semibold">
            <Medal className="h-4 w-4 text-[#F59E0B]" />
            Best Local Score: {bestRun ? bestRun.score.toLocaleString() : 'No runs yet'}
          </p>
          {bestRun && (
            <p className="text-xs text-[#AEAEB2]">
              {bestRun.rank} · {bestRun.wpm.toFixed(1)} WPM · {bestRun.accuracy.toFixed(1)}%
            </p>
          )}
          {isNewBest && <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7DD3FC]">New personal best</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onPlayAgain}
            className="inline-flex items-center gap-2 rounded-md border border-[#48484A] bg-[#3A3A3C] px-4 py-2 text-sm font-semibold text-[#F2F2F7] transition-colors hover:bg-[#48484A]"
          >
            <Gamepad2 className="h-4 w-4" />
            Main Menu
          </button>
        </div>
      </div>
    </motion.section>
  );
}
