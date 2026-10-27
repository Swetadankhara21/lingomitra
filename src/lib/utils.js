export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Deterministic 0..1 random from a string seed, so "today's" picks are the same all day. */
export function seededRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle(list, seed) {
  const rand = seededRandom(seed);
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dayNumber(date = new Date()) {
  return Math.floor(new Date(todayKey(date)).getTime() / 86400000);
}

/** Items of the chosen level; tops up from other levels when there are too few. */
export function byLevel(items, level, min = 10) {
  if (!level || level === 'all') return items;
  const picked = items.filter((x) => x.level === level);
  if (picked.length >= min) return picked;
  return [...picked, ...items.filter((x) => x.level !== level)].slice(0, Math.max(min, picked.length));
}

export function percent(part, total) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}
