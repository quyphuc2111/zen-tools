import type { ComponentType } from 'react';
import { Activity, AlarmClock, CircleGauge, Crosshair, Flame, Trophy } from 'lucide-react';
import { LiveStats } from '../../types/game';
import { ComboMeter } from './ComboMeter';
import { TimerBar } from './TimerBar';

interface GameHUDProps {
  timeLeft: number;
  totalTime: number;
  snippetTitle: string;
  snippetProgress: number;
  timerProgress: number;
  comboCharge: number;
  stats: LiveStats;
}

function StatCell({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-[var(--zt-border)] bg-[var(--zt-surface)] p-3">
      <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--zt-text-muted)]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="text-xl font-semibold text-[var(--zt-text)]">{value}</p>
    </div>
  );
}

export function GameHUD({
  timeLeft,
  totalTime,
  snippetTitle,
  snippetProgress,
  timerProgress,
  comboCharge,
  stats,
}: GameHUDProps) {
  const danger = timeLeft <= 5;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-[var(--zt-border)] bg-[var(--zt-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--zt-text-muted)]">Current Snippet</p>
              <p className="mt-1 text-sm font-semibold text-[var(--zt-text)]">{snippetTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--zt-text-muted)]">Time</p>
              <p className="text-3xl font-bold text-[var(--zt-text)]">{timeLeft}s</p>
            </div>
          </div>

          <div className="space-y-2">
            <TimerBar progress={timerProgress} danger={danger} />
            <div className="flex justify-between text-[11px] text-[var(--zt-text-muted)]">
              <span>Session {totalTime}s</span>
              <span>{Math.round(snippetProgress * 100)}% snippet done</span>
            </div>
          </div>
        </div>

        <ComboMeter streak={stats.currentStreak} charge={comboCharge} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCell label="Score" value={stats.score.toLocaleString()} icon={Trophy} />
        <StatCell label="WPM" value={stats.wpm.toFixed(1)} icon={CircleGauge} />
        <StatCell label="Accuracy" value={`${stats.accuracy.toFixed(1)}%`} icon={Crosshair} />
        <StatCell label="Correct" value={String(stats.totalCorrect)} icon={Activity} />
        <StatCell label="Errors" value={String(stats.totalMistakes)} icon={AlarmClock} />
        <StatCell label="Best Streak" value={String(stats.bestStreak)} icon={Flame} />
      </div>
    </div>
  );
}
