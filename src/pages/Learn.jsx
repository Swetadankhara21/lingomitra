import { GraduationCap } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { GAMES, LEARN, gameByKey } from '../lib/games.js';
import { useSeo } from '../lib/seo.js';
import { GameCard, PageHeader } from '../components/ui.jsx';

export default function Learn() {
  const { t } = useI18n();
  useSeo('Learn English A to Z', 'Learn English from A to Z: alphabet with sounds, learning songs, short stories, daily phrases, common mistakes and a 50,000-word dictionary.');
  const items = [...LEARN, gameByKey('dictionary'), gameByKey('tips'), gameByKey('dailyWord')];
  return (
    <>
      <PageHeader icon={GraduationCap} title={t('moreToLearn')} desc={t('heroSub')} />
      <div className="container-page mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g, i) => (
          <GameCard key={g.key} game={g} index={i} />
        ))}
      </div>
      <div className="container-page mt-14">
        <h2 className="h-section">{t('allGames')}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.filter((g) => !items.includes(g)).map((g, i) => (
            <GameCard key={g.key} game={g} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
