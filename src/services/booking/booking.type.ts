export interface KidDetail {
  fullName: string
  birthday: string
}

export interface BookingData {
  fullname: string
  email: string
  phone_number: string
  address: string
  reservation_datetime: string
  kid_detail: KidDetail[]
}
