import { useCallback, useState } from 'react';
import { LANGS, translations, type LangCode, RTL_LANGS } from './translations';
import { STORAGE_KEYS } from '../constants/config';

/** Translation function; missing keys fall back to the raw key. */
export type T = (key: string) => string;

function detectBrowserLang(): LangCode {
  if (typeof navigator === 'undefined') return 'fr';
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.lang);
    if (stored && LANGS.some(l => l.code === stored)) return stored as LangCode;
  } catch { /* localStorage blocked */ }
  const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  const match = LANGS.find(l => l.code === nav);
  return match ? match.code : 'en';
}

function persistLang(l: LangCode) {
  try { localStorage.setItem(STORAGE_KEYS.lang, l); } catch { /* no-op */ }
}

/**
 * Single entry point for everything i18n-related. Handles detection,
 * persistence, the translation function and the RTL flag for the
 * root element.
 */
export function useI18n() {
  const [lang, setLangState] = useState<LangCode>(() => detectBrowserLang());

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    persistLang(l);
  }, []);

  const t = useCallback<T>((key: string) => translations[lang][key] || key, [lang]);

  return { lang, setLang, t, isRtl: RTL_LANGS.has(lang) };
}
