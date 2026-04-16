import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import './App.css';

// ─── i18n translations ───
const LANGS = [
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
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
    heroSub: 'Un compagnon discret pour suivre ton anneau contraceptif,\nsimplement et en toute sérénité.',
    download: 'Télécharger gratuitement',
    hint: 'Android • 100% gratuit • Sans pub • Sans compte',
    featuresTitle: "Tout ce qu'il faut, rien de plus",
    f1t: 'Rappels intelligents', f1d: 'Notifications J-7, J-1 et Jour J pour ne jamais oublier une insertion ou un retrait.',
    f2t: 'Calendrier visuel', f2d: "12 mois en un coup d'œil avec codes couleur. Chaque jour est tappable pour ajouter des notes.",
    f3t: 'Suivi du cycle', f3d: "Anneau animé avec countdown, suivi des règles et historique complet des cycles.",
    f4t: 'Privé et local', f4d: 'Aucune donnée envoyée. Tout reste sur le téléphone. Pas de compte, pas de serveur.',
    f5t: 'Interface épurée', f5d: "Design doux, animations fluides et navigation intuitive, pensée pour aller à l'essentiel.",
    f6t: '100% gratuit', f6d: "Pas de pub, pas d'achat intégré, pas d'abonnement. Un outil offert, simplement.",
    howTitle: 'Comment ça marche',
    s1t: 'Installe', s1d: "Télécharge l'APK et installe-la sur ton Android.",
    s2t: 'Configure', s2d: "Indique la date d'insertion de l'anneau — aujourd'hui ou une date antérieure.",
    s3t: "C'est tout !", s3d: 'Orring calcule tout : retrait, pause, prochaine insertion. Les rappels arrivent automatiquement.',
    ctaTitle: 'Prêt·e à simplifier ton suivi ?',
    ctaSub: 'Orring est un projet personnel, fait avec soin.\nGratuit pour toujours, sans pub, sans tracking.',
    ctaBtn: 'Télécharger Orring',
    footer: 'Fait avec ❤️',
    footerSub: 'Aucune donnée collectée • 100% local',
    toast: 'Merci pour ta confiance ! Téléchargement lancé — vérifie tes notifications ou ton dossier Téléchargements. 💜',
    installTitle: 'Installation facile',
    installP1: "Comme Orring n'est pas sur le Play Store, Android affiche un message de sécurité — c'est normal pour toute application téléchargée directement.",
    installStep1: 'Ouvre le fichier téléchargé',
    installStep2: "Autorise l'installation depuis cette source",
    installStep3: "Si le téléphone propose un scan, accepte ou ignore — l'app est 100% sûre",
    installStep4: 'Installe et profite !',
    installNote: "Le code source est ouvert et vérifiable. Aucune donnée n'est collectée ni envoyée.",
    installSourceLink: 'Voir le code source ici',
    // Explanations section
    expTitle: 'Comprendre',
    expSub: 'Quelques infos utiles pour mieux comprendre',
    exp1Title: 'Le cycle menstruel',
    exp1Body: "Le cycle menstruel dure en moyenne 28 jours, mais il peut varier de 21 à 35 jours selon les personnes. Il commence au premier jour des règles et se termine la veille des règles suivantes.\n\nIl comporte 4 grandes phases : les règles (J1–J5), la phase folliculaire (J1–J14), l'ovulation (autour de J14), et la phase lutéale (J15–J28).\n\nSous contraception hormonale, ce cycle naturel est remplacé par un cycle artificiel de 28 jours : 21 jours d'hormones, puis 7 jours de pause pendant lesquels des saignements de privation apparaissent.",
    exp2Title: "L'anneau contraceptif en détail",
    exp2Body: "L'anneau vaginal (NuvaRing, Etoring, Setlona...) est un petit anneau souple et transparent d'environ 5 cm qui se place dans le vagin pendant 21 jours, puis se retire pendant 7 jours.\n\n💊 Hormones : il libère en continu une faible dose d'œstrogène (15 µg/jour) et de progestatif (120 µg/jour). Dose plus stable qu'une pilule car elle ne passe pas par le foie.\n\n⏱️ Retard d'insertion : moins de 3h = pas d'impact ; 3 à 48h = utiliser un préservatif 7 jours ; plus de 48h = consulter un·e pro de santé.\n\n⏱️ Retrait temporaire : l'anneau peut être retiré jusqu'à 3 heures (douche, rapport, gêne) sans perdre en efficacité. L'app Orring intègre un mini-minuteur de 3h pour te le rappeler gentiment !\n\n⚠️ Info générale. En cas de doute, consulte un·e médecin ou sage-femme.",
    exp3Title: 'Les moyens de contraception',
    exp3Body: "Il existe de nombreuses méthodes, adaptées à différents besoins et corps.\n\n🟣 Pour les personnes avec un utérus : pilule, anneau vaginal, patch, implant, injection, stérilet cuivre, préservatif interne, diaphragme, méthodes d'observation du cycle, ligature des trompes.\n\n🔵 Pour les personnes avec un pénis : préservatif externe, contraception thermique, vasectomie.\n\n💛 La contraception, c'est avant tout une affaire de besoins, d'histoire personnelle et de corps. Chaque parcours est unique — le mieux reste d'en parler avec un·e professionnel·le de santé bienveillant·e qui saura t'écouter sans jugement.",
    exp4Title: "Les rubriques d'Orring",
    exp4Body: "🏠 Accueil : tableau de bord avec l'état de l'anneau, dates clés, action suivante + mini-minuteur en cas de retrait temporaire.\n\n💠 Mon Cycle : vue détaillée avec anneau animé et suivi des règles.\n\n📅 Calendrier : 12 mois en un coup d'œil avec codes couleur. Tape un jour pour ajouter des notes.\n\n🕐 Historique : tous tes cycles passés, en cours et à venir.\n\n⚙️ Réglages : date de référence, notifications, mode sombre, langue, nom.\n\n💡 Explications : contexte sur le cycle et la contraception.",
    downloadsCount: 'téléchargements',
    feedbackTitle: 'Laisse-nous un message',
    feedbackSub: 'Suggestion, retour, ou simple mot de soutien — on lit tout. 💌',
    feedbackName: 'Prénom ou pseudo (optionnel)',
    feedbackEmail: 'Email (optionnel, pour une réponse)',
    feedbackMessage: 'Ton message...',
    feedbackSend: 'Envoyer',
    feedbackThanks: 'Merci ! Message bien reçu. 💜',
    feedbackError: "Oups, un souci est survenu. Réessaie ou écris directement à alex.guennad@gmail.com",
    supportTitle: 'Soutenir Orring',
    supportSub: 'Quelques gestes simples pour aider le projet à grandir',
    likeBtn: "J'aime",
    likeSub: 'Laisse un cœur, ça fait plaisir',
    starLabel: 'Pour les personnes avec un compte GitHub',
    starBtn: 'Star sur GitHub',
    shareTitle: 'Partager avec une amie',
    shareMsg: "Hey, j'ai trouvé Orring, une app gratuite pour suivre l'anneau contraceptif. Pas de pub, pas de compte : https://alex-lou.github.io/OrringLanding/",
    copyLink: 'Copier le lien',
    copied: 'Lien copié ✓',
  },
  en: {
    heroSub: 'A quiet companion to track your contraceptive ring,\nsimply and with peace of mind.',
    download: 'Download for free',
    hint: 'Android • 100% free • No ads • No account',
    featuresTitle: 'Everything you need, nothing more',
    f1t: 'Smart reminders', f1d: 'Notifications D-7, D-1 and D-Day so you never forget an insertion or removal.',
    f2t: 'Visual calendar', f2d: '12 months at a glance with color codes. Each day is tappable to add notes.',
    f3t: 'Cycle tracking', f3d: 'Animated ring with countdown, period tracking and full cycle history.',
    f4t: 'Private & local', f4d: 'No data sent. Everything stays on the phone. No account, no server.',
    f5t: 'Clean interface', f5d: 'Soft design, smooth animations and intuitive navigation focused on the essentials.',
    f6t: '100% free', f6d: 'No ads, no in-app purchase, no subscription. A tool offered freely.',
    howTitle: 'How it works',
    s1t: 'Install', s1d: 'Download the APK and install it on your Android.',
    s2t: 'Configure', s2d: "Enter the ring insertion date — today or an earlier date.",
    s3t: "That's it!", s3d: 'Orring calculates everything: removal, break, next insertion. Reminders arrive automatically.',
    ctaTitle: 'Ready to simplify your tracking?',
    ctaSub: 'Orring is a personal project, made with care.\nFree forever, no ads, no tracking.',
    ctaBtn: 'Download Orring',
    footer: 'Made with ❤️',
    footerSub: 'No data collected • 100% local',
    toast: 'Thank you for your trust! Download started — check your notifications or Downloads folder. 💜',
    installTitle: 'Easy installation',
    installP1: "Since Orring isn't on the Play Store, Android shows a security warning — this is normal for any directly downloaded app.",
    installStep1: 'Open the downloaded file',
    installStep2: 'Allow installation from this source',
    installStep3: "If your phone offers a scan, accept or skip — the app is 100% safe",
    installStep4: 'Install and enjoy!',
    installNote: 'The source code is open and verifiable. No data is collected or sent.',
    installSourceLink: 'See the source code here',
    expTitle: 'Understand',
    expSub: 'Some useful info to better understand',
    exp1Title: 'The menstrual cycle',
    exp1Body: "The menstrual cycle lasts 28 days on average but can range from 21 to 35. It has 4 phases: menstruation (day 1–5), follicular phase (day 1–14), ovulation (~day 14), luteal phase (day 15–28).\n\nWith hormonal contraception, this natural cycle is replaced by an artificial 28-day cycle: 21 days of hormones, then 7 hormone-free days during which withdrawal bleeding appears.",
    exp2Title: 'The vaginal ring in detail',
    exp2Body: "The vaginal ring (NuvaRing, Etoring, Setlona...) is a small soft transparent ring, about 5 cm wide. It's placed in the vagina for 21 days, then removed for 7 days.\n\n💊 Hormones: continuously releases a low dose of estrogen (15 µg/day) and progestin (120 µg/day). More stable than the pill since it doesn't go through the liver.\n\n⏱️ Late insertion: less than 3h = no impact; 3 to 48h = use a condom for 7 days; more than 48h = talk to a healthcare provider.\n\n⏱️ Temporary removal: the ring can stay out up to 3 hours (shower, sex, discomfort) without losing effectiveness. Orring even has a built-in 3h countdown to gently remind you!\n\n⚠️ General info. When in doubt, talk to a doctor or midwife.",
    exp3Title: 'Contraceptive methods',
    exp3Body: "Many methods exist, suited to different needs and bodies.\n\n🟣 For people with a uterus: pill, vaginal ring, patch, implant, injection, copper IUD, internal condom, diaphragm, cycle-tracking, tubal ligation.\n\n🔵 For people with a penis: external condom, thermal contraception, vasectomy.\n\n💛 Contraception is deeply personal — it depends on your needs, history and body. Every path is unique. The best step is to talk with a caring healthcare provider who will listen without judgment.",
    exp4Title: 'Orring sections',
    exp4Body: "🏠 Home: dashboard with ring status, key dates, next action + mini 3h timer for temporary removals.\n\n💠 My Cycle: detailed view with animated ring and period tracking.\n\n📅 Calendar: 12 months at a glance with color codes. Tap a day to add notes.\n\n🕐 History: all your past, current and upcoming cycles.\n\n⚙️ Settings: reference date, notifications, dark mode, language, name.\n\n💡 Explanations: context on cycles and contraception.",
    downloadsCount: 'downloads',
    feedbackTitle: 'Leave a message',
    feedbackSub: 'Suggestion, feedback, or a kind word — we read everything. 💌',
    feedbackName: 'Name or nickname (optional)',
    feedbackEmail: 'Email (optional, for a reply)',
    feedbackMessage: 'Your message...',
    feedbackSend: 'Send',
    feedbackThanks: 'Thank you! Message received. 💜',
    feedbackError: 'Oops, something went wrong. Try again or email alex.guennad@gmail.com directly.',
    supportTitle: 'Support Orring',
    supportSub: 'A few simple ways to help the project grow',
    likeBtn: 'Like',
    likeSub: 'Leave a heart, it means a lot',
    starLabel: 'For people with a GitHub account',
    starBtn: 'Star on GitHub',
    shareTitle: 'Share with a friend',
    shareMsg: "Hey, I found Orring — a free app to track the contraceptive ring. No ads, no account: https://alex-lou.github.io/OrringLanding/",
    copyLink: 'Copy link',
    copied: 'Link copied ✓',
  },
  nl: {
    heroSub: 'Een discrete metgezel om je anticonceptiering bij te houden,\neenvoudig en met een gerust gevoel.',
    download: 'Gratis downloaden',
    hint: 'Android • 100% gratis • Geen reclame • Geen account',
    featuresTitle: 'Alles wat je nodig hebt, niets meer',
    f1t: 'Slimme herinneringen', f1d: 'Meldingen D-7, D-1 en op D-dag, zodat je nooit een inbreng of verwijdering vergeet.',
    f2t: 'Visuele kalender', f2d: '12 maanden in één oogopslag met kleurcodes. Elke dag is tikbaar om notities toe te voegen.',
    f3t: 'Cyclus bijhouden', f3d: 'Geanimeerde ring met aftelling, menstruatie volgen en volledige cyclusgeschiedenis.',
    f4t: 'Privé & lokaal', f4d: 'Geen data verzonden. Alles blijft op je telefoon. Geen account, geen server.',
    f5t: 'Strak ontwerp', f5d: 'Zacht design, soepele animaties en intuïtieve navigatie gericht op het essentiële.',
    f6t: '100% gratis', f6d: 'Geen reclame, geen in-app aankopen, geen abonnement. Een gratis hulpmiddel.',
    howTitle: 'Hoe het werkt',
    s1t: 'Installeren', s1d: 'Download de APK en installeer die op je Android.',
    s2t: 'Instellen', s2d: 'Geef de inbrengdatum van de ring op — vandaag of een eerdere datum.',
    s3t: 'Dat is alles!', s3d: 'Orring berekent alles: verwijdering, pauze, volgende inbreng. Herinneringen komen automatisch.',
    ctaTitle: 'Klaar om je opvolging te vereenvoudigen?',
    ctaSub: 'Orring is een persoonlijk project, met zorg gemaakt.\nVoor altijd gratis, geen reclame, geen tracking.',
    ctaBtn: 'Orring downloaden',
    footer: 'Gemaakt met ❤️',
    footerSub: 'Geen gegevens verzameld • 100% lokaal',
    toast: 'Bedankt voor je vertrouwen! Download gestart — controleer je meldingen of downloadmap. 💜',
    installTitle: 'Eenvoudige installatie',
    installP1: 'Omdat Orring niet in de Play Store staat, toont Android een beveiligingsmelding — dat is normaal voor elke direct gedownloade app.',
    installStep1: 'Open het gedownloade bestand',
    installStep2: 'Sta installatie vanaf deze bron toe',
    installStep3: 'Als je telefoon een scan aanbiedt, accepteer of sla over — de app is 100% veilig',
    installStep4: 'Installeer en geniet!',
    installNote: 'De broncode is open en verifieerbaar. Er worden geen gegevens verzameld of verzonden.',
    installSourceLink: 'Bekijk de broncode hier',
    expTitle: 'Begrijpen',
    expSub: 'Wat nuttige info om beter te begrijpen',
    exp1Title: 'De menstruatiecyclus',
    exp2Title: 'De vaginale ring in detail',
    exp3Title: 'Anticonceptiemethoden',
    exp4Title: 'Rubrieken van Orring',
    downloadsCount: 'downloads',
    feedbackTitle: 'Laat een bericht achter',
    feedbackSub: 'Suggestie, feedback of een vriendelijk woord — we lezen alles. 💌',
    feedbackName: 'Naam of bijnaam (optioneel)',
    feedbackEmail: 'E-mail (optioneel, voor antwoord)',
    feedbackMessage: 'Je bericht...',
    feedbackSend: 'Versturen',
    feedbackThanks: 'Bedankt! Bericht ontvangen. 💜',
    feedbackError: 'Oeps, er ging iets mis. Probeer opnieuw of mail rechtstreeks naar alex.guennad@gmail.com',
    supportTitle: 'Steun Orring',
    supportSub: 'Een paar eenvoudige manieren om het project te helpen groeien',
    likeBtn: 'Vind ik leuk',
    likeSub: 'Laat een hartje achter, dat doet goed',
    starLabel: 'Voor mensen met een GitHub-account',
    starBtn: 'Ster op GitHub',
    shareTitle: 'Delen met een vriendin',
    shareMsg: 'Hé, ik heb Orring gevonden — een gratis app om de anticonceptiering bij te houden. Geen reclame, geen account: https://alex-lou.github.io/OrringLanding/',
    copyLink: 'Link kopiëren',
    copied: 'Link gekopieerd ✓',
  },
  ru: {
    heroSub: 'Твой спокойный спутник для отслеживания\nконтрацептивного кольца, просто и без стресса.',
    download: 'Скачать бесплатно',
    hint: 'Android • 100% бесплатно • Без рекламы • Без аккаунта',
    featuresTitle: 'Всё, что нужно, и ничего лишнего',
    f1t: 'Умные напоминания', f1d: 'Уведомления за 7 дней, за 1 день и в день X, чтобы никогда не забыть установку или снятие.',
    f2t: 'Визуальный календарь', f2d: '12 месяцев сразу с цветовыми кодами. Нажми на день, чтобы добавить заметку.',
    f3t: 'Отслеживание цикла', f3d: 'Анимированное кольцо с обратным отсчётом, отслеживание менструации и полная история циклов.',
    f4t: 'Приватно и локально', f4d: 'Никаких данных не отправляется. Всё остаётся на твоём телефоне. Без аккаунта, без сервера.',
    f5t: 'Чистый интерфейс', f5d: 'Нежный дизайн, плавные анимации и интуитивная навигация — только самое важное.',
    f6t: '100% бесплатно', f6d: 'Без рекламы, без встроенных покупок, без подписки. Инструмент просто в подарок.',
    howTitle: 'Как это работает',
    s1t: 'Установи', s1d: 'Скачай APK и установи его на Android.',
    s2t: 'Настрой', s2d: 'Укажи дату установки кольца — сегодня или более раннюю.',
    s3t: 'Вот и всё!', s3d: 'Orring считает всё: снятие, пауза, следующая установка. Напоминания приходят автоматически.',
    ctaTitle: 'Готова упростить отслеживание?',
    ctaSub: 'Orring — личный проект, сделанный с заботой.\nБесплатно навсегда, без рекламы, без трекинга.',
    ctaBtn: 'Скачать Orring',
    footer: 'Сделано с ❤️',
    footerSub: 'Данные не собираются • 100% локально',
    toast: 'Спасибо за доверие! Загрузка началась — проверь уведомления или папку «Загрузки». 💜',
    installTitle: 'Простая установка',
    installP1: 'Поскольку Orring нет в Play Store, Android показывает предупреждение безопасности — это нормально для любого приложения, скачанного напрямую.',
    installStep1: 'Открой скачанный файл',
    installStep2: 'Разреши установку из этого источника',
    installStep3: 'Если телефон предложит сканирование — согласись или пропусти, приложение 100% безопасно',
    installStep4: 'Установи и пользуйся!',
    installNote: 'Исходный код открыт и проверяем. Никакие данные не собираются и не отправляются.',
    installSourceLink: 'Посмотреть исходный код здесь',
    expTitle: 'Разобраться',
    expSub: 'Полезная информация для лучшего понимания',
    exp1Title: 'Менструальный цикл',
    exp1Body: 'Менструальный цикл длится в среднем 28 дней, но может варьироваться от 21 до 35 дней. В нём 4 фазы: менструация (дни 1–5), фолликулярная фаза (дни 1–14), овуляция (около 14-го дня), лютеиновая фаза (дни 15–28).\n\nПод гормональной контрацепцией этот естественный цикл заменяется искусственным 28-дневным циклом: 21 день гормонов, затем 7 дней без гормонов, во время которых появляются кровотечения отмены.',
    exp2Title: 'Вагинальное кольцо подробно',
    exp2Body: 'Вагинальное кольцо (NuvaRing, Etoring, Setlona...) — маленькое мягкое прозрачное кольцо около 5 см. Устанавливается во влагалище на 21 день, затем снимается на 7 дней.\n\n💊 Гормоны: непрерывно выделяет низкую дозу эстрогена (15 мкг/день) и прогестина (120 мкг/день). Доза стабильнее, чем у таблетки, так как не проходит через печень.\n\n⏱️ Задержка установки: менее 3ч = без влияния; 3–48ч = использовать презерватив 7 дней; более 48ч = обратиться к специалисту.\n\n⏱️ Временное снятие: кольцо можно снимать до 3 часов (душ, близость, дискомфорт) без потери эффективности. В Orring есть мини-таймер на 3ч, чтобы мягко напомнить тебе!\n\n⚠️ Общая информация. В случае сомнений проконсультируйся с врачом или акушеркой.',
    exp3Title: 'Методы контрацепции',
    exp3Body: 'Существует множество методов, подходящих для разных потребностей и тел.\n\n🟣 Для людей с маткой: таблетки, вагинальное кольцо, пластырь, имплант, инъекция, медная спираль, внутренний презерватив, диафрагма, методы наблюдения цикла, перевязка труб.\n\n🔵 Для людей с пенисом: внешний презерватив, термическая контрацепция, вазэктомия.\n\n💛 Контрацепция — это прежде всего вопрос потребностей, личной истории и тела. Каждый путь уникален. Лучше всего поговорить с внимательным специалистом, который выслушает без осуждения.',
    exp4Title: 'Разделы Orring',
    exp4Body: '🏠 Главная: панель с состоянием кольца, ключевыми датами, следующим действием + мини-таймер на 3ч для временного снятия.\n\n💠 Мой цикл: детальный вид с анимированным кольцом и отслеживанием менструации.\n\n📅 Календарь: 12 месяцев сразу с цветовыми кодами. Нажми на день, чтобы добавить заметку.\n\n🕐 История: все прошлые, текущие и предстоящие циклы.\n\n⚙️ Настройки: дата начала, уведомления, тёмная тема, язык, имя.\n\n💡 Пояснения: контекст о цикле и контрацепции.',
    downloadsCount: 'загрузок',
    feedbackTitle: 'Оставь сообщение',
    feedbackSub: 'Предложение, отзыв или доброе слово — мы всё читаем. 💌',
    feedbackName: 'Имя или никнейм (необязательно)',
    feedbackEmail: 'Email (необязательно, для ответа)',
    feedbackMessage: 'Твоё сообщение...',
    feedbackSend: 'Отправить',
    feedbackThanks: 'Спасибо! Сообщение получено. 💜',
    feedbackError: 'Упс, что-то пошло не так. Попробуй ещё раз или напиши на alex.guennad@gmail.com',
    supportTitle: 'Поддержать Orring',
    supportSub: 'Несколько простых способов помочь проекту расти',
    likeBtn: 'Нравится',
    likeSub: 'Оставь сердечко, это очень приятно',
    starLabel: 'Для тех, у кого есть аккаунт GitHub',
    starBtn: 'Звезда на GitHub',
    shareTitle: 'Поделиться с подругой',
    shareMsg: 'Привет, я нашла Orring — бесплатное приложение для отслеживания контрацептивного кольца. Без рекламы, без аккаунта: https://alex-lou.github.io/OrringLanding/',
    copyLink: 'Скопировать ссылку',
    copied: 'Ссылка скопирована ✓',
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
    installSourceLink: 'Ver el código fuente aquí',
    expTitle: 'Comprender',
    expSub: 'Algo de información útil para comprender mejor',
    exp1Title: 'El ciclo menstrual',
    exp2Title: 'El anillo vaginal en detalle',
    exp3Title: 'Métodos anticonceptivos',
    exp4Title: 'Secciones de Orring',
    downloadsCount: 'descargas',
    feedbackTitle: 'Déjanos un mensaje',
    feedbackSub: 'Sugerencia, comentario o una palabra amable — leemos todo. 💌',
    feedbackName: 'Nombre o apodo (opcional)',
    feedbackEmail: 'Email (opcional, para respuesta)',
    feedbackMessage: 'Tu mensaje...',
    feedbackSend: 'Enviar',
    feedbackThanks: '¡Gracias! Mensaje recibido. 💜',
    feedbackError: 'Ups, ocurrió un error. Intenta de nuevo o escribe a alex.guennad@gmail.com',
    supportTitle: 'Apoya a Orring',
    supportSub: 'Algunas formas simples de ayudar al proyecto a crecer',
    likeBtn: 'Me gusta',
    likeSub: 'Deja un corazón, significa mucho',
    starLabel: 'Para quienes tienen cuenta de GitHub',
    starBtn: 'Estrella en GitHub',
    shareTitle: 'Compartir con una amiga',
    shareMsg: 'Hola, encontré Orring — una app gratis para seguir el anillo anticonceptivo. Sin anuncios, sin cuenta: https://alex-lou.github.io/OrringLanding/',
    copyLink: 'Copiar enlace',
    copied: 'Enlace copiado ✓',
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
    installSourceLink: 'Ver o código-fonte aqui',
    expTitle: 'Entender',
    expSub: 'Algumas informações úteis para entender melhor',
    exp1Title: 'O ciclo menstrual',
    exp2Title: 'O anel vaginal em detalhe',
    exp3Title: 'Métodos contraceptivos',
    exp4Title: 'Seções do Orring',
    downloadsCount: 'downloads',
    feedbackTitle: 'Deixe uma mensagem',
    feedbackSub: 'Sugestão, feedback ou uma palavra gentil — lemos tudo. 💌',
    feedbackName: 'Nome ou apelido (opcional)',
    feedbackEmail: 'Email (opcional, para resposta)',
    feedbackMessage: 'Sua mensagem...',
    feedbackSend: 'Enviar',
    feedbackThanks: 'Obrigado! Mensagem recebida. 💜',
    feedbackError: 'Ops, algo deu errado. Tente novamente ou escreva para alex.guennad@gmail.com',
    supportTitle: 'Apoie o Orring',
    supportSub: 'Algumas formas simples de ajudar o projeto a crescer',
    likeBtn: 'Curtir',
    likeSub: 'Deixe um coração, significa muito',
    starLabel: 'Para quem tem conta no GitHub',
    starBtn: 'Estrela no GitHub',
    shareTitle: 'Compartilhar com uma amiga',
    shareMsg: 'Oi, encontrei o Orring — um app grátis para acompanhar o anel contraceptivo. Sem anúncios, sem conta: https://alex-lou.github.io/OrringLanding/',
    copyLink: 'Copiar link',
    copied: 'Link copiado ✓',
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
    installSourceLink: 'Quellcode hier ansehen',
    expTitle: 'Verstehen',
    expSub: 'Einige nützliche Infos zum besseren Verständnis',
    exp1Title: 'Der Menstruationszyklus',
    exp2Title: 'Der Vaginalring im Detail',
    exp3Title: 'Verhütungsmethoden',
    exp4Title: 'Bereiche von Orring',
    downloadsCount: 'Downloads',
    feedbackTitle: 'Hinterlasse eine Nachricht',
    feedbackSub: 'Vorschlag, Feedback oder ein nettes Wort — wir lesen alles. 💌',
    feedbackName: 'Name oder Spitzname (optional)',
    feedbackEmail: 'E-Mail (optional, für Antwort)',
    feedbackMessage: 'Deine Nachricht...',
    feedbackSend: 'Senden',
    feedbackThanks: 'Danke! Nachricht erhalten. 💜',
    feedbackError: 'Ups, etwas ist schiefgelaufen. Versuche es erneut oder schreibe an alex.guennad@gmail.com',
    supportTitle: 'Orring unterstützen',
    supportSub: 'Ein paar einfache Wege, dem Projekt beim Wachsen zu helfen',
    likeBtn: 'Gefällt mir',
    likeSub: 'Hinterlasse ein Herz, das freut uns',
    starLabel: 'Für Personen mit GitHub-Konto',
    starBtn: 'Stern auf GitHub',
    shareTitle: 'Mit einer Freundin teilen',
    shareMsg: 'Hey, ich habe Orring gefunden — eine kostenlose App zur Verfolgung des Verhütungsrings. Keine Werbung, kein Konto: https://alex-lou.github.io/OrringLanding/',
    copyLink: 'Link kopieren',
    copied: 'Link kopiert ✓',
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
    installSourceLink: 'اطّلعي على الكود المصدري هنا',
    expTitle: 'لفهم أفضل',
    expSub: 'بعض المعلومات المفيدة لفهم أفضل',
    exp1Title: 'الدورة الشهرية',
    exp2Title: 'الحلقة المهبلية بالتفصيل',
    exp3Title: 'وسائل منع الحمل',
    exp4Title: 'أقسام Orring',
    downloadsCount: 'تنزيلات',
    feedbackTitle: 'اتركوا لنا رسالة',
    feedbackSub: 'اقتراح، تعليق، أو كلمة لطيفة — نقرأ كل شيء. 💌',
    feedbackName: 'الاسم أو اللقب (اختياري)',
    feedbackEmail: 'البريد الإلكتروني (اختياري، للرد)',
    feedbackMessage: 'رسالتكم...',
    feedbackSend: 'إرسال',
    feedbackThanks: 'شكراً! تم استلام الرسالة. 💜',
    feedbackError: 'عذراً، حدث خطأ. حاولوا مرة أخرى أو اكتبوا إلى alex.guennad@gmail.com',
    supportTitle: 'ادعموا Orring',
    supportSub: 'بعض الطرق البسيطة لمساعدة المشروع على النمو',
    likeBtn: 'إعجاب',
    likeSub: 'اتركوا قلباً، هذا يعني الكثير',
    starLabel: 'لمن لديهم حساب GitHub',
    starBtn: 'نجمة على GitHub',
    shareTitle: 'شاركوا مع صديقة',
    shareMsg: 'مرحباً، وجدت Orring — تطبيق مجاني لمتابعة الحلقة المانعة للحمل. بدون إعلانات، بدون حساب: https://alex-lou.github.io/OrringLanding/',
    copyLink: 'نسخ الرابط',
    copied: 'تم نسخ الرابط ✓',
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
    installSourceLink: '在此查看源代码',
    expTitle: '了解',
    expSub: '一些有用的信息帮助更好地理解',
    exp1Title: '月经周期',
    exp2Title: '避孕环详情',
    exp3Title: '避孕方法',
    exp4Title: 'Orring 的各部分',
    downloadsCount: '次下载',
    feedbackTitle: '给我们留言',
    feedbackSub: '建议、反馈或温暖的话 — 我们都会阅读。 💌',
    feedbackName: '姓名或昵称（可选）',
    feedbackEmail: '邮箱（可选，用于回复）',
    feedbackMessage: '您的留言...',
    feedbackSend: '发送',
    feedbackThanks: '谢谢！留言已收到。 💜',
    feedbackError: '出错了，请重试或直接写信到 alex.guennad@gmail.com',
    supportTitle: '支持 Orring',
    supportSub: '一些简单的方式帮助项目成长',
    likeBtn: '喜欢',
    likeSub: '留下一颗爱心，非常暖心',
    starLabel: '适合有 GitHub 账号的用户',
    starBtn: 'GitHub Star',
    shareTitle: '分享给朋友',
    shareMsg: '嗨，我发现了 Orring —— 一个免费追踪避孕环的应用。无广告，无需账号：https://alex-lou.github.io/OrringLanding/',
    copyLink: '复制链接',
    copied: '链接已复制 ✓',
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
    installSourceLink: 'ソースコードをこちらで確認',
    expTitle: '理解する',
    expSub: 'よりよく理解するための役立つ情報',
    exp1Title: '月経周期',
    exp2Title: '避妊リングの詳細',
    exp3Title: '避妊方法',
    exp4Title: 'Orring のセクション',
    downloadsCount: 'ダウンロード',
    feedbackTitle: 'メッセージをどうぞ',
    feedbackSub: '提案、フィードバック、または温かい言葉 — すべて読みます。 💌',
    feedbackName: '名前またはニックネーム（任意）',
    feedbackEmail: 'メール（任意、返信用）',
    feedbackMessage: 'メッセージ...',
    feedbackSend: '送信',
    feedbackThanks: 'ありがとう！メッセージを受け取りました。 💜',
    feedbackError: 'エラーが発生しました。再度お試しいただくか、alex.guennad@gmail.com まで直接ご連絡ください。',
    supportTitle: 'Orring をサポート',
    supportSub: 'プロジェクトの成長を助けるシンプルな方法',
    likeBtn: 'いいね',
    likeSub: 'ハートを残してください、とても嬉しいです',
    starLabel: 'GitHub アカウントをお持ちの方へ',
    starBtn: 'GitHub でスター',
    shareTitle: '友達とシェア',
    shareMsg: 'こんにちは、Orring を見つけました — 避妊リングを追跡する無料アプリ。広告なし、アカウント不要：https://alex-lou.github.io/OrringLanding/',
    copyLink: 'リンクをコピー',
    copied: 'リンクをコピーしました ✓',
  },
};

