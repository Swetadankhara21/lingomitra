import { useI18n } from '../i18n/index.jsx';
import { MEANING_LANGS } from '../lib/dictionary.js';

/** Which language the English words are explained in (Gujarati, Hindi, German, Polish). */
export default function MeaningLangPicker({ value, onChange, dark = true }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={t('meaningIn')}>
      <span className={`text-sm font-bold ${dark ? 'text-mint-light' : 'text-ink-soft'}`}>{t('meaningIn')}:</span>
      {MEANING_LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          role="radio"
          aria-checked={value === l.code}
          onClick={() => onChange(l.code)}
          className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
            value === l.code
              ? dark
                ? 'bg-mint text-teal-dark'
                : 'bg-teal text-white'
              : dark
                ? 'bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25'
                : 'bg-mint-light text-teal-dark ring-1 ring-mint hover:bg-mint'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
