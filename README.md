# LingoMitra – Free English Learning Games

LingoMitra ("Lingo" = language, "Mitra" = friend) is a free website of English learning games for Gujarati, Hindi and other learners, with meanings in **Gujarati, Hindi, German and Polish**. No login, no backend, no paid APIs – progress is saved in the browser.

Created by **Shweta Golakiya** – [LinkedIn](https://www.linkedin.com/in/shweta-golakiya-64151419b/).

## Features

| # | Feature | Route |
|---|---------|-------|
| 1 | Word Game – flashcards + quiz (100 hand-written words with Gujarati meanings, 3,000 common words for other languages) | `/word-game` |
| 2 | Gujarati to English Quiz – 50 questions with explanations | `/gujarati-to-english-quiz` |
| 3 | Grammar Challenge – 50 questions (tenses, articles, prepositions, sentence formation) | `/grammar-game` |
| 4 | Word of the Day – meaning in 4 languages, pronunciation, example | `/word-of-the-day` |
| 5 | Sentence Builder – arrange shuffled words | `/sentence-builder-game` |
| 6 | Spelling Game – 40 commonly misspelt words | `/spelling-game` |
| 7 | Listening Game – browser text-to-speech | `/listening-game` |
| 8 | Typing Speed Test – WPM and accuracy | `/typing-speed-test` |
| 9 | Daily Challenge – 10 new questions a day, +50 bonus points | `/daily-challenge` |
| 10 | Progress Dashboard – points, streak, accuracy, history | `/progress` |
| 11 | Difficulty levels – Beginner / Intermediate / Advanced on every game | – |
| 12 | English Tips – daily phrases and common mistakes | `/english-tips` |
| + | A–Z Dictionary (up to 50,000 words, Wiktionary data) | `/dictionary` |
| + | Alphabet A–Z, Learning Songs, Short Stories | `/alphabet`, `/songs`, `/stories` |
| + | About, Contact, Privacy Policy, Terms, Credits | |

The interface is available in English, ગુજરાતી, हिन्दी, Deutsch and Polski (language picker in the header).

## Tech

React 18, Vite 5, Tailwind CSS 3, React Router 6. Teal + mint theme (`tailwind.config.js`).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview
```

## Dictionary data (optional rebuild)

`public/dict/*.json` is generated from Wiktionary (kaikki.org extracts, CC BY-SA 4.0). It merges the English entries' translation tables with the Gujarati, Hindi, German and Polish entries' English meanings (read in reverse), ranked by word frequency:

```bash
mkdir -p scripts/tmp && cd scripts/tmp
curl -sL -o en_50k.txt https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/en/en_50k.txt
curl -sL -o wiktionary-en.jsonl https://kaikki.org/dictionary/English/kaikki.org-dictionary-English.jsonl   # ~3.4 GB
for L in Gujarati Hindi German Polish; do curl -sL -o wiktionary-$L.jsonl https://kaikki.org/dictionary/$L/kaikki.org-dictionary-$L.jsonl; done   # ~2.2 GB
cd ../..
npm run dictionary
```

## Deploy on Vercel

**CLI**

```bash
npx vercel login
npx vercel --prod
```

**GitHub import**: push this folder to a GitHub repository, then in Vercel choose *Add New → Project → Import*. Framework preset: **Vite**, build command `npm run build`, output directory `dist`.

`vercel.json` sends every route to `index.html` (single-page app) and caches assets. `middleware.js` returns 403 to known website-copier tools such as HTTrack, and `robots.txt` disallows them. This blocks their default settings only – no public website can fully prevent copying.

## Licence

Code, games, questions, songs and stories © Shweta Golakiya. Dictionary data: Wiktionary contributors, CC BY-SA 4.0 (see `/credits`).
