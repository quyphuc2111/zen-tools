import { DEFAULT_GAME_TIME, LANGUAGE_MODES, DailyChallenge, GameConfig } from '../types/game';
import { hashString, seededIndex, todayKey } from './random';

const DAILY_PREFIX = 'zentype-daily';

export function getDailyChallenge(date = new Date()): DailyChallenge {
  const dateKey = todayKey(date);
  const baseSeed = hashString(`${DAILY_PREFIX}:${dateKey}`);
  const languagePick = seededIndex(baseSeed, LANGUAGE_MODES.length);

  const config: GameConfig = {
    language: LANGUAGE_MODES[languagePick.index],
    time: DEFAULT_GAME_TIME,
    soundEnabled: false,
  };

  const targetScore = Math.round(1100 + config.time * 36);

  return {
    dateKey,
    config,
    targetScore,
    label: `Daily #${dateKey.split('-').join('.')}`,
  };
}
