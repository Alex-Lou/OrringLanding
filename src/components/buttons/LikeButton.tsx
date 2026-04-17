import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLikeCount } from '../../hooks/useLikeCount';
import { HOVER_SCALE_SOFT, TAP_SCALE_HARD } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

/** Heart button with optimistic count + flying-heart micro-animation. */
export function LikeButton({ t }: { t: T }) {
  const { count, liked, like } = useLikeCount();
  const [burst, setBurst] = useState(0);

  const handleLike = () => {
    if (liked) return;
    like();
    setBurst(b => b + 1);
  };

  return (
    <motion.button
      className={`like-btn ${liked ? 'liked' : ''}`}
      onClick={handleLike}
      whileHover={{ scale: liked ? 1 : HOVER_SCALE_SOFT }}
      whileTap={{ scale: TAP_SCALE_HARD }}
      disabled={liked}
      aria-label={t('likeBtn')}
    >
      <motion.span
        className="like-heart"
        animate={liked ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {liked ? '💖' : '🤍'}
      </motion.span>
      <span className="like-label">{t('likeBtn')}</span>
      {count !== null && <span className="support-count">{count.toLocaleString()}</span>}

      <AnimatePresence>
        {burst > 0 && (
          <motion.span
            key={burst}
            className="like-flying"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 1.6 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => setBurst(0)}
          >
            💜
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
