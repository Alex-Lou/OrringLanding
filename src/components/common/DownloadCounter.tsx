import { motion } from 'framer-motion';
import { useDownloadCount } from '../../hooks/useDownloadCount';

/** Shows total downloads of the latest APK asset, hidden while loading. */
export function DownloadCounter({ label }: { label: string }) {
  const count = useDownloadCount();
  if (count === null) return null;

  return (
    <motion.div
      className="download-counter"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
    >
      <span className="counter-icon">📥</span>
      <span className="counter-num">{count.toLocaleString()}</span>
      <span className="counter-label">{label}</span>
    </motion.div>
  );
}
