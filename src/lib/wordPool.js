import { vocabulary } from '../data/vocabulary.js';
import { loadCommon } from './dictionary.js';

const LEVEL_RANGES = { beginner: [0, 1000], intermediate: [1000, 2000], advanced: [2000, 3000] };

/**
 * Words for the word games in the chosen meaning language and level:
 * { word, meaning, pron, pos, example } - Gujarati uses the hand-written
 * list (with Gujarati-script pronunciation and examples); other languages
 * use the most common dictionary words that have a meaning in that language.
 */
export async function wordPool(meaningLang, level) {
  if (meaningLang === 'gu') {
    const own = vocabulary.filter((w) => w.level === level);
    return own.map((w) => ({ word: w.word, meaning: w.gujarati, pron: w.pronunciation, pos: w.pos, example: w.example }));
  }
  const common = await loadCommon();
  const [from, to] = LEVEL_RANGES[level] || LEVEL_RANGES.beginner;
  return common
    .slice(from, to)
    .filter((e) => e.meanings[meaningLang])
    .map((e) => ({ word: e.word, meaning: e.meanings[meaningLang], pron: e.ipa, pos: e.pos, example: e.gloss }));
}
