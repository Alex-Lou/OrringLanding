import { motion, AnimatePresence } from 'framer-motion';
import { useSectionNav } from '../../hooks/useSectionNav';
import { NavGlyph, type NavGlyphKind } from '../icons/NavGlyph';

interface Btn {
  kind: NavGlyphKind;
  title: string;
  ariaLabel: string;
  onClick: () => void;
}

/** Floating vertical cluster with top/prev/next/bottom page navigation. */
export function NavArrows() {
  const { visible, toTop, toPrev, toNext, toBottom } = useSectionNav();

  const buttons: Btn[] = [
    { kind: 'top', title: 'Haut de la page', ariaLabel: 'Top', onClick: toTop },
    { kind: 'prev', title: 'Section précédente', ariaLabel: 'Previous', onClick: toPrev },
    { kind: 'next', title: 'Section suivante', ariaLabel: 'Next', onClick: toNext },
    { kind: 'bottom', title: 'Bas de la page', ariaLabel: 'Bottom', onClick: toBottom },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="nav-arrows"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25 }}
        >
          {buttons.map(b => (
            <button
              key={b.kind}
              type="button"
              className="nav-arrow-btn"
              onClick={b.onClick}
              title={b.title}
              aria-label={b.ariaLabel}
            >
              <NavGlyph kind={b.kind} />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
