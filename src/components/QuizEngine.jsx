import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { shuffle } from '../lib/utils.js';
import { ProgressBar, ResultCard, SpeakButton } from './ui.jsx';

/**
 * Multiple-choice game: one question at a time, instant feedback with the
 * correct answer and explanation, result card at the end.
 * question: { prompt, sub?, options[], answer (index), explanation?, speak? }
 */
export default function QuizEngine({ questions, gameId, onRestart, onFinish, promptClass = 'text-xl sm:text-2xl' }) {
  const { t } = useI18n();
  const { recordResult } = useProgress();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const nextRef = useRef(null);

  // Options shuffled once per question set; remember where the right one went.
  const items = useMemo(
    () =>
      questions.map((q) => {
        const order = shuffle(q.options.map((_, idx) => idx));
        return { ...q, options: order.map((idx) => q.options[idx]), answer: order.indexOf(q.answer) };
      }),
    [questions],
  );

  useEffect(() => {
    setI(0);
    setPicked(null);
    setCorrect(0);
    setDone(false);
  }, [questions]);

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus();
  }, [picked]);

  if (!items.length) return null;

  if (done) {
    return <ResultCard correct={correct} total={items.length} onRestart={onRestart} />;
  }

  const q = items[i];
  const answered = picked !== null;
  const isRight = picked === q.answer;

  const choose = (idx) => {
    if (answered) return;
    setPicked(idx);
    if (idx === q.answer) setCorrect((c) => c + 1);
  };

  const next = () => {
    if (i + 1 < items.length) {
      setI(i + 1);
      setPicked(null);
      return;
    }
    const final = correct;
    recordResult(gameId, final, items.length);
    onFinish?.(final, items.length);
    setDone(true);
  };

  return (
    <div className="card mx-auto max-w-2xl p-5 sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4 text-sm font-bold text-ink-soft">
        <span>
          {t('question')} {i + 1} {t('of')} {items.length}
        </span>
        <span className="chip">
          {t('score')}: {correct}
        </span>
      </div>
      <ProgressBar value={i + (answered ? 1 : 0)} max={items.length} label={t('score')} />

      <div className="mt-6 animate-fade-up" key={i}>
        {q.sub && <p className="mb-2 text-sm font-bold uppercase tracking-wide text-teal">{q.sub}</p>}
        <div className="flex items-start gap-3">
          <h2 className={`flex-1 font-extrabold text-ink ${promptClass}`}>{q.prompt}</h2>
          {q.speak && <SpeakButton text={q.speak} />}
        </div>

        <div className="mt-5 grid gap-3" role="list">
          {q.options.map((opt, idx) => {
            let cls = 'option';
            if (answered && idx === q.answer) cls += ' option-correct';
            else if (answered && idx === picked) cls += ' option-wrong';
            return (
              <button key={idx} type="button" role="listitem" className={cls} disabled={answered} onClick={() => choose(idx)}>
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-mint-light text-xs font-extrabold text-teal-dark">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-5 rounded-2xl p-4 animate-fade-up ${isRight ? 'bg-green-50 ring-1 ring-green-200' : 'bg-red-50 ring-1 ring-red-200'}`} aria-live="polite">
            <p className={`font-extrabold ${isRight ? 'text-good' : 'text-bad'}`}>{isRight ? `✅ ${t('correct')}` : `❌ ${t('wrong')}`}</p>
            {!isRight && (
              <p className="mt-1 text-ink">
                {t('correctAnswer')}: <strong>{q.options[q.answer]}</strong>
              </p>
            )}
            {q.explanation && (
              <p className="mt-1 text-sm text-ink-soft">
                <strong className="text-ink">{t('explanation')}:</strong> {q.explanation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button ref={nextRef} type="button" className="btn-primary" disabled={!answered} onClick={next}>
            {i + 1 < items.length ? t('next') : t('finish')} →
          </button>
        </div>
      </div>
    </div>
  );
}
