import { motion } from 'framer-motion';
import { LikeButton } from '../buttons/LikeButton';
import { StarButton } from '../buttons/StarButton';
import { ShareButtons } from '../buttons/ShareButtons';
import { SectionArrow } from '../nav/SectionArrow';
import { titleEntrance, subtitleEntrance } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

/** Non-monetary support row (like, star, share). */
export function SupportSection({ t }: { t: T }) {
  return (
    <section id="support" className="support-section">
      <motion.h2 className="section-title" {...titleEntrance}>
        🫶 {t('supportTitle')}
      </motion.h2>
      <motion.p className="support-sub" {...subtitleEntrance}>
        {t('supportSub')}
      </motion.p>

      <motion.div
        className="support-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="support-item">
          <LikeButton t={t} />
          <span className="support-hint">{t('likeSub')}</span>
        </div>
        <div className="support-item">
          <StarButton t={t} />
          <span className="support-hint">{t('starLabel')}</span>
        </div>
      </motion.div>

      <motion.div
        className="share-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="share-heading">{t('shareTitle')}</h3>
        <ShareButtons t={t} />
      </motion.div>
      <SectionArrow nextId="feedback" />
    </section>
  );
}
