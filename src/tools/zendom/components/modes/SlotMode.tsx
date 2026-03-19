import { useState, useEffect, useMemo } from 'react';

interface SlotModeProps {
  items: string[];
  onEnd: (winner: string) => void;
  trigger: number;
}

const ITEM_HEIGHT = 80;

export function SlotMode({ items, onEnd, trigger }: SlotModeProps) {
  const [offset, setOffset] = useState(0);

  const strip = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < 20; i++) arr.push(...items);
    return arr;
  }, [items]);

  useEffect(() => {
    if (trigger > 0 && items.length > 1) {
      setOffset(0);
      setTimeout(() => {
        const winnerIndex = Math.floor(Math.random() * items.length);
        const targetIndex = 15 * items.length + winnerIndex;
        setOffset(targetIndex * ITEM_HEIGHT);
        setTimeout(() => {
          onEnd(items[winnerIndex]);
        }, 5000);
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="relative w-full max-w-md mx-auto bg-neutral-900 border-8 border-neutral-800 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,1)] flex flex-col items-center">
      {/* Machine Header */}
      <div className="text-yellow-400 font-black text-3xl tracking-widest mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] border-b-2 border-yellow-400/30 pb-2 w-full text-center">
        JACKPOT
      </div>

      {/* Slot Window */}
      <div className="relative w-full h-[240px] bg-white rounded-xl overflow-hidden shadow-inner border-4 border-neutral-700">
        {/* Center Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/50 -translate-y-1/2 z-20 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <div className="absolute top-1/2 left-0 w-full h-[80px] border-y-4 border-red-500/30 -translate-y-1/2 z-10 bg-red-500/10" />
        {/* Inner Shadow */}
        <div className="absolute inset-0 shadow-[inset_0_30px_30px_rgba(0,0,0,0.8),inset_0_-30px_30px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
        {/* Spinning Strip */}
        <div
          className="absolute top-1/2 left-0 w-full transition-transform duration-[5000ms] ease-[cubic-bezier(0.15,0.9,0.2,1)]"
          style={{ transform: `translateY(calc(-40px - ${offset}px))` }}
        >
          {strip.map((item, i) => (
            <div
              key={i}
              className="h-[80px] flex items-center justify-center text-2xl md:text-3xl font-black text-neutral-800 uppercase tracking-wider border-b border-gray-200 truncate px-4"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Machine Base Lights */}
      <div className="mt-8 w-full flex justify-between px-8">
        <div className="w-5 h-5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" />
        <div
          className="w-5 h-5 rounded-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)] animate-pulse"
          style={{ animationDelay: '0.3s' }}
        />
        <div
          className="w-5 h-5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse"
          style={{ animationDelay: '0.6s' }}
        />
      </div>
    </div>
  );
}
