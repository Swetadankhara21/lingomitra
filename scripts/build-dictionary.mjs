// Builds public/dict/*.json from Wiktionary (kaikki.org / wiktextract, CC BY-SA 4.0).
//
// Two directions are merged:
//  - forward: English entries' translation tables (English word -> gu / hi / de / pl)
//  - reverse: Gujarati / Hindi / German / Polish entries whose English gloss is a
//    single English word ("नगर: town, city" adds नगर to "town" and "city")
// Pronunciation (IPA), part of speech and the English definition come from the
// English entries. Words are ranked by frequency (FrequencyWords en_50k).
//
// Usage (files in scripts/tmp, see README):
//   node scripts/build-dictionary.mjs
import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';

const TMP = 'scripts/tmp';
const LANGS = ['gu', 'hi', 'de', 'pl'];
const SOURCES = { gu: 'Gujarati', hi: 'Hindi', de: 'German', pl: 'Polish' };
const MAX = 100000;
const PER_LANG = 3;
const WORD = /^[a-z][a-z'-]{1,19}$/;
const POS = new Set(['noun', 'verb', 'adj', 'adv', 'pron', 'prep', 'conj', 'intj', 'num', 'det', 'particle']);
const SKIP_TAGS = new Set(['obsolete', 'archaic', 'rare', 'dated', 'vulgar', 'offensive', 'derogatory', 'slur', 'misspelling', 'nonstandard', 'form-of', 'alt-of', 'abbreviation']);

const log = (...a) => process.stderr.write(a.join(' ') + '\n');

const rank = new Map();
readFileSync(`${TMP}/en_50k.txt`, 'utf8').split('\n').forEach((line, i) => {
  const w = line.split(' ')[0];
  if (w && !rank.has(w)) rank.set(w, i);
});

function lines(file, onEntry) {
  return new Promise((resolve) => {
    let n = 0;
    const rl = createInterface({ input: createReadStream(file), crlfDelay: Infinity });
    rl.on('line', (line) => {
      if (++n % 250000 === 0) log(`  ${file}: ${n} lines`);
      try {
        onEntry(JSON.parse(line));
      } catch {
        // skip broken line
      }
    });
    rl.on('close', () => resolve(n));
  });
}

const usable = (s) => s.glosses?.length && !s.form_of && !s.alt_of && !(s.tags || []).some((t) => SKIP_TAGS.has(t));

const add = (entry, code, foreign) => {
  if (!foreign || foreign.length > 40) return;
  const list = (entry.tr[code] ||= []);
  if (list.length < PER_LANG && !list.includes(foreign)) list.push(foreign);
};

// 1. English entries: definition, IPA, part of speech, forward translations.
const words = new Map();
log('English…');
await lines(`${TMP}/wiktionary-en.jsonl`, (e) => {
  if (e.lang_code !== 'en' || !POS.has(e.pos) || !WORD.test(e.word)) return;
  const sense = (e.senses || []).find(usable);
  let w = words.get(e.word);
  if (!w) {
    if (!sense) return;
    w = { word: e.word, pos: e.pos, ipa: '', gloss: sense.glosses[sense.glosses.length - 1].slice(0, 140), tr: {} };
    words.set(e.word, w);
  }
  w.ipa ||= (e.sounds || []).find((s) => s.ipa)?.ipa || '';
  for (const t of e.translations || []) {
    const code = t.lang_code || t.code;
    if (LANGS.includes(code)) add(w, code, t.word);
  }
});
log(`English words: ${words.size}`);

// 2. Reverse: foreign entries whose gloss is one English word.
const glossWords = (gloss) =>
  gloss
    .replace(/\([^)]*\)/g, ' ')
    .split(/[;,/]| or /)
    .map((p) => p.trim().toLowerCase().replace(/^(to|a|an|the) /, '').replace(/[.!?]$/, ''))
    .filter((p) => WORD.test(p));

for (const code of LANGS) {
  const file = `${TMP}/wiktionary-${SOURCES[code]}.jsonl`;
  if (!existsSync(file)) {
    log(`skip ${code}: ${file} missing`);
    continue;
  }
  log(`${SOURCES[code]}…`);
  let added = 0;
  await lines(file, (e) => {
    if (e.lang_code !== code || !POS.has(e.pos) || !e.word || /\s{2,}/.test(e.word)) return;
    for (const s of (e.senses || []).filter(usable).slice(0, 3)) {
      for (const en of glossWords(s.glosses[s.glosses.length - 1])) {
        const w = words.get(en);
        if (!w) continue;
        const before = (w.tr[code] || []).length;
        add(w, code, e.word);
        if ((w.tr[code] || []).length > before) added++;
      }
    }
  });
  log(`  ${code}: +${added} meanings`);
}

// 3. Keep words that have at least one meaning, most common first.
const withMeaning = [...words.values()].filter((w) => Object.keys(w.tr).length);
const score = (w) => (rank.has(w.word) ? rank.get(w.word) : 1e6 - Object.keys(w.tr).length * 1000 - Math.min(w.word.length, 20));
const top = withMeaning.sort((a, b) => score(a) - score(b)).slice(0, MAX);

const row = (w) => [w.word, w.pos, w.ipa, w.gloss, ...LANGS.map((l) => (w.tr[l] || []).join(', '))];

mkdirSync('public/dict', { recursive: true });
const byLetter = {};
for (const w of top) (byLetter[w.word[0]] ||= []).push(row(w));
const index = { total: top.length, langs: LANGS, fields: ['word', 'pos', 'ipa', 'gloss', ...LANGS], letters: {} };
for (const [letter, list] of Object.entries(byLetter).sort()) {
  list.sort((a, b) => a[0].localeCompare(b[0]));
  writeFileSync(`public/dict/${letter}.json`, JSON.stringify(list));
  index.letters[letter] = list.length;
}
// The 3,000 most common words for the word games, in frequency order.
writeFileSync('public/dict/common.json', JSON.stringify(top.slice(0, 3000).map(row)));
writeFileSync('public/dict/index.json', JSON.stringify(index));

const counts = Object.fromEntries(LANGS.map((l) => [l, top.filter((w) => w.tr[l]).length]));
log(`done: ${withMeaning.length} words with a meaning, kept ${top.length}; per language ${JSON.stringify(counts)}`);
