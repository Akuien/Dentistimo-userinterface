<template>
  <b-container>
    <h3> Select an appointment date: </h3>
    <b-row no-gutters>
      <b-col cols="12">
        <b-calendar
          class="calendar"
          block
          v-model="dateValue"
          id="date"
          start-weekday="1"
          selected-variant="success"
          today-variant="info"
          nav-button-variant="info"
          :date-disabled-fn="dateDisabled"
          :min="min"
          :max="max"
          locale="en-US">

        <p> Date: {{ dateValue }}</p>
        <div v-if="timeslots.dentistid">

<h1 style="color: white">{{ timeslots.name }}</h1>
<table class="openingHour">
  <thead>
    <th>Day</th>
    <th>Opening Hours</th>
  </thead>
  <tbody v-for="(value, key) in timeslots.openinghours" :key="key">
    <td>{{ key }}</td>
    <td>{{ value }}</td>
  </tbody>
</table>
</div>
<h3> Select an appointment timeslot: </h3>
   <b-card
    style="max-width: 10rem;"
    class="mb-2" >
    <b-form-radio  name="some-radios" value="B">
        <div class="col-md-6 col-sm-12">
          <form id="timeForm">
            <div class="row buttonRow">
              <div
                id="timebtn"
                class="col-3"
                v-for="timeslot in timeslots.timeSlots"
                v-bind:key="timeslot.timeSlots" >
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
    </b-calendar>
</b-col>
</b-row>
  </b-container>
</template>

<script>

let dentistid
export default {
  name: 'Calender',
  components: { },
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
      min: minDate,
      max: maxDate,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      dateValue: '',
      timeslots: [],
      timeSlots: [],
      currentDentist: {},
      client: {
        connected: false
      },
      weekday:
      ['sunday', 'monday', 'tuesday',
        'wednesday', 'thursday', 'friday', 'saturday']
    }
  },
  created() {
    this.sendDateAndDay()
  },
  methods: {
    dateDisabled(ymd, date) {
    // Disable weekends (Sunday = `0`, Saturday = `6`)
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },
    sendDateAndDay() {
      const requestid = Math.floor(Math.random() * 200)
      const d = new Date(this.dateValue)
      const n = d.getDay()
      const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const jsonMsg = { dentistid: dentistid, day: weekday[n], requestid: requestid }
      const stringMsg = JSON.stringify(jsonMsg)
      console.log(stringMsg)
      this.$client.on('connect', () => {
        console.log('Connected!')
      })
      this.$client.subscribe('sendTimeSlots')
      this.$client.publish('appointment/getAllTimeslots', `${this.$route.params.id}`, 1, (error) => {
        if (error) {
          console.log(error)
        }
      })

      this.$client.on('message', (topic, message) => {
        console.log(topic, message.toString())
        if (topic === 'sendTimeSlots') {
          console.log('timeslots recieved!')
          const response = JSON.parse(message)
          console.log('response: ')
          console.log(response)
          this.timeslots = response
          this.numberOfDentists = response.dentistsNumber
          this.openingHours = response.openinghours
        }
      })
    }
  }
}
</script>
