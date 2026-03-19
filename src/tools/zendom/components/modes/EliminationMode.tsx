import { useState, useEffect } from 'react';
import { Skull } from 'lucide-react';

interface EliminationModeProps {
  items: string[];
  onEnd: (winner: string) => void;
  trigger: number;
}

export function EliminationMode({ items, onEnd, trigger }: EliminationModeProps) {
  const [aliveIndices, setAliveIndices] = useState<number[]>(items.map((_, i) => i));
  const [explodingIndex, setExplodingIndex] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (trigger > 0 && items.length > 1) {
      let currentAlive = items.map((_, i) => i);
      setAliveIndices(currentAlive);
      setExplodingIndex(null);

      const eliminateNext = () => {
        if (currentAlive.length <= 1) {
          setTimeout(() => onEnd(items[currentAlive[0]]), 1000);
          return;
        }
        const killPos = Math.floor(Math.random() * currentAlive.length);
        const killedIdx = currentAlive[killPos];
        setExplodingIndex(killedIdx);
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
          currentAlive = currentAlive.filter((idx) => idx !== killedIdx);
          setAliveIndices(currentAlive);
          setExplodingIndex(null);
          const delay = Math.max(400, 2000 - (items.length - currentAlive.length) * 150);
          setTimeout(eliminateNext, delay);
        }, 600);
      };

      setTimeout(eliminateNext, 1500);
    } else {
      setAliveIndices(items.map((_, i) => i));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, items]);

  return (
    <div
      className={`w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-wrap justify-center gap-4 ${isShaking ? 'animate-arena-shake' : ''}`}
    >
      {items.map((item, i) => {
        const isAlive = aliveIndices.includes(i);
        const isExploding = explodingIndex === i;
        const isDead = !isAlive && !isExploding;
        if (isDead) return null;
        return (
          <div
            key={i}
            className={`relative px-6 py-4 rounded-2xl border-2 font-bold text-lg md:text-xl transition-all duration-300 ${
              isExploding
                ? 'bg-red-600 border-red-400 text-white scale-125 animate-explode z-20 shadow-[0_0_50px_rgba(239,68,68,1)]'
                : 'bg-neutral-800 border-neutral-600 text-white shadow-lg hover:scale-105 z-10'
            }`}
          >
            {isExploding && (
              <Skull className="absolute -top-4 -right-4 text-red-400 w-8 h-8 animate-ping" />
            )}
            {item}
          </div>
        );
      })}
    </div>
  );
}
