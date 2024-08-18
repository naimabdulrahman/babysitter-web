import moment from 'moment'

export function calculateAge(birthday: string): string {
  const birthDate = new Date(birthday)
  const today = new Date()
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--
    months += 12
  }

  return `${years} years, ${months} months`
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

// Function to format dates
export function formatDateMoment(dateString: string): string {
  return moment(dateString).format('YYYY-MM-DD HH:mm:ss')
}
