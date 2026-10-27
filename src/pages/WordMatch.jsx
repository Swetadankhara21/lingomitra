import { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { useProgress } from '../lib/progress.jsx';
import { useSeo } from '../lib/seo.js';
import { shuffle } from '../lib/utils.js';
import { useWordPool } from '../lib/useWordPool.js';
import { LevelPicker, Loading, PageHeader, ResultCard } from '../components/ui.jsx';
import MeaningLangPicker from '../components/MeaningLangPicker.jsx';

const PAIRS = 6;

export default function WordMatch() {
  const { t, meaningLang: uiMeaningLang } = useI18n();
  const { level, recordResult } = useProgress();
  const [meaningLang, setMeaningLang] = useState(uiMeaningLang);
  const pool = useWordPool(meaningLang, level);
  const [round, setRound] = useState(0);
  const [open, setOpen] = useState([]); // indexes face-up right now (max 2)
  const [matched, setMatched] = useState([]); // pair ids found
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(null);

  useSeo('Word Match Memory Game', 'English word match memory game: flip 3D cards and pair English words with their Gujarati, Hindi, German or Polish meanings.');

  // 6 words → 12 cards (word + meaning), shuffled.
  const cards = useMemo(() => {
    if (!pool) return [];
    const words = shuffle(pool.filter((w) => w.meaning.length <= 40)).slice(0, PAIRS);
    return shuffle(words.flatMap((w, id) => [
      { id, kind: 'word', text: w.word },
      { id, kind: 'meaning', text: w.meaning },
    ]));
  }, [pool, round]);

  useEffect(() => {
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setDone(null);
  }, [cards]);

  // Two open cards: keep them if they match, otherwise flip back after a moment.
  useEffect(() => {
    if (open.length !== 2) return undefined;
    const [a, b] = open.map((i) => cards[i]);
    if (a.id === b.id) {
      const next = [...matched, a.id];
      setMatched(next);
      setOpen([]);
      if (next.length === PAIRS) {
        // 6 moves is perfect; each 2 extra moves costs a point.
        const score = Math.max(1, PAIRS - Math.floor((moves - PAIRS) / 2));
        recordResult('match', score, PAIRS);
        setDone(score);
      }
      return undefined;
    }
    const timer = setTimeout(() => setOpen([]), 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const flip = (i) => {
    if (open.length === 2 || open.includes(i) || matched.includes(cards[i].id)) return;
    if (open.length === 1) setMoves((m) => m + 1);
    setOpen([...open, i]);
  };

  return (
    <>
      <PageHeader gameKey="match" title={t('game_match')} desc={t('desc_match')}>
        <div className="flex flex-col gap-3">
          <LevelPicker />
          <MeaningLangPicker value={meaningLang} onChange={setMeaningLang} />
        </div>
      </PageHeader>
      <div className="container-page mt-8">
        {!pool ? (
          <Loading />
        ) : done !== null ? (
          <ResultCard correct={done} total={PAIRS} onRestart={() => setRound((r) => r + 1)}>
            <p className="mt-3 text-sm font-bold text-ink-soft">
              {t('moves')}: {moves}
            </p>
          </ResultCard>
        ) : (
          <div className="card mx-auto max-w-3xl p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between text-sm font-bold text-ink-soft">
              <span className="chip">
                {t('pairs')}: {matched.length} / {PAIRS}
              </span>
              <span className="chip">
                {t('moves')}: {moves}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {cards.map((c, i) => {
                const isMatched = matched.includes(c.id);
                const isOpen = isMatched || open.includes(i);
                return (
                  <button
                    key={`${c.id}-${c.kind}`}
                    type="button"
                    onClick={() => flip(i)}
                    className={`flip h-28 sm:h-32 ${isOpen ? 'is-open' : ''}`}
                    aria-label={isOpen ? c.text : `Card ${i + 1}`}
                    disabled={isMatched}
                  >
                    <span className="flip-inner">
                      <span className="flip-face icon-3d !absolute bg-gradient-to-br from-teal to-teal-dark">
                        <Sparkles className="relative h-8 w-8 text-mint" aria-hidden="true" />
                      </span>
                      <span
                        className={`flip-face flip-back border-2 text-sm sm:text-base ${
                          isMatched ? 'border-good bg-green-50 text-green-800' : c.kind === 'word' ? 'border-mint bg-white text-teal-dark' : 'border-mint bg-mint-light text-ink'
                        }`}
                      >
                        {c.text}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
