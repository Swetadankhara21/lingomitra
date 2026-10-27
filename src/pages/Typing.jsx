import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { shuffle } from '../lib/utils.js';
import { typingPassages } from '../data/typing.js';
import { LevelPicker, PageHeader, ProgressBar } from '../components/ui.jsx';

export default function Typing() {
  const { t } = useI18n();
  const { level, recordResult, setBestWpm, bestWpm } = useProgress();
  const [round, setRound] = useState(0);
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  useSeo();

  const text = useMemo(() => shuffle(typingPassages.filter((p) => p.level === level))[0].text, [level, round]);

  useEffect(() => {
    setTyped('');
    setStartedAt(null);
    setResult(null);
  }, [text, round]);

  useEffect(() => {
    if (!startedAt || result) return undefined;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [startedAt, result]);

  const seconds = startedAt ? Math.max(1, ((result ? result.end : now) - startedAt) / 1000) : 0;
  let right = 0;
  for (let k = 0; k < typed.length; k++) if (typed[k] === text[k]) right++;
  const accuracy = typed.length ? Math.round((right / typed.length) * 100) : 100;
  const wpm = startedAt ? Math.round(right / 5 / (seconds / 60)) : 0;

  const onChange = (e) => {
    if (result) return;
    const v = e.target.value.slice(0, text.length);
    if (!startedAt && v) setStartedAt(Date.now());
    setTyped(v);
    if (v.length === text.length) {
      const end = Date.now();
      const secs = Math.max(1, (end - (startedAt || end)) / 1000);
      let r = 0;
      for (let k = 0; k < v.length; k++) if (v[k] === text[k]) r++;
      const finalWpm = Math.round(r / 5 / (secs / 60));
      const finalAcc = Math.round((r / v.length) * 100);
      setResult({ end, wpm: finalWpm, accuracy: finalAcc });
      setBestWpm(finalWpm);
      recordResult('typing', Math.round(finalAcc / 10), 10);
    }
  };

  return (
    <>
      <PageHeader gameKey="typing" title={t('game_typing')} desc={t('desc_typing')}>
        <LevelPicker />
      </PageHeader>
      <div className="container-page mt-8">
        <div className="card mx-auto max-w-3xl p-5 sm:p-8">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              [wpm, t('wpm')],
              [`${accuracy}%`, t('accuracy')],
              [`${Math.round(seconds)}s`, t('time')],
            ].map(([v, label]) => (
              <div key={label} className="rounded-2xl bg-mint-light p-3 ring-1 ring-mint">
                <p className="text-2xl font-extrabold text-teal">{v}</p>
                <p className="text-xs text-ink-soft">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <ProgressBar value={typed.length} max={text.length} label={t('completed')} />
          </div>

          <p className="mt-6 select-none rounded-2xl bg-bg p-4 font-mono text-lg leading-relaxed" aria-label="Text to type" onClick={() => inputRef.current?.focus()}>
            {text.split('').map((ch, k) => {
              let cls = 'text-ink-soft';
              if (k < typed.length) cls = typed[k] === ch ? 'text-good' : 'bg-red-100 text-bad';
              else if (k === typed.length) cls = 'bg-mint text-ink rounded';
              return (
                <span key={k} className={cls}>
                  {ch}
                </span>
              );
            })}
          </p>

          <label className="mt-4 block">
            <span className="sr-only">Type here</span>
            <textarea
              ref={inputRef}
              value={typed}
              onChange={onChange}
              onPaste={(e) => e.preventDefault()}
              disabled={!!result}
              rows={3}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="input font-mono"
              placeholder="Start typing here…"
            />
          </label>

          {result && (
            <div className="mt-5 rounded-2xl bg-green-50 p-5 text-center ring-1 ring-green-200 animate-pop" aria-live="polite">
              <p className="text-2xl font-extrabold text-good">
                {t('wellDone')} {result.wpm} WPM · {result.accuracy}%
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Best: {Math.max(bestWpm, result.wpm)} WPM
              </p>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button type="button" className="btn-primary" onClick={() => setRound((r) => r + 1)}>
              {result ? t('playAgain') : t('tryAgain')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
