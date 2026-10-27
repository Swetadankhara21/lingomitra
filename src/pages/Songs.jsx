import { BookOpen, Music, Play, Square } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useSeo } from '../lib/seo.js';
import { canSpeak, stopSpeaking } from '../lib/speech.js';
import { songs } from '../data/songs.js';
import { PageHeader, SpeakButton } from '../components/ui.jsx';

/** Reads the song line by line with the browser voice, highlighting the current line. */
function useSingAlong() {
  const [line, setLine] = useState(-1);
  const cancelled = useRef(false);

  const stop = () => {
    cancelled.current = true;
    stopSpeaking();
    setLine(-1);
  };

  const play = (lines) => {
    if (!canSpeak()) return;
    stop();
    cancelled.current = false;
    const sayLine = (k) => {
      if (cancelled.current || k >= lines.length) {
        setLine(-1);
        return;
      }
      setLine(k);
      const u = new SpeechSynthesisUtterance(lines[k]);
      u.lang = 'en-IN';
      u.rate = 0.85;
      u.pitch = 1.15;
      u.onend = () => sayLine(k + 1);
      window.speechSynthesis.speak(u);
    };
    sayLine(0);
  };

  useEffect(() => stop, []);
  return { line, play, stop };
}

export default function Songs() {
  const { t } = useI18n();
  const [open, setOpen] = useState(songs[0].id);
  const { line, play, stop } = useSingAlong();

  useSeo('English Learning Songs & Rhymes', 'Original English learning songs and rhymes for kids and beginners – alphabet, days of the week, months, colours, numbers and tenses – with Gujarati meanings and read-along.');

  return (
    <>
      <PageHeader gameKey="songs" title={t('game_songs')} desc={t('desc_songs')} />
      <div className="container-page mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <nav className="card h-fit p-3" aria-label={t('game_songs')}>
          <ul className="grid gap-1">
            {songs.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    stop();
                    setOpen(s.id);
                  }}
                  aria-current={open === s.id}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left font-bold transition ${open === s.id ? 'bg-teal text-white' : 'text-ink hover:bg-mint-light'}`}
                >
                  <Music className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {songs
          .filter((s) => s.id === open)
          .map((s) => (
            <article key={s.id} className="card p-6 sm:p-8 animate-fade-up">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="chip">{t(s.level)}</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
                    {s.title}
                  </h2>
                </div>
                {canSpeak() ? (
                  line >= 0 ? (
                    <button type="button" className="btn-soft" onClick={stop}>
                      <Square className="h-4 w-4" aria-hidden="true" /> Stop
                    </button>
                  ) : (
                    <button type="button" className="btn-primary" onClick={() => play(s.lines)}>
                      <Play className="h-4 w-4" aria-hidden="true" /> {t('listen')}
                    </button>
                  )
                ) : (
                  <p className="text-sm text-ink-soft">{t('speechNotSupported')}</p>
                )}
              </div>
              <ol className="mt-6 grid gap-2">
                {s.lines.map((l, k) => (
                  <li key={k} className={`rounded-2xl px-4 py-3 text-lg font-semibold transition ${line === k ? 'bg-mint text-teal-dark scale-[1.01]' : 'bg-bg text-ink'}`}>
                    {l}
                  </li>
                ))}
              </ol>
              <h3 className="mt-8 flex items-center gap-2 font-extrabold text-ink"><BookOpen className="h-5 w-5 text-teal" aria-hidden="true" /> Words</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.words.map(([en, gu]) => (
                  <li key={en} className="flex items-center gap-2 rounded-2xl bg-mint-light px-3 py-2 ring-1 ring-mint">
                    <strong className="text-teal-dark">{en}</strong>
                    <span className="text-ink-soft">{gu}</span>
                    <SpeakButton text={en} className="!min-h-[32px] !px-2 !py-1" />
                  </li>
                ))}
              </ul>
            </article>
          ))}
      </div>
    </>
  );
}
