import { useZenTypeGame } from '../../hooks/useZenTypeGame';
import { GameConfig, GameResult } from '../../types/game';
import { CodePanel } from './CodePanel';

interface GameScreenProps {
  config: GameConfig;
  onFinished: (result: GameResult) => void;
  onChangeMode: () => void;
}

const GAME_BG_IMAGE = '/zentype/backgrounds/game.jpg';

export function GameScreen({ config, onFinished, onChangeMode }: GameScreenProps) {
  const {
    started,
    challengeTimeLeft,
    challengeTimeTotal,
    totalChallengeTimeLeft,
    currentSnippet,
    currentEntries,
    completedRuns,
    hitFeedback,
    shakeToken,
    pulseToken,
    liveStats,
    challengeTarget,
  } = useZenTypeGame({ config, onFinished });

  return (
    <div
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden p-4 md:p-5"
      style={{
        backgroundColor: '#25221b',
        backgroundImage: `linear-gradient(rgba(21, 18, 11, 0.2), rgba(21, 18, 11, 0.2)), url(${GAME_BG_IMAGE})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 flex min-h-0 flex-1 w-full">
        <CodePanel
          snippet={currentSnippet}
          entries={currentEntries}
          hitFeedback={hitFeedback}
          shakeToken={shakeToken}
          pulseToken={pulseToken}
          started={started}
          challengeTimeLeft={challengeTimeLeft}
          challengeTimeTotal={challengeTimeTotal}
          totalChallengeTimeLeft={totalChallengeTimeLeft}
          completedChallenges={completedRuns.length}
          challengeTarget={challengeTarget}
          stats={liveStats}
          onExit={onChangeMode}
        />
      </div>
    </div>
  );
}
