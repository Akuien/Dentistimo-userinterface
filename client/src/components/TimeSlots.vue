<template>
  <b-container>
    <div v-if="currentDentist">
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
        </tbody>
      </table>
    </div>
     <h3> please choose time: </h3>
     <div class="container">
     <b-form @submit.prevent="getTimeslotRequest">
          <h1 style="color: white">Your request</h1>

          <div v-if="chosenDay && chosenDayOpeningHours">
          <p class="text-light capitalize">
            On {{ chosenDay }}'s we are open {{ chosenDayOpeningHours }}
          </p>
        </div>

          <div>
            <b-form-group
              id="input-group-5"
              label-size="lg"
              label-for="input-4"
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7">

          <b-form-radio-group
        id="radio-group-1"
        v-model="chosenSlot"
        :options="timeslots"
        size="lg"
        name="radio-options"
      ></b-form-radio-group>
    </b-form-group>
  </div>
     <div>
    <div class="mt-3">Selected: <strong>
      {{ chosenSlot }}
    </strong></div>

          </div>

          <div>
            <p v-if="warningText" class="text-light">
              Please Choose From Opening Hours
            </p>
          </div>

          <b-button type="submit" variant="danger" :disabled="disableButton"
            >REQUEST BOOKING</b-button
          >

        </b-form>
    </div>
</b-container>
</template>

<script>
export default {
  name: 'TimeSlots',
  data() {
    return {
      currentDentist: {},
      numberOfDentists: 0,
      openingHours: {},
      publishToDentist: {
        topic: 'dentist/getdentistbyId',
        qus: 1,
        payload: this.$route.params.dentistid

      },
      timeslots: [
        { text: 'Select Time', value: null, disabled: true },
        '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
        { text: '10:00 Lunch', value: null, disabled: true },
        '10:30', '11:00', '11:30',
        { text: '12:00 Lunch', value: null, disabled: true },
        '13:00', '13:30', '14:00', '14:30',
        { text: '15:00 Fika', value: null, disabled: true },
        '15:30', '16:00', '17:00', '17:30', '18:00', '18:30'
      ],
      appointments: [],
      value: '',
      form: {
        hour: '',
        minutes: '',
        timeslots: ''
      },
      chosenDay: '',
      chosenDayOpeningHours: '',
      thisDay: 9,
      chosenSlot: '',
      openTime: 0,
      closeTime: 0,
      disableButton: true,
      warningText: false
    }
  },

  watch: {
    value: function () {
      const getDayFromValue = new Date(this.value)
      const getDay = getDayFromValue.getDay()
      this.thisDay = getDay
      console.log(getDay)

      const openingthisDay = Object.keys(this.currentDentist.openinghours)[
        getDay - 1]
      const openingHoursThisDay = Object.values(this.currentDentist.openinghours)[
        getDay - 1]

      this.chosenDay = openingthisDay
      this.chosenDayOpeningHours = openingHoursThisDay

      console.log(openingthisDay)
      console.log(openingHoursThisDay)
      this.disableButton = true
    },
    chosenSlot: function () {
      const openingHour = this.chosenDayOpeningHours.substring(
        0,
        this.chosenDayOpeningHours.indexOf(':')
      )
      const closingHour1 = this.chosenDayOpeningHours.substring(
        this.chosenDayOpeningHours.indexOf('-') + 1
      )
      const closingHour2 = closingHour1.substring(0, closingHour1.indexOf(':'))
      const checkTimeChosen = this.chosenSlot

      // //Integers
      const startInt = parseInt(openingHour)
      const closeInt = parseInt(closingHour2)
      const chosenTime = parseInt(checkTimeChosen)

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
    getTimeslotRequest() {
      const startDate = this.value + ' ' + this.chosenSlot
      const DateToDate = new Date(startDate)
      const finishInThirty = new Date(DateToDate.getTime() + 90 * 60000)
      const added2 = finishInThirty.toISOString().slice(0, 16)
      const newRequest = {
        dentist: this.$route.params.dentistid,
        name: this.$store.state.firstname + ' ' + this.$store.state.lastname,
        start: startDate,
        end: added2,
        user: this.$store.state.id,
        issuance: Date.now(),
        numberOfDentists: this.numberOfDentists
      }
      console.log(newRequest)
    },
    getDentist() {
      const { topic, qos, payload } = this.publishToDentist
      this.$client.publish(topic, payload, qos, (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        console.log(topic, payload.toString())
        if (topic === 'ui/get-dental-clinic') {
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
    },
    mounted() {
      this.getDentist()
    }
  }
}
</script>
