import { ArrowRight, CheckCircle2, Dumbbell, PartyPopper, Volume2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GridFloor, Orb, Tilt } from './Scene3D.jsx';
import { gameByKey } from '../lib/games.js';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { canSpeak, speak } from '../lib/speech.js';

export function ProgressBar({ value, max, label }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="w-full" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
      <div className="h-4 w-full overflow-hidden rounded-full bg-mint-light p-0.5 shadow-[inset_0_2px_4px_rgba(17,94,89,0.15)]">
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-teal to-emerald-400 transition-all duration-500 after:absolute after:inset-x-1 after:top-0.5 after:h-1 after:rounded-full after:bg-white/40"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Page banner. icon: a lucide icon, or gameKey to use that game's icon from games.js. */
export function PageHeader({ icon, gameKey, title, desc, children }) {
  const Icon = icon || (gameKey && gameByKey(gameKey)?.icon);
  return (
    <div className="px-3 pt-4">
      <header className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-[radial-gradient(120%_120%_at_0%_0%,#14b8a6_0%,#0f766e_45%,#0b3f3b_100%)] text-white shadow-[0_30px_60px_-30px_rgba(11,63,59,0.7)]">
        <GridFloor />
        <Orb tone="mint" className="-right-10 top-6 h-40 w-40 animate-float-slow opacity-90 sm:right-16 sm:h-48 sm:w-48" />
        <Orb tone="gold" className="right-48 top-24 hidden h-14 w-14 animate-float-slow [animation-delay:-3s] lg:block" />
        <div className="container-page relative py-12 sm:py-16">
          <div className="animate-fade-up">
            {Icon && (
              <span className="icon-3d mb-5 h-16 w-16 bg-gradient-to-br from-emerald-400 to-teal" aria-hidden="true">
                <Icon className="relative h-8 w-8" strokeWidth={2.2} />
              </span>
            )}
            <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] sm:text-5xl">{title}</h1>
            {desc && <p className="mt-2 max-w-2xl text-mint-light/90">{desc}</p>}
            {children && <div className="mt-5">{children}</div>}
          </div>
        </div>
      </header>
    </div>
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
            level === l ? 'bg-white text-teal-dark shadow-[0_4px_0_rgba(255,255,255,0.4)]' : 'bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/20'
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
      <Volume2 className="h-4 w-4" aria-hidden="true" />
      {label && <span>{label}</span>}
    </button>
  );
}

export function GameCard({ game, index = 0 }) {
  const { t } = useI18n();
  return (
    <Tilt className="h-full animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
      <Link to={game.path} className="group card relative flex h-full flex-col overflow-hidden p-6">
        <span className="tilt-shine" aria-hidden="true" />
        <span className={`icon-3d pop-out mb-5 h-16 w-16 bg-gradient-to-br ${game.accent} transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg]`} aria-hidden="true">
          <game.icon className="relative h-8 w-8" strokeWidth={2.2} />
        </span>
        <h3 className="text-lg font-extrabold text-ink">{t(`game_${game.key}`)}</h3>
        <p className="mt-1 flex-1 text-sm text-ink-soft">{t(`desc_${game.key}`)}</p>
        <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-mint-light px-3.5 py-1.5 text-sm font-extrabold text-teal-dark ring-1 ring-mint transition-all group-hover:gap-2.5 group-hover:bg-teal group-hover:text-white group-hover:ring-teal">
          {t('play')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </Tilt>
  );
}

export function ResultCard({ correct, total, onRestart, children }) {
  const { t } = useI18n();
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const good = pct >= 70;
  return (
    <div className="card mx-auto max-w-xl p-8 text-center animate-pop">
      <div className={`icon-3d mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br ${good ? 'from-emerald-400 to-teal' : 'from-amber-300 to-amber-500'}`} aria-hidden="true">
        {good ? <PartyPopper className="relative h-11 w-11" /> : <Dumbbell className="relative h-11 w-11" />}
      </div>
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

/** "Correct!" / "Not quite" line shown after an answer. */
export function Verdict({ ok }) {
  const { t } = useI18n();
  const Icon = ok ? CheckCircle2 : XCircle;
  return (
    <p className={`flex items-center gap-2 font-extrabold ${ok ? 'text-good' : 'text-bad'}`}>
      <Icon className="h-5 w-5" aria-hidden="true" />
      {ok ? t('correct') : t('wrong')}
    </p>
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
