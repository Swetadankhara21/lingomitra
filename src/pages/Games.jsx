import { Gamepad2 } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { GAMES } from '../lib/games.js';
import { useSeo } from '../lib/seo.js';
import { GameCard, PageHeader } from '../components/ui.jsx';

export default function Games() {
  const { t } = useI18n();
  useSeo();
  return (
    <>
      <PageHeader icon={Gamepad2} title={t('allGames')} desc={t('allGamesSub')} />
      <div className="container-page mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GAMES.map((g, i) => (
          <GameCard key={g.key} game={g} index={i} />
        ))}
      </div>
    </>
  );
}
