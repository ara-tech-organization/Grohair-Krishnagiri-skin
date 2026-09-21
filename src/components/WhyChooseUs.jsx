import { motion } from 'framer-motion'
import { UserRound, ScanFace, ClipboardList, ShieldCheck, MapPinned } from 'lucide-react'
import { CLINIC, WHY_CHOOSE_US } from '../data/site'
import './WhyChooseUs.css'

const ICONS = { UserRound, ScanFace, ClipboardList, ShieldCheck, MapPinned }

function WhyChooseUs() {
  return (
    <section id="why-us" className="section why">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why Choose Us</span>
          <h2>Why {CLINIC.location} Chooses {CLINIC.shortName}</h2>
        </div>

        <div className="why__grid">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <motion.div
                key={item.title}
                className="why__card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="why__icon">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
