import { motion, AnimatePresence } from 'framer-motion';
import type { Theme } from '../../hooks/useTheme';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

/** Top-left pill — soleil/lune swap with soft rotate. */
export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="theme-toggle-icon"
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? '☀️' : '🌙'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
