import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { shuffle } from '../lib/utils.js';
import { vocabulary } from '../data/vocabulary.js';
import { sentences } from '../data/sentences.js';
import { LevelPicker, PageHeader, ProgressBar, ResultCard, SpeakButton } from '../components/ui.jsx';

const ROUND = 8;
const PASS = 80;
const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

const clean = (s) => s.toLowerCase().replace(/[^a-z' ]/g, '').replace(/\s+/g, ' ').trim();

/** How close two texts are, 0-100 (Levenshtein distance on letters). */
function similarity(a, b) {
  const x = clean(a);
  const y = clean(b);
  if (!x || !y) return 0;
  const d = Array.from({ length: x.length + 1 }, (_, i) => [i, ...Array(y.length).fill(0)]);
  for (let j = 1; j <= y.length; j++) d[0][j] = j;
  for (let i = 1; i <= x.length; i++) {
    for (let j = 1; j <= y.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    }
  }
  return Math.round((1 - d[x.length][y.length] / Math.max(x.length, y.length)) * 100);
}

export default function SpeakScore() {
  const { t } = useI18n();
  const { level, recordResult } = useProgress();
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState(null); // { text, score }
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const rec = useRef(null);

  useSeo();

  // 5 words + 3 short sentences of the level.
  const items = useMemo(() => {
    const words = shuffle(vocabulary.filter((w) => w.level === level)).slice(0, 5).map((w) => w.word);
    const lines = shuffle(sentences.filter((s) => s.level === level)).slice(0, ROUND - 5).map((s) => s.en);
    return [...words, ...lines];
  }, [level, round]);

  useEffect(() => {
    setI(0);
    setHeard(null);
    setScores([]);
    setDone(false);
    setError(null);
  }, [items]);

  useEffect(() => () => rec.current?.abort(), []);

  const target = items[i];

  const listen = () => {
    if (!Recognition || listening) return;
    setError(null);
    setHeard(null);
    const r = new Recognition();
    r.lang = 'en-IN';
    r.interimResults = false;
    r.maxAlternatives = 5;
    r.onresult = (e) => {
      // Best of the browser's guesses.
      const best = Array.from(e.results[0])
        .map((alt) => ({ text: alt.transcript, score: similarity(alt.transcript, target) }))
        .sort((a, b) => b.score - a.score)[0];
      setHeard(best);
    };
    r.onerror = (e) => setError(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? t('micBlocked') : e.error === 'no-speech' ? '…' : e.error);
    r.onend = () => setListening(false);
    rec.current = r;
    setListening(true);
    r.start();
  };

  const next = () => {
    const all = [...scores, heard?.score ?? 0];
    setScores(all);
    setHeard(null);
    if (i + 1 < items.length) {
      setI(i + 1);
      return;
    }
    recordResult('speak', all.filter((s) => s >= PASS).length, all.length);
    setDone(true);
  };

  const header = (
    <PageHeader gameKey="speak" title={t('game_speak')} desc={t('desc_speak')}>
      <LevelPicker />
    </PageHeader>
  );

  if (!Recognition) {
    return (
      <>
        {header}
        <div className="container-page mt-8">
          <div className="card mx-auto max-w-xl p-8 text-center">
            <MicOff className="mx-auto h-14 w-14 text-ink-soft" aria-hidden="true" />
            <p className="mt-4 font-semibold text-ink">{t('micNotSupported')}</p>
          </div>
        </div>
      </>
    );
  }

  const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <>
      {header}
      <div className="container-page mt-8">
        {done ? (
          <ResultCard correct={scores.filter((s) => s >= PASS).length} total={scores.length} onRestart={() => setRound((r) => r + 1)}>
            <p className="mt-3 text-sm font-bold text-ink-soft">
              {t('accuracy')}: {average}%
            </p>
          </ResultCard>
        ) : (
          <div className="card mx-auto max-w-2xl p-6 text-center sm:p-8">
            <div className="mb-4 flex justify-between text-sm font-bold text-ink-soft">
              <span>
                {t('question')} {i + 1} {t('of')} {items.length}
              </span>
              <span className="chip">
                {t('score')}: {scores.filter((s) => s >= PASS).length}
              </span>
            </div>
            <ProgressBar value={i + (heard ? 1 : 0)} max={items.length} label={t('score')} />

            <p className="mt-8 text-3xl font-extrabold text-teal-dark sm:text-4xl">{target}</p>
            <div className="mt-3 flex justify-center">
              <SpeakButton text={target} label={t('listen')} />
            </div>

            <button
              type="button"
              onClick={listen}
              disabled={listening}
              className={`icon-3d mx-auto mt-8 h-28 w-28 rounded-full bg-gradient-to-br transition ${listening ? 'from-rose-400 to-rose-600 animate-pulse' : 'from-teal to-teal-dark hover:-translate-y-1'}`}
              aria-label={t('tapToSpeak')}
            >
              <Mic className="relative h-12 w-12" aria-hidden="true" />
            </button>
            <p className="mt-3 font-bold text-ink-soft" aria-live="polite">
              {listening ? t('listeningNow') : t('tapToSpeak')}
            </p>
            {error && <p className="mt-2 text-sm font-semibold text-bad">{error}</p>}

            {heard && (
              <div className={`mt-6 rounded-2xl p-4 text-left animate-fade-up ${heard.score >= PASS ? 'bg-green-50 ring-1 ring-green-200' : 'bg-amber-50 ring-1 ring-amber-200'}`} aria-live="polite">
                <p className="text-sm text-ink-soft">
                  {t('youSaid')}: <strong className="text-ink">“{heard.text}”</strong>
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={heard.score} max={100} label={t('accuracy')} />
                  </div>
                  <span className={`text-2xl font-extrabold ${heard.score >= PASS ? 'text-good' : 'text-amber-600'}`}>{heard.score}%</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {heard && heard.score < PASS && (
                <button type="button" className="btn-soft" onClick={listen}>
                  {t('tryAgain')}
                </button>
              )}
              <button type="button" className="btn-primary" onClick={next} disabled={listening}>
                {i + 1 < items.length ? t('next') : t('finish')} →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
