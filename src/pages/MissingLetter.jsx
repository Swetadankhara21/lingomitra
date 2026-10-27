import { useCallback, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { shuffle } from '../lib/utils.js';
import { useWordPool } from '../lib/useWordPool.js';
import { LevelPicker, Loading, PageHeader } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';
import MeaningLangPicker from '../components/MeaningLangPicker.jsx';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

/** "apple" → { masked: "app_e", answer: "l" } - hides one letter (not the first). */
function maskWord(word) {
  const pos = 1 + Math.floor(Math.random() * (word.length - 1));
  return { masked: word.slice(0, pos) + '_' + word.slice(pos + 1), letter: word[pos] };
}

export default function MissingLetter() {
  const { t, meaningLang: uiMeaningLang } = useI18n();
  const { level } = useProgress();
  const [meaningLang, setMeaningLang] = useState(uiMeaningLang);
  const pool = useWordPool(meaningLang, level);
  const [round, setRound] = useState(0);

  useSeo('Missing Letter Spelling Game', 'English missing letter game: find the letter missing from each English word, with Gujarati, Hindi, German or Polish meanings as hints.');

  const questions = useMemo(() => {
    if (!pool) return [];
    return shuffle(pool.filter((w) => /^[a-z]{4,12}$/.test(w.word)))
      .slice(0, 10)
      .map((w) => {
        const { masked, letter } = maskWord(w.word);
        const wrong = shuffle(LETTERS.replace(letter, '').split('')).slice(0, 3);
        return {
          sub: `${t('missingPrompt')} · ${w.meaning}`,
          prompt: masked.toUpperCase().split('').join(' '),
          options: [letter, ...wrong].map((l) => l.toUpperCase()),
          answer: 0,
          explanation: w.word,
          speak: w.word,
        };
      });
  }, [pool, round, t]);

  const restart = useCallback(() => setRound((r) => r + 1), []);

  return (
    <>
      <PageHeader gameKey="missing" title={t('game_missing')} desc={t('desc_missing')}>
        <div className="flex flex-col gap-3">
          <LevelPicker />
          <MeaningLangPicker value={meaningLang} onChange={setMeaningLang} />
        </div>
      </PageHeader>
      <div className="container-page mt-8">
        {!pool ? <Loading /> : <QuizEngine questions={questions} gameId="missing" onRestart={restart} promptClass="text-3xl tracking-widest sm:text-4xl" />}
      </div>
    </>
  );
}
