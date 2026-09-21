import { APPOINTMENT_API_URL, LEAD_SOURCE } from '../data/site'

const REQUEST_TIMEOUT_MS = 7000

export async function submitAppointment({ name, mobile, city, time }) {
  const payload = {
    name,
    email: '',
    phone: mobile,
    date: new Date().toISOString().slice(0, 10),
    time,
    treatment: '',
    message: city ? `City/Area: ${city}` : '',
    source: LEAD_SOURCE,
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(APPOINTMENT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Appointment API responded with ${response.status}`)
    }

    return response
  } finally {
    clearTimeout(timeout)
  }
}
