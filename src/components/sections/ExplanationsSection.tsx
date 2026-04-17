import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SectionArrow } from '../nav/SectionArrow';
import { titleEntrance, subtitleEntrance } from '../../constants/animations';
import type { T } from '../../i18n/useI18n';

interface ExpItem {
  emoji: string;
  tk: 'exp1Title' | 'exp2Title' | 'exp3Title' | 'exp4Title';
  bk: 'exp1Body' | 'exp2Body' | 'exp3Body' | 'exp4Body';
}

const ITEMS: readonly ExpItem[] = [
  { emoji: '🌙', tk: 'exp1Title', bk: 'exp1Body' },
  { emoji: '💠', tk: 'exp2Title', bk: 'exp2Body' },
  { emoji: '🌸', tk: 'exp3Title', bk: 'exp3Body' },
  { emoji: '💡', tk: 'exp4Title', bk: 'exp4Body' },
] as const;

/** Accordion of 4 informational cards; exactly one open at a time, all closed by default. */
export function ExplanationsSection({ t }: { t: T }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="explanations" className="explanations-section">
      <motion.h2 className="section-title" {...titleEntrance}>
        📖 {t('expTitle')}
      </motion.h2>
      <motion.p className="explanations-sub" {...subtitleEntrance}>
        {t('expSub')}
      </motion.p>

      <div className="explanations-cards">
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={item.tk}
              className={`exp-card ${isOpen ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button className="exp-header" onClick={() => setOpenIndex(isOpen ? null : i)}>
                <span className="exp-emoji">{item.emoji}</span>
                <span className="exp-title">{t(item.tk)}</span>
                <span className="exp-chevron">{isOpen ? '▼' : '▶'}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="exp-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' as const }}
                  >
                    <p>{t(item.bk)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <SectionArrow nextId="cta" />
    </section>
  );
}
