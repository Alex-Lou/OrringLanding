import { motion } from 'framer-motion';
import { SectionArrow } from '../nav/SectionArrow';
import { fadeUp, fadeIn } from '../../constants/animations';
import { SOURCE_URL } from '../../constants/config';
import type { T } from '../../i18n/useI18n';

const STEP_KEYS = ['installStep1', 'installStep2', 'installStep3', 'installStep4'] as const;

/** "Side-loading the APK" reassurance section. */
export function InstallSection({ t }: { t: T }) {
  return (
    <section id="install" className="install-help">
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        🛡️ {t('installTitle')}
      </motion.h2>
      <motion.div
        className="install-card"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="install-intro">{t('installP1')}</p>
        <div className="install-steps">
          {STEP_KEYS.map((key, i) => (
            <motion.div
              key={key}
              className="install-step"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <span className="install-num">{i + 1}</span>
              <span>{t(key)}</span>
            </motion.div>
          ))}
        </div>
        <p className="install-note">
          🔒 {t('installNote')}{' '}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="install-source-link"
          >
            {t('installSourceLink')}
          </a>
          .
        </p>
      </motion.div>
      <SectionArrow nextId="explanations" />
    </section>
  );
}
