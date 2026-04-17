import { motion } from 'framer-motion';
import { DownloadButton } from '../buttons/DownloadButton';
import { DownloadCounter } from '../common/DownloadCounter';
import { SectionArrow } from '../nav/SectionArrow';
import { EASE_OUT_QUINT } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

const base = import.meta.env.BASE_URL;

/** Entry section — logo + title + main download CTA. */
export function HeroSection({ t, onDownload }: { t: T; onDownload: () => void }) {
  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-ring"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: EASE_OUT_QUINT }}
      >
        <img src={`${base}orring-logo.png`} alt="Orring" className="hero-logo" />
      </motion.div>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Orring
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {t('heroSub').split('\n').map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </motion.p>

      <DownloadButton label={t('download')} onDownload={onDownload} entranceDelay={0.9} />

      <motion.p
        className="hero-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {t('hint')}
      </motion.p>

      <DownloadCounter label={t('downloadsCount')} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="hero-arrow-wrap"
      >
        <SectionArrow nextId="features" />
      </motion.div>
    </section>
  );
}
