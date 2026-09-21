import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { CLINIC } from '../data/site'
import './CallingPopup.css'

const AUTO_CALL_MS = 2000

function CallingPopup({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const timer = setTimeout(() => {
      window.location.href = CLINIC.phoneHref
      onClose()
    }, AUTO_CALL_MS)
    return () => clearTimeout(timer)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="calling__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="calling__card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="calling__close" aria-label="Close popup" onClick={onClose}>
              <X size={18} />
            </button>

            <div className="calling__icon-ring">
              <span className="calling__icon">
                <Phone size={26} strokeWidth={2} />
              </span>
            </div>

            <p className="calling__status">Calling</p>
            <h3 className="calling__name">{CLINIC.name}</h3>
            <p className="calling__location">{CLINIC.location}</p>
            <p className="calling__number">{CLINIC.phoneDisplay}</p>

            <a href={CLINIC.phoneHref} className="calling__btn">
              <Phone size={18} strokeWidth={2} />
              Call Now
            </a>

            {open && (
              <div className="calling__progress">
                <motion.span
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTO_CALL_MS / 1000, ease: 'linear' }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CallingPopup
