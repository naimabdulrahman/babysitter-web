<script setup lang="ts">
import { ref, reactive, computed, toRaw } from 'vue'
import Step1 from '../components/StepBookingDetail.vue'
import Step2 from '../components/StepKidDetail.vue'
import { showConfirmationDialog } from '@/utils/confirmationDialog'
import { createBooking } from '@/services/booking/booking.service'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { showErrorAlert, showSuccessAlert } from '@/utils/notificationUtils'
import { formatDateMoment } from '@/helper'

// Total number of steps
const totalSteps = 2

// Reactive property to track the current step
const currentStep = ref(1)
const step1Component = ref<InstanceType<typeof Step1> | null>(null)
const step2Component = ref<InstanceType<typeof Step2> | null>(null)
const isLoading = ref(false)
const loadingRes = ref(false)

// Function to move to the next step
const nextStep = () => {
  if (validatePage1()) {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  } else {
    console.log('Form has validation errors')
  }
}

// Function to move to the previous step
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const initialFormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  reservationDatetime: '',
  kids: [
    {
      fullName: '',
      birthday: ''
    }
  ]
}

function resetForm() {
  Object.assign(formValue, initialFormState)
}

// Validation states
const formValue = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  reservationDatetime: '',
  kids: [
    {
      fullName: '',
      birthday: ''
    }
  ] as { fullName: string; birthday: string }[]
})

// Validation states
const formErrors = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  reservationDatetime: '',
  kids: [] as { fullName: string; birthday: string }[]
})

// Function to validate page 1
const validatePage1 = () => {
  if (step1Component.value) {
    step1Component.value!.validateFullName()
    step1Component.value!.validateEmail()
    step1Component.value!.validatePhoneNumber()
    step1Component.value!.validateAddress()
    step1Component.value!.validateReservationDatetime()
  }

  return !Object.values(formErrors).some((value) => {
    if (Array.isArray(value)) {
      // Ignore arrays
      return false
    }
    // Check for non-array values (truthy means there's an error)
    return !!value
  })
}

// Function to validate the form
const validateForm = () => {
  const validateP1 = validatePage1()
  return validateP1
}

const handleSubmit = async () => {
  if (validateForm()) {
    // Submit the form or perform the desired action

    showConfirmationDialog({
      formValue,
      onConfirm: async () => {
        isLoading.value = true

        try {
          const normalKidsArray = toRaw(formValue.kids)

          const payload = {
            fullname: formValue.fullName,
            email: formValue.email,
            phone_number: formValue.phoneNumber,
            address: formValue.address,
            reservation_datetime: formValue.reservationDatetime,
            kid_detail: normalKidsArray
          }

          payload.reservation_datetime = formatDateMoment(payload.reservation_datetime)
          payload.kid_detail = payload.kid_detail.map((kid) => ({
            ...kid,
            birthday: formatDateMoment(kid.birthday)
          }))

          await createBooking(payload).then(() => {
            loadingRes.value = true
          })
        } catch (error) {
          console.error('Booking failed', error)
        } finally {
          await new Promise((resolve) => setTimeout(resolve, 500))
          isLoading.value = false

          if (loadingRes.value) {
            await showSuccessAlert('Successfully make reservation.')
            currentStep.value = 1
            resetForm()
          } else {
            await showErrorAlert('Reservation failed')
          }
        }
      },
      onCancel: () => {}
    })
  } else {
    console.log('Form has validation errors')
  }
}

const isFormValid = computed(() => {
  const { fullName, email, phoneNumber, address, reservationDatetime, kids } = formValue

  // Check if all fields are filled and kids array is not empty
  return (
    !!fullName &&
    !!email &&
    !!phoneNumber &&
    !!address &&
    !!reservationDatetime &&
    kids.length > 0 &&
    kids.every((kid) => !!kid.fullName && !!kid.birthday) // Ensure all kid details are filled
  )
})
</script>

<template>
  <main>
    <div>
      <div class="row bg-light py-3 m-0">
        <div class="col-6 align-content-center text-center">
          <img src="@/assets/img/stroller.gif" width="40%" alt="My Animation" />
        </div>
        <div class="col-6">
          <div class="h-100 card">
            <div class="">
              <form @submit.prevent="handleSubmit">
                <div class="position-relative" style="overflow-y: auto; height: 57vh">
                  <div v-if="currentStep === 1" class="position-absolute col-12 card-body">
                    <Step1 ref="step1Component" :formValue="formValue" :formErrors="formErrors" />
                  </div>

                  <div v-if="currentStep === 2" class="position-absolute col-12 card-body">
                    <Step2 ref="step2Component" :formValue="formValue" :formErrors="formErrors" />
                  </div>
                </div>

                <div><div class="dropdown-divider"></div></div>

                <div class="card-body d-flex justify-content-between">
                  <div>
                    <button
                      class="btn btn-outline-warning"
                      @click="prevStep"
                      :disabled="currentStep === 1"
                    >
                      <font-awesome-icon icon="caret-left" /> Previous
                    </button>
                  </div>

                  <div>
                    <button
                      class="btn btn-outline-success"
                      @click="nextStep"
                      :disabled="currentStep === totalSteps"
                    >
                      Next <font-awesome-icon icon="caret-right" />
                    </button>
                    <button
                      type="submit"
                      :class="{
                        btn: true,
                        'btn-secondary': !isFormValid,
                        'btn-primary': isFormValid
                      }"
                      :disabled="!isFormValid"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner :isLoading="isLoading" />
  </main>
</template>

<style>
/* Additional styles for buttons */
button {
  margin: 0 10px;
}

.my-swal-container {
  width: 100%; /* Adjust as needed */
}

.my-swal-popup {
  width: 50%; /* Adjust as needed */
}

.custom-table th,
.custom-table td {
  padding-bottom: 0.25rem; /* Equivalent to Bootstrap's pb-1 */
}
</style>
