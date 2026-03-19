import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Dices,
  CircleDashed,
  Flag,
  Box,
  ArrowDownUp,
  Flame,
  Play,
} from 'lucide-react';
import { Mode } from '../../types/game';

interface SidebarProps {
  itemsText: string;
  itemCount: number;
  mode: Mode;
  isAnimating: boolean;
  raceDuration: number;
  onItemsTextChange: (text: string) => void;
  onModeChange: (mode: Mode) => void;
  onRaceDurationChange: (duration: number) => void;
  onStart: () => void;
}

const MODES = [
  { id: 'wheel' as Mode, icon: CircleDashed, label: 'Vòng Quay', color: 'text-blue-400' },
  { id: 'race' as Mode, icon: Flag, label: 'Đua Vịt', color: 'text-green-400' },
  { id: 'draw' as Mode, icon: Box, label: 'Bốc Thăm', color: 'text-red-400' },
  { id: 'slot' as Mode, icon: ArrowDownUp, label: 'Quay Slot', color: 'text-yellow-400' },
  { id: 'elimination' as Mode, icon: Flame, label: 'Sinh Tồn', color: 'text-orange-500' },
];

export function Sidebar({
  itemsText,
  itemCount,
  mode,
  isAnimating,
  raceDuration,
  onItemsTextChange,
  onModeChange,
  onRaceDurationChange,
  onStart,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-80 bg-neutral-900 border-r border-white/10 flex flex-col h-auto md:h-screen sticky top-0 z-30 overflow-y-auto custom-scrollbar shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-black/20">
        <Link
          to="/"
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors shrink-0"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-[14px] font-bold uppercase tracking-[0.15em] flex items-center gap-2 text-white">
          <Dices size={18} className="text-yellow-400" /> ZENDOM
        </h1>
      </div>

      <div className="p-6 flex flex-col gap-8 flex-1">
        {/* Input */}
        <section className="flex-1 flex flex-col">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">
            Danh sách ({itemCount})
          </h2>
          <textarea
            value={itemsText}
            onChange={(e) => onItemsTextChange(e.target.value)}
            placeholder="Nhập tên, mỗi dòng 1 tên..."
            className="w-full flex-1 min-h-[150px] bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 custom-scrollbar text-white placeholder:text-white/30 transition-shadow shadow-inner"
            disabled={isAnimating}
          />
        </section>

        {/* Mode Selection */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">
            Hình thức
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => onModeChange(m.id)}
                disabled={isAnimating}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                  mode === m.id
                    ? 'bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'bg-black/20 border-white/5 text-white/60 hover:bg-white/5'
                } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <m.icon size={18} className={mode === m.id ? m.color : ''} />
                <span className="text-xs font-bold uppercase tracking-wider">{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Race Duration (only for race mode) */}
        {mode === 'race' && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">
              Thời gian đua
            </h2>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="number"
                  min={3}
                  max={300}
                  value={raceDuration}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 3 && v <= 300) onRaceDurationChange(v);
                  }}
                  disabled={isAnimating}
                  className="w-20 bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-center text-sm font-black text-yellow-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-xs text-white/40">giây</span>
                <div className="flex gap-1 ml-auto">
                  {[10, 20, 30, 60].map((v) => (
                    <button
                      key={v}
                      onClick={() => onRaceDurationChange(v)}
                      disabled={isAnimating}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        raceDuration === v
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/10 text-white/50 hover:bg-white/20'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {v}s
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="range"
                min={3}
                max={120}
                step={1}
                value={Math.min(raceDuration, 120)}
                onChange={(e) => onRaceDurationChange(Number(e.target.value))}
                disabled={isAnimating}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(250,204,21,0.5)]"
              />
              <div className="flex justify-between mt-2 text-[10px] text-white/30">
                <span>3s</span>
                <span>60s</span>
                <span>120s</span>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Start Button */}
      <div className="p-6 border-t border-white/10 bg-neutral-900 sticky bottom-0 z-10">
        <button
          onClick={onStart}
          disabled={itemCount < 2 || isAnimating}
          className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-4 rounded-full text-[13px] font-black uppercase tracking-[0.15em] hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(250,204,21,0.4)] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          {isAnimating ? (
            <span className="animate-pulse relative z-10">Đang chạy...</span>
          ) : (
            <span className="relative z-10 flex items-center gap-2">
              <Play size={18} fill="currentColor" />
              Bắt Đầu
            </span>
          )}
        </button>
        {itemCount < 2 && (
          <p className="text-center text-[10px] text-red-400 mt-3 font-medium">
            Cần ít nhất 2 người để chơi
          </p>
        )}
      </div>
    </aside>
  );
}
