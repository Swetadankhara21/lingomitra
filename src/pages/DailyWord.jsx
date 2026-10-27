import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { dayNumber } from '../lib/utils.js';
import { lookup, MEANING_LANGS } from '../lib/dictionary.js';
import { vocabulary } from '../data/vocabulary.js';
import { PageHeader, SpeakButton } from '../components/ui.jsx';

export default function DailyWord() {
  const { t } = useI18n();
  const { learnedWords, markWordLearned } = useProgress();
  const [entry, setEntry] = useState(null);

  // Same word for everyone all day; walks through the list day by day.
  const w = vocabulary[(dayNumber() * 37) % vocabulary.length];

  useSeo();

  useEffect(() => {
    lookup(w.word).then(setEntry);
  }, [w.word]);

  const meanings = { ...(entry?.meanings || {}), gu: w.gujarati };
  const known = learnedWords.includes(w.word);

  return (
    <>
      <PageHeader gameKey="dailyWord" title={t('game_dailyWord')} desc={new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} />
      <div className="container-page mt-8">
        <article className="card mx-auto max-w-2xl p-6 text-center sm:p-10 animate-pop">
          <span className="chip">
            {w.pos} · {t(w.level)}
          </span>
          <h2 className="mt-4 text-5xl font-extrabold text-teal-dark sm:text-6xl">{w.word}</h2>
          <p className="mt-3 text-lg text-ink-soft">
            {t('pronunciation')}: <strong className="text-ink">{w.pronunciation}</strong>
            {entry?.ipa && <span className="ml-2">{entry.ipa}</span>}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <SpeakButton text={w.word} label={t('listen')} />
            <SpeakButton text={w.example} label={t('example')} />
          </div>

          <dl className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {MEANING_LANGS.filter((l) => meanings[l.code]).map((l) => (
              <div key={l.code} className="rounded-2xl bg-mint-light p-4 ring-1 ring-mint">
                <dt className="text-xs font-bold uppercase tracking-wide text-teal">{l.label}</dt>
                <dd className="mt-1 text-xl font-extrabold text-ink">{meanings[l.code]}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="mt-6 rounded-2xl bg-bg p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-teal">{t('example')}</p>
            <p className="mt-1 text-lg font-semibold text-ink">“{w.example}”</p>
            {entry?.gloss && <p className="mt-2 text-sm text-ink-soft">{entry.gloss}</p>}
          </blockquote>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" className={known ? 'btn bg-green-50 text-good ring-1 ring-green-200' : 'btn-primary'} disabled={known} onClick={() => markWordLearned(w.word)}>
              {known && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
              {known ? t('learned') : t('markLearned')}
            </button>
            <Link to="/word-game" className="btn-soft">
              {t('game_vocabulary')} →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
