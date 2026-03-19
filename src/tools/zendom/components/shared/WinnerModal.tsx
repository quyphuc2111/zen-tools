import { Trophy } from 'lucide-react';

interface WinnerModalProps {
  winner: string;
  onClose: () => void;
}

export function WinnerModal({ winner, onClose }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              backgroundColor: ['#FF3B30', '#34C759', '#007AFF', '#FFCC00', '#AF52DE'][
                Math.floor(Math.random() * 5)
              ],
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="bg-neutral-900 p-10 md:p-16 rounded-[3rem] max-w-lg w-full text-center shadow-[0_0_100px_rgba(250,204,21,0.2)] transform animate-in zoom-in-95 duration-500 border border-white/10 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-30 rounded-full animate-pulse" />
          <Trophy className="w-28 h-28 mx-auto mb-6 text-yellow-400 relative z-10 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-6 text-white/60">
          Người Chiến Thắng
        </h2>
        <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 py-4 mb-10 break-words drop-shadow-lg">
          {winner}
        </div>
        <button
          onClick={onClose}
          className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform w-full shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm"
        >
          Tiếp Tục
        </button>
      </div>
    </div>
  );
}
