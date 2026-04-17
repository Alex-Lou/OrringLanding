import { useEffect, useState } from 'react';
import { API } from '../constants/config';

/** Polls the GitHub "latest release" endpoint once on mount. Returns null while loading/failed. */
export function useDownloadCount(assetName = 'Orring.apk'): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(API.githubLatestRelease)
      .then(r => r.json())
      .then((data: { assets?: Array<{ name: string; download_count: number }> }) => {
        if (cancelled) return;
        const apk = data.assets?.find(a => a.name === assetName);
        if (apk) setCount(apk.download_count);
      })
      .catch(() => { /* silent — counter just stays hidden */ });
    return () => { cancelled = true; };
  }, [assetName]);

  return count;
}
