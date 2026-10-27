import { useCallback, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { byLevel, shuffle } from '../lib/utils.js';
import { spelling } from '../data/spelling.js';
import { LevelPicker, PageHeader } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';

export default function Spelling() {
  const { t } = useI18n();
  const { level } = useProgress();
  const [round, setRound] = useState(0);

  useSeo();

  const questions = useMemo(
    () =>
      shuffle(byLevel(spelling, level, 10))
        .slice(0, 10)
        .map((s) => ({
          prompt: t('spellingPrompt'),
          sub: t('game_spelling'),
          speak: s.correct,
          options: [s.correct, ...s.wrong],
          answer: 0,
          explanation: `${s.correct} – ${s.correct.toUpperCase().split('').join(' ')}`,
        })),
    [level, round, t],
  );
  const restart = useCallback(() => setRound((r) => r + 1), []);

  return (
    <>
      <PageHeader gameKey="spelling" title={t('game_spelling')} desc={t('desc_spelling')}>
        <LevelPicker />
      </PageHeader>
      <div className="container-page mt-8">
        <QuizEngine questions={questions} gameId="spelling" onRestart={restart} promptClass="text-3xl" />
      </div>
    </>
  );
}
