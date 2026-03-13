import { cn } from '../../../../lib/utils';

interface ComboMeterProps {
  streak: number;
  charge: number;
}

export function ComboMeter({ streak, charge }: ComboMeterProps) {
  const hot = streak >= 18;

  return (
    <div className={cn('rounded-xl border bg-[var(--zt-surface)] p-4', hot ? 'border-[#818CF8]' : 'border-[var(--zt-border)]')}>
      <div className="mb-3 flex items-end justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--zt-text-muted)]">Combo</p>
        <p className={cn('text-2xl font-bold', hot ? 'text-[#C4B5FD]' : 'text-[var(--zt-text)]')}>x{Math.max(1, streak)}</p>
      </div>

      <div className="h-2 overflow-hidden rounded-sm bg-[var(--zt-surface-muted)]">
        <div
          className={cn('h-full rounded-sm transition-all duration-250', hot ? 'bg-[#8B5CF6]' : 'bg-[var(--zt-accent)]')}
          style={{ width: `${Math.max(6, charge * 100)}%` }}
        />
      </div>
    </div>
  );
}
