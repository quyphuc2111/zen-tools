import { Link } from 'react-router-dom';
import { Flame, Keyboard, Play } from 'lucide-react';
import { LANGUAGE_LABELS } from '../../data/snippets';
import { BestRunRecord, RecentRunRecord } from '../../core/storage';
import { LANGUAGE_MODES, GameConfig, LanguageMode } from '../../types/game';
import { ModeSelector } from './ModeSelector';

interface HomeScreenProps {
  config: GameConfig;
  bestRun: BestRunRecord | null;
  recentRuns: RecentRunRecord[];
  onConfigChange: (patch: Partial<GameConfig>) => void;
  onStart: () => void;
}

const HOME_BG_IMAGE = '/zentype/backgrounds/home.jpg';

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function toLanguageLabel(value: string) {
  if (value in LANGUAGE_LABELS) {
    return LANGUAGE_LABELS[value as LanguageMode];
  }
  return value.toUpperCase();
}

export function HomeScreen({ config, bestRun, recentRuns, onConfigChange, onStart }: HomeScreenProps) {
  return (
    <div
      className="relative h-[100dvh] w-full overflow-auto p-4 md:p-5"
      style={{
        backgroundColor: '#1b2736',
        backgroundImage: `linear-gradient(rgba(15, 24, 36, 0.22), rgba(15, 24, 36, 0.22)), url(${HOME_BG_IMAGE})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 grid h-full w-full gap-4 xl:grid-cols-[1.4fr_1fr]">
        <section className="flex min-h-0 flex-col gap-4 rounded-xl border border-[#3A3A3C] bg-[#1C1C1E] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#AEAEB2]">Coding Typing Arena</p>
              <h1 className="mt-2 text-5xl font-black tracking-tight text-[#F2F2F7] sm:text-6xl">ZenType</h1>
              <p className="mt-2 max-w-2xl text-base text-[#AEAEB2]">
                Clean, focused practice for developers. Pick a language and start typing instantly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="cursor-pointer rounded-md border border-[#48484A] bg-[#2C2C2E] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#F2F2F7] transition-colors hover:bg-[#3A3A3C]"
              >
                Back to Tools
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-[#3A3A3C] bg-[#2C2C2E] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">Session</p>
              <p className="mt-1 text-xl font-bold text-[#F2F2F7]">{config.time}s</p>
            </div>
            <div className="rounded-md border border-[#3A3A3C] bg-[#2C2C2E] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">Challenges</p>
              <p className="mt-1 text-xl font-bold text-[#F2F2F7]">5</p>
            </div>
            <div className="rounded-md border border-[#3A3A3C] bg-[#2C2C2E] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#AEAEB2]">Mode</p>
              <p className="mt-1 text-xl font-bold text-[#F2F2F7]">{LANGUAGE_LABELS[config.language]}</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#3A3A3C] bg-[#2C2C2E] p-4">
            <ModeSelector
              label="Language / Framework"
              value={config.language}
              options={LANGUAGE_MODES.map((mode) => ({ label: LANGUAGE_LABELS[mode], value: mode }))}
              onChange={(language) => onConfigChange({ language })}
            />
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#48484A] bg-[#3A3A3C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#F2F2F7] transition-colors hover:bg-[#48484A]"
            >
              <Play className="h-4 w-4" />
              Start Challenge
            </button>
          </div>
        </section>

        <aside className="flex min-h-0 flex-col gap-4">
          <article className="rounded-xl border border-[#3A3A3C] bg-[#1C1C1E] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AEAEB2]">How To Play</p>
            <ul className="mt-3 space-y-2 text-sm text-[#F2F2F7]">
              <li className="flex items-start gap-2">
                <Keyboard className="mt-0.5 h-4 w-4 text-[#A7D8F0]" />
                Type immediately. Timer starts on the first keypress.
              </li>
              <li className="flex items-start gap-2">
                <Flame className="mt-0.5 h-4 w-4 text-[#FCD34D]" />
                Keep streaks high to boost score and rank.
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-[#3A3A3C] bg-[#1C1C1E] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AEAEB2]">Best Local Score</p>
            <p className="mt-2 text-3xl font-bold text-[#F2F2F7]">{bestRun ? bestRun.score.toLocaleString() : '--'}</p>
            <p className="text-sm text-[#AEAEB2]">{bestRun ? `${bestRun.rank} · ${bestRun.wpm.toFixed(1)} WPM` : 'No run yet'}</p>
          </article>

          <article className="min-h-0 flex-1 rounded-xl border border-[#3A3A3C] bg-[#1C1C1E] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#AEAEB2]">Recent Runs</p>
            <div className="mt-3 space-y-2 overflow-auto pr-1">
              {recentRuns.length === 0 && (
                <p className="text-sm text-[#AEAEB2]">No recent sessions yet.</p>
              )}
              {recentRuns.slice(0, 6).map((run) => (
                <div key={`${run.date}-${run.score}`} className="flex items-center justify-between rounded-md border border-[#3A3A3C] bg-[#2C2C2E] px-3 py-2 text-sm">
                  <div>
                    <p className="font-semibold text-[#F2F2F7]">{run.score.toLocaleString()} pts</p>
                    <p className="text-xs text-[#AEAEB2]">{toLanguageLabel(run.language)} · {formatDate(run.date)}</p>
                  </div>
                  <p className="text-xs font-semibold text-[#AEAEB2]">{run.wpm.toFixed(0)} WPM</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}
