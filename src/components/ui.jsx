import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { canSpeak, speak } from '../lib/speech.js';

export function ProgressBar({ value, max, label }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="w-full" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
      <div className="h-3 w-full overflow-hidden rounded-full bg-mint-light ring-1 ring-mint">
        <div className="h-full rounded-full bg-gradient-to-r from-teal to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function PageHeader({ emoji, title, desc, children }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-emerald-500 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/20 blur-2xl" />
      <div className="container-page relative py-10 sm:py-14">
        <div className="animate-fade-up">
          {emoji && <span className="mb-3 inline-block text-4xl" aria-hidden="true">{emoji}</span>}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          {desc && <p className="mt-2 max-w-2xl text-mint-light/90">{desc}</p>}
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </header>
  );
}

export function LevelPicker() {
  const { t } = useI18n();
  const { level, setLevel } = useProgress();
  return (
    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={t('chooseLevel')}>
      {['beginner', 'intermediate', 'advanced'].map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={level === l}
          onClick={() => setLevel(l)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            level === l ? 'bg-white text-teal-dark shadow-lift' : 'bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25'
          }`}
        >
          {t(l)}
        </button>
      ))}
    </div>
  );
}

export function SpeakButton({ text, className = '', label }) {
  const { t } = useI18n();
  if (!canSpeak()) return null;
  return (
    <button type="button" onClick={() => speak(text)} className={`btn-soft !min-h-[40px] !px-3 ${className}`} aria-label={`${t('listen')}: ${text}`}>
      <span aria-hidden="true">🔊</span>
      {label && <span>{label}</span>}
    </button>
  );
}

export function GameCard({ game, index = 0 }) {
  const { t } = useI18n();
  return (
    <Link
      to={game.path}
      className="group card flex flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${game.accent} text-2xl shadow-card transition group-hover:scale-110`} aria-hidden="true">
        {game.emoji}
      </span>
      <h3 className="text-lg font-extrabold text-ink">{t(`game_${game.key}`)}</h3>
      <p className="mt-1 flex-1 text-sm text-ink-soft">{t(`desc_${game.key}`)}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-teal group-hover:gap-2 transition-all">
        {t('play')} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export function ResultCard({ correct, total, onRestart, children }) {
  const { t } = useI18n();
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const good = pct >= 70;
  return (
    <div className="card mx-auto max-w-xl p-8 text-center animate-pop">
      <div className="text-6xl" aria-hidden="true">{good ? '🎉' : '💪'}</div>
      <h2 className="mt-3 text-2xl font-extrabold text-ink">{good ? t('wellDone') : t('keepPracticing')}</h2>
      <p className="mt-2 text-ink-soft">{t('resultLine', { correct, total })}</p>
      <div className="mx-auto mt-5 max-w-xs">
        <ProgressBar value={correct} max={total} label={t('score')} />
        <p className="mt-2 text-sm font-bold text-teal">
          {pct}% · {t('pointsEarned', { points: correct * 10 })}
        </p>
      </div>
      {children}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onRestart && (
          <button type="button" className="btn-primary" onClick={onRestart}>
            {t('playAgain')}
          </button>
        )}
        <Link to="/progress" className="btn-soft">
          {t('nav_progress')}
        </Link>
      </div>
    </div>
  );
}

export function Loading() {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-ink-soft" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-mint border-t-teal" />
      {t('loading')}
    </div>
  );
}
