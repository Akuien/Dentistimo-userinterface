<template>
    <div>
      <b-form @submit.prevent="handleSubmit">
        <div class="head">
          <h1>booking for {{currentDentist.owner }}</h1>
        </div>
        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
          {{  notify }}
      </b-alert>

       <b-alert v-model="showDismissibleAlert2" variant="danger" dismissible>
          {{  notify2 }}
      </b-alert>

        <div class="form-group">
        <b-form-group for="timepicker-valid">Choose a date
      <b-form-datepicker v-model="form.day" locale="en"></b-form-datepicker></b-form-group>
       </div>

       <div class="form-group">
         <b-form-group for="timepicker-valid">Choose a time
    <b-form-timepicker id="datepicker-valid" :state="true" v-model="form.start"></b-form-timepicker></b-form-group>
       </div>
        <button style="background:#3D5332" class="btn btn-primary btn-block">Submit</button>
      </b-form>
    </div>
  </template>

<script>
import { uuid } from 'vue-uuid'

export default {
  name: 'booking',
  data() {
    return {
      notify: '',
      notify2: '',
      showDismissibleAlert: false,
      showDismissibleAlert2: false,
      currentDentist: [],
      numberOfDentists: 0,
      form: {
        day: '',
        start: ''
      }
    }
  },
  mounted() {
    this.$client.subscribe('ui/dentist/getdentistbyId')
    this.$client.publish('dentists', 'The ui component wants this ' + `${this.$route.params.id}` + ' dentist!!')
    this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
      if (error) {
        console.log(error)
      }
    })

    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'ui/dentist/getdentistbyId') {
        console.log('Dentist RECEIVED!!!!')
        const response = JSON.parse(payload)
        console.log('Dentist: ', response)

        this.currentDentist = response
        this.numberOfDentists = this.currentDentist.numberOfDentists
        console.log(this.currentDentist)
        // console.log(this.currentDentist.numberOfDentists)
        console.log(this.numberOfDentists)
      }
    })
  },
  methods: {
    handleSubmit() {
      const bookingInfo = {
        user: this.$store.state.id,
        day: this.form.day,
        start: this.form.start,
        dentist: `${this.$route.params.id}`,
        issuance: uuid.v4(),
        numberOfDentists: this.numberOfDentists
      }
      this.$client.subscribe('ui/approved')
      const newRewquest = JSON.stringify(bookingInfo)
      this.$client.publish('BookingInfo/test', newRewquest)
      console.log('testing')

      this.$client.on('message', (topic, message) => {
        console.log(topic, message.toString())
        if (topic === 'ui/approved') {
          this.notify = 'Your have booked a new appointment!'
          this.showDismissibleAlert = true
          this.showDismissibleAlert2 = false
          const response = JSON.parse(message)
          console.log(response)
        } else {
          this.showDismissibleAlert = false
          this.showDismissibleAlert2 = true
          this.notify2 = 'Your booking was unsucsessful!!'
        }
      })
    }
  }
}
</script>

  <style scoped>
  .head h1 {
    margin-top: 50px;
  }
  </style>
