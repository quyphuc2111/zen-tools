import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface DrawModeProps {
  items: string[];
  onDrawEnd: (winner: string) => void;
  triggerDraw: number;
}

export function DrawMode({ items, onDrawEnd, triggerDraw }: DrawModeProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [drawnItem, setDrawnItem] = useState<string | null>(null);

  useEffect(() => {
    if (triggerDraw > 0 && items.length > 0) {
      setDrawnItem(null);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        const winner = items[Math.floor(Math.random() * items.length)];
        setDrawnItem(winner);
        setTimeout(() => {
          onDrawEnd(winner);
        }, 2000);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerDraw]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] perspective-1000">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* The Box */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-100 transform-style-3d ${isShaking ? 'animate-box-shake' : ''}`}
        >
          {/* Box Body */}
          <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-red-800 to-red-600 rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-red-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)]" />
            <Sparkles className="w-20 h-20 text-yellow-400 opacity-50 absolute" />
            <div className="text-yellow-400 font-black text-3xl uppercase tracking-widest drop-shadow-lg z-10 border-y-2 border-yellow-400/50 py-2">
              LUCKY BOX
            </div>
          </div>
          {/* Box Lid */}
          <div className="absolute top-0 w-full h-1/4 bg-red-700 rounded-t-[50%] border-t-4 border-x-4 border-red-900 transform origin-bottom -rotate-x-12 shadow-inner">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/40 rounded-full blur-sm" />
          </div>
        </div>

        {/* The Drawn Ticket */}
        {drawnItem && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-ticket-pop">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 border-2 border-yellow-500 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 w-48 text-center transform rotate-[-5deg]">
              <div className="border border-dashed border-yellow-600/50 rounded p-4 bg-white/50 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-yellow-800 uppercase tracking-widest mb-2">
                  Chúc mừng
                </div>
                <div className="text-xl font-black text-red-600 break-words">{drawnItem}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
