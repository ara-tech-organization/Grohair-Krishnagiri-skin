import { motion } from 'framer-motion'
import { Sparkles, SunMedium, Droplets, Zap, Clock, Sun, ArrowUpRight } from 'lucide-react'
import { TREATMENTS } from '../data/site'
import './Treatments.css'

const ICONS = { Sparkles, SunMedium, Droplets, Zap, Clock, Sun }

function Treatments({ onCtaClick }) {
  return (
    <section id="treatments" className="section section--alt treatments">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Our Treatments</span>
          <h2>Treatments We Offer</h2>
        </div>

        <div className="treatments__grid">
          {TREATMENTS.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <motion.div
                key={item.title}
                className="treatment__card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="treatment__icon">
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="treatment__link">
                  Learn More <ArrowUpRight size={15} />
                </span>
              </motion.div>
            )
          })}
        </div>

        <div className="treatments__cta">
          <p>Not Sure Which Treatment You Need?</p>
          <button type="button" className="btn btn-primary" onClick={onCtaClick}>
            Speak to Our Specialist
          </button>
        </div>
      </div>
    </section>
  )
}

export default Treatments
