import {
  BarChart3,
  BookMarked,
  BookOpen,
  Brain,
  CaseSensitive,
  CircleHelp,
  Headphones,
  Keyboard,
  Languages,
  LayoutGrid,
  Lightbulb,
  Mic,
  Music,
  PenLine,
  Puzzle,
  Sparkles,
  SpellCheck,
  TextCursorInput,
  Timer,
  Trophy,
} from 'lucide-react';

// Every game / learning page: route, i18n key (game_<key>, desc_<key>), icon and accent.
export const GAMES = [
  { key: 'vocabulary', path: '/word-game', icon: Brain, accent: 'from-teal to-emerald-400' },
  { key: 'gujarati', path: '/gujarati-to-english-quiz', icon: Languages, accent: 'from-emerald-500 to-teal' },
  { key: 'grammar', path: '/grammar-game', icon: PenLine, accent: 'from-teal-dark to-teal' },
  { key: 'dailyWord', path: '/word-of-the-day', icon: Sparkles, accent: 'from-teal to-cyan-500' },
  { key: 'sentence', path: '/sentence-builder-game', icon: Puzzle, accent: 'from-cyan-600 to-teal' },
  { key: 'spelling', path: '/spelling-game', icon: SpellCheck, accent: 'from-teal to-green-500' },
  { key: 'listening', path: '/listening-game', icon: Headphones, accent: 'from-emerald-600 to-cyan-500' },
  { key: 'typing', path: '/typing-speed-test', icon: Keyboard, accent: 'from-teal-dark to-emerald-500' },
  { key: 'match', path: '/word-match-game', icon: LayoutGrid, accent: 'from-cyan-500 to-teal-dark' },
  { key: 'guess', path: '/word-guess-game', icon: CircleHelp, accent: 'from-teal to-emerald-500' },
  { key: 'rush', path: '/word-rush-game', icon: Timer, accent: 'from-orange-400 to-teal' },
  { key: 'missing', path: '/missing-letter-game', icon: TextCursorInput, accent: 'from-emerald-500 to-cyan-600' },
  { key: 'speak', path: '/speak-and-score', icon: Mic, accent: 'from-rose-400 to-teal' },
  { key: 'daily', path: '/daily-challenge', icon: Trophy, accent: 'from-amber-500 to-teal' },
  { key: 'dashboard', path: '/progress', icon: BarChart3, accent: 'from-teal to-teal-dark' },
  { key: 'tips', path: '/english-tips', icon: Lightbulb, accent: 'from-green-500 to-teal' },
  { key: 'dictionary', path: '/dictionary', icon: BookOpen, accent: 'from-teal-dark to-cyan-600' },
];

export const LEARN = [
  { key: 'alphabet', path: '/alphabet', icon: CaseSensitive, accent: 'from-teal to-emerald-400' },
  { key: 'songs', path: '/songs', icon: Music, accent: 'from-cyan-500 to-teal' },
  { key: 'stories', path: '/stories', icon: BookMarked, accent: 'from-emerald-500 to-teal-dark' },
];

export const gameByKey = (key) => [...GAMES, ...LEARN].find((g) => g.key === key);
