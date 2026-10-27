import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { byLevel, shuffle } from '../lib/utils.js';
import { sentences } from '../data/sentences.js';
import { LevelPicker, PageHeader, ProgressBar, ResultCard, SpeakButton } from '../components/ui.jsx';

const ROUND = 6;
const tokens = (s) => s.split(' ').map((w, i) => ({ id: i, w }));

export default function SentenceBuilder() {
  const { t } = useI18n();
  const { level, recordResult } = useProgress();
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [built, setBuilt] = useState([]);
  const [status, setStatus] = useState(null); // null | 'right' | 'wrong'
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useSeo('Sentence Builder Game', 'English sentence builder game: arrange shuffled words to make correct English sentences, with Gujarati meanings for every sentence.');

  const set = useMemo(() => shuffle(byLevel(sentences, level, ROUND)).slice(0, ROUND), [level, round]);
  const s = set[i];
  const bank = useMemo(() => (s ? shuffle(tokens(s.en)) : []), [s]);

  useEffect(() => {
    setI(0);
    setBuilt([]);
    setStatus(null);
    setCorrect(0);
    setDone(false);
  }, [set]);

  if (done) return wrap(<ResultCard correct={correct} total={set.length} onRestart={() => setRound((r) => r + 1)} />);
  if (!s) return null;

  const remaining = bank.filter((b) => !built.some((x) => x.id === b.id));
  const answer = built.map((b) => b.w).join(' ');

  const check = () => {
    const ok = answer === s.en;
    setStatus(ok ? 'right' : 'wrong');
    if (ok) setCorrect((c) => c + 1);
  };
  const next = () => {
    if (i + 1 < set.length) {
      setI(i + 1);
      setBuilt([]);
      setStatus(null);
    } else {
      recordResult('sentence', correct, set.length);
      setDone(true);
    }
  };

  function wrap(children) {
    return (
      <>
        <PageHeader emoji="🧩" title={t('game_sentence')} desc={t('desc_sentence')}>
          <LevelPicker />
        </PageHeader>
        <div className="container-page mt-8">{children}</div>
      </>
    );
  }

  return wrap(
    <div className="card mx-auto max-w-2xl p-5 sm:p-8">
      <div className="mb-4 flex justify-between text-sm font-bold text-ink-soft">
        <span>
          {t('question')} {i + 1} {t('of')} {set.length}
        </span>
        <span className="chip">
          {t('score')}: {correct}
        </span>
      </div>
      <ProgressBar value={i + (status ? 1 : 0)} max={set.length} label={t('score')} />

      <p className="mt-6 text-lg font-bold text-ink">{s.gu}</p>

      <div
        className={`mt-4 flex min-h-[72px] flex-wrap gap-2 rounded-2xl border-2 border-dashed p-3 transition ${
          status === 'right' ? 'border-good bg-green-50' : status === 'wrong' ? 'border-bad bg-red-50 animate-shake' : 'border-mint bg-mint-light'
        }`}
        aria-label="Your sentence"
      >
        {built.map((b) => (
          <button
            key={b.id}
            type="button"
            disabled={!!status}
            onClick={() => setBuilt(built.filter((x) => x.id !== b.id))}
            className="rounded-xl bg-teal px-3 py-2 font-bold text-white shadow-lift transition hover:bg-teal-dark"
          >
            {b.w}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {remaining.map((b) => (
          <button
            key={b.id}
            type="button"
            disabled={!!status}
            onClick={() => setBuilt([...built, b])}
            className="rounded-xl bg-white px-3 py-2 font-bold text-ink ring-2 ring-mint transition hover:-translate-y-0.5 hover:bg-mint-light"
          >
            {b.w}
          </button>
        ))}
      </div>

      {status && (
        <div className={`mt-5 rounded-2xl p-4 animate-fade-up ${status === 'right' ? 'bg-green-50 ring-1 ring-green-200' : 'bg-red-50 ring-1 ring-red-200'}`} aria-live="polite">
          <p className={`font-extrabold ${status === 'right' ? 'text-good' : 'text-bad'}`}>{status === 'right' ? `✅ ${t('correct')}` : `❌ ${t('wrong')}`}</p>
          <div className="mt-1 flex items-center gap-2 text-ink">
            <span>
              {t('correctAnswer')}: <strong>{s.en}</strong>
            </span>
            <SpeakButton text={s.en} />
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        {!status && (
          <button type="button" className="btn-soft" onClick={() => setBuilt([])} disabled={!built.length}>
            ↺
          </button>
        )}
        {status ? (
          <button type="button" className="btn-primary" onClick={next}>
            {i + 1 < set.length ? t('next') : t('finish')} →
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={check} disabled={remaining.length > 0}>
            {t('check')}
          </button>
        )}
      </div>
    </div>,
  );
}
