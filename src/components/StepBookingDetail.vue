<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'

const props = defineProps(['formValue', 'formErrors'])
const { formValue, formErrors } = props

const maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 30)

const validateFullName = () => {
  formErrors.fullName = formValue.fullName ? '' : 'Full Name is required'
}

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  formErrors.email = emailPattern.test(formValue.email) ? '' : 'Invalid email address'
}
const validatePhoneNumber = () => {
  formErrors.phoneNumber = formValue.phoneNumber ? '' : 'Phone number is required'
}
const validateAddress = () => {
  formErrors.address = formValue.address ? '' : 'Address is required'
}

const minDateTime = computed(() => {
  const currentTime = new Date()
  currentTime.setHours(currentTime.getHours() + 6) // Add 6 hours to the current time
  return currentTime
})
const minDateTimeFormatted = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }
  return minDateTime.value.toLocaleString('en-US', options)
})

const validateReservationDatetime = () => {
  const minimumTime = minDateTime.value

  if (!formValue.reservationDatetime) {
    formErrors.reservationDatetime = 'Reservation date & time is required'
  } else if (new Date(formValue.reservationDatetime) < minimumTime) {
    formErrors.reservationDatetime = 'Please select a time at least 6 hours from now'
  } else {
    formErrors.reservationDatetime = ''
  }
}

defineExpose({
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  validateAddress,
  validateReservationDatetime
})
</script>

<template>
  <div>
    <h5>Booking Detail</h5>
    <div class="form-group">
      <div>
        <label for="fullName">Full Name</label>
        <span v-if="formErrors.fullName" class="px-2 small font-weight-bold text-danger">{{
          formErrors.fullName
        }}</span>
      </div>

      <input
        type="text"
        class="form-control"
        id="fullName"
        v-model="formValue.fullName"
        aria-describedby="fullnameHelp"
        placeholder="Enter Name"
      />
    </div>
    <div class="form-group">
      <div>
        <label for="exampleInputEmail1">Email address</label>
        <span v-if="formErrors.email" class="px-2 small font-weight-bold text-danger">{{
          formErrors.email
        }}</span>
      </div>

      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        v-model="formValue.email"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
      <small id="emailHelp" class="form-text text-muted">
        We'll never share your email with anyone else.</small
      >
    </div>
    <div class="form-group">
      <div>
        <label for="phoneNumber">Phone Number</label>
        <span v-if="formErrors.phoneNumber" class="px-2 small font-weight-bold text-danger">{{
          formErrors.phoneNumber
        }}</span>
      </div>
      <input
        type="text"
        class="form-control"
        id="phoneNumber"
        v-model="formValue.phoneNumber"
        aria-describedby="phonenumberHelp"
        placeholder="Enter Phone Number"
      />
    </div>
    <div class="form-group">
      <div>
        <label for="address">Address</label>
        <span v-if="formErrors.address" class="px-2 small font-weight-bold text-danger">{{
          formErrors.address
        }}</span>
      </div>
      <textarea
        class="form-control"
        id="address"
        v-model="formValue.address"
        aria-describedby="adressHelp"
        placeholder="Enter Address"
      ></textarea>
    </div>
    <div class="form-group w-100">
      <div>
        <label for="datetimeReservation">Date and Time Reservation</label>
        <span
          v-if="formErrors.reservationDatetime"
          class="px-2 small font-weight-bold text-danger"
          >{{ formErrors.reservationDatetime }}</span
        >
      </div>
      <Datepicker
        placeholder="Select a date and time"
        teleport-center
        v-model="formValue.reservationDatetime"
        :min-date="new Date()"
        :max-date="maxDate"
        :is-24="false"
        time-picker-inline
      />
      <small id="datetimereservationHelp" class="form-text text-muted">
        Minimum date and time: {{ minDateTime.toLocaleDateString() }}
        {{ minDateTimeFormatted }}
      </small>
      <small id="datetimereservationHelp" class="mt-0 form-text text-muted">
        Maximum date: {{ maxDate.toLocaleDateString() }}
      </small>
    </div>
  </div>
</template>

<style scoped></style>
