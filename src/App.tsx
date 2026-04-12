import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './App.css';

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

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="app" ref={ref}>
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
        <motion.div
          className="hero-ring"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={`${base}orring-logo.png`} alt="Orring" className="hero-logo" />
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Orring
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Ton compagnon pour suivre ton anneau contraceptif,<br />
          simplement et en toute sérénité.
        </motion.p>

        <motion.a
          href={`${base}Orring.apk`}
          download
          className="download-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(248,180,200,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="download-icon">📲</span>
          Télécharger gratuitement
        </motion.a>

        <motion.p
          className="hero-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Android • 100% gratuit • Sans pub • Sans compte
        </motion.p>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="scroll-arrow" />
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="features">
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          Tout ce dont tu as besoin
        </motion.h2>

        <div className="features-grid">
          {[
            { icon: '🔔', title: 'Rappels intelligents', desc: 'Notifications J-7, J-1 et Jour J pour ne jamais oublier une insertion ou un retrait.' },
            { icon: '📅', title: 'Calendrier visuel', desc: '12 mois en un coup d\'œil avec codes couleur. Chaque jour est tappable pour ajouter des notes.' },
            { icon: '📊', title: 'Suivi du cycle', desc: 'Anneau animé avec countdown, suivi des règles et historique complet de tes cycles.' },
            { icon: '🔒', title: 'Privé et local', desc: 'Aucune donnée envoyée. Tout reste sur ton téléphone. Pas de compte, pas de serveur.' },
            { icon: '✨', title: 'Interface douce', desc: 'Design rose poudré, animations fluides et navigation intuitive pensée pour toi.' },
            { icon: '🆓', title: '100% gratuit', desc: 'Pas de pub, pas d\'achat intégré, pas d\'abonnement. Un cadeau, tout simplement.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(248,180,200,0.15)' }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Comment ça marche
        </motion.h2>

        <div className="steps">
          {[
            { num: '1', title: 'Installe', desc: 'Télécharge l\'APK et installe-la sur ton Android.' },
            { num: '2', title: 'Configure', desc: 'Indique quand tu as mis ton anneau — aujourd\'hui ou une date antérieure.' },
            { num: '3', title: 'C\'est tout !', desc: 'Orring calcule tout : retrait, pause, prochaine insertion. Tu reçois des rappels automatiques.' },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="step"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <motion.div
          className="cta-card"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src={`${base}orring-logo.png`} alt="Orring" className="cta-logo" />
          <h2>Prête à simplifier ton suivi ?</h2>
          <p>
            Orring est un projet personnel, fait avec amour.<br />
            Gratuit pour toujours, sans pub, sans tracking.
          </p>
          <motion.a
            href={`${base}Orring.apk`}
            download
            className="download-btn cta-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            📲 Télécharger Orring
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Orring — Fait avec ❤️</p>
        <p className="footer-small">Aucune donnée collectée • 100% local</p>
      </footer>
    </div>
  );
}

export default App;
