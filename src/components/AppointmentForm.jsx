import { useState } from 'react'
import { PhoneCall } from 'lucide-react'
import { CLINIC, TIME_SLOTS } from '../data/site'
import { submitAppointment } from '../lib/submitAppointment'
import { LEAD_NAME_KEY } from '../lib/leadStorage'
import CustomSelect from './CustomSelect'
import './AppointmentForm.css'

function AppointmentForm({ compact = false, idPrefix = 'form', onCallClick }) {
  const [values, setValues] = useState({
    name: '',
    mobile: '',
    city: '',
    time: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!values.name.trim() || !values.mobile.trim() || !values.city.trim()) {
      setError('Please fill in your name, mobile number and city.')
      return
    }
    if (!/^\d{10}$/.test(values.mobile.replace(/\D/g, '').slice(-10))) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await submitAppointment(values)
    } catch (err) {
      console.error('Appointment submission failed:', err)
    } finally {
      try {
        sessionStorage.setItem(LEAD_NAME_KEY, values.name.trim())
      } catch {
        /* ignore storage errors */
      }
      window.location.href = `${import.meta.env.BASE_URL}thank-you`
    }
  }

  return (
    <form className={`appt-form ${compact ? 'appt-form--compact' : ''}`} onSubmit={handleSubmit}>
      <div className="appt-field">
        <label htmlFor={`${idPrefix}-name`}>Name</label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          placeholder="Enter your full name"
          value={values.name}
          onChange={handleChange('name')}
        />
      </div>
      <div className="appt-field">
        <label htmlFor={`${idPrefix}-mobile`}>Mobile Number</label>
        <input
          id={`${idPrefix}-mobile`}
          type="tel"
          placeholder="Enter your mobile number"
          value={values.mobile}
          onChange={handleChange('mobile')}
        />
      </div>
      <div className="appt-field">
        <label htmlFor={`${idPrefix}-city`}>City / Area</label>
        <input
          id={`${idPrefix}-city`}
          type="text"
          placeholder="Enter your city or area"
          value={values.city}
          onChange={handleChange('city')}
        />
      </div>
      <div className="appt-field">
        <label htmlFor={`${idPrefix}-time`}>Preferred Time to Call</label>
        <CustomSelect
          id={`${idPrefix}-time`}
          label="Preferred Time to Call"
          placeholder="Select a preferred time"
          options={TIME_SLOTS}
          value={values.time}
          onChange={(slot) => setValues((prev) => ({ ...prev, time: slot }))}
        />
      </div>

      {error && <p className="appt-error">{error}</p>}

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? 'Booking...' : 'Book Appointment'}
      </button>

      <div className="appt-divider">
        <span>Need Immediate Assistance?</span>
      </div>

      {onCallClick ? (
        <button
          type="button"
          className="btn btn-outline btn-block"
          onClick={(e) => {
            e.preventDefault()
            onCallClick()
          }}
        >
          <PhoneCall size={18} strokeWidth={2} />
          Call Now
        </button>
      ) : (
        <a href={CLINIC.phoneHref} className="btn btn-outline btn-block">
          <PhoneCall size={18} strokeWidth={2} />
          Call Now
        </a>
      )}
    </form>
  )
}

export default AppointmentForm
