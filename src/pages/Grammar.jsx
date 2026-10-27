import { useCallback, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { byLevel, shuffle } from '../lib/utils.js';
import { grammar } from '../data/grammar.js';
import { LevelPicker, PageHeader } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';

const TOPICS = ['All', ...new Set(grammar.map((q) => q.topic))];

export default function Grammar() {
  const { t } = useI18n();
  const { level } = useProgress();
  const [topic, setTopic] = useState('All');
  const [round, setRound] = useState(0);

  useSeo('English Grammar Game', 'Free English grammar game: practise tenses, articles (a, an, the), prepositions, subject-verb agreement and sentence formation with explanations.');

  const questions = useMemo(() => {
    const pool = topic === 'All' ? byLevel(grammar, level, 10) : grammar.filter((q) => q.topic === topic);
    return shuffle(pool)
      .slice(0, 10)
      .map((q) => ({ prompt: q.q, sub: q.topic, options: q.options, answer: q.answer, explanation: q.explanation }));
  }, [level, topic, round]);
  const restart = useCallback(() => setRound((r) => r + 1), []);

  return (
    <>
      <PageHeader gameKey="grammar" title={t('game_grammar')} desc={t('desc_grammar')}>
        <div className="flex flex-col gap-3">
          <LevelPicker />
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((tp) => (
              <button
                key={tp}
                type="button"
                onClick={() => setTopic(tp)}
                aria-pressed={topic === tp}
                className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${topic === tp ? 'bg-mint text-teal-dark' : 'bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25'}`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>
      </PageHeader>
      <div className="container-page mt-8">
        <QuizEngine questions={questions} gameId="grammar" onRestart={restart} />
      </div>
    </>
  );
}
