import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import './App.css';

// ─── i18n translations ───
const LANGS = [
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'ar', flag: '🇸🇦', label: 'AR' },
  { code: 'zh', flag: '🇨🇳', label: 'ZH' },
  { code: 'ja', flag: '🇯🇵', label: 'JA' },
] as const;

type LangCode = (typeof LANGS)[number]['code'];

const i18n: Record<LangCode, Record<string, string>> = {
  fr: {
    heroSub: 'Ton compagnon pour suivre ton anneau contraceptif,\nsimplement et en toute sérénité.',
    download: 'Télécharger gratuitement',
    hint: 'Android • 100% gratuit • Sans pub • Sans compte',
    featuresTitle: 'Tout ce dont tu as besoin',
    f1t: 'Rappels intelligents', f1d: 'Notifications J-7, J-1 et Jour J pour ne jamais oublier une insertion ou un retrait.',
    f2t: 'Calendrier visuel', f2d: "12 mois en un coup d'œil avec codes couleur. Chaque jour est tappable pour ajouter des notes.",
    f3t: 'Suivi du cycle', f3d: 'Anneau animé avec countdown, suivi des règles et historique complet de tes cycles.',
    f4t: 'Privé et local', f4d: 'Aucune donnée envoyée. Tout reste sur ton téléphone. Pas de compte, pas de serveur.',
    f5t: 'Interface douce', f5d: 'Design rose poudré, animations fluides et navigation intuitive pensée pour toi.',
    f6t: '100% gratuit', f6d: "Pas de pub, pas d'achat intégré, pas d'abonnement. Un cadeau, tout simplement.",
    howTitle: 'Comment ça marche',
    s1t: 'Installe', s1d: "Télécharge l'APK et installe-la sur ton Android.",
    s2t: 'Configure', s2d: "Indique quand tu as mis ton anneau — aujourd'hui ou une date antérieure.",
    s3t: "C'est tout !", s3d: 'Orring calcule tout : retrait, pause, prochaine insertion. Tu reçois des rappels automatiques.',
    ctaTitle: 'Prête à simplifier ton suivi ?',
    ctaSub: 'Orring est un projet personnel, fait avec amour.\nGratuit pour toujours, sans pub, sans tracking.',
    ctaBtn: 'Télécharger Orring',
    footer: 'Fait avec ❤️',
    footerSub: 'Aucune donnée collectée • 100% local',
    toast: 'Téléchargement lancé ! Vérifie tes notifications ou ton dossier Téléchargements.',
    installTitle: 'Installation facile',
    installP1: "Comme Orring n'est pas sur le Play Store, Android affiche un message de sécurité — c'est normal pour toute application téléchargée directement.",
    installStep1: 'Ouvre le fichier téléchargé',
    installStep2: "Autorise l'installation depuis cette source",
    installStep3: "Si ton téléphone propose un scan, accepte ou ignore — l'app est 100% sûre",
    installStep4: 'Installe et profite !',
    installNote: "Le code source est ouvert et vérifiable. Aucune donnée n'est collectée ni envoyée.",
  },
  en: {
    heroSub: 'Your companion to track your contraceptive ring,\nsimply and with peace of mind.',
    download: 'Download for free',
    hint: 'Android • 100% free • No ads • No account',
    featuresTitle: 'Everything you need',
    f1t: 'Smart reminders', f1d: 'Notifications D-7, D-1 and D-Day so you never forget an insertion or removal.',
    f2t: 'Visual calendar', f2d: '12 months at a glance with color codes. Each day is tappable to add notes.',
    f3t: 'Cycle tracking', f3d: 'Animated ring with countdown, period tracking and full cycle history.',
    f4t: 'Private & local', f4d: 'No data sent. Everything stays on your phone. No account, no server.',
    f5t: 'Gentle interface', f5d: 'Soft pink design, smooth animations and intuitive navigation made for you.',
    f6t: '100% free', f6d: 'No ads, no in-app purchase, no subscription. A gift, plain and simple.',
    howTitle: 'How it works',
    s1t: 'Install', s1d: 'Download the APK and install it on your Android.',
    s2t: 'Configure', s2d: "Tell it when you inserted your ring — today or an earlier date.",
    s3t: "That's it!", s3d: 'Orring calculates everything: removal, break, next insertion. You get automatic reminders.',
    ctaTitle: 'Ready to simplify your tracking?',
    ctaSub: 'Orring is a personal project, made with love.\nFree forever, no ads, no tracking.',
    ctaBtn: 'Download Orring',
    footer: 'Made with ❤️',
    footerSub: 'No data collected • 100% local',
    toast: 'Download started! Check your notifications or Downloads folder.',
    installTitle: 'Easy installation',
    installP1: "Since Orring isn't on the Play Store, Android shows a security warning — this is normal for any directly downloaded app.",
    installStep1: 'Open the downloaded file',
    installStep2: 'Allow installation from this source',
    installStep3: "If your phone offers a scan, accept or skip — the app is 100% safe",
    installStep4: 'Install and enjoy!',
    installNote: 'The source code is open and verifiable. No data is collected or sent.',
  },
  es: {
    heroSub: 'Tu compañera para seguir tu anillo anticonceptivo,\nde forma sencilla y con tranquilidad.',
    download: 'Descargar gratis',
    hint: 'Android • 100% gratis • Sin anuncios • Sin cuenta',
    featuresTitle: 'Todo lo que necesitas',
    f1t: 'Recordatorios inteligentes', f1d: 'Notificaciones D-7, D-1 y Día D para no olvidar nunca una inserción o extracción.',
    f2t: 'Calendario visual', f2d: '12 meses de un vistazo con códigos de colores. Cada día se puede tocar para añadir notas.',
    f3t: 'Seguimiento del ciclo', f3d: 'Anillo animado con cuenta atrás, seguimiento de la regla e historial completo.',
    f4t: 'Privado y local', f4d: 'Ningún dato enviado. Todo se queda en tu teléfono. Sin cuenta, sin servidor.',
    f5t: 'Interfaz suave', f5d: 'Diseño rosa empolvado, animaciones fluidas y navegación intuitiva.',
    f6t: '100% gratis', f6d: 'Sin anuncios, sin compras, sin suscripción. Un regalo, así de simple.',
    howTitle: 'Cómo funciona',
    s1t: 'Instala', s1d: 'Descarga el APK e instálalo en tu Android.',
    s2t: 'Configura', s2d: 'Indica cuándo pusiste tu anillo — hoy o una fecha anterior.',
    s3t: '¡Eso es todo!', s3d: 'Orring lo calcula todo: extracción, pausa, próxima inserción. Recibes recordatorios automáticos.',
    ctaTitle: '¿Lista para simplificar tu seguimiento?',
    ctaSub: 'Orring es un proyecto personal, hecho con amor.\nGratis para siempre, sin anuncios, sin rastreo.',
    ctaBtn: 'Descargar Orring',
    footer: 'Hecho con ❤️',
    footerSub: 'Ningún dato recopilado • 100% local',
    toast: 'Descarga iniciada. Revisa tus notificaciones o la carpeta Descargas.',
    installTitle: 'Instalación fácil',
    installP1: 'Como Orring no está en Play Store, Android muestra un aviso de seguridad — es normal para cualquier app descargada directamente.',
    installStep1: 'Abre el archivo descargado',
    installStep2: 'Permite la instalación desde esta fuente',
    installStep3: 'Si tu teléfono ofrece un escaneo, acepta u omite — la app es 100% segura',
    installStep4: '¡Instala y disfruta!',
    installNote: 'El código fuente es abierto y verificable. No se recopila ni envía ningún dato.',
  },
  pt: {
    heroSub: 'Sua companheira para acompanhar seu anel contraceptivo,\nde forma simples e tranquila.',
    download: 'Baixar grátis',
    hint: 'Android • 100% grátis • Sem anúncios • Sem conta',
    featuresTitle: 'Tudo o que você precisa',
    f1t: 'Lembretes inteligentes', f1d: 'Notificações D-7, D-1 e Dia D para nunca esquecer uma inserção ou remoção.',
    f2t: 'Calendário visual', f2d: '12 meses em um olhar com códigos de cores. Cada dia é tocável para adicionar notas.',
    f3t: 'Acompanhamento do ciclo', f3d: 'Anel animado com contagem regressiva, rastreio da menstruação e histórico completo.',
    f4t: 'Privado e local', f4d: 'Nenhum dado enviado. Tudo fica no seu celular. Sem conta, sem servidor.',
    f5t: 'Interface suave', f5d: 'Design rosa suave, animações fluidas e navegação intuitiva feita para você.',
    f6t: '100% grátis', f6d: 'Sem anúncios, sem compras, sem assinatura. Um presente, simplesmente.',
    howTitle: 'Como funciona',
    s1t: 'Instale', s1d: 'Baixe o APK e instale no seu Android.',
    s2t: 'Configure', s2d: 'Indique quando colocou seu anel — hoje ou uma data anterior.',
    s3t: 'Pronto!', s3d: 'Orring calcula tudo: remoção, pausa, próxima inserção. Você recebe lembretes automáticos.',
    ctaTitle: 'Pronta para simplificar seu acompanhamento?',
    ctaSub: 'Orring é um projeto pessoal, feito com amor.\nGrátis para sempre, sem anúncios, sem rastreio.',
    ctaBtn: 'Baixar Orring',
    footer: 'Feito com ❤️',
    footerSub: 'Nenhum dado coletado • 100% local',
    toast: 'Download iniciado! Verifique suas notificações ou a pasta Downloads.',
    installTitle: 'Instalação fácil',
    installP1: 'Como o Orring não está na Play Store, o Android exibe um aviso de segurança — é normal para qualquer app baixado diretamente.',
    installStep1: 'Abra o arquivo baixado',
    installStep2: 'Permita a instalação desta fonte',
    installStep3: 'Se seu celular oferecer um scan, aceite ou pule — o app é 100% seguro',
    installStep4: 'Instale e aproveite!',
    installNote: 'O código-fonte é aberto e verificável. Nenhum dado é coletado ou enviado.',
  },
  de: {
    heroSub: 'Dein Begleiter zur Verfolgung deines Verhütungsrings,\neinfach und mit Gelassenheit.',
    download: 'Kostenlos herunterladen',
    hint: 'Android • 100% kostenlos • Keine Werbung • Kein Konto',
    featuresTitle: 'Alles was du brauchst',
    f1t: 'Intelligente Erinnerungen', f1d: 'Benachrichtigungen T-7, T-1 und Tag X, damit du nie ein Einsetzen oder Entfernen vergisst.',
    f2t: 'Visueller Kalender', f2d: '12 Monate auf einen Blick mit Farbcodes. Jeder Tag ist antippbar für Notizen.',
    f3t: 'Zyklusverfolgung', f3d: 'Animierter Ring mit Countdown, Periodentracking und vollständiger Zyklushistorie.',
    f4t: 'Privat & lokal', f4d: 'Keine Daten gesendet. Alles bleibt auf deinem Handy. Kein Konto, kein Server.',
    f5t: 'Sanfte Oberfläche', f5d: 'Zartes Rosa-Design, flüssige Animationen und intuitive Navigation.',
    f6t: '100% kostenlos', f6d: 'Keine Werbung, keine In-App-Käufe, kein Abo. Ein Geschenk, ganz einfach.',
    howTitle: 'So funktioniert es',
    s1t: 'Installieren', s1d: 'Lade die APK herunter und installiere sie auf deinem Android.',
    s2t: 'Konfigurieren', s2d: 'Gib an, wann du deinen Ring eingesetzt hast — heute oder ein früheres Datum.',
    s3t: 'Das war\'s!', s3d: 'Orring berechnet alles: Entfernung, Pause, nächstes Einsetzen. Du bekommst automatische Erinnerungen.',
    ctaTitle: 'Bereit, dein Tracking zu vereinfachen?',
    ctaSub: 'Orring ist ein persönliches Projekt, mit Liebe gemacht.\nFür immer kostenlos, ohne Werbung, ohne Tracking.',
    ctaBtn: 'Orring herunterladen',
    footer: 'Mit ❤️ gemacht',
    footerSub: 'Keine Daten gesammelt • 100% lokal',
    toast: 'Download gestartet! Prüfe deine Benachrichtigungen oder den Download-Ordner.',
    installTitle: 'Einfache Installation',
    installP1: 'Da Orring nicht im Play Store ist, zeigt Android eine Sicherheitswarnung — das ist normal für direkt heruntergeladene Apps.',
    installStep1: 'Öffne die heruntergeladene Datei',
    installStep2: 'Erlaube die Installation aus dieser Quelle',
    installStep3: 'Wenn dein Handy einen Scan anbietet, akzeptiere oder überspringe — die App ist 100% sicher',
    installStep4: 'Installiere und genieße!',
    installNote: 'Der Quellcode ist offen und überprüfbar. Es werden keine Daten gesammelt oder gesendet.',
  },
  ar: {
    heroSub: 'رفيقتك لمتابعة حلقتك المانعة للحمل،\nببساطة وبكل طمأنينة.',
    download: 'تحميل مجاني',
    hint: 'أندرويد • مجاني 100% • بدون إعلانات • بدون حساب',
    featuresTitle: 'كل ما تحتاجينه',
    f1t: 'تذكيرات ذكية', f1d: 'إشعارات قبل 7 أيام، يوم واحد واليوم نفسه حتى لا تنسي أبداً.',
    f2t: 'تقويم مرئي', f2d: '12 شهراً بنظرة واحدة مع رموز ألوان. كل يوم قابل للنقر لإضافة ملاحظات.',
    f3t: 'متابعة الدورة', f3d: 'حلقة متحركة مع عد تنازلي، تتبع الدورة الشهرية وسجل كامل.',
    f4t: 'خاص ومحلي', f4d: 'لا بيانات مرسلة. كل شيء يبقى على هاتفك. بدون حساب، بدون خادم.',
    f5t: 'واجهة ناعمة', f5d: 'تصميم وردي ناعم، رسوم متحركة سلسة وتنقل بديهي.',
    f6t: 'مجاني 100%', f6d: 'بدون إعلانات، بدون مشتريات، بدون اشتراك. هدية، ببساطة.',
    howTitle: 'كيف يعمل',
    s1t: 'ثبّتي', s1d: 'حمّلي ملف APK وثبّتيه على أندرويد.',
    s2t: 'اضبطي', s2d: 'حددي متى وضعتِ حلقتك — اليوم أو تاريخ سابق.',
    s3t: 'هذا كل شيء!', s3d: 'Orring يحسب كل شيء: الإزالة، الاستراحة، الإدخال التالي. تتلقين تذكيرات تلقائية.',
    ctaTitle: 'مستعدة لتبسيط متابعتك؟',
    ctaSub: 'Orring مشروع شخصي، صنع بحب.\nمجاني للأبد، بدون إعلانات، بدون تتبع.',
    ctaBtn: 'تحميل Orring',
    footer: 'صنع بـ ❤️',
    footerSub: 'لا بيانات مجموعة • محلي 100%',
    toast: 'بدأ التحميل! تحققي من الإشعارات أو مجلد التنزيلات.',
    installTitle: 'تثبيت سهل',
    installP1: 'بما أن Orring ليس على متجر Play، يعرض أندرويد تحذيراً أمنياً — هذا طبيعي لأي تطبيق يتم تحميله مباشرة.',
    installStep1: 'افتحي الملف المحمّل',
    installStep2: 'اسمحي بالتثبيت من هذا المصدر',
    installStep3: 'إذا عرض هاتفك فحصاً، اقبلي أو تخطي — التطبيق آمن 100%',
    installStep4: 'ثبّتي واستمتعي!',
    installNote: 'الكود المصدري مفتوح وقابل للتحقق. لا يتم جمع أو إرسال أي بيانات.',
  },
  zh: {
    heroSub: '你的避孕环追踪伴侣，\n简单又安心。',
    download: '免费下载',
    hint: 'Android • 完全免费 • 无广告 • 无需账号',
    featuresTitle: '你需要的一切',
    f1t: '智能提醒', f1d: '提前7天、1天和当天通知，永不忘记放入或取出。',
    f2t: '可视日历', f2d: '12个月一目了然，彩色编码。每天可点击添加笔记。',
    f3t: '周期追踪', f3d: '动画环形倒计时，经期追踪和完整周期历史。',
    f4t: '私密本地', f4d: '不发送任何数据。一切留在手机上。无需账号，无需服务器。',
    f5t: '温柔界面', f5d: '柔粉色设计，流畅动画和直觉式导航。',
    f6t: '完全免费', f6d: '无广告，无内购，无订阅。一份礼物，就这么简单。',
    howTitle: '如何使用',
    s1t: '安装', s1d: '下载APK并安装到你的Android手机。',
    s2t: '配置', s2d: '告诉它你何时放入了环——今天或更早的日期。',
    s3t: '就这样！', s3d: 'Orring计算一切：取出、休息、下次放入。你会收到自动提醒。',
    ctaTitle: '准备好简化你的追踪了吗？',
    ctaSub: 'Orring是个人项目，用爱制作。\n永远免费，无广告，无追踪。',
    ctaBtn: '下载 Orring',
    footer: '用 ❤️ 制作',
    footerSub: '不收集数据 • 100%本地',
    toast: '下载已开始！请查看通知或下载文件夹。',
    installTitle: '轻松安装',
    installP1: '由于Orring不在Play商店，Android会显示安全提示——这对于直接下载的应用是正常的。',
    installStep1: '打开已下载的文件',
    installStep2: '允许从此来源安装',
    installStep3: '如果手机提供扫描，接受或跳过——应用100%安全',
    installStep4: '安装并享受！',
    installNote: '源代码开放可验证。不收集或发送任何数据。',
  },
  ja: {
    heroSub: 'あなたの避妊リングを追跡するパートナー、\nシンプルで安心。',
    download: '無料ダウンロード',
    hint: 'Android • 完全無料 • 広告なし • アカウント不要',
    featuresTitle: '必要なものすべて',
    f1t: 'スマートリマインダー', f1d: '7日前、1日前、当日の通知で装着や取り外しを忘れません。',
    f2t: 'ビジュアルカレンダー', f2d: '12ヶ月を一目で確認。カラーコード付き。各日タップでメモ追加。',
    f3t: 'サイクル追跡', f3d: 'アニメーションリングとカウントダウン、生理追跡、完全な履歴。',
    f4t: 'プライベート＆ローカル', f4d: 'データ送信なし。すべてスマホに保存。アカウント不要、サーバーなし。',
    f5t: 'やさしいインターフェース', f5d: 'ソフトピンクのデザイン、スムーズなアニメーション、直感的なナビゲーション。',
    f6t: '完全無料', f6d: '広告なし、アプリ内課金なし、サブスクなし。シンプルなプレゼント。',
    howTitle: '使い方',
    s1t: 'インストール', s1d: 'APKをダウンロードしてAndroidにインストール。',
    s2t: '設定', s2d: 'リングを装着した日を入力 — 今日または過去の日付。',
    s3t: 'それだけ！', s3d: 'Orringがすべて計算：取り外し、休止、次の装着。自動リマインダーが届きます。',
    ctaTitle: '追跡をシンプルにする準備はできた？',
    ctaSub: 'Orringは個人プロジェクト、愛を込めて作りました。\n永遠に無料、広告なし、トラッキングなし。',
    ctaBtn: 'Orringをダウンロード',
    footer: '❤️ で作りました',
    footerSub: 'データ収集なし • 100%ローカル',
    toast: 'ダウンロード開始！通知またはダウンロードフォルダを確認してください。',
    installTitle: '簡単インストール',
    installP1: 'OrringはPlayストアにないため、Androidがセキュリティ警告を表示します——直接ダウンロードしたアプリでは正常です。',
    installStep1: 'ダウンロードしたファイルを開く',
    installStep2: 'このソースからのインストールを許可',
    installStep3: 'スマホがスキャンを提案したら、承認またはスキップ——アプリは100%安全',
    installStep4: 'インストールして楽しむ！',
    installNote: 'ソースコードは公開・検証可能。データの収集・送信は一切ありません。',
  },
};

