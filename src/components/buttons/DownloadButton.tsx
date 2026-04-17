import { motion } from 'framer-motion';
import { APK_URL } from '../../constants/config';
import { HOVER_SCALE, TAP_SCALE } from '../../constants/animations';

interface Props {
  label: string;
  onDownload?: () => void;
  /** 'primary' uses the hero gradient + box-shadow hover; 'cta' is the simpler CTA card variant. */
  variant?: 'primary' | 'cta';
  /** Staggered entry delay for the hero landing. Omit on whileInView-driven placements. */
  entranceDelay?: number;
  children?: React.ReactNode;
}

/**
 * Single source of truth for the APK download CTA. Used both in the hero
 * and the CTA card; pass variant + delay to adjust motion.
 */
export function DownloadButton({ label, onDownload, variant = 'primary', entranceDelay, children }: Props) {
  const entering = entranceDelay !== undefined
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: entranceDelay, duration: 0.6 },
      }
    : {};

  const hover = variant === 'primary'
    ? { scale: HOVER_SCALE, boxShadow: 'var(--shadow-download-hover)' }
    : { scale: HOVER_SCALE };

  return (
    <motion.a
      href={APK_URL}
      download
      onClick={onDownload}
      className={`download-btn ${variant === 'cta' ? 'cta-btn' : ''}`}
      whileHover={hover}
      whileTap={{ scale: TAP_SCALE }}
      {...entering}
    >
      {children ?? (
        <>
          <span className="download-icon">📲</span>
          {label}
        </>
      )}
    </motion.a>
  );
}
