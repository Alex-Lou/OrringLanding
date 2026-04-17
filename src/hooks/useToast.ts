import { useCallback, useEffect, useRef, useState } from 'react';
import { TOAST_DURATION_MS } from '../constants/config';

/** Minimal timed toast — one message visible at a time. */
export function useToast(durationMs: number = TOAST_DURATION_MS) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(true);
    timer.current = setTimeout(() => setVisible(false), durationMs);
  }, [durationMs]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return { visible, show };
}