function useT(lang: LangCode) {
  const dict = i18n[lang];
  return useCallback((key: string) => dict[key] || key, [dict]);
}

// ─── Animations ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const base = import.meta.env.BASE_URL;

// ─── Language Selector ───
function LangSelector({ lang, setLang }: { lang: LangCode; setLang: (l: LangCode) => void }) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === lang)!;

  return (
    <div className="lang-selector">
      <button className="lang-btn" onClick={() => setOpen(!open)}>
        {current.flag} {current.label} <span className="lang-arrow">{open ? '▲' : '▼'}</span>
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
            {LANGS.map(({ code, flag, label }) => (
              <button
                key={code}
                className={`lang-option ${code === lang ? 'active' : ''}`}
                onClick={() => { setLang(code); setOpen(false); }}
              >
                {flag} {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Download Toast ───
function DownloadToast({ message, visible }: { message: string; visible: boolean }) {
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

// ─── App ───
function App() {
  const [lang, setLang] = useState<LangCode>('fr');
  const [showToast, setShowToast] = useState(false);
  const t = useT(lang);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const isRtl = lang === 'ar';

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="app" ref={ref} dir={isRtl ? 'rtl' : 'ltr'}>
      <LangSelector lang={lang} setLang={setLang} />
      <DownloadToast message={t('toast')} visible={showToast} />

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${3 + Math.random() * 6}px`,
            height: `${3 + Math.random() * 6}px`,
            opacity: 0.15 + Math.random() * 0.2,
          }} />
        ))}
      </div>

      {/* Hero */}
      <motion.section className="hero" style={{ y: bgY }}>
        <motion.div className="hero-ring"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={`${base}orring-logo.png`} alt="Orring" className="hero-logo" />
        </motion.div>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          Orring
        </motion.h1>

        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
          {t('heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </motion.p>

        <motion.a href={`${base}Orring.apk`} download onClick={handleDownload} className="download-btn"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(248,180,200,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="download-icon">📲</span>
          {t('download')}
        </motion.a>

        <motion.p className="hero-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
          {t('hint')}
        </motion.p>

        <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <div className="scroll-arrow" />
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="features">
        <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0}>
          {t('featuresTitle')}
        </motion.h2>

        <div className="features-grid">
          {([
            { icon: '🔔', tk: 'f1' },
            { icon: '📅', tk: 'f2' },
            { icon: '📊', tk: 'f3' },
            { icon: '🔒', tk: 'f4' },
            { icon: '✨', tk: 'f5' },
            { icon: '🆓', tk: 'f6' },
          ]).map((f, i) => (
            <motion.div key={i} className="feature-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={i}
              whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(248,180,200,0.15)' }}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{t(`${f.tk}t`)}</h3>
              <p>{t(`${f.tk}d`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          {t('howTitle')}
        </motion.h2>

        <div className="steps">
          {(['s1', 's2', 's3']).map((sk, i) => (
            <motion.div key={i} className="step" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
              <div className="step-number">{i + 1}</div>
              <h3>{t(`${sk}t`)}</h3>
              <p>{t(`${sk}d`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Installation help */}
      <section className="install-help">
        <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          🛡️ {t('installTitle')}
        </motion.h2>
        <motion.div className="install-card" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="install-intro">{t('installP1')}</p>
          <div className="install-steps">
            {(['installStep1', 'installStep2', 'installStep3', 'installStep4']).map((key, i) => (
              <motion.div key={i} className="install-step" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <span className="install-num">{i + 1}</span>
                <span>{t(key)}</span>
              </motion.div>
            ))}
          </div>
          <p className="install-note">🔒 {t('installNote')}</p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="cta">
        <motion.div className="cta-card" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src={`${base}orring-logo.png`} alt="Orring" className="cta-logo" />
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</p>
          <motion.a href={`${base}Orring.apk`} download onClick={handleDownload} className="download-btn cta-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            📲 {t('ctaBtn')}
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Orring — {t('footer')}</p>
        <p className="footer-small">{t('footerSub')}</p>
      </footer>
    </div>
  );
}

export default App;
