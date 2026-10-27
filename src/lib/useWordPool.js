import { useEffect, useState } from 'react';
import { wordPool } from './wordPool.js';

/** Words for the chosen meaning language and level; null while loading. */
export function useWordPool(meaningLang, level) {
  const [pool, setPool] = useState(null);

  useEffect(() => {
    let alive = true;
    setPool(null);
    wordPool(meaningLang, level)
      .then((words) => alive && setPool(words))
      .catch(() => alive && setPool([]));
    return () => {
      alive = false;
    };
  }, [meaningLang, level]);

  return pool;
}
