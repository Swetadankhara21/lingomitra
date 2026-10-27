// Wiktionary-based dictionary, built by scripts/build-dictionary.mjs into public/dict.
// Row: [word, pos, ipa, gloss, gu, hi, de, pl]
export const MEANING_INDEX = { gu: 4, hi: 5, de: 6, pl: 7 };
export const MEANING_LANGS = [
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pl', label: 'Polski' },
];

const cache = new Map();

async function getJson(name) {
  if (!cache.has(name)) {
    cache.set(
      name,
      fetch(`/dict/${name}.json`).then((r) => {
        if (!r.ok) throw new Error(`dict ${name}: ${r.status}`);
        return r.json();
      }),
    );
  }
  try {
    return await cache.get(name);
  } catch (e) {
    cache.delete(name);
    throw e;
  }
}

export const toEntry = (row) => ({
  word: row[0],
  pos: row[1],
  ipa: row[2],
  gloss: row[3],
  meanings: { gu: row[4], hi: row[5], de: row[6], pl: row[7] },
});

export const loadIndex = () => getJson('index');
export const loadLetter = async (letter) => (await getJson(letter)).map(toEntry);
/** The 3,000 most common words, most common first. */
export const loadCommon = async () => (await getJson('common')).map(toEntry);

export async function lookup(word) {
  const w = word.toLowerCase();
  try {
    return (await loadLetter(w[0])).find((e) => e.word === w) || null;
  } catch {
    return null;
  }
}
