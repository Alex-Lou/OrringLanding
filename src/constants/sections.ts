/** Section ids in the order they appear on the page. Used by NavArrows + SectionArrow. */
export const SECTION_ORDER = [
  'hero',
  'features',
  'how',
  'install',
  'explanations',
  'cta',
  'support',
  'feedback',
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];
