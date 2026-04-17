import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  message: string;
  visible: boolean;
}

/** Bottom-of-screen confirmation toast, slides up from below. */
export function DownloadToast({ message, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="download-toast"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <span>✅</span> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
