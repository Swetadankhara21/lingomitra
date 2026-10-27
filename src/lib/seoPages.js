// Single source of every page's SEO text. Used by the app (useSeo) and by
// scripts/seo-pages.mjs, which writes a real HTML file per page at build time
// (title, description, canonical, social tags, JSON-LD and readable text), plus
// sitemap.xml - so search engines see each page without running JavaScript.
// Plain JS only (no JSX / imports): the build script loads this in Node.

export const SITE_URL = 'https://lingomitra.vercel.app';
export const SITE_NAME = 'LingoMitra';
export const SITE_TAG = 'Free English Learning Games';

/** path -> { title, description, h1, text, type ('game' | 'page'), priority } */
export const SEO_PAGES = {
  '/': {
    title: 'LingoMitra – Free English Learning Games in Gujarati, Hindi & more',
    description:
      'Learn English free by playing games: word game, Gujarati to English quiz, grammar game, spelling game, listening game, typing test, daily challenge, songs, stories and a 50,000-word dictionary with Gujarati, Hindi, German and Polish meanings.',
    h1: 'Learn English by playing games',
    text: 'LingoMitra is a free English learning website with 17 games, songs, stories and a 50,000-word dictionary. Meanings in Gujarati, Hindi, German and Polish. No login, works on mobile.',
    type: 'page',
    priority: 1.0,
  },
  '/games': {
    title: 'All English Learning Games – Play Free Online',
    description:
      'Play 17 free English learning games online: word game, word match memory game, word guess (hangman), word rush, missing letter, speak & score, Gujarati to English quiz, grammar, spelling, sentence builder, listening, typing test and daily challenge.',
    h1: 'All English learning games',
    text: 'Pick a game and start learning English. Every game has Beginner, Intermediate and Advanced levels, instant answers with explanations, and your score is saved on your device.',
    type: 'page',
    priority: 0.9,
  },
  '/learn': {
    title: 'Learn English A to Z – Alphabet, Songs, Stories & Dictionary',
    description: 'Learn English from A to Z: the alphabet with sounds, learning songs, short stories, daily phrases, common mistakes and a 50,000-word dictionary.',
    h1: 'Learn English A to Z',
    text: 'Start with the English alphabet, sing along to learning songs, read short stories with Gujarati meanings and look up any word in the A–Z dictionary.',
    type: 'page',
    priority: 0.8,
  },
  '/word-game': {
    title: 'English Word Game – Vocabulary with Gujarati & Hindi Meaning',
    description:
      'Free English word game: learn English vocabulary with Gujarati, Hindi, German and Polish meanings, pronunciation and example sentences, then test yourself in a quiz.',
    h1: 'English Word Game',
    text: 'Learn new English words with flashcards – meaning, pronunciation and an example – and then play the quiz to remember them.',
    type: 'game',
    priority: 0.9,
  },
  '/gujarati-to-english-quiz': {
    title: 'Gujarati to English Quiz Game – Translation Practice',
    description:
      'Gujarati to English translation quiz game: choose the correct English sentence for everyday Gujarati sentences, with instant answers and simple explanations. 50 questions, 3 levels.',
    h1: 'Gujarati to English Quiz',
    text: 'Read a Gujarati sentence and pick the correct English translation. Each answer explains the grammar so you learn while you play.',
    type: 'game',
    priority: 0.9,
  },
  '/grammar-game': {
    title: 'English Grammar Game – Tenses, Articles & Prepositions Quiz',
    description:
      'Free English grammar game: practise tenses, articles (a, an, the), prepositions, subject-verb agreement and sentence formation with clear explanations. 50 questions.',
    h1: 'English Grammar Challenge',
    text: 'Practise English grammar with quick questions on tenses, articles, prepositions and sentence formation, with an explanation for every answer.',
    type: 'game',
    priority: 0.9,
  },
  '/word-of-the-day': {
    title: 'English Word of the Day – Meaning in Gujarati & Hindi',
    description: 'A new English word every day with its Gujarati, Hindi, German and Polish meaning, pronunciation and an example sentence.',
    h1: 'English Word of the Day',
    text: 'Learn one useful English word every day with its meaning in four languages, pronunciation and an example sentence.',
    type: 'page',
    priority: 0.7,
  },
  '/sentence-builder-game': {
    title: 'Sentence Builder Game – Make Correct English Sentences',
    description: 'English sentence builder game: arrange shuffled words into correct English sentences, with the Gujarati meaning of every sentence.',
    h1: 'Sentence Builder Game',
    text: 'Tap the shuffled words in the right order to build an English sentence. Great practice for word order and sentence formation.',
    type: 'game',
    priority: 0.8,
  },
  '/spelling-game': {
    title: 'English Spelling Game – Choose the Correct Spelling',
    description: 'English spelling game: pick the correct spelling of commonly misspelt English words like necessary, receive, February and business.',
    h1: 'English Spelling Game',
    text: 'Choose the correct spelling from look-alike options and master the English words people misspell most.',
    type: 'game',
    priority: 0.8,
  },
  '/listening-game': {
    title: 'English Listening Game – Listening Practice Online',
    description: 'English listening practice game: hear English words and sentences spoken aloud and choose what you heard.',
    h1: 'English Listening Game',
    text: 'Listen to an English word or sentence and choose what you heard – simple listening practice for every level.',
    type: 'game',
    priority: 0.8,
  },
  '/typing-speed-test': {
    title: 'English Typing Speed Test – Check Your WPM',
    description: 'Free English typing speed test game: type short English passages and see your words per minute (WPM) and accuracy.',
    h1: 'English Typing Speed Test',
    text: 'Type a short English passage and see your speed in words per minute and your accuracy.',
    type: 'game',
    priority: 0.8,
  },
  '/word-match-game': {
    title: 'Word Match Memory Game – English Words & Meanings',
    description: 'English word match memory game: flip 3D cards and pair English words with their Gujarati, Hindi, German or Polish meanings.',
    h1: 'Word Match Memory Game',
    text: 'Flip the cards and match each English word with its meaning in as few moves as you can.',
    type: 'game',
    priority: 0.8,
  },
  '/word-guess-game': {
    title: 'Word Guess Game (Hangman) – Guess the English Word',
    description: 'English word guess game like hangman: guess the English word letter by letter from its Gujarati, Hindi, German or Polish meaning, with 6 lives.',
    h1: 'Word Guess Game',
    text: 'Read the meaning and guess the English word one letter at a time before your 6 lives run out.',
    type: 'game',
    priority: 0.8,
  },
  '/word-rush-game': {
    title: 'Word Rush – 60 Second English Vocabulary Game',
    description: 'Fast English vocabulary game: in 60 seconds, decide whether each English word has the right Gujarati, Hindi, German or Polish meaning.',
    h1: 'Word Rush',
    text: 'You have 60 seconds. Is the meaning right or wrong? Answer as many as you can and beat your best score.',
    type: 'game',
    priority: 0.8,
  },
  '/missing-letter-game': {
    title: 'Missing Letter Game – English Spelling Practice',
    description: 'English missing letter game: find the letter missing from each English word, with the meaning as a hint.',
    h1: 'Missing Letter Game',
    text: 'Find the missing letter in each English word – a fun way to practise spelling.',
    type: 'game',
    priority: 0.8,
  },
  '/speak-and-score': {
    title: 'Speak & Score – English Pronunciation Practice Game',
    description: 'Free English pronunciation practice: say English words and sentences into your microphone and get an instant pronunciation score.',
    h1: 'Speak & Score',
    text: 'Say the word or sentence into your microphone and get a pronunciation score from 0 to 100%.',
    type: 'game',
    priority: 0.8,
  },
  '/daily-challenge': {
    title: 'Daily English Challenge – 10 New Questions Every Day',
    description: 'Daily English challenge game: 10 new grammar, translation and spelling questions every day. Earn bonus points and keep your streak.',
    h1: 'Daily English Challenge',
    text: 'Answer 10 new grammar, translation and spelling questions every day to earn bonus points and build your streak.',
    type: 'game',
    priority: 0.8,
  },
  '/progress': {
    title: 'My English Progress – Points, Streak & Badges',
    description: 'Your English learning progress: points, daily streak, accuracy, badges, words learned and scores for every game – saved privately on your device.',
    h1: 'My English Progress',
    text: 'See your points, streak, badges and scores for every game.',
    type: 'page',
    priority: 0.4,
  },
  '/english-tips': {
    title: 'English Tips – Daily Phrases & Common Mistakes',
    description: 'Useful daily English phrases with Gujarati and Hindi meanings, and the most common English mistakes Indian learners make – with corrections.',
    h1: 'English Tips',
    text: 'Learn everyday English phrases and fix the most common mistakes, with Gujarati and Hindi meanings.',
    type: 'page',
    priority: 0.7,
  },
  '/dictionary': {
    title: 'English Dictionary A–Z with Gujarati, Hindi, German & Polish Meaning',
    description: 'Free English dictionary with 50,000 words: meanings in Gujarati, Hindi, German and Polish, pronunciation (IPA) and definitions. Browse A to Z or search.',
    h1: 'English Dictionary A–Z',
    text: 'Search 50,000 English words and see their meaning in Gujarati, Hindi, German and Polish, with pronunciation and a definition.',
    type: 'page',
    priority: 0.9,
  },
  '/alphabet': {
    title: 'English Alphabet A to Z – Letters, Sounds & Words',
    description: 'Learn the English alphabet A to Z with letter sounds, example words, pictures and Gujarati meanings – tap to hear each letter.',
    h1: 'English Alphabet A to Z',
    text: 'Tap any letter from A to Z to hear it and see example words with Gujarati meanings.',
    type: 'page',
    priority: 0.7,
  },
  '/songs': {
    title: 'English Learning Songs & Rhymes for Beginners',
    description: 'Original English learning songs and rhymes – alphabet, days of the week, months, colours, numbers and tenses – with Gujarati meanings and read-along.',
    h1: 'English Learning Songs',
    text: 'Sing along to easy English songs about the alphabet, days, months, colours and numbers.',
    type: 'page',
    priority: 0.7,
  },
  '/stories': {
    title: 'Short English Stories with Gujarati Meaning',
    description: 'Short English stories for beginners and intermediate learners with Gujarati summaries, word meanings, read-aloud and a quick quiz.',
    h1: 'Short English Stories',
    text: 'Read short English stories with Gujarati summaries and word meanings, listen to them and take a quick quiz.',
    type: 'page',
    priority: 0.7,
  },
  '/about': {
    title: 'About LingoMitra',
    description: 'About LingoMitra, free English learning games for Gujarati and Indian learners, created by Shweta Golakiya.',
    h1: 'About LingoMitra',
    text: 'LingoMitra ("language friend") helps learners practise English a few minutes every day through games.',
    type: 'page',
    priority: 0.4,
  },
  '/contact': {
    title: 'Contact LingoMitra',
    description: 'Contact the LingoMitra team with feedback, suggestions or corrections.',
    h1: 'Contact',
    text: 'Send feedback, game ideas or corrections to the creator of LingoMitra.',
    type: 'page',
    priority: 0.3,
  },
  '/privacy-policy': {
    title: 'Privacy Policy – LingoMitra',
    description: 'LingoMitra privacy policy: no account, no personal data collected; progress is stored only in your browser. Advertising and cookies explained.',
    h1: 'Privacy Policy',
    text: 'How LingoMitra handles your data, cookies, advertising and the microphone.',
    type: 'page',
    priority: 0.2,
  },
  '/terms': {
    title: 'Terms of Use – LingoMitra',
    description: 'Terms of use for LingoMitra free English learning games.',
    h1: 'Terms of Use',
    text: 'The terms for using LingoMitra.',
    type: 'page',
    priority: 0.2,
  },
  '/credits': {
    title: 'Credits & Licences – LingoMitra',
    description: 'Credits and licences for the data used on LingoMitra, including Wiktionary dictionary data.',
    h1: 'Credits & Licences',
    text: 'Open data that makes LingoMitra possible, including Wiktionary.',
    type: 'page',
    priority: 0.2,
  },
};

/** SEO for one dictionary letter page, /dictionary/a … /dictionary/z. */
export function dictionaryLetterSeo(letter) {
  const L = letter.toUpperCase();
  return {
    title: `English Words Starting with ${L} – Meaning in Gujarati, Hindi, German & Polish`,
    description: `English words starting with ${L} with their meaning in Gujarati, Hindi, German and Polish, pronunciation (IPA) and definitions. Free English dictionary.`,
    h1: `English words starting with ${L}`,
    text: `Browse English words that start with the letter ${L} and see each word's meaning in Gujarati, Hindi, German and Polish.`,
    type: 'page',
    priority: 0.6,
  };
}

export const NOT_FOUND_SEO = {
  title: 'Page not found – LingoMitra',
  description: 'This page does not exist. Play free English learning games on LingoMitra.',
};
