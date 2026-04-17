import type { T } from '../../i18n/useI18n';

/** Page footer — no animation, just copy. */
export function FooterSection({ t }: { t: T }) {
  return (
    <footer className="footer">
      <p>Orring — {t('footer')}</p>
      <p className="footer-small">{t('footerSub')}</p>
    </footer>
  );
}
