import { CalendarCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { seededShuffle, todayKey } from '../lib/utils.js';
import { grammar } from '../data/grammar.js';
import { gujaratiQuiz } from '../data/gujaratiQuiz.js';
import { spelling } from '../data/spelling.js';
import { PageHeader, ResultCard } from '../components/ui.jsx';
import QuizEngine from '../components/QuizEngine.jsx';

const BONUS = 50;

/** Today's 10 questions - the same for everyone, new every day. */
function todaysQuestions(day) {
  const g = seededShuffle(grammar, `g${day}`).slice(0, 4).map((q) => ({ prompt: q.q, sub: q.topic, options: q.options, answer: q.answer, explanation: q.explanation }));
  const gu = seededShuffle(gujaratiQuiz, `gu${day}`).slice(0, 3).map((q) => ({ prompt: q.gu, sub: 'ગુજરાતી → English', options: q.options, answer: 0, explanation: q.explanation }));
  const sp = seededShuffle(spelling, `s${day}`).slice(0, 3).map((s) => ({ prompt: 'Which spelling is correct?', sub: 'Spelling', options: [s.correct, ...s.wrong], answer: 0, speak: s.correct }));
  return seededShuffle([...g, ...gu, ...sp], `all${day}`);
}

export default function DailyChallenge() {
  const { t } = useI18n();
  const { dailyDone, completeDaily, recordResult } = useProgress();
  const day = todayKey();
  const questions = useMemo(() => todaysQuestions(day), [day]);
  const done = dailyDone[day];

  useSeo('Daily English Challenge Game', 'Daily English challenge game: 10 new grammar, translation and spelling questions every day. Earn bonus points and keep your streak.');

  const finish = (correct, total) => {
    completeDaily(correct, total);
    recordResult('dailyBonus', 0, 0, BONUS);
  };

  return (
    <>
      <PageHeader gameKey="daily" title={t('game_daily')} desc={`${t('desc_daily')} (+${BONUS} ${t('points')})`} />
      <div className="container-page mt-8">
        {done ? (
          <ResultCard correct={done.correct} total={done.total}>
            <p className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-mint-light p-3 text-sm font-bold text-teal-dark ring-1 ring-mint"><CalendarCheck className="h-4 w-4" aria-hidden="true" /> {t('completed')} · {day} · {t('desc_daily')}</p>
          </ResultCard>
        ) : (
          <QuizEngine questions={questions} gameId="daily" onFinish={finish} />
        )}
      </div>
    </>
  );
}
