import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LANGS, type LangCode } from '../../i18n/translations';
import { Flag } from '../icons/Flag';

interface Props {
  lang: LangCode;
  setLang: (l: LangCode) => void;
}

/** Top-right language picker with animated dropdown. */
export function LangSelector({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === lang)!;

  return (
    <div className="lang-selector">
      <button className="lang-btn" onClick={() => setOpen(!open)}>
        <span className="lang-option-flag"><Flag code={current.code} /></span>
        <span>{current.label}</span>
        <span className="lang-arrow">{open ? '▲' : '▼'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="lang-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                className={`lang-option ${code === lang ? 'active' : ''}`}
                onClick={() => { setLang(code); setOpen(false); }}
              >
                <span className="lang-option-flag"><Flag code={code} /></span>
                <span className="lang-option-label">{label}</span>
                {code === lang && <span className="lang-option-check">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
