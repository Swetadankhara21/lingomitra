import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { GAMES, LEARN } from '../lib/games.js';
import { loadIndex } from '../lib/dictionary.js';
import { useSeo } from '../lib/seo.js';
import { useProgress } from '../lib/progress.jsx';
import { GameCard } from '../components/ui.jsx';

export default function Home() {
  const { t } = useI18n();
  const { points, streak } = useProgress();
  const [words, setWords] = useState(null);

  useSeo(
    '',
    'LingoMitra: free English learning games – word game, Gujarati to English quiz game, grammar game, spelling game, listening game, typing speed game, daily challenge, songs, stories and a 50,000-word dictionary with Gujarati, Hindi, German and Polish meanings.',
  );

  useEffect(() => {
    loadIndex()
      .then((i) => setWords(i.total))
      .catch(() => setWords(null));
  }, []);

  const stats = [
    [words ? words.toLocaleString('en-IN') : '50,000', t('statWords')],
    [String(GAMES.length + LEARN.length), t('statGames')],
    ['4', t('statLangs')],
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-emerald-500 text-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-mint/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div className="animate-fade-up">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold ring-1 ring-white/30">{t('heroBadge')}</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{t('heroTitle')}</h1>
            <p className="mt-4 max-w-xl text-lg text-mint-light/90">{t('heroSub')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/daily-challenge" className="btn bg-white text-teal-dark shadow-lift hover:-translate-y-0.5 hover:bg-mint-light">
                🏆 {t('startPlaying')}
              </Link>
              <Link to="/games" className="btn bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20">
                {t('exploreGames')} →
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="card animate-float p-6 text-ink">
              <p className="chip">🌟 {t('game_dailyWord')}</p>
              <p className="mt-4 text-4xl font-extrabold text-teal-dark">opportunity</p>
              <p className="mt-1 text-ink-soft">/ˌɒpəˈtjuːnɪti/</p>
              <p className="mt-3 text-lg font-bold">તક · अवसर · Gelegenheit · okazja</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-mint-light p-3 text-center">
                  <p className="text-2xl font-extrabold text-teal">⭐ {points}</p>
                  <p className="text-xs text-ink-soft">{t('points')}</p>
                </div>
                <div className="rounded-2xl bg-mint-light p-3 text-center">
                  <p className="text-2xl font-extrabold text-teal">🔥 {streak}</p>
                  <p className="text-xs text-ink-soft">{t('streak')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page -mt-8 relative z-10">
        <div className="card grid grid-cols-3 divide-x divide-mint-light p-4 sm:p-6">
          {stats.map(([n, label]) => (
            <div key={label} className="px-2 text-center">
              <p className="text-2xl font-extrabold text-teal sm:text-3xl">{n}</p>
              <p className="text-xs text-ink-soft sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-14" id="games">
        <h2 className="h-section">{t('allGames')}</h2>
        <p className="mt-1 text-ink-soft">{t('allGamesSub')}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GAMES.map((g, i) => (
            <GameCard key={g.key} game={g} index={i} />
          ))}
        </div>
      </section>

      <section className="container-page mt-14">
        <h2 className="h-section">{t('moreToLearn')}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {LEARN.map((g, i) => (
            <GameCard key={g.key} game={g} index={i} />
          ))}
        </div>
      </section>

      <section className="container-page mt-14">
        <div className="card overflow-hidden bg-gradient-to-br from-mint-light to-white p-8 sm:p-10">
          <h2 className="h-section">{t('whyTitle')}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['⚡', t('why1')],
              ['✅', t('why2')],
              ['📈', t('why3')],
            ].map(([icon, text]) => (
              <li key={text} className="rounded-2xl bg-white p-5 shadow-card">
                <span className="text-3xl" aria-hidden="true">{icon}</span>
                <p className="mt-2 font-semibold text-ink">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
