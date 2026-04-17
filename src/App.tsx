import { useI18n } from './i18n/useI18n';
import { useToast } from './hooks/useToast';
import { useTheme } from './hooks/useTheme';
import { LangSelector } from './components/nav/LangSelector';
import { ThemeToggle } from './components/nav/ThemeToggle';
import { NavArrows } from './components/nav/NavArrows';
import { Particles } from './components/common/Particles';
import { DownloadToast } from './components/common/DownloadToast';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { InstallSection } from './components/sections/InstallSection';
import { ExplanationsSection } from './components/sections/ExplanationsSection';
import { CtaSection } from './components/sections/CtaSection';
import { SupportSection } from './components/sections/SupportSection';
import { FeedbackSection } from './components/sections/FeedbackSection';
import { FooterSection } from './components/sections/FooterSection';
import './App.css';

/**
 * Page shell — composes every section in display order. The heavy lifting
 * lives in dedicated components; this file should stay short.
 */
function App() {
  const { lang, setLang, t, isRtl } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const toast = useToast();

  return (
    <div className="app" dir={isRtl ? 'rtl' : 'ltr'}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <LangSelector lang={lang} setLang={setLang} />
      <NavArrows />
      <DownloadToast message={t('toast')} visible={toast.visible} />
      <Particles />

      <HeroSection t={t} onDownload={toast.show} />
      <FeaturesSection t={t} />
      <HowItWorksSection t={t} />
      <InstallSection t={t} />
      <ExplanationsSection t={t} />
      <CtaSection t={t} onDownload={toast.show} />
      <SupportSection t={t} />
      <FeedbackSection t={t} />
      <FooterSection t={t} />
    </div>
  );
}

export default App;
