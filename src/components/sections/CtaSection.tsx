import { motion } from 'framer-motion';
import { DownloadButton } from '../buttons/DownloadButton';
import { SectionArrow } from '../nav/SectionArrow';
import { fadeIn } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

const base = import.meta.env.BASE_URL;

/** Secondary call-to-action card further down the page. */
export function CtaSection({ t, onDownload }: { t: T; onDownload: () => void }) {
  return (
    <section id="cta" className="cta">
      <motion.div
        className="cta-card"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img src={`${base}LandingIcon.png`} alt="Orring" className="cta-logo" />
        <h2>{t('ctaTitle')}</h2>
        <p>
          {t('ctaSub').split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>
        <DownloadButton variant="cta" label={t('ctaBtn')} onDownload={onDownload}>
          📲 {t('ctaBtn')}
        </DownloadButton>
      </motion.div>
      <SectionArrow nextId="support" />
    </section>
  );
}
