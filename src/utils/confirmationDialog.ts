import { calculateAge, formatDate, formatDateTime } from '@/helper'
import Swal from 'sweetalert2'

export function showConfirmationDialog({
  formValue,
  onConfirm,
  onCancel
}: {
  formValue: any
  onConfirm: () => void
  onCancel: () => void
}) {
  const formattedReservation = formatDateTime(new Date(formValue.reservationDatetime))
  let kidDetailsHtml = ''

  for (let i = 0; i < formValue.kids.length; i++) {
    const age = calculateAge(formValue.kids[i]['birthday'])

    const formattedDOB = formatDate(new Date(formValue.kids[i]['birthday']))

    kidDetailsHtml += `
      <div class="pb-3">
        <table class="custom-table" style="width: 100%; text-align: left;">
          <tr>
            <th class="pb-1" style="width: 3%;">${i + 1})</th>
            <td style="width: 30%;">Full Name</td>
            <td style="width: 2%;">:</td>
            <td style="width: 65%;">${formValue.kids[i]['fullName'] || ''}</td>
          </tr>
          <tr>
            <th class="pb-1" style="width: 3%;"></th>
            <th style="width: 30%;">Birthday</th>
            <td style="width: 2%;">:</td>
            <td style="width: 65%;">${formattedDOB}</td>
          </tr>
          <tr>
            <th style="width: 3%;"></th>
            <th style="width: 30%;">Age</th>
            <td style="width: 2%;">:</td>
            <td style="width: 65%;">${age}</td>
          </tr>
        </table>
      </div>
    `
  }

  Swal.fire({
    title: 'Confirm Your Details',
    html: `
      <div class="pb-5">
        <div class="text-left"><h4>Booking Details</h4></div>
        <table class="custom-table" style="width: 100%; text-align: left;">
          <tr>
            <th style="width: 30%;">Full Name</th>
            <td style="width: 5%;">:</td>
            <td style="width: 65%;">${formValue.fullName}</td>
          </tr>
          <tr>
            <th class="pb-1" style="width: 30%;">Email</th>
            <td style="width: 5%;">:</td>
            <td style="width: 65%;">${formValue.email}</td>
          </tr>
          <tr>
            <th style="width: 30%;">Phone Number</th>
            <td style="width: 5%;">:</td>
            <td style="width: 65%;">${formValue.phoneNumber}</td>
          </tr>
          <tr>
            <th style="width: 30%;">Address</th>
            <td style="width: 5%;">:</td>
            <td style="width: 65%;">${formValue.address}</td>
          </tr>
          <tr>
            <th style="width: 30%;">Reservation</th>
            <td style="width: 5%;">:</td>
            <td style="width: 65%;">${formattedReservation}</td>
          </tr>
        </table>
      </div>
      <div>
        <div class="text-left"><h4>Kid Details</h4></div>
        ${kidDetailsHtml}
      </div>
    `,
    icon: 'info',
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Edit',
    reverseButtons: true,
    customClass: {
      container: 'my-swal-container',
      popup: 'my-swal-popup'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    } else if (result.isDismissed) {
      onCancel()
    }
  })
}
