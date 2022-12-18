<template>
    <div>
      <form>
        <div class="head">
          <h1>booking for {{currentDentist.owner }}</h1>
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
        <button style="background:#3D5332" class="btn btn-primary btn-block" @click="sendBookingDetails()">Submit</button>
      </form>
    </div>
  </template>

<script>
import { uuid } from 'vue-uuid'

export default {
  name: 'booking',
  data() {
    return {
      currentDentist: {},
      form: {
        user: '',
        day: '',
        start: ''
      }
    }
  },
  mounted() {
    this.$client.publish('dentists', 'The ui component wants this ' + `${this.$route.params.id}` + ' dentist!!')
    this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
      if (error) {
        console.log(error)
      }
    })

    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'ui/get-dental-clinic') {
        console.log('Dentist RECEIVED!!!!')
        const response = JSON.parse(payload)
        console.log('RESPONSE HERE')
        console.log(response)
        console.log('Dentists: ', response.dentists)

        this.currentDentist = response
        this.numberOfDentists = response.dentists
        this.openingHours = response.openinghours

        console.log(this.currentDentist)
      }
    })
  },
  methods: {
    sendBookingDetails() {
      const bookingInfo = {
        user: this.form.user,
        day: this.form.day,
        start: this.form.start,
        dentist: `${this.$route.params.id}`,
        issuance: uuid.v4()
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
