import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, PhoneCall, Lock } from 'lucide-react'
import { CLINIC } from '../data/site'
import './OfferPopup.css'

const OFFER_SECONDS = 15 * 60

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function OfferPopup({ open, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(OFFER_SECONDS)

  useEffect(() => {
    if (!open) return undefined
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="offerpopup__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="offerpopup__card"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="offerpopup__topbar" />

            <div className="offerpopup__badges">
              <span className="offerpopup__badge offerpopup__badge--live">
                <span className="offerpopup__dot" />
                Limited Slots Only
              </span>
              <span className="offerpopup__badge">6 Slots Left Today</span>
            </div>

            <button type="button" className="offerpopup__close" aria-label="Close popup" onClick={onClose}>
              <X size={18} />
            </button>

            <h3 className="offerpopup__title">
              Call Now, Skip The <span>Wait</span>
            </h3>
            <p className="offerpopup__subtitle">
              Talk to our skin specialist directly &mdash; book your slot before today&apos;s offer closes.
            </p>

            <div className="offerpopup__price">
              <span className="offerpopup__price-old">&#8377;599</span>
              <span className="offerpopup__price-arrow">&rarr;</span>
              <span className="offerpopup__price-new">&#8377;99</span>
              <span className="offerpopup__price-label">Consultation Today Only</span>
            </div>

            <div className="offerpopup__timer">
              <span>Offer Ends In</span>
              <strong>{formatTime(secondsLeft)}</strong>
            </div>

            <a href={CLINIC.phoneHref} className="offerpopup__call-btn">
              <PhoneCall size={20} />
              Call Now &mdash; {CLINIC.phoneDisplay}
            </a>

            <p className="offerpopup__trust">
              {CLINIC.rating} Google Rating &bull; {CLINIC.patients} Happy Patients &bull; {CLINIC.location}&apos;s Trusted Clinic
            </p>

            <p className="offerpopup__confidential">
              <Lock size={13} />
              100% confidential &middot; No spam calls, ever.
            </p>

            <button type="button" className="offerpopup__dismiss" onClick={onClose}>
              No thanks, I&apos;ll browse
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfferPopup
