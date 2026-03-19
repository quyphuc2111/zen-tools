import { useState, useEffect } from 'react';

interface WheelModeProps {
  items: string[];
  onSpinEnd: (winner: string) => void;
  triggerSpin: number;
}

const COLORS = ['#FF3B30', '#34C759', '#007AFF', '#FFCC00', '#AF52DE', '#5AC8FA', '#FF2D55', '#FF9500'];

export function WheelMode({ items, onSpinEnd, triggerSpin }: WheelModeProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (triggerSpin > 0 && items.length > 1) {
      setIsSpinning(true);
      const spinDegrees = 360 * 8;
      const winnerIndex = Math.floor(Math.random() * items.length);
      const sliceAngle = 360 / items.length;
      const currentMod = rotation % 360;
      const targetMod = 360 - (winnerIndex + 0.5) * sliceAngle;
      const newRotation = rotation + spinDegrees + (targetMod - currentMod);
      setRotation(newRotation);
      setTimeout(() => {
        setIsSpinning(false);
        onSpinEnd(items[winnerIndex]);
      }, 6000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSpin]);

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  let cumulativePercent = 0;

  return (
    <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] mx-auto drop-shadow-2xl flex items-center justify-center">
      {/* Outer Rim */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 via-gray-900 to-black shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_5px_15px_rgba(255,255,255,0.2)]" />

      {/* Pegs */}
      {items.map((_, i) => {
        const angle = (i * 360) / items.length;
        return (
          <div
            key={i}
            className="absolute w-3 h-3 bg-yellow-300 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.8)] z-20"
            style={{
              transform: `rotate(${angle}deg) translateY(-${typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 210}px)`,
            }}
          />
        );
      })}

      {/* Pointer */}
      <div
        className={`absolute -top-6 left-1/2 -translate-x-1/2 z-30 w-10 h-14 origin-top transition-transform ${isSpinning ? 'animate-wiggle' : ''}`}
      >
        <div
          className="w-full h-full bg-gradient-to-b from-red-500 to-red-700"
          style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-200 rounded-full shadow-inner" />
      </div>

      {/* The Wheel */}
      <div
        className="absolute inset-3 rounded-full overflow-hidden shadow-inner transition-transform duration-[6000ms] ease-[cubic-bezier(0.15,0.9,0.2,1)] bg-white"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
          {items.map((item, i) => {
            const percent = 1 / items.length;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;
            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(' ');
            const textAngle = (cumulativePercent - percent / 2) * 360;
            return (
              <g key={i}>
                <path
                  d={pathData}
                  fill={COLORS[i % COLORS.length]}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="0.005"
                />
                <text
                  x="0.55"
                  y="0"
                  fill="white"
                  fontSize="0.09"
                  fontWeight="800"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${textAngle})`}
                  className="drop-shadow-md"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {item.length > 15 ? item.substring(0, 13) + '...' : item}
                </text>
              </g>
            );
          })}
        </svg>
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.3)_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* Center Hub */}
      <div className="absolute z-20 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.8)] flex items-center justify-center border-4 border-gray-800">
        <div className="w-6 h-6 bg-gray-800 rounded-full shadow-inner" />
      </div>
    </div>
  );
}
