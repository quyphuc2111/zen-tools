import { cn } from '../../../../lib/utils';

interface TimerBarProps {
  progress: number;
  danger: boolean;
}

export function TimerBar({ progress, danger }: TimerBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-sm border border-[var(--zt-border)] bg-[var(--zt-surface-muted)]">
      <div
        className={cn('h-full rounded-sm transition-[width,background-color] duration-300', danger ? 'bg-[var(--zt-danger)]' : 'bg-[var(--zt-accent)]')}
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
}
