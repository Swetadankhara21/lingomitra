import { AlertTriangle, CheckCircle2, MessageCircle, Sun, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useSeo } from '../lib/seo.js';
import { dayNumber } from '../lib/utils.js';
import { mistakes, phrases } from '../data/tips.js';
import { PageHeader, SpeakButton } from '../components/ui.jsx';

export default function Tips() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState('phrases');
  const today = phrases[dayNumber() % phrases.length];
  const meaning = (p) => (lang === 'hi' ? p[2] : p[1]);

  useSeo();

  return (
    <>
      <PageHeader gameKey="tips" title={t('game_tips')} desc={t('desc_tips')} />
      <div className="container-page mt-8">
        <section className="card mx-auto max-w-3xl bg-gradient-to-br from-mint-light to-white p-6 sm:p-8">
          <p className="chip"><Sun className="h-3.5 w-3.5" aria-hidden="true" /> Phrase of the day</p>
          <div className="mt-3 flex items-center gap-3">
            <p className="flex-1 text-2xl font-extrabold text-teal-dark sm:text-3xl">{today[0]}</p>
            <SpeakButton text={today[0]} />
          </div>
          <p className="mt-2 text-lg font-semibold text-ink">{meaning(today)}</p>
          <p className="mt-1 text-sm text-ink-soft">{today[3]}</p>
        </section>

        <div className="mx-auto mt-8 flex max-w-sm rounded-2xl bg-white p-1 shadow-card" role="tablist">
          {[
            ['phrases', 'Phrases', MessageCircle],
            ['mistakes', 'Mistakes', AlertTriangle],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${tab === key ? 'bg-teal text-white shadow-lift' : 'text-ink hover:bg-mint-light'}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'phrases' ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {phrases.map((p) => (
              <li key={p[0]} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-extrabold text-ink">{p[0]}</p>
                  <SpeakButton text={p[0]} />
                </div>
                <p className="mt-1 font-semibold text-teal-dark">{p[1]}</p>
                <p className="text-sm text-ink-soft">{p[2]}</p>
                <p className="mt-2 chip">{p[3]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {mistakes.map(([wrong, right, why]) => (
              <li key={wrong} className="card p-5">
                <p className="flex items-start gap-2 font-semibold text-bad"><XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span className="line-through decoration-2">{wrong}</span></p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="flex items-start gap-2 font-extrabold text-good"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{right}</p>
                  <SpeakButton text={right.split(' / ')[0]} />
                </div>
                <p className="mt-2 text-sm text-ink-soft">{why}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
