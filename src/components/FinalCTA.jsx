import { motion } from 'framer-motion'
import { PhoneCall, CalendarCheck } from 'lucide-react'
import { CLINIC } from '../data/site'
import './FinalCTA.css'

function FinalCTA({ onBookClick }) {
  return (
    <section className="final-cta">
      <div className="final-cta__glow" />
      <div className="container final-cta__inner">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          Ready for Healthy, Glowing Skin?
        </motion.h2>
        <motion.div
          className="final-cta__actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a href={CLINIC.phoneHref} className="btn btn-final-primary">
            <PhoneCall size={18} />
            Call Our Skin Specialist Today
          </a>
          <span className="final-cta__or">OR</span>
          <button type="button" className="btn btn-final-outline" onClick={onBookClick}>
            <CalendarCheck size={18} />
            Book Your Consultation
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA
