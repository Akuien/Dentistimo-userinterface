<template>
    <div>
      <form>
        <div class="head">
          <h1>booking</h1>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.user" placeholder="User"/>
        </div>

        <div class="form-group">
        <b-form-group for="timepicker-valid">Choose a date
      <b-form-datepicker v-model="form.day" locale="en"></b-form-datepicker></b-form-group>
       </div>

       <div class="form-group">
         <b-form-group for="timepicker-valid">Choose a time
    <b-form-timepicker id="datepicker-valid" :state="true" v-model="form.start"></b-form-timepicker></b-form-group>
       </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="form.dentist" placeholder="dentist"/>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.issuance" placeholder="issuance" />
        </div>

        <button style="background:#3D5332" class="btn btn-primary btn-block" @click="sendBookingDetails()">Submit</button>
      </form>
    </div>
  </template>

<script>

export default {
  name: 'booking',
  data() {
    return {
      form: {
        user: '',
        day: '',
        start: '',
        dentist: '',
        issuance: ''
      }
    }
  },
  mounted() {
    this.sendBookingDetails()
  },
  methods: {
    sendBookingDetails() {
      const bookingInfo = {
        user: this.form.user,
        day: this.form.day,
        start: this.form.start,
        dentist: this.form.dentist,
        issuance: this.form.issuance
      }
      const newRewquest = JSON.stringify(bookingInfo)
      this.$client.publish('BookingInfo/test', newRewquest)
    }
  }
}
</script>

  <style scoped>
  .head h1 {
    margin-top: 50px;
  }
  </style>
