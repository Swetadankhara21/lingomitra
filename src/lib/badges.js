import { Award, CalendarDays, Compass, Crown, Flame, Footprints, Gem, Keyboard, Mic, Rocket, Star } from 'lucide-react';

/**
 * Achievements worked out from the saved progress (nothing extra stored).
 * Each: { key, icon, done, value, goal } - i18n: badge_<key>, badgeDesc_<key>.
 */
export function badgesFor(p) {
  const games = Object.entries(p.games || {}).filter(([key]) => key !== 'dailyBonus');
  const played = games.filter(([, g]) => g.played > 0);
  const best = Math.max(0, ...games.map(([, g]) => g.best || 0));
  const speak = p.games?.speak;

  const list = [
    ['first', Footprints, played.length, 1],
    ['explorer', Compass, played.length, 8],
    ['perfect', Gem, best, 100],
    ['streak3', Flame, p.streak, 3],
    ['streak7', CalendarDays, p.streak, 7],
    ['words25', Star, p.learnedWords.length, 25],
    ['points500', Rocket, p.points, 500],
    ['points2000', Crown, p.points, 2000],
    ['typist', Keyboard, p.bestWpm, 30],
    ['daily7', Award, Object.keys(p.dailyDone || {}).length, 7],
    ['speaker', Mic, speak?.best || 0, 80],
  ];

  return list.map(([key, icon, value, goal]) => ({ key, icon, value: Math.min(value || 0, goal), goal, done: (value || 0) >= goal }));
}
