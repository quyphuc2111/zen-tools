export const LANGUAGE_MODES = [
  'javascript',
  'typescript',
  'python',
  'sql',
  'json',
  'terminal',
  'react',
  'nextjs',
  'vue',
  'angular',
  'svelte',
  'node',
  'express',
  'nestjs',
  'go',
  'rust',
  'java',
  'csharp',
  'php',
] as const;
export const DEFAULT_GAME_TIME = 30;
export const CHALLENGE_TARGET = 5;

export type LanguageMode = (typeof LANGUAGE_MODES)[number];
export type DifficultyMode = 'easy' | 'medium' | 'hard';
export type ThemeMode = 'frontend' | 'backend' | 'bugfix' | 'devops' | 'chaos';

export type ScreenView = 'home' | 'game' | 'result';

export interface GameConfig {
  language: LanguageMode;
  time: number;
  soundEnabled: boolean;
}

export interface Snippet {
  id: string;
  title: string;
  language: LanguageMode;
  difficulty: DifficultyMode;
  themes: ThemeMode[];
  code: string;
}

export interface TypedChar {
  input: string;
  expected: string;
  correct: boolean;
}

export interface SnippetRun {
  snippetId: string;
  title: string;
  entries: TypedChar[];
  correctChars: number;
  mistakes: number;
  challengeTimeLeft: number;
  challengeTimeSpent: number;
}

export interface LiveStats {
  wpm: number;
  accuracy: number;
  totalCorrect: number;
  totalMistakes: number;
  totalTyped: number;
  snippetsCompleted: number;
  currentStreak: number;
  bestStreak: number;
  totalTypingTime: number;
  totalChallengeTimeLeft: number;
  score: number;
}

export interface GameResult {
  config: GameConfig;
  finalWpm: number;
  finalAccuracy: number;
  totalCorrect: number;
  totalMistakes: number;
  snippetsCompleted: number;
  bestStreak: number;
  totalTypingTime: number;
  totalChallengeTimeLeft: number;
  score: number;
  rank: RankTitle;
  achievements: string[];
}

export interface DailyChallenge {
  dateKey: string;
  config: GameConfig;
  targetScore: number;
  label: string;
}

export interface RankInfo {
  title: RankTitle;
  minScore: number;
  colorClass: string;
  glowClass: string;
}

export type RankTitle =
  | 'Keyboard Intern'
  | 'Semicolon Warrior'
  | 'Syntax Runner'
  | 'Refactor Ninja'
  | 'Production Wizard';
