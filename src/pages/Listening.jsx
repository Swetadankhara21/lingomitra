import { useCallback, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { canSpeak } from '../lib/speech.js';
import { shuffle } from '../lib/utils.js';
import { vocabulary } from '../data/vocabulary.js';
import { sentences } from '../data/sentences.js';
import { LevelPicker, PageHeader } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';

export default function Listening() {
  const { t } = useI18n();
  const { level } = useProgress();
  const [round, setRound] = useState(0);

  useSeo('English Listening Game', 'English listening practice game: listen to English words and sentences spoken aloud and choose what you heard.');

  const questions = useMemo(() => {
    const words = vocabulary.filter((w) => w.level === level).map((w) => w.word);
    const lines = sentences.filter((s) => s.level === level).map((s) => s.en);
    const pick = (pool, n) =>
      shuffle(pool)
        .slice(0, n)
        .map((text) => ({
          prompt: `🎧 ${t('listen')}…`,
          speak: text,
          options: [text, ...shuffle(pool.filter((o) => o !== text)).slice(0, 3)],
          answer: 0,
          explanation: text,
        }));
    return shuffle([...pick(words, 6), ...pick(lines, 4)]);
  }, [level, round, t]);
  const restart = useCallback(() => setRound((r) => r + 1), []);

  return (
    <>
      <PageHeader emoji="🎧" title={t('game_listening')} desc={t('desc_listening')}>
        <LevelPicker />
      </PageHeader>
      <div className="container-page mt-8">
        {canSpeak() ? (
          <QuizEngine questions={questions} gameId="listening" onRestart={restart} />
        ) : (
          <div className="card mx-auto max-w-xl p-8 text-center">
            <p className="text-5xl" aria-hidden="true">🔇</p>
            <p className="mt-4 font-semibold text-ink">{t('speechNotSupported')}</p>
          </div>
        )}
      </div>
    </>
  );
}
