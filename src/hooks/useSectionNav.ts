import { useCallback, useEffect, useState } from 'react';
import { SECTION_ORDER } from '../constants/sections';

const SCROLL_THRESHOLD_PX = 120;
const HEADER_OFFSET_PX = 100;

/** Smooth-scroll to a section by id. Safe to call outside a React tree. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Drives the floating nav arrows: visibility on scroll, and prev/next
 * section helpers that detect the currently-visible section from the DOM.
 */
export function useSectionNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toBottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const currentIdx = useCallback(() => {
    const y = window.scrollY + HEADER_OFFSET_PX;
    let idx = 0;
    for (let i = 0; i < SECTION_ORDER.length; i++) {
      const el = document.getElementById(SECTION_ORDER[i]);
      if (el && el.offsetTop <= y) idx = i;
    }
    return idx;
  }, []);

  const toPrev = useCallback(() => {
    const i = currentIdx();
    scrollToSection(SECTION_ORDER[Math.max(0, i - 1)]);
  }, [currentIdx]);

  const toNext = useCallback(() => {
    const i = currentIdx();
    scrollToSection(SECTION_ORDER[Math.min(SECTION_ORDER.length - 1, i + 1)]);
  }, [currentIdx]);

  return { visible, toTop, toBottom, toPrev, toNext };
}