function useT(lang: LangCode) {
  const dict = i18n[lang];
  return useCallback((key: string) => dict[key] || key, [dict]);
}

// ─── Animations ───
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: EASE_OUT_QUINT }
  }),
} as const;

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const } },
} as const;

const base = import.meta.env.BASE_URL;

// ─── Language Selector ───
function LangSelector({ lang, setLang }: { lang: LangCode; setLang: (l: LangCode) => void }) {
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

// ─── Auto-detect browser language ───
function detectLang(): LangCode {
  if (typeof navigator === 'undefined') return 'fr';
  const stored = localStorage.getItem('orring-lang');
  if (stored && LANGS.some(l => l.code === stored)) return stored as LangCode;
  const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  const match = LANGS.find(l => l.code === nav);
  return match ? match.code : 'en';
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

// ─── Download Counter ───
function DownloadCounter({ label }: { label: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Alex-Lou/OrringLanding/releases/latest')
      .then(r => r.json())
      .then(data => {
        const apk = data.assets?.find((a: { name: string; download_count: number }) => a.name === 'Orring.apk');
        if (apk) setCount(apk.download_count);
      })
      .catch(() => { /* silent */ });
  }, []);

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

// ─── Support Section (Like + Star + Share) ───
type SupportKeys = 'supportTitle' | 'supportSub' | 'likeBtn' | 'likeSub' | 'starLabel' | 'starBtn' | 'shareTitle' | 'shareMsg' | 'copyLink' | 'copied';

const SITE_URL = 'https://alex-lou.github.io/OrringLanding/';
const LIKE_API_HIT = 'https://abacus.jasoncameron.dev/hit/orring-landing/likes';
const LIKE_API_GET = 'https://abacus.jasoncameron.dev/get/orring-landing/likes';

function LikeButton({ t }: { t: (k: SupportKeys) => string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    try { setLiked(localStorage.getItem('orring-liked') === '1'); } catch { /* ignore */ }
    fetch(LIKE_API_GET)
      .then(r => r.json())
      .then(d => { if (typeof d.value === 'number') setCount(d.value); })
      .catch(() => { /* silent */ });
  }, []);

  const handleLike = () => {
    if (liked) return;
    setLiked(true);
    setBurst(b => b + 1);
    try { localStorage.setItem('orring-liked', '1'); } catch { /* ignore */ }
    fetch(LIKE_API_HIT)
      .then(r => r.json())
      .then(d => { if (typeof d.value === 'number') setCount(d.value); })
      .catch(() => setCount(c => (c ?? 0) + 1));
  };

  return (
    <motion.button
      className={`like-btn ${liked ? 'liked' : ''}`}
      onClick={handleLike}
      whileHover={{ scale: liked ? 1 : 1.04 }}
      whileTap={{ scale: 0.95 }}
      disabled={liked}
      aria-label={t('likeBtn')}
    >
      <motion.span
        className="like-heart"
        animate={liked ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {liked ? '💖' : '🤍'}
      </motion.span>
      <span className="like-label">{t('likeBtn')}</span>
      {count !== null && <span className="support-count">{count.toLocaleString()}</span>}

      {/* Flying hearts on click */}
      <AnimatePresence>
        {burst > 0 && (
          <motion.span
            key={burst}
            className="like-flying"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: 1.6 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => setBurst(0)}
          >
            💜
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function StarButtonInline({ t }: { t: (k: SupportKeys) => string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Alex-Lou/Orring')
      .then(r => r.json())
      .then(data => { if (typeof data.stargazers_count === 'number') setStars(data.stargazers_count); })
      .catch(() => { /* silent */ });
  }, []);

  return (
    <motion.a
      href="https://github.com/Alex-Lou/Orring"
      target="_blank"
      rel="noopener noreferrer"
      className="star-btn-inline"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="star-emoji">⭐</span>
      <span className="star-label-text">{t('starBtn')}</span>
      {stars !== null && <span className="support-count">{stars.toLocaleString()}</span>}
    </motion.a>
  );
}

function ShareButtons({ t }: { t: (k: SupportKeys) => string }) {
  const [copied, setCopied] = useState(false);
  const msg = t('shareMsg');
  const encodedMsg = encodeURIComponent(msg);
  const encodedUrl = encodeURIComponent(SITE_URL);

  const shares = [
    { label: 'WhatsApp', icon: '💬', url: `https://wa.me/?text=${encodedMsg}`, color: '#25D366' },
    { label: 'Telegram', icon: '✈️', url: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(msg.replace(SITE_URL, '').trim())}`, color: '#0088cc' },
    { label: 'Email', icon: '✉️', url: `mailto:?subject=Orring&body=${encodedMsg}`, color: '#8B7FB8' },
    { label: 'X', icon: '𝕏', url: `https://twitter.com/intent/tweet?text=${encodedMsg}`, color: '#000000' },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="share-buttons-row">
      {shares.map(s => (
        <motion.a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={s.label}
          style={{ ['--share-color' as string]: s.color }}
        >
          <span className="share-icon">{s.icon}</span>
          <span className="share-label">{s.label}</span>
        </motion.a>
      ))}
      <motion.button
        onClick={handleCopy}
        className={`share-btn share-copy ${copied ? 'copied' : ''}`}
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('copyLink')}
      >
        <span className="share-icon">{copied ? '✓' : '🔗'}</span>
        <span className="share-label">{copied ? t('copied') : t('copyLink')}</span>
      </motion.button>
    </div>
  );
}

function SupportSection({ t }: { t: (k: SupportKeys) => string }) {
  return (
    <section id="support" className="support-section">
      <motion.h2 className="section-title"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        🫶 {t('supportTitle')}
      </motion.h2>
      <motion.p className="support-sub"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
      >
        {t('supportSub')}
      </motion.p>

      {/* Row 1 : Like + Star */}
      <motion.div className="support-row"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="support-item">
          <LikeButton t={t} />
          <span className="support-hint">{t('likeSub')}</span>
        </div>
        <div className="support-item">
          <StarButtonInline t={t} />
          <span className="support-hint">{t('starLabel')}</span>
        </div>
      </motion.div>

      {/* Share block */}
      <motion.div className="share-block"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="share-heading">{t('shareTitle')}</h3>
        <ShareButtons t={t} />
      </motion.div>
      <SectionArrow nextId="feedback" />
    </section>
  );
}

// ─── Feedback Form ───
type FeedbackKeys = 'feedbackTitle' | 'feedbackSub' | 'feedbackName' | 'feedbackEmail' | 'feedbackMessage' | 'feedbackSend' | 'feedbackThanks' | 'feedbackError';

function FeedbackForm({ t }: { t: (k: FeedbackKeys) => string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/alex.guennad@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name || 'Anonymous',
          email: email || 'no-reply@orring',
          message,
          _subject: 'Nouveau feedback Orring',
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="feedback" className="feedback-section">
      <motion.h2 className="section-title"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        💌 {t('feedbackTitle')}
      </motion.h2>
      <motion.p className="feedback-sub"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        {t('feedbackSub')}
      </motion.p>
      <motion.form
        className="feedback-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        <input type="text" placeholder={t('feedbackName')} value={name} onChange={e => setName(e.target.value)} className="feedback-input" />
        <input type="email" placeholder={t('feedbackEmail')} value={email} onChange={e => setEmail(e.target.value)} className="feedback-input" />
        <textarea placeholder={t('feedbackMessage')} value={message} onChange={e => setMessage(e.target.value)} className="feedback-textarea" required rows={4} />
        <motion.button type="submit" className="feedback-btn" disabled={status === 'sending'} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          {status === 'sending' ? '...' : t('feedbackSend')}
        </motion.button>
        <AnimatePresence>
          {status === 'sent' && (
            <motion.p className="feedback-thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {t('feedbackThanks')}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p className="feedback-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {t('feedbackError')}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
}

// ─── Explanations Section ───
type ExpKeys = 'expTitle' | 'expSub' | 'exp1Title' | 'exp1Body' | 'exp2Title' | 'exp2Body' | 'exp3Title' | 'exp3Body' | 'exp4Title' | 'exp4Body';

function ExplanationsSection({ t }: { t: (k: ExpKeys) => string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sections = [
    { emoji: '🌙', tk: 'exp1Title' as const, bk: 'exp1Body' as const },
    { emoji: '💠', tk: 'exp2Title' as const, bk: 'exp2Body' as const },
    { emoji: '🌸', tk: 'exp3Title' as const, bk: 'exp3Body' as const },
    { emoji: '💡', tk: 'exp4Title' as const, bk: 'exp4Body' as const },
  ];

  return (
    <section id="explanations" className="explanations-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        📖 {t('expTitle')}
      </motion.h2>
      <motion.p
        className="explanations-sub"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {t('expSub')}
      </motion.p>

      <div className="explanations-cards">
        {sections.map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              className={`exp-card ${isOpen ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button
                className="exp-header"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="exp-emoji">{s.emoji}</span>
                <span className="exp-title">{t(s.tk)}</span>
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
                    <p>{t(s.bk)}</p>
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

// ─── Flag icons (inline SVG, rendered identically on all OS) ───
function Flag({ code }: { code: LangCode }) {
  // 24x16 viewBox, proportions drapeaux standards
  const style = { display: 'block', borderRadius: '2px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' };
  switch (code) {
    case 'fr':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="FR">
          <rect width="8" height="16" fill="#0055A4" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#EF4135" />
        </svg>
      );
    case 'en':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="EN">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="3.5" />
          <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="1.8" />
        </svg>
      );
    case 'nl':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="NL">
          <rect width="24" height="5.33" fill="#AE1C28" />
          <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
          <rect y="10.67" width="24" height="5.33" fill="#21468B" />
        </svg>
      );
    case 'ru':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="RU">
          <rect width="24" height="5.33" fill="#FFFFFF" />
          <rect y="5.33" width="24" height="5.34" fill="#0039A6" />
          <rect y="10.67" width="24" height="5.33" fill="#D52B1E" />
        </svg>
      );
    case 'es':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="ES">
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      );
    case 'pt':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="PT (BR)">
          <rect width="24" height="16" fill="#009739" />
          <path d="M12 2 L22 8 L12 14 L2 8 Z" fill="#FEDF00" />
          <circle cx="12" cy="8" r="3" fill="#012169" />
        </svg>
      );
    case 'de':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="DE">
          <rect width="24" height="5.33" fill="#000000" />
          <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </svg>
      );
    case 'ar':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="AR (SA)">
          <rect width="24" height="16" fill="#006C35" />
          <rect x="4" y="6" width="16" height="1.5" fill="#FFFFFF" />
          <circle cx="12" cy="10" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'zh':
      return (
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="ZH">
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
        <svg width="22" height="15" viewBox="0 0 24 16" style={style} aria-label="JA">
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="4.8" fill="#BC002D" />
        </svg>
      );
  }
}

// ─── Feature icons (custom SVGs, lavender theme) ───
function FeatureIcon({ name }: { name: 'bell' | 'calendar' | 'cycle' | 'lock' | 'sparkle' | 'gift' }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
          <circle cx="18" cy="6" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M3 10h18" />
          <path d="M8 3v4M16 3v4" />
          <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" opacity="0.35" />
        </svg>
      );
    case 'cycle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" opacity="0.35" />
          <path d="M12 4a8 8 0 0 1 7.5 5" />
          <path d="M16 4h3.5v3.5" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="10" rx="2.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'gift':
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="10" rx="1.5" />
          <path d="M4 14h16" />
          <path d="M12 10v10" />
          <circle cx="8.5" cy="8" r="2" />
          <circle cx="15.5" cy="8" r="2" />
          <path d="M8.5 10h7" />
        </svg>
      );
  }
}

// ─── Section navigation order ───
const SECTION_ORDER = ['hero', 'features', 'how', 'install', 'explanations', 'cta', 'support', 'feedback'];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Down arrow at the bottom of a section ───
function SectionArrow({ nextId }: { nextId: string }) {
  return (
    <button
      type="button"
      className="section-arrow"
      onClick={() => scrollToSection(nextId)}
      aria-label="Next section"
    >
      <span className="section-arrow-chev">▾</span>
    </button>
  );
}

// ─── Nav arrows (top-right, under lang selector) ───
function NavArrows() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  const findCurrentSectionIdx = () => {
    const scrollY = window.scrollY + 100;
    let currentIdx = 0;
    for (let i = 0; i < SECTION_ORDER.length; i++) {
      const el = document.getElementById(SECTION_ORDER[i]);
      if (el && el.offsetTop <= scrollY) currentIdx = i;
    }
    return currentIdx;
  };

  const toPrevSection = () => {
    const idx = findCurrentSectionIdx();
    const prev = Math.max(0, idx - 1);
    scrollToSection(SECTION_ORDER[prev]);
  };

  const toNextSection = () => {
    const idx = findCurrentSectionIdx();
    const next = Math.min(SECTION_ORDER.length - 1, idx + 1);
    scrollToSection(SECTION_ORDER[next]);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="nav-arrows"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" className="nav-arrow-btn" onClick={toTop} title="Haut de la page" aria-label="Top">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3 L8 13 M8 3 L4 7 M8 3 L12 7 M4 1 L12 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="nav-arrow-btn" onClick={toPrevSection} title="Section précédente" aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3 L8 13 M4 7 L8 3 L12 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="nav-arrow-btn" onClick={toNextSection} title="Section suivante" aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 13 L8 3 M4 9 L8 13 L12 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="nav-arrow-btn" onClick={toBottom} title="Bas de la page" aria-label="Bottom">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 13 L8 3 M4 9 L8 13 L12 9 M4 15 L12 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── App ───
function App() {
  const [lang, setLang] = useState<LangCode>(() => detectLang());
  const [showToast, setShowToast] = useState(false);
  const t = useT(lang);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const isRtl = lang === 'ar';

  // Persist language choice
  const handleSetLang = (l: LangCode) => {
    setLang(l);
    try { localStorage.setItem('orring-lang', l); } catch { /* no-op */ }
  };

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 6000);
  };

  return (
    <div className="app" ref={ref} dir={isRtl ? 'rtl' : 'ltr'}>
      <LangSelector lang={lang} setLang={handleSetLang} />
      <NavArrows />
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
      <motion.section id="hero" className="hero" style={{ y: bgY }}>
        <motion.div className="hero-ring"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT_QUINT }}
        >
          <img src={`${base}orring-logo.png`} alt="Orring" className="hero-logo" />
        </motion.div>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          Orring
        </motion.h1>

        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
          {t('heroSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </motion.p>

        <motion.a href={"https://github.com/Alex-Lou/OrringLanding/releases/download/v2.1.3/Orring.apk"} download onClick={handleDownload} className="download-btn"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(166,151,217,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="download-icon">📲</span>
          {t('download')}
        </motion.a>

        <motion.p className="hero-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
          {t('hint')}
        </motion.p>

        <DownloadCounter label={t('downloadsCount')} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="hero-arrow-wrap"
        >
          <SectionArrow nextId="features" />
        </motion.div>
      </motion.section>

      {/* Features */}
      <section id="features" className="features">
        <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0}>
          {t('featuresTitle')}
        </motion.h2>

        <div className="features-grid">
          {([
            { icon: 'bell', tk: 'f1' },
            { icon: 'calendar', tk: 'f2' },
            { icon: 'cycle', tk: 'f3' },
            { icon: 'lock', tk: 'f4' },
            { icon: 'sparkle', tk: 'f5' },
            { icon: 'gift', tk: 'f6' },
          ] as const).map((f, i) => (
            <motion.div key={i} className="feature-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={i}
              whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(166,151,217,0.15)' }}
            >
              <span className="feature-icon-wrap">
                <FeatureIcon name={f.icon} />
              </span>
              <h3>{t(`${f.tk}t`)}</h3>
              <p>{t(`${f.tk}d`)}</p>
            </motion.div>
          ))}
        </div>
        <SectionArrow nextId="how" />
      </section>

      {/* How it works */}
      <section id="how" className="how-it-works">
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
        <SectionArrow nextId="install" />
      </section>

      {/* Installation help */}
      <section id="install" className="install-help">
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
          <p className="install-note">
            🔒 {t('installNote')}{' '}
            <a
              href="https://github.com/Alex-Lou/Orring"
              target="_blank"
              rel="noopener noreferrer"
              className="install-source-link"
            >
              {t('installSourceLink')}
            </a>
            .
          </p>
        </motion.div>
        <SectionArrow nextId="explanations" />
      </section>

      {/* Explanations */}
      <ExplanationsSection t={t as (k: ExpKeys) => string} />

      {/* CTA */}
      <section id="cta" className="cta">
        <motion.div className="cta-card" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src={`${base}orring-logo.png`} alt="Orring" className="cta-logo" />
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</p>
          <motion.a href={"https://github.com/Alex-Lou/OrringLanding/releases/download/v2.1.3/Orring.apk"} download onClick={handleDownload} className="download-btn cta-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            📲 {t('ctaBtn')}
          </motion.a>
        </motion.div>
        <SectionArrow nextId="support" />
      </section>

      {/* Support (Like + Star + Share) */}
      <SupportSection t={t as (k: SupportKeys) => string} />

      {/* Feedback */}
      <FeedbackForm t={t as (k: FeedbackKeys) => string} />

      {/* Footer */}
      <footer className="footer">
        <p>Orring — {t('footer')}</p>
        <p className="footer-small">{t('footerSub')}</p>
      </footer>
    </div>
  );
}

export default App;
