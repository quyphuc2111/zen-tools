import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { estimateSessionTime } from './data/snippets';
import { AnimatedBackground } from './components/effects/AnimatedBackground';
import { GameScreen } from './components/game/GameScreen';
import { HomeScreen } from './components/home/HomeScreen';
import { ResultScreen } from './components/result/ResultScreen';
import {
  BestRunRecord,
  RecentRunRecord,
  loadBestRun,
  loadRecentRuns,
  persistBestRun,
  persistRecentRun,
} from './core/storage';
import { CHALLENGE_TARGET, GameConfig, GameResult, ScreenView } from './types/game';

const DEFAULT_CONFIG: GameConfig = {
  language: 'typescript',
  time: estimateSessionTime('typescript', CHALLENGE_TARGET),
  soundEnabled: false,
};

export function ZenType() {
  const [view, setView] = useState<ScreenView>('home');
  const [runToken, setRunToken] = useState(0);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  const [bestRun, setBestRun] = useState<BestRunRecord | null>(() => loadBestRun());
  const [recentRuns, setRecentRuns] = useState<RecentRunRecord[]>(() => loadRecentRuns());

  const startWithConfig = (nextConfig: GameConfig) => {
    const normalizedConfig: GameConfig = {
      ...nextConfig,
      time: estimateSessionTime(nextConfig.language, CHALLENGE_TARGET),
    };

    setConfig(normalizedConfig);
    setRunToken((value) => value + 1);
    setResult(null);
    setIsNewBest(false);
    setView('game');
  };

  const handleFinished = (sessionResult: GameResult) => {
    setResult(sessionResult);
    setRecentRuns(persistRecentRun(sessionResult));

    const shouldStoreBest = !bestRun || sessionResult.score > bestRun.score;
    if (shouldStoreBest) {
      const newBest = persistBestRun(sessionResult);
      setBestRun(newBest);
      setIsNewBest(true);
    } else {
      setIsNewBest(false);
    }

    setView('result');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--zt-bg)] font-sans">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="relative"
          >
            <HomeScreen
              config={config}
              bestRun={bestRun}
              recentRuns={recentRuns}
              onConfigChange={(patch) =>
                setConfig((prev) => {
                  const language = patch.language ?? prev.language;
                  return {
                    ...prev,
                    ...patch,
                    time: estimateSessionTime(language, CHALLENGE_TARGET),
                  };
                })
              }
              onStart={() => startWithConfig(config)}
            />
          </motion.div>
        )}

        {view === 'game' && (
          <motion.div
            key={`game-screen-${runToken}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <GameScreen config={config} onFinished={handleFinished} onChangeMode={() => setView('home')} />
          </motion.div>
        )}

        {view === 'result' && result && (
          <motion.div
            key="result-screen"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
            className="relative"
          >
            <ResultScreen
              result={result}
              bestRun={bestRun}
              isNewBest={isNewBest}
              onPlayAgain={() => {
                setIsNewBest(false);
                setView('home');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ZenType;
