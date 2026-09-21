import { motion } from 'framer-motion'
import { CircleCheck, PhoneCall, Home } from 'lucide-react'
import { CLINIC } from '../data/site'
import { getStoredLeadName } from '../lib/leadStorage'
import './ThankYouPage.css'

function ThankYouPage() {
  const name = getStoredLeadName()
  const homeHref = import.meta.env.BASE_URL

  return (
    <section className="thankyou">
      <div className="thankyou__glow thankyou__glow--one" />
      <div className="thankyou__glow thankyou__glow--two" />

      <motion.div
        className="thankyou__card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="thankyou__icon">
          <CircleCheck size={40} strokeWidth={1.75} />
        </span>

        <h1>Thank You{name ? `, ${name.split(' ')[0]}` : ''}!</h1>
        <p>
          Your consultation request has been received. Our Krishnagiri team will call you
          shortly to confirm your appointment at {CLINIC.name}.
        </p>

        <div className="thankyou__actions">
          <a href={CLINIC.phoneHref} className="btn btn-primary">
            <PhoneCall size={18} />
            Call Us Now
          </a>
          <a href={homeHref} className="btn btn-ghost">
            <Home size={18} />
            Back to Home
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default ThankYouPage
