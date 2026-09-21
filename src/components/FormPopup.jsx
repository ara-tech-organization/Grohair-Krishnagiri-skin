import { AnimatePresence, motion } from 'framer-motion'
import { X, Sparkle } from 'lucide-react'
import AppointmentForm from './AppointmentForm'
import './FormPopup.css'

function FormPopup({ open, onClose, onCallClick }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fpopup__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="fpopup__card"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="fpopup__close" aria-label="Close popup" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="fpopup__head">
              <span className="fpopup__icon">
                <Sparkle size={20} strokeWidth={2} />
              </span>
              <h3>Book Your Consultation</h3>
              <p>Complete the form and our Krishnagiri team will call you shortly.</p>
            </div>

            <AppointmentForm idPrefix="popup" compact onCallClick={onCallClick} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FormPopup
