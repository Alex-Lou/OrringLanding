import { motion } from 'framer-motion';
import { useStarCount } from '../../hooks/useStarCount';
import { SOURCE_URL } from '../../constants/config';
import { HOVER_SCALE_SOFT, TAP_SCALE } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

/** External link to the GitHub repo, shows live stargazers count. */
export function StarButton({ t }: { t: T }) {
  const stars = useStarCount();

  return (
    <motion.a
      href={SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="star-btn-inline"
      whileHover={{ scale: HOVER_SCALE_SOFT }}
      whileTap={{ scale: TAP_SCALE }}
    >
      <span className="star-emoji">⭐</span>
      <span className="star-label-text">{t('starBtn')}</span>
      {stars !== null && <span className="support-count">{stars.toLocaleString()}</span>}
    </motion.a>
  );
}
