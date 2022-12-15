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
   <b-card
    style="max-width: 10rem;"
    class="mb-2" >
     <b-form-radio  name="some-radios" value="B">E.G 8.00-8.30
          <li v-for="appointment in appointments" :key="appointment.timeSlots">
              <h3>{{ appointment.timeSlots }}</h3>
          </li>
    </b-form-radio>
     </b-card>
</b-container>
            <button
              type="btn"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#clinic"
              @click="showTimeslots"> Check Available Time Slots </button>
        <div class="col-md-6 col-sm-12">
          <form id="timeForm">
            <div class="row buttonRow">
              <div
                id="timebtn"
                class="col-3"
                v-for="appointment in appointments.timeSlots"
                v-bind:key="appointment.timeSlots">

              </div>
            </div>
          </form>
        </div>

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

export default {
  name: 'Calendar',
  components: {
  },
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
      client: {}
    }
  },
  mounted() {
    this.$client.on('connect', () => {
      console.log('Connected!')
    })
    this.$client.subscribe('sendTimeSlots')
    this.$client.subscribe('appointment/getAllTimeslots')
    this.$client.publish('appointment/getAllTimeslots', 'send us timeslots')
    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'sendTimeSlots') {
        const response = JSON.parse(payload)
        const getJson = JSON.parse(response)
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
      const request = Math.floor(Math.random() * 200)
      const payload = { date: this.date, dentistid: this.clinicId, day: this.day, request: request }
      const stMessage = JSON.stringify(payload)
      console.log(stMessage)
      this.$client.publish('appointment/getAllTimeslots', stMessage)
      this.$client.subscribe(`sendTimeSlots/${payload.request}`)
      this.client.on('message', (topic, message) => {
        if (topic === `sendTimeSlots/${payload.request}`) {
          const string = message.toString()
          const getJson = JSON.parse(string)
          this.appointments = getJson
        }
      })
    }
  }
}
</script>
