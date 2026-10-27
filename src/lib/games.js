// Every game / learning page: route, i18n key (game_<key>, desc_<key>), emoji and accent.
export const GAMES = [
  { key: 'vocabulary', path: '/word-game', emoji: '🧠', accent: 'from-teal to-emerald-400' },
  { key: 'gujarati', path: '/gujarati-to-english-quiz', emoji: '🔁', accent: 'from-emerald-500 to-teal' },
  { key: 'grammar', path: '/grammar-game', emoji: '✍️', accent: 'from-teal-dark to-teal' },
  { key: 'dailyWord', path: '/word-of-the-day', emoji: '🌟', accent: 'from-teal to-cyan-500' },
  { key: 'sentence', path: '/sentence-builder-game', emoji: '🧩', accent: 'from-cyan-600 to-teal' },
  { key: 'spelling', path: '/spelling-game', emoji: '🔤', accent: 'from-teal to-green-500' },
  { key: 'listening', path: '/listening-game', emoji: '🎧', accent: 'from-emerald-600 to-cyan-500' },
  { key: 'typing', path: '/typing-speed-test', emoji: '⌨️', accent: 'from-teal-dark to-emerald-500' },
  { key: 'daily', path: '/daily-challenge', emoji: '🏆', accent: 'from-amber-400 to-teal' },
  { key: 'dashboard', path: '/progress', emoji: '📊', accent: 'from-teal to-teal-dark' },
  { key: 'tips', path: '/english-tips', emoji: '💡', accent: 'from-green-500 to-teal' },
  { key: 'dictionary', path: '/dictionary', emoji: '📖', accent: 'from-teal-dark to-cyan-600' },
];

export const LEARN = [
  { key: 'alphabet', path: '/alphabet', emoji: '🔠', accent: 'from-teal to-emerald-400' },
  { key: 'songs', path: '/songs', emoji: '🎵', accent: 'from-cyan-500 to-teal' },
  { key: 'stories', path: '/stories', emoji: '📚', accent: 'from-emerald-500 to-teal-dark' },
];

export const gameByKey = (key) => [...GAMES, ...LEARN].find((g) => g.key === key);
