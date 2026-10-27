import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LANGUAGES, useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { GAMES, LEARN } from '../lib/games.js';
import { OWNER } from '../lib/owner.js';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="LingoMitra home">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-emerald-400 text-lg font-extrabold text-white shadow-lift">Lm</span>
      <span className="text-xl font-extrabold tracking-tight text-teal-dark">
        Lingo<span className="text-teal">Mitra</span>
      </span>
    </Link>
  );
}

function LanguageSelect({ className = '' }) {
  const { lang, setLang, t } = useI18n();
  return (
    <label className={`flex items-center gap-2 ${className}`}>
      <span className="sr-only">{t('language')}</span>
      <span aria-hidden="true">🌐</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="rounded-xl border-2 border-mint-light bg-white px-2 py-1.5 text-sm font-semibold text-ink focus:border-teal focus:outline-none"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Navbar() {
  const { t } = useI18n();
  const { points } = useProgress();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { to: '/', label: t('nav_home'), end: true },
    { to: '/games', label: t('nav_games') },
    { to: '/dictionary', label: t('nav_dictionary') },
    { to: '/learn', label: t('nav_learn') },
    { to: '/progress', label: t('nav_progress') },
  ];
  const linkCls = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-mint-light text-teal-dark ring-1 ring-mint' : 'text-ink hover:bg-mint-light hover:text-teal-dark'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-mint/60 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-3" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="chip hidden sm:inline-flex" title={t('points')}>
            ⭐ {points}
          </span>
          <LanguageSelect className="hidden md:flex" />
          <button
            type="button"
            className="btn-ghost !min-h-[44px] !px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{t('menu')}</span>
            <span aria-hidden="true" className="text-2xl leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-mint/60 bg-white lg:hidden animate-fade-up">
          <div className="container-page grid gap-1 py-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            <LanguageSelect className="mt-2 md:hidden" />
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-teal-dark text-mint-light">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-extrabold text-white">LingoMitra</p>
          <p className="mt-2 text-sm text-mint-light/80">{t('footerTag')}</p>
          <p className="mt-4 text-sm">
            {t('madeBy')}{' '}
            <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-mint underline-offset-4 hover:text-mint">
              {OWNER.name}
            </a>
          </p>
        </div>
        <div>
          <p className="font-extrabold text-white">{t('nav_games')}</p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {GAMES.slice(0, 6).map((g) => (
              <li key={g.key}>
                <Link to={g.path} className="hover:text-mint">{t(`game_${g.key}`)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-extrabold text-white">{t('nav_learn')}</p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {[...GAMES.slice(6), ...LEARN].map((g) => (
              <li key={g.key}>
                <Link to={g.path} className="hover:text-mint">{t(`game_${g.key}`)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-extrabold text-white">LingoMitra</p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {[
              ['/about', 'nav_about'],
              ['/contact', 'nav_contact'],
              ['/privacy-policy', 'nav_privacy'],
              ['/terms', 'nav_terms'],
              ['/credits', 'nav_credits'],
            ].map(([to, key]) => (
              <li key={to}>
                <Link to={to} className="hover:text-mint">{t(key)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-center text-xs text-mint-light/70">
          © {year} LingoMitra · {OWNER.name}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 btn-primary">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
