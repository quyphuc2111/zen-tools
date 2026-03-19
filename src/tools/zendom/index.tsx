import { useState } from 'react';
import { Sidebar } from './components/shared/Sidebar';
import { WinnerModal } from './components/shared/WinnerModal';
import { WheelMode } from './components/modes/WheelMode';
import { RaceMode } from './components/modes/RaceMode';
import { DrawMode } from './components/modes/DrawMode';
import { SlotMode } from './components/modes/SlotMode';
import { EliminationMode } from './components/modes/EliminationMode';
import { Mode } from './types/game';

const DEFAULT_ITEMS = 'Nguyễn Văn A\nTrần Thị B\nLê Văn C\nPhạm Thị D\nHoàng Văn E';

export function ZenDom() {
  const [itemsText, setItemsText] = useState(DEFAULT_ITEMS);
  const [mode, setMode] = useState<Mode>('wheel');
  const [winner, setWinner] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [raceDuration, setRaceDuration] = useState(10);

  const items = itemsText
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const handleStart = () => {
    if (items.length < 2 || isAnimating) return;
    setIsAnimating(true);
    setWinner(null);
    setTrigger((prev) => prev + 1);
  };

  const handleEnd = (winnerName: string) => {
    setIsAnimating(false);
    setWinner(winnerName);
  };

  return (
    <div className="min-h-screen bg-[#111] text-[#F4F0EA] font-sans flex flex-col md:flex-row selection:bg-[#F4F0EA] selection:text-[#111]">
      <Sidebar
        itemsText={itemsText}
        itemCount={items.length}
        mode={mode}
        isAnimating={isAnimating}
        raceDuration={raceDuration}
        onItemsTextChange={setItemsText}
        onModeChange={setMode}
        onRaceDurationChange={setRaceDuration}
        onStart={handleStart}
      />

      {/* Main Preview Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        {/* Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex-1 overflow-auto p-4 md:p-12 flex items-center justify-center relative z-10">
          {mode === 'wheel' && (
            <WheelMode items={items} onSpinEnd={handleEnd} triggerSpin={trigger} />
          )}
          {mode === 'race' && (
            <RaceMode items={items} onRaceEnd={handleEnd} triggerRace={trigger} duration={raceDuration} />
          )}
          {mode === 'draw' && (
            <DrawMode items={items} onDrawEnd={handleEnd} triggerDraw={trigger} />
          )}
          {mode === 'slot' && <SlotMode items={items} onEnd={handleEnd} trigger={trigger} />}
          {mode === 'elimination' && (
            <EliminationMode items={items} onEnd={handleEnd} trigger={trigger} />
          )}
        </div>
      </main>

      {/* Winner Modal */}
      {winner && <WinnerModal winner={winner} onClose={() => setWinner(null)} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in-95 { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-in { animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .zoom-in-95 { animation-name: zoom-in-95; }
        @keyframes wiggle {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(-15deg); }
          75% { transform: translateX(-50%) rotate(15deg); }
        }
        .animate-wiggle { animation: wiggle 0.1s ease-in-out infinite; }
        @keyframes box-shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          50% { transform: translateX(10px) rotate(5deg); }
          75% { transform: translateX(-10px) rotate(-5deg); }
        }
        .animate-box-shake { animation: box-shake 0.2s ease-in-out infinite; }
        @keyframes ticket-pop {
          0% { transform: translate(-50%, 50%) scale(0.1); opacity: 0; }
          60% { transform: translate(-50%, -80%) scale(1.1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .animate-ticket-pop { animation: ticket-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall { animation: confetti-fall linear forwards infinite; }
        @keyframes arena-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-5px, 5px) rotate(-1deg); }
          40% { transform: translate(5px, -5px) rotate(1deg); }
          60% { transform: translate(-5px, -5px) rotate(-1deg); }
          80% { transform: translate(5px, 5px) rotate(1deg); }
        }
        .animate-arena-shake { animation: arena-shake 0.3s ease-in-out infinite; }
        @keyframes explode {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.5); filter: brightness(2) hue-rotate(-50deg); }
          100% { transform: scale(0); filter: brightness(0); opacity: 0; }
        }
        .animate-explode { animation: explode 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>
    </div>
  );
}

export default ZenDom;
