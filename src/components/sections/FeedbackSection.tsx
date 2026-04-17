import { motion, AnimatePresence } from 'framer-motion';
import { HOVER_SCALE_SOFT, TAP_SCALE, titleEntrance, subtitleEntrance } from '../../constants/animations';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';
import type { T } from '../../i18n/useI18n';

/** Contact form — posts to FormSubmit via the useFeedbackForm hook. */
export function FeedbackSection({ t }: { t: T }) {
  const { status, name, setName, email, setEmail, message, setMessage, submit } = useFeedbackForm();

  return (
    <section id="feedback" className="feedback-section">
      <motion.h2 className="section-title" {...titleEntrance}>
        💌 {t('feedbackTitle')}
      </motion.h2>
      <motion.p className="feedback-sub" {...subtitleEntrance}>
        {t('feedbackSub')}
      </motion.p>
      <motion.form
        className="feedback-form"
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder={t('feedbackName')}
          value={name}
          onChange={e => setName(e.target.value)}
          className="feedback-input"
        />
        <input
          type="email"
          placeholder={t('feedbackEmail')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="feedback-input"
        />
        <textarea
          placeholder={t('feedbackMessage')}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="feedback-textarea"
          required
          rows={4}
        />
        <motion.button
          type="submit"
          className="feedback-btn"
          disabled={status === 'sending'}
          whileHover={{ scale: HOVER_SCALE_SOFT }}
          whileTap={{ scale: TAP_SCALE }}
        >
          {status === 'sending' ? '...' : t('feedbackSend')}
        </motion.button>
        <AnimatePresence>
          {status === 'sent' && (
            <motion.p
              className="feedback-thanks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t('feedbackThanks')}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              className="feedback-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t('feedbackError')}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
}
