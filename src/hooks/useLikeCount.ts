import { useCallback, useEffect, useState } from 'react';
import { API, STORAGE_KEYS } from '../constants/config';

/**
 * Like counter backed by abacus.jasoncameron.dev. One like per browser
 * (localStorage flag). Returns optimistic increment on network failure.
 */
export function useLikeCount() {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try { setLiked(localStorage.getItem(STORAGE_KEYS.liked) === '1'); } catch { /* ignore */ }

    let cancelled = false;
    fetch(API.likeGet)
      .then(r => r.json())
      .then((d: { value?: number }) => {
        if (!cancelled && typeof d.value === 'number') setCount(d.value);
      })
      .catch(() => { /* silent */ });
    return () => { cancelled = true; };
  }, []);

  const like = useCallback(() => {
    if (liked) return;
    setLiked(true);
    try { localStorage.setItem(STORAGE_KEYS.liked, '1'); } catch { /* ignore */ }
    fetch(API.likeHit)
      .then(r => r.json())
      .then((d: { value?: number }) => {
        if (typeof d.value === 'number') setCount(d.value);
      })
      .catch(() => setCount(c => (c ?? 0) + 1));
  }, [liked]);

  return { count, liked, like };
}
