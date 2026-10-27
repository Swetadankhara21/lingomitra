import { BookMarked, BookOpen, Play, Square, Target } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useSeo } from '../lib/seo.js';
import { speak, stopSpeaking } from '../lib/speech.js';
import { stories } from '../data/stories.js';
import { PageHeader, SpeakButton } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';

function Story({ story, onBack }) {
  const { t } = useI18n();
  const [showGu, setShowGu] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [round, setRound] = useState(0);

  const questions = useMemo(
    () => story.quiz.map(([q, options]) => ({ prompt: q, options, answer: 0 })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [story, round],
  );

  return (
    <article className="card mx-auto max-w-3xl p-6 sm:p-10 animate-fade-up">
      <button type="button" className="btn-ghost -ml-3" onClick={onBack}>
        ← {t('back')}
      </button>
      <p className="chip mt-2">{t(story.level)}</p>
      <h2 className="mt-3 text-3xl font-extrabold text-ink">
        {story.title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={() => speak(story.text.join(' '), { rate: 0.85 })}>
          <Play className="h-4 w-4" aria-hidden="true" /> {t('listen')}
        </button>
        <button type="button" className="btn-soft" onClick={stopSpeaking}>
          <Square className="h-4 w-4" aria-hidden="true" /><span className="sr-only">Stop</span>
        </button>
        <button type="button" className="btn-soft" onClick={() => setShowGu((v) => !v)} aria-pressed={showGu}>
          ગુજરાતી
        </button>
      </div>
      {showGu && <p className="mt-4 rounded-2xl bg-mint-light p-4 font-semibold text-teal-dark ring-1 ring-mint animate-fade-up">{story.gu}</p>}
      <div className="mt-6 grid gap-4 text-lg leading-relaxed text-ink">
        {story.text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <h3 className="mt-8 flex items-center gap-2 font-extrabold text-ink"><BookOpen className="h-5 w-5 text-teal" aria-hidden="true" /> Words</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {story.words.map(([en, gu]) => (
          <li key={en} className="flex items-center gap-2 rounded-2xl bg-mint-light px-3 py-2 ring-1 ring-mint">
            <strong className="text-teal-dark">{en}</strong>
            <span className="text-ink-soft">{gu}</span>
            <SpeakButton text={en} className="!min-h-[32px] !px-2 !py-1" />
          </li>
        ))}
      </ul>
      <div className="mt-10">
        {quiz ? (
          <QuizEngine questions={questions} gameId="stories" onRestart={() => setRound((r) => r + 1)} />
        ) : (
          <button type="button" className="btn-primary w-full" onClick={() => setQuiz(true)}>
            <Target className="h-4 w-4" aria-hidden="true" /> {t('start')} quiz
          </button>
        )}
      </div>
    </article>
  );
}

export default function Stories() {
  const { t } = useI18n();
  const [openId, setOpenId] = useState(null);
  const open = stories.find((s) => s.id === openId);

  useSeo();

  return (
    <>
      <PageHeader gameKey="stories" title={t('game_stories')} desc={t('desc_stories')} />
      <div className="container-page mt-8">
        {open ? (
          <Story story={open} onBack={() => setOpenId(null)} />
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(s.id)}
                  className="card flex h-full w-full flex-col p-6 text-left transition hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-dark text-white" aria-hidden="true"><BookMarked className="h-6 w-6" /></span>
                  <span className="chip mt-3 w-fit">{t(s.level)}</span>
                  <span className="mt-2 text-xl font-extrabold text-ink">{s.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm text-ink-soft">{s.text[0]}</span>
                  <span className="mt-4 font-bold text-teal">{t('start')} →</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
