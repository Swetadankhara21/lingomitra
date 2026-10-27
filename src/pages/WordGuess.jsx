import { useEffect, useMemo, useState } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { shuffle } from '../lib/utils.js';
import { useWordPool } from '../lib/useWordPool.js';
import { LevelPicker, Loading, PageHeader, ProgressBar, ResultCard, SpeakButton, Verdict } from '../components/ui.jsx';
import MeaningLangPicker from '../components/MeaningLangPicker.jsx';

const ROUND = 5;
const LIVES = 6;
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function WordGuess() {
  const { t, meaningLang: uiMeaningLang } = useI18n();
  const { level, recordResult } = useProgress();
  const [meaningLang, setMeaningLang] = useState(uiMeaningLang);
  const pool = useWordPool(meaningLang, level);
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [tried, setTried] = useState([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useSeo('Word Guess Game (Hangman)', 'English word guess game: guess the English word letter by letter from its Gujarati, Hindi, German or Polish meaning, with 6 lives.');

  const words = useMemo(() => (pool ? shuffle(pool.filter((w) => /^[a-z]{3,10}$/.test(w.word))).slice(0, ROUND) : []), [pool, round]);

  useEffect(() => {
    setI(0);
    setTried([]);
    setScore(0);
    setDone(false);
  }, [words]);

  const w = words[i];

  // Physical keyboard support.
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (LETTERS.includes(k)) guess(k);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!pool) return wrap(<Loading />);
  if (done) return wrap(<ResultCard correct={score} total={words.length} onRestart={() => setRound((r) => r + 1)} />);
  if (!w) return wrap(null);

  const letters = w.word.split('');
  const wrongCount = tried.filter((l) => !letters.includes(l)).length;
  const won = letters.every((l) => tried.includes(l));
  const lost = wrongCount >= LIVES;
  const over = won || lost;

  function guess(l) {
    if (!w || over || tried.includes(l)) return;
    const next = [...tried, l];
    setTried(next);
    if (w.word.split('').every((x) => next.includes(x))) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 < words.length) {
      setI(i + 1);
      setTried([]);
      return;
    }
    recordResult('guess', score, words.length);
    setDone(true);
  }

  function wrap(children) {
    return (
      <>
        <PageHeader gameKey="guess" title={t('game_guess')} desc={t('desc_guess')}>
          <div className="flex flex-col gap-3">
            <LevelPicker />
            <MeaningLangPicker value={meaningLang} onChange={setMeaningLang} />
          </div>
        </PageHeader>
        <div className="container-page mt-8">{children}</div>
      </>
    );
  }

  return wrap(
    <div className="card mx-auto max-w-2xl p-5 sm:p-8">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm font-bold text-ink-soft">
        <span>
          {t('question')} {i + 1} {t('of')} {words.length}
        </span>
        <span className="flex items-center gap-1" aria-label={`${t('lives')}: ${LIVES - wrongCount}`}>
          {Array.from({ length: LIVES }, (_, k) =>
            k < LIVES - wrongCount ? (
              <Heart key={k} className="h-5 w-5 fill-rose-500 text-rose-500" aria-hidden="true" />
            ) : (
              <HeartCrack key={k} className="h-5 w-5 text-slate-300" aria-hidden="true" />
            ),
          )}
        </span>
      </div>
      <ProgressBar value={i + (over ? 1 : 0)} max={words.length} label={t('score')} />

      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-teal">{t('guessPrompt')}</p>
      <p className="mt-1 text-2xl font-extrabold text-ink">
        {t('hint')}: {w.meaning}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2" aria-live="polite">
        {letters.map((l, k) => {
          const shown = tried.includes(l) || over;
          return (
            <span
              key={k}
              className={`inline-flex h-12 w-10 items-center justify-center rounded-xl text-2xl font-extrabold uppercase sm:h-14 sm:w-12 ${
                shown ? (tried.includes(l) ? 'bg-teal text-white shadow-[0_4px_0_#0b4f4a]' : 'bg-red-50 text-bad ring-2 ring-red-200') : 'bg-mint-light text-transparent ring-2 ring-mint'
              }`}
            >
              {shown ? l : '_'}
            </span>
          );
        })}
      </div>

      {over ? (
        <div className={`mt-6 rounded-2xl p-4 animate-fade-up ${won ? 'bg-green-50 ring-1 ring-green-200' : 'bg-red-50 ring-1 ring-red-200'}`}>
          <Verdict ok={won} />
          <div className="mt-1 flex items-center gap-2 text-ink">
            <span>
              {t('correctAnswer')}: <strong>{w.word}</strong>
            </span>
            <SpeakButton text={w.word} />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="button" className="btn-primary" onClick={next}>
              {i + 1 < words.length ? t('next') : t('finish')} →
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-7 gap-1.5 sm:grid-cols-9 sm:gap-2">
          {LETTERS.map((l) => {
            const used = tried.includes(l);
            const hit = used && letters.includes(l);
            return (
              <button
                key={l}
                type="button"
                disabled={used}
                onClick={() => guess(l)}
                className={`h-11 rounded-xl text-lg font-extrabold uppercase transition ${
                  hit ? 'bg-teal text-white' : used ? 'bg-slate-100 text-slate-300' : 'bg-white text-ink ring-2 ring-mint shadow-[0_3px_0_#a7f3d0] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none'
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      )}
    </div>,
  );
}
