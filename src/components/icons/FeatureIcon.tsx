export type FeatureIconName = 'bell' | 'calendar' | 'cycle' | 'lock' | 'sparkle' | 'gift';

const SVG_PROPS = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Custom-drawn icon set used in the Features grid. currentColor → easy theming. */
export function FeatureIcon({ name }: { name: FeatureIconName }) {
  switch (name) {
    case 'bell':
      return (
        <svg {...SVG_PROPS}>
          <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
          <circle cx="18" cy="6" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...SVG_PROPS}>
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M3 10h18" />
          <path d="M8 3v4M16 3v4" />
          <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" opacity="0.35" />
        </svg>
      );
    case 'cycle':
      return (
        <svg {...SVG_PROPS}>
          <circle cx="12" cy="12" r="8" opacity="0.35" />
          <path d="M12 4a8 8 0 0 1 7.5 5" />
          <path d="M16 4h3.5v3.5" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...SVG_PROPS}>
          <rect x="5" y="10" width="14" height="10" rx="2.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...SVG_PROPS}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'gift':
      return (
        <svg {...SVG_PROPS}>
          <rect x="4" y="10" width="16" height="10" rx="1.5" />
          <path d="M4 14h16" />
          <path d="M12 10v10" />
          <circle cx="8.5" cy="8" r="2" />
          <circle cx="15.5" cy="8" r="2" />
          <path d="M8.5 10h7" />
        </svg>
      );
  }
}
