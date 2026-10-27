import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Layers, Target } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { shuffle } from '../lib/utils.js';
import { wordPool } from '../lib/wordPool.js';
import { LevelPicker, Loading, PageHeader, SpeakButton } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';
import MeaningLangPicker from '../components/MeaningLangPicker.jsx';

function Flashcards({ words }) {
  const { t } = useI18n();
  const { learnedWords, markWordLearned } = useProgress();
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const w = words[i];

  useEffect(() => {
    setI(0);
    setShow(false);
  }, [words]);

  if (!w) return null;
  const go = (d) => {
    setI((i + d + words.length) % words.length);
    setShow(false);
  };
  const known = learnedWords.includes(w.word);

  return (
    <div className="card mx-auto max-w-xl p-6 text-center sm:p-10">
      <p className="text-sm font-bold text-ink-soft">
        {i + 1} / {words.length}
      </p>
      <div className="mt-4 animate-pop" key={w.word}>
        <span className="chip">{w.pos}</span>
        <h2 className="mt-4 text-4xl font-extrabold text-teal-dark sm:text-5xl">{w.word}</h2>
        {w.pron && <p className="mt-2 text-lg text-ink-soft">{w.pron}</p>}
        <div className="mt-4 flex justify-center">
          <SpeakButton text={w.word} label={t('listen')} />
        </div>
        {show ? (
          <div className="mt-6 rounded-2xl bg-mint-light p-5 ring-1 ring-mint animate-fade-up">
            <p className="text-2xl font-extrabold text-ink">{w.meaning}</p>
            {w.example && <p className="mt-2 text-ink-soft">“{w.example}”</p>}
          </div>
        ) : (
          <button type="button" className="btn-primary mt-6" onClick={() => setShow(true)}>
            {t('showMeaning')}
          </button>
        )}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" className="btn-soft" onClick={() => go(-1)}>
          ← {t('back')}
        </button>
        <button
          type="button"
          className={known ? 'btn bg-green-50 text-good ring-1 ring-green-200' : 'btn-soft'}
          onClick={() => markWordLearned(w.word)}
          disabled={known}
        >
          {known && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
          {known ? t('learned') : t('markLearned')}
        </button>
        <button type="button" className="btn-primary" onClick={() => go(1)}>
          {t('next')} →
        </button>
      </div>
    </div>
  );
}

export default function WordGame() {
  const { t, meaningLang: uiMeaningLang } = useI18n();
  const { level } = useProgress();
  const [meaningLang, setMeaningLang] = useState(uiMeaningLang);
  const [pool, setPool] = useState(null);
  const [mode, setMode] = useState('learn');
  const [round, setRound] = useState(0);

  useSeo();

  useEffect(() => {
    setPool(null);
    wordPool(meaningLang, level)
      .then(setPool)
      .catch(() => setPool([]));
  }, [meaningLang, level]);

  const cards = useMemo(() => (pool ? shuffle(pool).slice(0, 20) : []), [pool, round]);

  const questions = useMemo(() => {
    if (!pool || pool.length < 4) return [];
    return shuffle(pool)
      .slice(0, 10)
      .map((w) => {
        const others = shuffle(pool.filter((o) => o.meaning !== w.meaning)).slice(0, 3);
        return {
          sub: t('meaningIn') + '…',
          prompt: w.word,
          speak: w.word,
          options: [w.meaning, ...others.map((o) => o.meaning)],
          answer: 0,
          explanation: w.example ? `${w.word} – ${w.example}` : '',
        };
      });
  }, [pool, round, t]);

  const restart = useCallback(() => setRound((r) => r + 1), []);

  return (
    <>
      <PageHeader gameKey="vocabulary" title={t('game_vocabulary')} desc={t('desc_vocabulary')}>
        <div className="flex flex-col gap-3">
          <LevelPicker />
          <MeaningLangPicker value={meaningLang} onChange={setMeaningLang} />
        </div>
      </PageHeader>
      <div className="container-page mt-8">
        <div className="mx-auto mb-6 flex max-w-xs rounded-2xl bg-white p-1 shadow-card" role="tablist">
          {[
            ['learn', t('nav_learn'), Layers],
            ['quiz', t('play'), Target],
          ].map(([m, label, Icon]) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${mode === m ? 'bg-teal text-white shadow-lift' : 'text-ink hover:bg-mint-light'}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        {!pool ? <Loading /> : mode === 'learn' ? <Flashcards words={cards} /> : <QuizEngine questions={questions} gameId="vocabulary" onRestart={restart} />}
      </div>
    </>
  );
}
