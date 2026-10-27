import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Timer, X } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { useWordPool } from '../lib/useWordPool.js';
import { LevelPicker, Loading, PageHeader, ProgressBar, ResultCard } from '../components/ui.jsx';
import MeaningLangPicker from '../components/MeaningLangPicker.jsx';

const SECONDS = 60;

/** A word with either its own meaning or another word's (50 / 50). */
function makeCard(pool) {
  const w = pool[Math.floor(Math.random() * pool.length)];
  const truthful = Math.random() < 0.5;
  let meaning = w.meaning;
  if (!truthful) {
    const others = pool.filter((o) => o.meaning !== w.meaning);
    meaning = others[Math.floor(Math.random() * others.length)].meaning;
  }
  return { word: w.word, meaning, truthful };
}

export default function WordRush() {
  const { t, meaningLang: uiMeaningLang } = useI18n();
  const { level, recordResult } = useProgress();
  const [meaningLang, setMeaningLang] = useState(uiMeaningLang);
  const pool = useWordPool(meaningLang, level);
  const [state, setState] = useState('ready'); // ready | playing | done
  const [left, setLeft] = useState(SECONDS);
  const [card, setCard] = useState(null);
  const [right, setRight] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [flash, setFlash] = useState(null);
  const score = useRef({ right: 0, answered: 0 });

  useSeo('Word Rush – 60 Second English Game', 'Fast English vocabulary game: decide in 60 seconds whether each English word has the right Gujarati, Hindi, German or Polish meaning.');

  useEffect(() => setState('ready'), [meaningLang, level]);

  const start = () => {
    score.current = { right: 0, answered: 0 };
    setRight(0);
    setAnswered(0);
    setLeft(SECONDS);
    setCard(makeCard(pool));
    setState('playing');
  };

  useEffect(() => {
    if (state !== 'playing') return undefined;
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (state === 'playing' && left <= 0) {
      recordResult('rush', score.current.right, Math.max(1, score.current.answered));
      setState('done');
    }
  }, [left, state, recordResult]);

  const answer = useCallback(
    (sayTrue) => {
      if (state !== 'playing' || !card) return;
      const ok = sayTrue === card.truthful;
      score.current = { right: score.current.right + (ok ? 1 : 0), answered: score.current.answered + 1 };
      setRight(score.current.right);
      setAnswered(score.current.answered);
      setFlash(ok ? 'good' : 'bad');
      setTimeout(() => setFlash(null), 250);
      setCard(makeCard(pool));
    },
    [state, card, pool],
  );

  // Arrow keys: ← wrong, → right.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') answer(true);
      if (e.key === 'ArrowLeft') answer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answer]);

  return (
    <>
      <PageHeader gameKey="rush" title={t('game_rush')} desc={t('desc_rush')}>
        <div className="flex flex-col gap-3">
          <LevelPicker />
          <MeaningLangPicker value={meaningLang} onChange={setMeaningLang} />
        </div>
      </PageHeader>
      <div className="container-page mt-8">
        {!pool ? (
          <Loading />
        ) : state === 'done' ? (
          <ResultCard correct={right} total={Math.max(1, answered)} onRestart={start} />
        ) : state === 'ready' ? (
          <div className="card mx-auto max-w-xl p-8 text-center">
            <span className="icon-3d mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br from-orange-400 to-teal" aria-hidden="true">
              <Timer className="relative h-12 w-12" />
            </span>
            <p className="mt-5 text-ink-soft">{t('desc_rush')}</p>
            <button type="button" className="btn-primary mt-6 !min-h-[52px] !px-8 !text-base" onClick={start} disabled={pool.length < 4}>
              {t('rushStart')}
            </button>
          </div>
        ) : (
          <div
            className={`card mx-auto max-w-xl p-6 text-center transition-colors sm:p-8 ${flash === 'good' ? '!bg-green-50' : flash === 'bad' ? '!bg-red-50 animate-shake' : ''}`}
          >
            <div className="flex items-center justify-between text-sm font-bold">
              <span className={`chip ${left <= 10 ? '!bg-red-50 !text-bad !ring-red-200' : ''}`}>
                <Timer className="h-3.5 w-3.5" aria-hidden="true" /> {left}s
              </span>
              <span className="chip">
                {t('score')}: {right} / {answered}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar value={left} max={SECONDS} label={t('timeLeft')} />
            </div>
            <p className="mt-8 text-4xl font-extrabold text-teal-dark sm:text-5xl">{card.word}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-soft">{t('hint')}</p>
            <p className="mt-1 text-2xl font-bold text-ink">{card.meaning}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button type="button" className="btn !min-h-[64px] bg-red-500 !text-lg text-white shadow-[0_5px_0_#b91c1c] active:translate-y-1 active:shadow-none" onClick={() => answer(false)}>
                <X className="h-6 w-6" aria-hidden="true" /> {t('no')}
              </button>
              <button type="button" className="btn !min-h-[64px] bg-good !text-lg text-white shadow-[0_5px_0_#15803d] active:translate-y-1 active:shadow-none" onClick={() => answer(true)}>
                <Check className="h-6 w-6" aria-hidden="true" /> {t('yes')}
              </button>
            </div>
            <p className="mt-4 hidden text-xs text-ink-soft sm:block">← {t('no')} · {t('yes')} →</p>
          </div>
        )}
      </div>
    </>
  );
}
