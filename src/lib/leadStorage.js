export const LEAD_NAME_KEY = 'gloskin-lead-name'

export function getStoredLeadName() {
  try {
    return sessionStorage.getItem(LEAD_NAME_KEY) || ''
  } catch {
    return ''
  }
}
