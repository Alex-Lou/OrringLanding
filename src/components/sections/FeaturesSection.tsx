import { motion } from 'framer-motion';
import { FeatureIcon, type FeatureIconName } from '../icons/FeatureIcon';
import { SectionArrow } from '../nav/SectionArrow';
import { fadeUp } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

interface Feature {
  icon: FeatureIconName;
  /** Translation-key prefix: f1 → uses `f1t` (title) + `f1d` (description). */
  tk: `f${1 | 2 | 3 | 4 | 5 | 6}`;
}

const FEATURES: readonly Feature[] = [
  { icon: 'bell', tk: 'f1' },
  { icon: 'calendar', tk: 'f2' },
  { icon: 'cycle', tk: 'f3' },
  { icon: 'lock', tk: 'f4' },
  { icon: 'sparkle', tk: 'f5' },
  { icon: 'gift', tk: 'f6' },
] as const;

/** Grid of 6 feature cards. Hover lifts each card via box-shadow. */
export function FeaturesSection({ t }: { t: T }) {
  return (
    <section id="features" className="features">
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
      >
        {t('featuresTitle')}
      </motion.h2>

      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.tk}
            className="feature-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            whileHover={{ y: -6, boxShadow: 'var(--shadow-sm)' }}
          >
            <span className="feature-icon-wrap">
              <FeatureIcon name={f.icon} />
            </span>
            <h3>{t(`${f.tk}t`)}</h3>
            <p>{t(`${f.tk}d`)}</p>
          </motion.div>
        ))}
      </div>
      <SectionArrow nextId="how" />
    </section>
  );
}
