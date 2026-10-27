// Builds public/dict/*.json from the Wiktionary (kaikki.org) English extract.
// Usage: curl -s https://kaikki.org/dictionary/English/kaikki.org-dictionary-English.jsonl | node scripts/build-dictionary.mjs freq.txt
// freq.txt: "word count" per line, most common first (FrequencyWords en_50k).
// Data: Wiktionary, CC BY-SA 4.0 (via kaikki.org / wiktextract). Credited on the Credits page.
import { createInterface } from 'node:readline';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const LANGS = ['gu', 'hi', 'de', 'pl'];
const MAX = 50000;
const POS = new Set(['noun', 'verb', 'adj', 'adv', 'pron', 'prep', 'conj', 'intj', 'num', 'det', 'particle']);
const SKIP_TAGS = new Set(['obsolete', 'archaic', 'rare', 'dated', 'vulgar', 'offensive', 'derogatory', 'slur', 'misspelling', 'nonstandard']);

const rank = new Map();
readFileSync(process.argv[2], 'utf8').split('\n').forEach((line, i) => {
  const w = line.split(' ')[0];
  if (w && !rank.has(w)) rank.set(w, i);
});

const words = new Map();
let lines = 0;

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
rl.on('line', (line) => {
  lines++;
  if (lines % 200000 === 0) process.stderr.write(`${lines} lines, ${words.size} words\n`);
  let e;
  try {
    e = JSON.parse(line);
  } catch {
    return;
  }
  if (e.lang_code !== 'en' || !POS.has(e.pos)) return;
  const word = e.word;
  if (!/^[a-z][a-z'-]{1,19}$/.test(word)) return;

  const tr = {};
  for (const t of e.translations || []) {
    const code = t.lang_code || t.code;
    if (!LANGS.includes(code) || !t.word || t.word.length > 40) continue;
    (tr[code] ||= []);
    if (tr[code].length < 2 && !tr[code].includes(t.word)) tr[code].push(t.word);
  }
  if (!Object.keys(tr).length) return;

  const sense = (e.senses || []).find((s) => s.glosses?.length && !(s.tags || []).some((t) => SKIP_TAGS.has(t)));
  if (!sense) return;
  const gloss = sense.glosses[sense.glosses.length - 1].slice(0, 140);
  const ipa = (e.sounds || []).find((s) => s.ipa)?.ipa || '';

  const cur = words.get(word);
  if (!cur) {
    words.set(word, { word, pos: e.pos, ipa, gloss, tr });
    return;
  }
  cur.ipa ||= ipa;
  for (const code of Object.keys(tr)) {
    cur.tr[code] = [...new Set([...(cur.tr[code] || []), ...tr[code]])].slice(0, 2);
  }
});

rl.on('close', () => {
  const score = (w) => (rank.has(w.word) ? rank.get(w.word) : 1e6 - Object.keys(w.tr).length * 1000);
  const top = [...words.values()].sort((a, b) => score(a) - score(b)).slice(0, MAX);

  mkdirSync('public/dict', { recursive: true });
  const byLetter = {};
  for (const w of top) {
    (byLetter[w.word[0]] ||= []).push([w.word, w.pos, w.ipa, w.gloss, ...LANGS.map((l) => (w.tr[l] || []).join(', '))]);
  }
  const index = { total: top.length, langs: LANGS, fields: ['word', 'pos', 'ipa', 'gloss', ...LANGS], letters: {} };
  for (const [letter, list] of Object.entries(byLetter).sort()) {
    list.sort((a, b) => a[0].localeCompare(b[0]));
    writeFileSync(`public/dict/${letter}.json`, JSON.stringify(list));
    index.letters[letter] = list.length;
  }
  // Most common 3,000 words for the word games, in frequency order.
  writeFileSync('public/dict/common.json', JSON.stringify(top.slice(0, 3000).map((w) => [w.word, w.pos, w.ipa, w.gloss, ...LANGS.map((l) => (w.tr[l] || []).join(', '))])));
  writeFileSync('public/dict/index.json', JSON.stringify(index));
  const counts = Object.fromEntries(LANGS.map((l) => [l, top.filter((w) => w.tr[l]).length]));
  process.stderr.write(`done: ${lines} lines, ${words.size} candidate words, kept ${top.length}; per language ${JSON.stringify(counts)}\n`);
});
