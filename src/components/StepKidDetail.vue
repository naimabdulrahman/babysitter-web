<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'

const props = defineProps(['formValue', 'formErrors'])
const { formValue } = props

// Function to add a new kid
const addKid = () => {
  formValue.kids.push({ fullName: '', birthday: '' })
}

// Function to remove a kid by index
const removeKid = (index: number) => {
  formValue.kids.splice(index, 1)
}

const format = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Calculate max date (1 month ago)
const maxDate = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date
})

// Calculate min date (12 years and 11 months ago)
const minDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 12)
  date.setMonth(date.getMonth() - 11)
  return date
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center" style="padding-bottom: 10px">
      <div class="d-flex">
        <h5>Kid Detail</h5>
        <small class="pl-3 form-text text-muted">{{ '(Maximum: 4 kids)' }} </small>
      </div>
      <button
        type="button"
        class="btn btn-info btn-sm"
        :disabled="formValue.kids.length >= 4"
        @click="addKid"
      >
        <font-awesome-icon icon="plus" /> Add Kid
      </button>
    </div>

    <div v-for="(kid, index) in formValue.kids" :key="index" class="kid-box">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          type="text"
          class="form-control"
          id="fullName"
          v-model="formValue.kids[index].fullName"
          aria-describedby="fullnameHelp"
          placeholder="Enter Name"
        />
      </div>
      <div class="form-group w-100">
        <label for="birthday">Birthday</label>
        <Datepicker
          teleport-center
          v-model="formValue.kids[index].birthday"
          placeholder="Select a date"
          :format="format"
          :min-date="minDate"
          :max-date="maxDate"
          :enable-time-picker="false"
        />

        <small class="form-text text-muted">
          Child must be at least 1 month old and a maximum of 12 years old.
        </small>
        <small id="datetimereservationHelp" class="mt-0 form-text text-muted">
          Minimum birthday: {{ minDate.toLocaleDateString() }}
        </small>
        <small id="datetimereservationHelp" class="mt-0 form-text text-muted">
          Maximum birthday: {{ maxDate.toLocaleDateString() }}
        </small>
      </div>
      <div class="pb-2">
        <button
          v-if="formValue.kids.length > 1"
          type="button"
          class="btn btn-danger btn-sm"
          @click="removeKid(index)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kid-box {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  border-radius: 0.25rem;
}
</style>
