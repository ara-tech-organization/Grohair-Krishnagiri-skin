import { motion } from 'framer-motion'
import { Star, Quote, PhoneCall } from 'lucide-react'
import { REVIEWS } from '../data/site'
import './Reviews.css'

function Reviews({ onCallClick }) {
  return (
    <section id="reviews" className="section section--alt reviews">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Google Reviews</span>
          <h2>What Our Patients Say</h2>
        </div>

        <div className="reviews__grid">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              className="review__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="review__quote" size={30} strokeWidth={1.5} />
              <div className="review__stars">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p>{review.text}</p>
              <div className="review__author">
                <span className="review__avatar">{review.name.charAt(0)}</span>
                <strong>{review.name}</strong>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="reviews__cta">
          <button type="button" className="btn btn-primary" onClick={onCallClick}>
            <PhoneCall size={18} />
            Call Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default Reviews
