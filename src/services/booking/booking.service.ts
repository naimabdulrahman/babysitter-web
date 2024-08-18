import apiClient from '../apiClient'
import type { BookingData } from './booking.type'

export const createBooking = (bookingData: BookingData) => {
  return apiClient.post('/bookings', bookingData)
}
