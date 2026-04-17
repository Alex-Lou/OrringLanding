import type { CSSProperties } from 'react';
import type { LangCode } from '../../i18n/translations';

const FLAG_STYLE: CSSProperties = {
  display: 'block',
  borderRadius: '2px',
  boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
};

const FLAG_PROPS = { width: 22, height: 15, viewBox: '0 0 24 16', style: FLAG_STYLE } as const;

/** Inline SVG flags — render identically on every OS. */
export function Flag({ code }: { code: LangCode }) {
  switch (code) {
    case 'fr':
      return (
        <svg {...FLAG_PROPS} aria-label="FR">
          <rect width="8" height="16" fill="#0055A4" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#EF4135" />
        </svg>
      );
    case 'en':
      return (
        <svg {...FLAG_PROPS} aria-label="EN">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="3.5" />
          <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="1.8" />
        </svg>
      );
    case 'nl':
      return (
        <svg {...FLAG_PROPS} aria-label="NL">
          <rect width="24" height="5.33" fill="#AE1C28" />
          <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
          <rect y="10.67" width="24" height="5.33" fill="#21468B" />
        </svg>
      );
    case 'ru':
      return (
        <svg {...FLAG_PROPS} aria-label="RU">
          <rect width="24" height="5.33" fill="#FFFFFF" />
          <rect y="5.33" width="24" height="5.34" fill="#0039A6" />
          <rect y="10.67" width="24" height="5.33" fill="#D52B1E" />
        </svg>
      );
    case 'es':
      return (
        <svg {...FLAG_PROPS} aria-label="ES">
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      );
    case 'pt':
      return (
        <svg {...FLAG_PROPS} aria-label="PT (BR)">
          <rect width="24" height="16" fill="#009739" />
          <path d="M12 2 L22 8 L12 14 L2 8 Z" fill="#FEDF00" />
          <circle cx="12" cy="8" r="3" fill="#012169" />
        </svg>
      );
    case 'de':
      return (
        <svg {...FLAG_PROPS} aria-label="DE">
          <rect width="24" height="5.33" fill="#000000" />
          <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </svg>
      );
    case 'ar':
      return (
        <svg {...FLAG_PROPS} aria-label="AR (SA)">
          <rect width="24" height="16" fill="#006C35" />
          <rect x="4" y="6" width="16" height="1.5" fill="#FFFFFF" />
          <circle cx="12" cy="10" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'zh':
      return (
        <svg {...FLAG_PROPS} aria-label="ZH">
          <rect width="24" height="16" fill="#DE2910" />
          <path d="M5 3 L5.7 4.8 L7.5 4.8 L6.1 5.9 L6.6 7.7 L5 6.6 L3.4 7.7 L3.9 5.9 L2.5 4.8 L4.3 4.8 Z" fill="#FFDE00" />
          <circle cx="9" cy="2.5" r="0.6" fill="#FFDE00" />
          <circle cx="10.5" cy="4" r="0.6" fill="#FFDE00" />
          <circle cx="10.5" cy="6" r="0.6" fill="#FFDE00" />
          <circle cx="9" cy="7.5" r="0.6" fill="#FFDE00" />
        </svg>
      );
    case 'ja':
      return (
        <svg {...FLAG_PROPS} aria-label="JA">
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="4.8" fill="#BC002D" />
        </svg>
      );
  }
}
