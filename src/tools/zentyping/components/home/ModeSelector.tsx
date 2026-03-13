import { cn } from '../../../../lib/utils';

export interface SelectorOption<T extends string | number> {
  label: string;
  value: T;
  hint?: string;
}

interface ModeSelectorProps<T extends string | number> {
  label: string;
  value: T;
  options: SelectorOption<T>[];
  onChange: (value: T) => void;
}

export function ModeSelector<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: ModeSelectorProps<T>) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#AEAEB2]">{label}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'cursor-pointer rounded-lg border px-3 py-2 text-left transition-colors',
                active
                  ? 'border-[#8E8E93] bg-[#3A3A3C] text-[#F2F2F7]'
                  : 'border-[#3A3A3C] bg-[#1C1C1E] text-[#AEAEB2] hover:border-[#48484A] hover:text-[#F2F2F7]',
              )}
            >
              <p className="text-sm font-semibold">{option.label}</p>
              {option.hint && <p className="mt-1 text-[11px] opacity-80">{option.hint}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
