import { useEffect, useState } from 'react';
import { API } from '../constants/config';

/** GitHub stargazers count for the app repo. Null while loading/failed. */
export function useStarCount(): number | null {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(API.githubAppRepo)
      .then(r => r.json())
      .then((d: { stargazers_count?: number }) => {
        if (!cancelled && typeof d.stargazers_count === 'number') {
          setStars(d.stargazers_count);
        }
      })
      .catch(() => { /* silent */ });
    return () => { cancelled = true; };
  }, []);

  return stars;
}
