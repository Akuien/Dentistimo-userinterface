<template>
  <b-container>
    <h3> Select an appointment date: </h3>
    <b-row no-gutters>
      <b-col cols="12">
        <b-calendar
          class="calendar"
          block
          start-weekday="1"
          selected-variant="success"
          today-variant="info"
          nav-button-variant="info"
          v-model="date"
          :date-disabled-fn="dateDisabled"
          :min="min"
          :max="max"
          locale="en-US">
    <div v-if="currentDentist.dentistid">

      <h1 style="color: white">{{ currentDentist.name }}</h1>
      <h2></h2>
      <table class="openingHour">
        <thead>
          <th>Day</th>
          <th>Opening Hours</th>
        </thead>
        <tbody v-for="(value, key) in currentDentist.openinghours" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tbody> </table>
    </div>
    <h3> Select an appointment timeslot: </h3>
     <div class="container">
     <b-form @submit.prevent="getAppRequest">
          <div v-if="chosenDay && chosenDayOpeningHours">
          <p class="text-light capitalize">
            On {{ chosenDay }}'s we are open {{ chosenDayOpeningHours }}
          </p>
        </div>

          <div>
     <b-form-radio-group
      v-model="chosenSlot"
      :options="timeslots"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled">
    </b-form-radio-group>
    <div class="mt-3">Selected: <strong>{{ chosenSlot }}</strong></div>
  </div>
</b-form>
</div>
    <div>
    <p v-if="warning" class="text-danger" size="lg">
      Please Choose From Opening Hours </p>
    </div>
    <b-button type="submit" variant="light" :disabled="disableButton" @click="getAppRequest">
     Book now
     </b-button>
  </b-calendar>
</b-col>
</b-row>
<TimeSlotsVue> </TimeSlotsVue>
</b-container>
</template>

<script>
import TimeSlotsVue from '../components/TimeSlots.vue'
export default {
  name: 'TimeSlots',
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
      date: '',
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
        connected: true
      },
      currentDentist: {},
      numberOfDentists: 0,
      openingHours: {},
      publishToDentist: {
        topic: 'dentist/getdentistbyId',
        qus: 1,
        payload: this.$route.params.dentistid
      },
      timeslots: [
        '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:30',
        '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
        '15:30', '16:00', '17:00', '17:30', '18:00', '18:30'
      ],
      chosenDay: '',
      chosenDayOpeningHours: '',
      thisDay: 9,
      chosenSlot: '',
      disableButton: true,
      warning: false
    }
  },
  components: { TimeSlotsVue },
  watch: {
    value: function () {
      const getDayFromValue = new Date(this.value)
      const getDay = getDayFromValue.getDay()
      this.thisDay = getDay
      const openingthisDay = Object.keys(this.currentDentist.openinghours)[
        getDay - 1]
      const openingHoursThisDay = Object.values(this.currentDentist.openinghours)[
        getDay - 1]
      this.chosenDay = openingthisDay
      this.chosenDayOpeningHours = openingHoursThisDay
      this.disableButton = true
    },
    chosenSlot: function () {
      const openingHour = this.chosenDayOpeningHours.substring(
        0, this.chosenDayOpeningHours.indexOf(':')
      )
      const closingHour1 = this.chosenDayOpeningHours.substring(
        this.chosenDayOpeningHours.indexOf('-') + 1
      )
      const closingHour2 = closingHour1.substring(0, closingHour1.indexOf(':'))
      const timeChosen = this.chosenSlot
      const startInt = parseInt(openingHour)
      const closeInt = parseInt(closingHour2)
      const chosenTime = parseInt(timeChosen)
      if (chosenTime >= startInt && chosenTime < closeInt) {
        this.disableButton = false
        this.warningText = false
      } else {
        this.disableButton = true
        this.warningText = true
      }
    }
  },
  methods: {
    dateDisabled(ymd, date) {
    // Disable weekends (Sunday = `0`, Saturday = `6`)
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },
    getAppRequest() {
      const startDate = this.value + ' ' + this.chosenSlot
      const endDate = new Date(startDate)
      const thirtyMinutes = new Date(endDate.getTime() + 90 * 60000)
      const addToStart = thirtyMinutes.toISOString().slice(0, 16)
      const newRequest = {
        dentist: this.$route.params.dentistid,
        name: this.$store.state.firstname + ' ' + this.$store.state.lastname,
        start: startDate,
        end: addToStart,
        user: this.$store.state.id,
        issuance: Date.now(),
        numberOfDentists: this.numberOfDentists
      }
      console.log(newRequest)
    },
    getDentist() {
      this.$client.publish('pleaseee give mee dentist: ' + 'dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        console.log(topic, payload.toString())
        if (topic === 'ui/dentist/getdentistbyId') {
          console.log('Dentist recieved!')
          const response = JSON.parse(payload)
          console.log('response: ')
          console.log(response)
          console.log('Dentists: ', response.dentists)
          this.currentDentist = response
          this.numberOfDentists = response.dentists
          this.openingHours = response.openinghours
          console.log(this.currentDentist)
        }
      })
    }
  },
  mounted() {
    this.$client.on('connect', () => {
      console.log('Connected!')
    })
    this.$client.publish('dentist/getdentistbyId', 'pleaseee send dentist: ' + `${this.$route.params.id}`, 1,
      (error) => {
        if (error) {
          console.log(error)
        }
      })
    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'ui/dentist/getdentistbyId') {
        this.$client.subscrobe('ui/dentist/getdentistbyId')
        console.log('Dentist recieved!')
        const response = JSON.parse(payload)
        console.log('response: ')
        console.log(response)
        console.log('Dentists: ', response.dentists)
        this.currentDentist = response
        this.numberOfDentists = response.dentists
        this.openingHours = response.openinghours
        console.log(this.currentDentist)
      }
    })
  }
}

</script>

<style scoped>
.openingHour {
  width: 40%;
  background-color: white;
  border-collapse: collapse;
  margin: 20px auto;
}
.container {
background-size:auto;
  margin-top: 30px;
  border-radius: 15px;
  background-color: rgb(102, 247, 233);
}
.timeslotpicked {
font-size: large;
}
</style>
