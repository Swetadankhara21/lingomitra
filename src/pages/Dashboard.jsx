import { BookOpen, Flame, History, Keyboard, Star, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { GAMES } from '../lib/games.js';
import { percent } from '../lib/utils.js';
import { PageHeader, ProgressBar } from '../components/ui.jsx';

const PLAYABLE = GAMES.filter((g) => !['dashboard', 'tips', 'dictionary', 'dailyWord'].includes(g.key));

export default function Dashboard() {
  const { t } = useI18n();
  const p = useProgress();

  useSeo('My English Progress', 'Your English learning progress: points, daily streak, accuracy, words learned and scores for every game – saved privately on your device.');

  const tracked = PLAYABLE.map((g) => ({ g, s: p.games[g.key] }));
  const totals = tracked.reduce((a, { s }) => (s ? { correct: a.correct + s.correct, total: a.total + s.total } : a), { correct: 0, total: 0 });
  const playedCount = tracked.filter(({ s }) => s).length;

  const cards = [
    [Star, p.points, t('points')],
    [Flame, p.streak, t('streak')],
    [Target, `${percent(totals.correct, totals.total)}%`, t('accuracy')],
    [BookOpen, p.learnedWords.length, t('learned')],
    [Keyboard, p.bestWpm, t('wpm')],
    [Trophy, Object.keys(p.dailyDone).length, t('game_daily')],
  ];

  const reset = () => {
    if (window.confirm(t('resetConfirm'))) p.reset();
  };

  return (
    <>
      <PageHeader gameKey="dashboard" title={t('game_dashboard')} desc={t('desc_dashboard')} />
      <div className="container-page mt-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cards.map(([Icon, value, label], i) => (
            <div key={label} className="card p-5 text-center animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
              <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mint-light text-teal" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-1 text-3xl font-extrabold text-teal">{value}</p>
              <p className="text-xs font-semibold text-ink-soft">{label}</p>
            </div>
          ))}
        </div>

        <section className="card mt-8 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-ink">{t('allGames')}</h2>
            <span className="chip">
              {playedCount} / {PLAYABLE.length} {t('completed')}
            </span>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {tracked.map(({ g, s }) => (
              <li key={g.key} className="rounded-2xl bg-bg p-4">
                <div className="flex items-center justify-between gap-3">
                  <Link to={g.path} className="font-bold text-ink hover:text-teal">
                    <g.icon className="mr-1.5 inline h-4 w-4 text-teal" aria-hidden="true" /> {t(`game_${g.key}`)}
                  </Link>
                  <span className="text-sm font-bold text-teal">{s ? `${percent(s.correct, s.total)}%` : '—'}</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={s ? s.correct : 0} max={s ? s.total : 1} label={t(`game_${g.key}`)} />
                </div>
                <p className="mt-1 text-xs text-ink-soft">
                  {s ? `${s.played}× · ${s.correct}/${s.total} · best ${s.best}%` : t('notPlayed')}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {p.history.length > 0 && (
          <section className="card mt-8 p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink"><History className="h-5 w-5 text-teal" aria-hidden="true" /> History</h2>
            <ul className="mt-4 divide-y divide-mint-light">
              {p.history
                .filter((h) => h.total > 0)
                .slice(0, 12)
                .map((h) => (
                  <li key={h.date} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="font-semibold text-ink">{GAMES.some((g) => g.key === h.game) ? t(`game_${h.game}`) : h.game}</span>
                    <span className="text-ink-soft">{new Date(h.date).toLocaleString()}</span>
                    <span className="font-bold text-teal">
                      {h.correct}/{h.total}
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        )}

        <div className="mt-8 flex justify-end">
          <button type="button" className="btn bg-red-50 text-bad ring-1 ring-red-200 hover:bg-red-100" onClick={reset}>
            {t('reset')}
          </button>
        </div>
      </div>
    </>
  );
}
