import { motion } from 'framer-motion';
import { useState } from 'react';
import { SITE_URL, COPY_FEEDBACK_DURATION_MS } from '../../constants/config';
import { HOVER_SCALE, TAP_SCALE_HARD } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

interface ShareTarget {
  label: string;
  icon: string;
  color: string;
  urlFor: (msg: string, encodedMsg: string, encodedUrl: string) => string;
}

const SHARE_TARGETS: ShareTarget[] = [
  {
    label: 'WhatsApp', icon: '💬', color: '#25D366',
    urlFor: (_m, em) => `https://wa.me/?text=${em}`,
  },
  {
    label: 'Telegram', icon: '✈️', color: '#0088cc',
    urlFor: (msg, _em, eu) => {
      const body = encodeURIComponent(msg.replace(SITE_URL, '').trim());
      return `https://t.me/share/url?url=${eu}&text=${body}`;
    },
  },
  {
    label: 'Email', icon: '✉️', color: '#8B7FB8',
    urlFor: (_m, em) => `mailto:?subject=Orring&body=${em}`,
  },
  {
    label: 'X', icon: '𝕏', color: '#000000',
    urlFor: (_m, em) => `https://twitter.com/intent/tweet?text=${em}`,
  },
];

export function ShareButtons({ t }: { t: T }) {
  const [copied, setCopied] = useState(false);
  const msg = t('shareMsg');
  const encodedMsg = encodeURIComponent(msg);
  const encodedUrl = encodeURIComponent(SITE_URL);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch { /* clipboard unavailable — silent */ }
  };

  return (
    <div className="share-buttons-row">
      {SHARE_TARGETS.map(s => (
        <motion.a
          key={s.label}
          href={s.urlFor(msg, encodedMsg, encodedUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          whileHover={{ y: -3, scale: HOVER_SCALE }}
          whileTap={{ scale: TAP_SCALE_HARD }}
          title={s.label}
          style={{ ['--share-color' as string]: s.color }}
        >
          <span className="share-icon">{s.icon}</span>
          <span className="share-label">{s.label}</span>
        </motion.a>
      ))}
      <motion.button
        onClick={handleCopy}
        className={`share-btn share-copy ${copied ? 'copied' : ''}`}
        whileHover={{ y: -3, scale: HOVER_SCALE }}
        whileTap={{ scale: TAP_SCALE_HARD }}
        title={t('copyLink')}
      >
        <span className="share-icon">{copied ? '✓' : '🔗'}</span>
        <span className="share-label">{copied ? t('copied') : t('copyLink')}</span>
      </motion.button>
    </div>
  );
}
