import { scrollToSection } from '../../hooks/useSectionNav';

/** Small chevron placed at the bottom of each section, scrolls to the next one. */
export function SectionArrow({ nextId }: { nextId: string }) {
  return (
    <button
      type="button"
      className="section-arrow"
      onClick={() => scrollToSection(nextId)}
      aria-label="Next section"
    >
      <span className="section-arrow-chev">▾</span>
    </button>
  );
}
