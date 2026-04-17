import { motion } from 'framer-motion';
import { SectionArrow } from '../nav/SectionArrow';
import { fadeUp } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

const STEP_KEYS = ['s1', 's2', 's3'] as const;

/** Three numbered steps explaining the flow. */
export function HowItWorksSection({ t }: { t: T }) {
  return (
    <section id="how" className="how-it-works">
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        {t('howTitle')}
      </motion.h2>

      <div className="steps">
        {STEP_KEYS.map((sk, i) => (
          <motion.div
            key={sk}
            className="step"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <div className="step-number">{i + 1}</div>
            <h3>{t(`${sk}t`)}</h3>
            <p>{t(`${sk}d`)}</p>
          </motion.div>
        ))}
      </div>
      <SectionArrow nextId="install" />
    </section>
  );
}
