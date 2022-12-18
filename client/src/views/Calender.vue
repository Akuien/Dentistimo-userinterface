<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12">
        <b-calendar
          class="calendar"
          block
          start-weekday="1"
          selected-variant="success"
          today-variant="info"
          nav-button-variant="info"
          v-model="value"
          :date-disabled-fn="dateDisabled"
          :min="min"
          :max="max"
          locale="en-US"
          >
          <b-container>
     <h1> Available Time Slots </h1>
     <button
              type="btn"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#clinic"
              @click="showTimeslots"> Check Time Slots </button>
   <b-card
    style="max-width: 10rem;"
    class="mb-2" >
    <b-form-radio  name="some-radios" value="B">E.G 8.00-8.30
        <div class="col-md-6 col-sm-12">
          <form id="timeForm">
            <div class="row buttonRow">
              <div
                id="timebtn"
                class="col-3"
                v-for="appointment in appointments.timeSlots"
                v-bind:key="appointment.timeSlots" >
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="bookAppointment(appointment)">
                  {{ appointment }}
                </button>
              </div>
            </div>
          </form>
        </div>
    </b-form-radio>
     </b-card>

<Timeslots></Timeslots>
</b-container>

         <!--  <TimeSlots
      :timeslotDay="timeslotDay"
      :value="value"
      :timeSlots="timeSlots"/> -->
        </b-calendar>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

import Timeslots from '../components/TimeSlots.vue'

export default {
  name: 'Calendar',
  components: { Timeslots },
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
      value: '',
      day: '',
      min: minDate,
      max: maxDate,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      appointments: [],
      client: {
        connected: false
      }
    }
  },

  mounted() {
    this.$client.on('connect', () => {
      console.log('Connected!')
    })
    this.$client.subscribe('sendTimeSlots')
    this.$client.publish('appointment/getAllTimeslots', 'send us timeslots')
    this.$client.on('message', (topic, payload) => {
      if (topic === 'sendTimeSlots') {
        const response = JSON.parse(payload)
        const getJson = JSON.parse(JSON.stringify(response))
        this.appointments = getJson
      } console.log(this.appointments)
    })
  },
  methods: {
    dateDisabled(ymd, date) {
    // Disable weekends (Sunday = `0`, Saturday = `6`)
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },
    showTimeslots(appointments) {
      this.$client.publish('appointment/getAllTimeslots')
      this.$client.subscribe('sendTimeSlots')
      this.$client.on('message', (topic, message) => {
        if (topic === 'sendTimeSlots') {
          const string = message.toString()
          const json = JSON.parse(string)
          this.appointments = json
        } console.log(this.appointments)
      })
    },
    bookAppointment(appointment) {}
  }
}
</script>
