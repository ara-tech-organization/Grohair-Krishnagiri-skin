import { motion } from 'framer-motion'
import { BEFORE_AFTER_ALT_TEXT } from '../data/site'
import img1 from '../assets/images/before-after-1.webp'
import img2 from '../assets/images/before-after-2.webp'
import img3 from '../assets/images/before-after-3.webp'
import img4 from '../assets/images/before-after-4.webp'
import './BeforeAfter.css'

const IMAGES = [img1, img2, img3, img4]

function BeforeAfter({ onCtaClick }) {
  return (
    <section id="results" className="section results">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Real Results</span>
          <h2>Real Patient Transformations</h2>
          <p>See real results achieved through personalized skin treatments.</p>
        </div>

        <div className="results__grid">
          {IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="results__card"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <img src={src} alt={BEFORE_AFTER_ALT_TEXT[i]} loading="lazy" />
              <div className="results__tag">Patient Result</div>
            </motion.div>
          ))}
        </div>

        <div className="results__cta">
          <button type="button" className="btn btn-primary" onClick={onCtaClick}>
            Book Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
