import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useSeo } from '../lib/seo.js';
import { speak } from '../lib/speech.js';
import { alphabet } from '../data/alphabet.js';
import { PageHeader, SpeakButton } from '../components/ui.jsx';

export default function Alphabet() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [letter, sound, words] = alphabet[active];

  useSeo('English Alphabet A to Z', 'Learn the English alphabet A to Z with letter sounds, example words, pictures and Gujarati meanings – tap to hear each letter.');

  const pick = (i) => {
    setActive(i);
    speak(`${alphabet[i][0]}. ${alphabet[i][0]} for ${alphabet[i][2][0][0]}`);
  };

  return (
    <>
      <PageHeader gameKey="alphabet" title={t('game_alphabet')} desc={t('desc_alphabet')} />
      <div className="container-page mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="card p-4 sm:p-6">
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-7">
            {alphabet.map(([l], i) => (
              <button
                key={l}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === active}
                className={`aspect-square rounded-2xl text-2xl font-extrabold transition hover:-translate-y-0.5 ${
                  i === active ? 'bg-teal text-white shadow-lift' : 'bg-mint-light text-teal-dark ring-1 ring-mint hover:bg-mint'
                }`}
              >
                {l}
                <span className="sr-only"> {l.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <article className="card p-6 text-center sm:p-8 animate-pop" key={letter}>
          <p className="text-8xl font-extrabold text-teal-dark">
            {letter}
            <span className="text-teal/60">{letter.toLowerCase()}</span>
          </p>
          <p className="mt-3 text-ink-soft">{sound}</p>
          <div className="mt-3 flex justify-center">
            <SpeakButton text={letter} label={t('listen')} />
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {words.map(([w, emoji, gu]) => (
              <li key={w}>
                <button type="button" onClick={() => speak(w)} className="w-full rounded-2xl bg-bg p-4 transition hover:-translate-y-0.5 hover:bg-mint-light">
                  <span className="block text-4xl" aria-hidden="true">{emoji}</span>
                  <span className="mt-2 block text-lg font-extrabold text-ink">{w}</span>
                  <span className="block text-sm text-ink-soft">{gu}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <button type="button" className="btn-soft" onClick={() => pick((active + 25) % 26)}>
              ← {t('back')}
            </button>
            <button type="button" className="btn-primary" onClick={() => pick((active + 1) % 26)}>
              {t('next')} →
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
