import { ResultCard } from './ResultCard';
import { BestRunRecord } from '../../core/storage';
import { GameResult } from '../../types/game';

interface ResultScreenProps {
  result: GameResult;
  bestRun: BestRunRecord | null;
  isNewBest: boolean;
  onPlayAgain: () => void;
}

const RESULT_BG_IMAGE = '/zentype/backgrounds/result.jpg';

export function ResultScreen({ result, bestRun, isNewBest, onPlayAgain }: ResultScreenProps) {
  return (
    <div
      className="relative flex h-[100dvh] w-full flex-col overflow-auto p-4"
      style={{
        backgroundColor: '#2d2439',
        backgroundImage: `linear-gradient(rgba(26, 20, 33, 0.18), rgba(26, 20, 33, 0.18)), url(${RESULT_BG_IMAGE})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 min-h-0 flex-1">
        <ResultCard
          result={result}
          bestRun={bestRun}
          isNewBest={isNewBest}
          onPlayAgain={onPlayAgain}
        />
      </div>
    </div>
  );
}
