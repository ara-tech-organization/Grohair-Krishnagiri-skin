import { PhoneCall, CalendarCheck } from 'lucide-react'
import './MobileStickyBar.css'

function MobileStickyBar({ onBookClick, onCallClick }) {
  return (
    <div className="sticky-bar">
      <button type="button" className="sticky-bar__btn sticky-bar__btn--call" onClick={onCallClick}>
        <PhoneCall size={18} />
        Call Now
      </button>
      <button type="button" className="sticky-bar__btn sticky-bar__btn--book" onClick={onBookClick}>
        <CalendarCheck size={18} />
        Book Consultation
      </button>
    </div>
  )
}

export default MobileStickyBar
