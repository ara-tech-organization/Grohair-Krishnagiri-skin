import { motion } from 'framer-motion'
import { Star, Users, PhoneCall } from 'lucide-react'
import { CLINIC } from '../data/site'
import AppointmentForm from './AppointmentForm'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Hero({ onCallClick }) {
  return (
    <section id="home" className="hero">
      <div className="hero__glow hero__glow--one" />
      <div className="hero__glow hero__glow--two" />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
        >
          <motion.span custom={0} variants={fadeUp} className="eyebrow">
            <Star size={14} fill="currentColor" strokeWidth={0} />
            Krishnagiri&apos;s Trusted Skin Specialists
          </motion.span>

          <motion.h1 custom={1} variants={fadeUp}>
            Advanced Skin Treatments
            <br />
            in <span>Krishnagiri</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="hero__subhead">
            Acne &bull; Pigmentation &bull; Laser &bull; Anti-Ageing
          </motion.p>

          <motion.p custom={3} variants={fadeUp} className="hero__desc">
            Get expert skin analysis and personalized treatment from experienced
            skin specialists for healthier, clearer, and glowing skin.
          </motion.p>

          <motion.div custom={4} variants={fadeUp} className="hero__badges">
            <div className="hero__badge">
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <div>
                <strong>{CLINIC.rating}</strong>
                <span>Google Rating</span>
              </div>
            </div>
            <div className="hero__badge">
              <Users size={18} strokeWidth={2} />
              <div>
                <strong>{CLINIC.patients}</strong>
                <span>Happy Patients</span>
              </div>
            </div>
          </motion.div>

          <motion.div custom={5} variants={fadeUp}>
            <a href={CLINIC.phoneHref} className="btn btn-primary hero__cta">
              <PhoneCall size={18} />
              Call Skin Specialist
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          id="booking-form"
          className="hero__form-card"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__form-head">
            <h3>Book Your Consultation</h3>
            <p>Complete the form and our Krishnagiri team will call you shortly.</p>
          </div>
          <AppointmentForm idPrefix="hero" onCallClick={onCallClick} compact />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
