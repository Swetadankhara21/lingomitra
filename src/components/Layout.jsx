import { useEffect, useState } from 'react';
import { Globe, Menu, Star, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LANGUAGES, useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { GAMES, LEARN } from '../lib/games.js';
import { OWNER } from '../lib/owner.js';
import { applyUpdateOn } from '../lib/autoUpdate.js';
import { Orb } from './Scene3D.jsx';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="LingoMitra home">
      <span className="icon-3d h-10 w-10 bg-gradient-to-br from-emerald-400 to-teal text-lg font-extrabold">
        <span className="relative">Lm</span>
      </span>
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
      <Globe className="h-5 w-5 text-teal" aria-hidden="true" />
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
    `rounded-xl px-3.5 py-2 text-sm font-bold transition ${
      isActive ? 'bg-teal text-white shadow-[0_3px_0_#0b4f4a]' : 'text-ink hover:bg-mint-light hover:text-teal-dark'
    }`;

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <nav className="glass mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 sm:px-5" aria-label="Main">
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
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" /> {points}
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
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="glass mx-auto mt-2 max-w-6xl rounded-2xl lg:hidden animate-fade-up">
          <div className="grid gap-1 p-3">
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
    <footer className="relative mt-20 overflow-hidden bg-[radial-gradient(120%_140%_at_100%_0%,#0f766e_0%,#0b3f3b_60%)] text-mint-light">
      <Orb tone="teal" className="-left-16 -top-16 h-48 w-48 opacity-60" />
      <div className="container-page relative grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
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
      <div className="relative border-t border-white/10">
        <p className="container-page py-5 text-center text-xs text-mint-light/70">
          © {year} LingoMitra · {OWNER.name}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyUpdateOn(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);
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
