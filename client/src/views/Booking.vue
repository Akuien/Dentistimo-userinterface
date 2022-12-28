<template>
    <div>
      <b-form @submit.prevent="handleSubmit">
        <div class="head">
          <h1>booking for {{currentDentist.owner }}</h1>
          <h1>booking for {{currentDentist._id}}</h1>
        </div>
        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
          {{  notify }}
      </b-alert>

       <b-alert v-model="showDismissibleAlert2" variant="danger" dismissible>
          {{  notify2 }}
      </b-alert>
       <b-row no-gutters>
      <b-col cols="12">
        <b-calendar
          class="calendar"
          block
          selected-variant="success"
          today-variant="info"
          nav-button-variant="info"
          v-model="dateValue"
          :date-disabled-fn="dateDisabled"
          :min="min"
          :max="max"
          locale="en-US">
        </b-calendar>
      </b-col>
    </b-row>
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
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    minDate.setMonth(today.getMonth())
    minDate.setDate(today.getDate())
    const maxDate = new Date(today)
    maxDate.setMonth(today.getMonth() + 2)
    maxDate.setDate(today.getDate())
    return {
      dateValue: '',
      value: '',
      day: '',
      min: minDate,
      max: maxDate,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      notify: '',
      notify2: '',
      showDismissibleAlert: false,
      showDismissibleAlert2: false,
      currentDentist: [],
      publish: {
        topic: 'dentist/getdentistbyId',
        qos: 1,
        payload: `${this.$route.params.id}`
      },
      numberOfDentists: 0,
      email: '',
      form: {
        date: '',
        start: ''
      }
    }
  },
  mounted() {
    const { topic, qos, payload } = this.publish
    this.$client.subscribe('ui/get-dental-clinic')
    // this.$client.publish('dentists', 'The ui component wants this 1 ' + `${this.$route.params.id}` + ' dentist!!')
    this.$client.publish(topic, payload, qos, (error) => {
      if (error) {
        console.log(error)
      }
    })

    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'ui/get-dental-clinic') {
        // console.log('Dentist RECEIVED!!!!')
        const response = JSON.parse(payload)
        console.log('Dentist: ', response)

        this.currentDentist = response
        this.numberOfDentists = this.currentDentist.numberOfDentists
        // console.log(this.currentDentist)
        // console.log(this.currentDentist.numberOfDentists)
        console.log(this.numberOfDentists)
      }
    })
  },
  methods: {
    dateDisabled(ymd, date) {
    // Disable weekends (Sunday = `0`, Saturday = `6`)
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },
    handleSubmit() {
      const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const dayOfWeek = new Date(this.dateValue)
      const theDay = dayOfWeek.getDay()
      console.log('this is the email : ' + this.$store.state.email)
      const bookingInfo = {
        user: this.$store.state.id,
        day: weekday[theDay],
        date: this.dateValue,
        start: this.form.start,
        dentist: `${this.$route.params.id}`,
        issuance: uuid.v4(),
        numberOfDentists: this.numberOfDentists,
        email: this.$store.state.email
      }
      this.$client.subscribe('ui/approved')
      this.$client.subscribe('ui/notapproved')

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
        } else if (topic === 'ui/notapproved') {
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
