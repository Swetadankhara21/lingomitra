import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Flame, Gamepad2, Languages, Sparkles, Star, TrendingUp, Trophy, Zap } from 'lucide-react';
import { GridFloor, LetterCube, Orb, Tilt } from '../components/Scene3D.jsx';
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
    [words ? words.toLocaleString('en-IN') : '…', t('statWords'), BookOpen],
    [String(GAMES.length + LEARN.length), t('statGames'), Gamepad2],
    ['4', t('statLangs'), Languages],
  ];

  return (
    <>
      <section className="px-3 pt-4">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[radial-gradient(120%_120%_at_0%_0%,#14b8a6_0%,#0f766e_40%,#0b3f3b_100%)] text-white shadow-[0_40px_80px_-30px_rgba(11,63,59,0.7)]">
          <GridFloor />
          <Orb tone="mint" className="-left-20 -top-20 h-64 w-64 opacity-80" />
          <Orb tone="gold" className="bottom-24 left-[46%] hidden h-12 w-12 animate-float-slow lg:block" />
          <Orb tone="teal" className="-bottom-24 right-[-60px] h-72 w-72 opacity-90" />

          <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold ring-1 ring-white/30 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-mint" aria-hidden="true" /> {t('heroBadge')}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.3)] sm:text-6xl lg:text-7xl">{t('heroTitle')}</h1>
              <p className="mt-5 max-w-xl text-lg text-mint-light/90">{t('heroSub')}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/daily-challenge" className="btn-light !min-h-[52px] !px-6 !text-base">
                  <Trophy className="h-5 w-5" aria-hidden="true" /> {t('startPlaying')}
                </Link>
                <Link to="/games" className="btn !min-h-[52px] bg-white/10 !px-6 !text-base text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/20">
                  {t('exploreGames')} <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative hidden h-[420px] lg:block" aria-hidden="true">
              <div className="absolute left-4 top-0 animate-float-slow">
                <LetterCube size={150} />
              </div>
              <Tilt className="absolute bottom-0 right-0 w-[340px]" max={12}>
                <div className="card relative p-6 text-ink">
                  <span className="tilt-shine" />
                  <p className="chip">
                    <Sparkles className="h-3.5 w-3.5" /> {t('game_dailyWord')}
                  </p>
                  <p className="mt-4 text-4xl font-extrabold text-teal-dark">opportunity</p>
                  <p className="mt-1 text-ink-soft">/ˌɒpəˈtjuːnɪti/</p>
                  <p className="mt-3 text-lg font-bold">તક · अवसर · Gelegenheit · okazja</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-3 text-center shadow-[0_4px_0_#d1fae5]">
                      <p className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-teal">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" /> {points}
                      </p>
                      <p className="text-xs text-ink-soft">{t('points')}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3 text-center shadow-[0_4px_0_#d1fae5]">
                      <p className="flex items-center justify-center gap-1.5 text-2xl font-extrabold text-teal">
                        <Flame className="h-5 w-5 text-orange-500" /> {streak}
                      </p>
                      <p className="text-xs text-ink-soft">{t('streak')}</p>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page relative z-10 -mt-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {stats.map(([n, label, Icon], i) => (
            <div key={label} className="card flex flex-col items-center gap-2 p-4 text-center sm:flex-row sm:gap-4 sm:p-6 sm:text-left animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="icon-3d h-11 w-11 shrink-0 bg-gradient-to-br from-emerald-400 to-teal sm:h-14 sm:w-14" aria-hidden="true">
                <Icon className="relative h-5 w-5 sm:h-7 sm:w-7" />
              </span>
              <div>
                <p className="text-xl font-extrabold text-teal-dark sm:text-3xl">{n}</p>
                <p className="text-[11px] leading-tight text-ink-soft sm:text-sm">{label}</p>
              </div>
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
              [Zap, t('why1')],
              [CheckCircle2, t('why2')],
              [TrendingUp, t('why3')],
            ].map(([Icon, text]) => (
              <li key={text} className="rounded-2xl bg-white p-5 shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint-light text-teal" aria-hidden="true">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-2 font-semibold text-ink">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
