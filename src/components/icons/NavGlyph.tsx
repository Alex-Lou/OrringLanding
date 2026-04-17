export type NavGlyphKind = 'top' | 'prev' | 'next' | 'bottom';

const SVG_PROPS = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const PATH_PROPS = {
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const PATHS: Record<NavGlyphKind, string> = {
  top: 'M8 3 L8 13 M8 3 L4 7 M8 3 L12 7 M4 1 L12 1',
  prev: 'M8 3 L8 13 M4 7 L8 3 L12 7',
  next: 'M8 13 L8 3 M4 9 L8 13 L12 9',
  bottom: 'M8 13 L8 3 M4 9 L8 13 L12 9 M4 15 L12 15',
};

/** Four arrow glyphs for the floating page-navigation cluster. */
export function NavGlyph({ kind }: { kind: NavGlyphKind }) {
  return (
    <svg {...SVG_PROPS}>
      <path d={PATHS[kind]} {...PATH_PROPS} />
    </svg>
  );
}
