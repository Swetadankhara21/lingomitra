import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import gu from './gu.js';
import hi from './hi.js';
import de from './de.js';
import pl from './pl.js';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pl', label: 'Polski' },
];

const STRINGS = { en, gu, hi, de, pl };
const KEY = 'lingomitra-lang';

/** Meaning language for word lists: the UI language, or Gujarati when the UI is English. */
export const meaningLangOf = (lang) => (lang === 'en' ? 'gu' : lang);

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && STRINGS[saved]) return saved;
  } catch {
    // ignore
  }
  const browser = (navigator.language || 'en').slice(0, 2);
  return STRINGS[browser] ? browser : 'en';
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      let text = STRINGS[lang][key] ?? en[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v);
      return text;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang: setLangState, t, meaningLang: meaningLangOf(lang) }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
