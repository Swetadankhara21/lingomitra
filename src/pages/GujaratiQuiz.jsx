import { useCallback, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { byLevel, shuffle } from '../lib/utils.js';
import { gujaratiQuiz } from '../data/gujaratiQuiz.js';
import { LevelPicker, PageHeader } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';

export default function GujaratiQuiz() {
  const { t } = useI18n();
  const { level } = useProgress();
  const [round, setRound] = useState(0);

  useSeo('Gujarati to English Quiz Game', 'Gujarati to English translation quiz game: pick the correct English sentence for everyday Gujarati sentences, with instant answers and simple explanations.');

  const questions = useMemo(
    () =>
      shuffle(byLevel(gujaratiQuiz, level, 10))
        .slice(0, 10)
        .map((q) => ({ prompt: q.gu, sub: 'ગુજરાતી → English', options: q.options, answer: q.answer, explanation: q.explanation, speak: q.options[q.answer] })),
    [level, round],
  );
  const restart = useCallback(() => setRound((r) => r + 1), []);

  return (
    <>
      <PageHeader emoji="🔁" title={t('game_gujarati')} desc={t('desc_gujarati')}>
        <LevelPicker />
      </PageHeader>
      <div className="container-page mt-8">
        <QuizEngine questions={questions} gameId="gujarati" onRestart={restart} />
      </div>
    </>
  );
}
