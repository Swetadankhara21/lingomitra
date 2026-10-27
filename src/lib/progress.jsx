import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { todayKey } from './utils.js';

const KEY = 'lingomitra-progress-v1';

const EMPTY = {
  points: 0,
  games: {},
  history: [],
  learnedWords: [],
  dailyDone: {},
  streak: 0,
  lastActive: null,
  level: 'beginner',
  bestWpm: 0,
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage blocked - progress just won't persist
  }
}

/** Streak goes up once per day you play, resets after a missed day. */
function withStreak(state) {
  const today = todayKey();
  if (state.lastActive === today) return state;
  const yesterday = todayKey(new Date(Date.now() - 86400000));
  return { ...state, streak: state.lastActive === yesterday ? state.streak + 1 : 1, lastActive: today };
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => save(state), [state]);

  /** One finished round of a game: correct out of total; 10 points per correct answer plus any bonus. */
  const recordResult = useCallback((gameId, correct, total, bonus = 0) => {
    setState((s) => {
      const g = s.games[gameId] || { played: 0, correct: 0, total: 0, best: 0 };
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
      return withStreak({
        ...s,
        points: s.points + correct * 10 + bonus,
        games: {
          ...s.games,
          [gameId]: { played: g.played + 1, correct: g.correct + correct, total: g.total + total, best: Math.max(g.best, pct) },
        },
        history: [{ game: gameId, correct, total, date: new Date().toISOString() }, ...s.history].slice(0, 30),
      });
    });
  }, []);

  const markWordLearned = useCallback((word) => {
    setState((s) => (s.learnedWords.includes(word) ? s : { ...s, learnedWords: [...s.learnedWords, word] }));
  }, []);

  const completeDaily = useCallback((correct, total) => {
    setState((s) => ({ ...s, dailyDone: { ...s.dailyDone, [todayKey()]: { correct, total } } }));
  }, []);

  const setBestWpm = useCallback((wpm) => {
    setState((s) => (wpm > s.bestWpm ? { ...s, bestWpm: wpm } : s));
  }, []);

  const setLevel = useCallback((level) => setState((s) => ({ ...s, level })), []);

  const reset = useCallback(() => setState((s) => ({ ...EMPTY, level: s.level })), []);

  const value = useMemo(
    () => ({ ...state, recordResult, markWordLearned, completeDaily, setBestWpm, setLevel, reset }),
    [state, recordResult, markWordLearned, completeDaily, setBestWpm, setLevel, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  return useContext(ProgressContext);
}
