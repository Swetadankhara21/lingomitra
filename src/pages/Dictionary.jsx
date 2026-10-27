import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { useSeo } from '../lib/seo.js';
import { dictionaryLetterSeo } from '../lib/seoPages.js';
import { loadIndex, loadLetter, MEANING_LANGS } from '../lib/dictionary.js';
import { Loading, PageHeader, SpeakButton } from '../components/ui.jsx';
import MeaningLangPicker from '../components/MeaningLangPicker.jsx';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const PAGE = 60;

export default function Dictionary() {
  const { t, meaningLang: uiMeaningLang } = useI18n();
  const { letter: param } = useParams();
  const navigate = useNavigate();
  const letter = LETTERS.includes(param) ? param : 'a';
  const [meaningLang, setMeaningLang] = useState(uiMeaningLang);
  const [index, setIndex] = useState(null);
  const [words, setWords] = useState(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);
  const [onlyWithMeaning, setOnlyWithMeaning] = useState(true);

  useSeo(param ? dictionaryLetterSeo(letter) : undefined);

  useEffect(() => {
    loadIndex().then(setIndex).catch(() => setError(true));
  }, []);

  useEffect(() => {
    setWords(null);
    setShown(PAGE);
    loadLetter(letter)
      .then(setWords)
      .catch(() => setError(true));
  }, [letter]);

  // Typing a word jumps to its letter.
  useEffect(() => {
    const first = query.trim().toLowerCase()[0];
    if (first && LETTERS.includes(first) && first !== letter) navigate(`/dictionary/${first}`, { replace: true });
  }, [query, letter, navigate]);

  const list = useMemo(() => {
    if (!words) return [];
    const q = query.trim().toLowerCase();
    return words.filter((w) => (!q || w.word.startsWith(q)) && (!onlyWithMeaning || w.meanings[meaningLang]));
  }, [words, query, meaningLang, onlyWithMeaning]);

  return (
    <>
      <PageHeader gameKey="dictionary" title={t('game_dictionary')} desc={index ? `${index.total.toLocaleString('en-IN')} ${t('statWords')}` : t('desc_dictionary')}>
        <MeaningLangPicker value={meaningLang} onChange={setMeaningLang} />
      </PageHeader>

      <div className="container-page mt-8">
        <div className="card p-4 sm:p-6">
          <label className="block">
            <span className="sr-only">{t('search')}</span>
            <input type="search" className="input text-lg" placeholder={t('searchPlaceholder')} value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <nav className="mt-4 flex flex-wrap gap-1.5" aria-label="A to Z">
            {LETTERS.map((l) => (
              <Link
                key={l}
                to={`/dictionary/${l}`}
                onClick={() => setQuery('')}
                aria-current={l === letter ? 'page' : undefined}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold uppercase transition ${
                  l === letter ? 'bg-teal text-white shadow-lift' : 'bg-mint-light text-teal-dark hover:bg-mint'
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <label className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <input type="checkbox" checked={onlyWithMeaning} onChange={(e) => setOnlyWithMeaning(e.target.checked)} className="h-4 w-4 accent-teal" />
            {t('meaningIn')} {MEANING_LANGS.find((l) => l.code === meaningLang)?.label}
          </label>
        </div>

        {error ? (
          <p className="card mt-6 p-6 text-center text-ink-soft">{t('noResults')}</p>
        ) : !words ? (
          <Loading />
        ) : (
          <>
            <p className="mt-6 text-sm font-bold text-ink-soft">
              {list.length.toLocaleString('en-IN')} · {letter.toUpperCase()}
            </p>
            {list.length === 0 && <p className="card mt-3 p-6 text-center text-ink-soft">{t('noResults')}</p>}
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {list.slice(0, shown).map((w) => (
                <li key={w.word} className="card p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xl font-extrabold text-teal-dark">{w.word}</p>
                      <p className="text-sm text-ink-soft">
                        <span className="chip mr-2 !py-0.5">{w.pos}</span>
                        {w.ipa}
                      </p>
                    </div>
                    <SpeakButton text={w.word} />
                  </div>
                  {w.meanings[meaningLang] && <p className="mt-3 text-lg font-bold text-ink">{w.meanings[meaningLang]}</p>}
                  <p className="mt-1 text-sm text-ink-soft">{w.gloss}</p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
                    {MEANING_LANGS.filter((l) => l.code !== meaningLang && w.meanings[l.code]).map((l) => (
                      <span key={l.code}>
                        <strong className="text-teal">{l.label}:</strong> {w.meanings[l.code]}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
            {shown < list.length && (
              <div className="mt-6 flex justify-center">
                <button type="button" className="btn-primary" onClick={() => setShown((s) => s + PAGE)}>
                  + {Math.min(PAGE, list.length - shown)}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
