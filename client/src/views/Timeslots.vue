<template>
    <div>
    <h1 class="header"> Booking for dentist: <strong> {{currentDentist.name }} </strong> </h1>

  <b-container>
    <h3 class="header-2"> Select an appointment date: </h3>
    <b-form @submit.prevent="checkAvailability">
    <b-row no-gutters>
      <b-col cols="12">
        <b-calendar
          class="calendar"
          block
          start-weekday="1"
          selected-variant="secondary"
          today-variant="info"
          nav-button-variant="info"
          v-model="value"
          :date-disabled-fn="dateDisabled"
          :min="min"
          :max="max"
          locale="en-US">
        </b-calendar>
    </b-col>
</b-row>

    <h3 class="header-2"> Select an appointment timeslot: </h3>
<h5> Please choose from opening times</h5>

    <div v-if="currentDentist">

      <table class="openTime">
        <thead>
          <th>Day: </th>
          <th>Opening Hours: </th>
        </thead>
        <tbody v-for="(time, day) in currentDentist.openinghours" :key="day">
          <td>{{ day }}</td>
          <td>{{ time }}</td>
        </tbody>
      </table>
    </div>

     <div class="container">
    <div>
     <b-form-radio-group
      v-model="chosenSlot"
      :options="timeslots"
      class="mb-3"
      value-field="item"
      disabled-field="notEnabled">
    </b-form-radio-group>
    <div class="mt-3"> Selected time: <strong> {{ chosenSlot }} </strong> </div>
  </div>

</div>
    <div>
    <p v-if="warning" class="warning-text" size="lg">
      Please choose within opening hours </p>
    </div>

    <b-button outline variant="light"  :disabled="disableBtn"  type="submit" id="check-availability-button">
             Check availability
            </b-button>
          </b-form>

            <div v-if="availability === true">
              <b-alert class="freeSlot" v-model="showSuccessAlert"
              v-if="showSuccessAlert"
              @dismissed="resetSuccessAlert"
              variant="success" dismissible>
                The requested appointment time is available
               </b-alert>
           </div>

          <div v-else-if="availability === false">
            <b-alert class="takenSlot" v-model="showFailAlert"
            v-if="showFailAlert"
            variant="danger"
            @dismissed="resetFailAlert"
            dismissible>
              The requested appointment time is not available
    </b-alert>

  </div>
</b-container>
</div>
</template>

<script>

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
      value: new Date(),
      date: '',
      time: '',
      day: '',
      availability: null,
      name: '',
      min: minDate,
      max: maxDate,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      appointments: [],
      currentDentist: {},
      numberOfDentists: 0,
      openingHours: {},
      timeslots: [
        '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:30',
        '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
        '15:30', '16:00', '17:00', '17:30', '18:00', '18:30'
      ],
      dayPicked: '',
      chosenDayOpeningHours: '',
      thisDay: 9,
      chosenSlot: '',
      disableBtn: true,
      warning: false,
      showSuccessAlert: false,
      showFailAlert: false
    }
  },
  components: { },

  watch: {

    value: function () {
      const getDayFromValue = new Date(this.value)
      const getDay = getDayFromValue.getDay()
      this.thisDay = getDay
      const openingOnDay = Object.keys(this.currentDentist.openinghours)[getDay - 1]
      const openingHThisDay = Object.values(this.currentDentist.openinghours)[getDay - 1]
      this.dayPicked = openingOnDay
      this.chosenDayOpeningHours = openingHThisDay
      this.disableButton = true
    },
    chosenSlot: function () {
      const openingHour = this.chosenDayOpeningHours.substring(
        0, this.chosenDayOpeningHours.indexOf(':')
      )
      const closingH1 = this.chosenDayOpeningHours.substring(
        this.chosenDayOpeningHours.indexOf('-') + 1
      )
      const closingH2 = closingH1.substring(0, closingH1.indexOf(':'))
      const timeChosen = this.chosenSlot
      const stInt = parseInt(openingHour)
      const clInt = parseInt(closingH2)
      const chosenTime = parseInt(timeChosen)
      if (chosenTime >= stInt && chosenTime < clInt) {
        this.warning = false
        this.disableBtn = false
      } else {
        this.warning = true
        this.disableBtn = true
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
    resetSuccessAlert() {
      this.showSuccessAlert = false
    },
    resetFailAlert() {
      this.showFailAlert = false
    },
    checkAvailability() {
      this.$client.on('connect', () => {
        console.log('Connected!!')

        this.$client.subscribe('appointment/response', 'subscribed to appointment response')
        this.$client.publish('appointment/request', JSON.stringify({ date: this.value, start: this.chosenSlot }))
      })

      this.$client.on('message', (topic, message) => {
        if (topic === 'appointment/response') {
          const availability = JSON.parse(message).available
          this.availability = availability
          if (availability) {
            console.log('The requested appointment time is available')
            this.showSuccessAlert = true
          } else {
            console.log('The requested appointment time is not available')
            this.showFailAlert = true
          }
        }
      })
    },

    sendApppointmentRequest() {
      const newRequest = {
        dentistid: this.$route.params.dentistid,
        name: this.$store.state.firstname + ' ' + this.$store.state.lastname,
        numberOfDentists: this.numberOfDentists,
        start: this.chosenSlot,
        user: this.$store.state.id,
        issuance: Date.now()
      }
      console.log(newRequest)
    }
  },

  mounted() {
    this.$client.on('connect', () => {
      console.log('Connected!')
    })
    this.$client.subscribe('ui/dentist/getdentistbyId')
    this.$client.publish('dentist/getdentistbyId', 'pleaseee send dentist: ' + `${this.$route.params.dentistid}`, 1,
      (error) => {
        if (error) {
          console.log(error)
        }
      })
    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())

      if (topic === 'ui/dentist/getdentistbyId') {
        const response = JSON.parse(payload)
        this.currentDentist = response
        this.name = response.name
        this.numberOfDentists = response.numberOfDentists
        this.openingHours = response.openinghours
        console.log(this.currentDentist)
      }
    })
  }
}

</script>

<style scoped>

.openTime {
  width: 40%;
  background-color: #cebffab6;
  border-collapse: collapse;
  margin: 25px auto;
  font-size: large;
border-radius: 2em;
}
.calendar {
font-size: larger;
padding: 30px
}
.header {
color: #309aa0ca;;
margin: 20px;
font-weight: bold;

}
.warning-text{
font-size: 20px;
font-weight: bolder;
color: red
}
.container {
  margin-top: 40px;
  background-color: #41bdcb7c;
  border-radius: 10px;
  margin-bottom: 50px;
}
.header-2 {
color: #309aa0e3;
padding: 5px;
margin: 30px;
border: 2px solid #4a9aae77;
  border-radius: 10px;
}
#check-availability-button {
background-color: #cebffab6;
margin: 50px;
font-size: 20px;
font-weight: bolder;
color: #ffffff;
border: 2px solid #8d77ddb6;
border-radius: 10px;
width: 20em;
}
.freeSlot {
margin: 10px;
padding: 30px;
font-size: 20px;
font-weight: bold;
background-color: #90dec2;
margin-bottom: 10px;
}
</style>
