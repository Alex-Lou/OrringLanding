/**
 * All motion primitives in one place. Every section animation in the
 * landing should come from here — keeps timings coherent and tweakable.
 */

export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/** Button hover/tap scale pair, reused everywhere. */
export const HOVER_SCALE = 1.05;
export const HOVER_SCALE_SOFT = 1.04;
export const TAP_SCALE = 0.97;
export const TAP_SCALE_HARD = 0.95;

/** Staggered fade-up variant used for headings & cards. */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: EASE_OUT_QUINT },
  }),
} as const;

/** Gentle fade-in + scale variant used for hero cards & CTA. */
export const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
} as const;

/**
 * Factory for the `initial / whileInView / viewport / transition` pattern
 * that was repeated 15+ times in the old monolith. Keeps JSX readable.
 */
export function fadeInOnView(delay = 0, y = 30, duration = 0.6) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { duration, delay },
  };
}

/** Entry animation for section titles. */
export const titleEntrance = fadeInOnView(0, 30, 0.6);

/** Entry animation for subtitles/paragraphs following a title. */
export const subtitleEntrance = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true as const },
  transition: { duration: 0.6, delay: 0.1 },
};
