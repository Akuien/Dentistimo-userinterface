<template>
    <div>
      <b-form @submit.prevent="handleSubmit">
        <!-- <div class="head">
          <h1>booking for {{currentDentist._id}}</h1>
        </div> -->
        <div class="calender-div">
          <h1 class="header"> <strong> Clinic : {{currentDentist.name }} </strong> </h1>
          <h5><span> Opening Times</span></h5>

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
    <hr>
    <b-row no-gutters>
      <b-col cols="12">
        <p><span class="select-choice"> Select an appointment day: </span></p>
        <b-calendar
          class="calendar"
          width="1300px"
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
</div>
<div>
  <p><span class="select-choice"> Select an appointment timeslot: </span></p>
    <div>
    <p v-if="warning" class="warning-text" size="lg">
      Please choose within opening hours </p>
    </div>
    <div class="container"><br>
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
    <b-alert v-model="showDismissibleAlert" variant="success" dismissible class="success-booked">
          {{  notify }}
      </b-alert>

       <b-alert v-model="showDismissibleAlert2" variant="danger" dismissible class="failed-booked">
          {{  notify2 }}
      </b-alert>

     <b-button v-if="showCheckAvailabilityButton" :disabled="disableBtn"  @click="checkAvailability" class="button-check">
             Check availability
            </b-button>

      <div v-if="availability === true">
              <b-alert class="freeSlot" v-model="showSuccessAlert"
              v-if="showSuccessAlert"
              @dismissed="resetSuccessAlert"
              variant="light" dismissible>
                The requested appointment time is available
               </b-alert>
           <button  :disabled="disableMoreBookings" type="submit" class="btn-book"> Book now </button>
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
      timeSlots: '',
      times: undefined,
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
      availability: null,
      notify: '',
      notify2: '',
      showDismissibleAlert: false,
      showDismissibleAlert2: false,
      currentDentist: [],
      timeslots: [
        '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:30',
        '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00',
        '15:30', '16:00', '17:00', '17:30', '18:00', '18:30'
      ],
      dayPicked: '',
      chosenDayOpeningHours: '',
      thisDay: 9,
      chosenSlot: '',
      disableBtn: true,
      disableMoreBookings: false,
      warning: false,
      showSuccessAlert: false,
      showFailAlert: false,
      numberOfDentists: 0,
      email: '',
      showCheckAvailabilityButton: true
    }
  },
  mounted() {
    this.$client.subscribe('getDentistById/response')
    this.$client.publish('dentist/dentistById/request', `${this.$route.params.id}`, { qos: 1, retain: false }, (error) => {
      if (error) {
        console.log(error)
      }
    })

    this.$client.on('message', (topic, payload) => {
      if (topic === 'getDentistById/response') {
        console.log(topic, payload.toString())
        const response = JSON.parse(payload)
        console.log('Dentist: ', response)

        this.currentDentist = response
        this.numberOfDentists = this.currentDentist.numberOfDentists
        this.openingHours = response.openinghours
      }
    })
  },
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
        this.showCheckAvailabilityButton = true
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
    handleSubmit() {
      console.log('handleSubmit')
      const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const dayOfWeek = new Date(this.value)
      const theDay = dayOfWeek.getDay()
      console.log('this is the email : ' + this.$store.state.email)
      const bookingInfo = {
        user: this.$store.state.id,
        day: weekday[theDay],
        date: this.value,
        start: this.chosenSlot,
        dentist: `${this.$route.params.id}`,
        issuance: uuid.v4(),
        numberOfDentists: this.numberOfDentists,
        email: this.$store.state.email
      }
      this.$client.subscribe('booking/newAppointment/response/approved')
      this.$client.subscribe('booking/newAppointment/notapproved')

      const newRewquest = JSON.stringify(bookingInfo)
      this.$client.publish('booking/newAppointment/request', newRewquest, { qos: 1, retain: false }, (error) => {
        if (error) {
          console.log(error)
        }
      })

      this.$client.on('message', (topic, message) => {
        if (topic === 'booking/newAppointment/response/approved') {
          this.notify = 'Your have booked a new appointment!'
          this.showDismissibleAlert = true
          this.disableMoreBookings = true
          const response = JSON.parse(message)
          console.log(response)
        } else if (topic === 'booking/newAppointment/notapproved') {
          this.showDismissibleAlert2 = true
          this.notify2 = 'Your booking was unsucsessful!!'
        }
      })
    },
    resetSuccessAlert() {
      this.showSuccessAlert = false
    },
    resetFailAlert() {
      this.showFailAlert = false
    },
    checkAvailability() {
      // this.$client.on('connect', () => {
      console.log('Connected!!')

      this.$client.subscribe('booking/timeSlotAvailability/response', 'subscribed to appointment response')
      this.$client.publish('booking/timeSlotAvailability/request', JSON.stringify({ date: this.value, start: this.chosenSlot }))
      //  })

      this.$client.on('message', (topic, message) => {
        if (topic === 'booking/timeSlotAvailability/response') {
          const availability = JSON.parse(message).available
          this.availability = availability
          if (availability) {
            console.log('The requested appointment time is available')
            this.showSuccessAlert = true
            this.showCheckAvailabilityButton = false
          } else if (!availability) {
            console.log('The requested appointment time is not available')
            this.showFailAlert = true
          }
        }
      })
    }
  }
}

</script>

  <style scoped>

.openTime {
  width: 40%;
  background-color: #fadc85;
  /* border-radius: 2em; */
  border-style: solid;
  border-color: black;
  border-collapse: collapse;
  margin: 25px auto;
  font-size: large;

}
.calendar {
font-size: larger;
padding: 30px
}
.header {
font-weight: 900;
 color: #535353;
    text-shadow: -1px -1px 1px #000, 1px 1px 1px #ccc;
    text-transform: uppercase;
    margin-top: 20px;
font-weight: 900;
 font-family: "Trebuchet MS", sans-serif;
  font-size: 4.5em;
  letter-spacing: -2px;
  text-transform: uppercase;

}
.warning-text{
font-size: 20px;
font-weight: bolder;
color: rgb(175, 11, 11)
}
.container {
  margin-top: 20px;
  background-color: #FEF9EE;
  border-radius: 10px;
  margin-bottom: 20px;
}
.header-2 {
color: #000000e3;
padding: 5px;
margin: 5px;
text-decoration: underline dashed #3ab286 2px;
text-transform: uppercase;
  border-radius: 8px;
}
#check-availability-button {
background-color: #DEB887;
margin: 50px;
font-size: 20px;
font-weight: bolder;
color: #ffffff;
border: 2px solid #F97952;
border-radius: 10px;
width: 20em;
}

.button-check {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 3px 2px;
  border-radius: 10px 225px 255px 10px 10px 255px 225px 10px;
  border-style: solid;
  border-width: 1px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 20px;
  line-height: 5px;
  outline: none;
  margin: 1%;
  padding: 0.9rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
h1{
  font-weight: 700;
}

h5 span {
  background-color: gold;
}

.select-choice{
  background-color: #7ddbb9;
  border-radius: 12px;
  font-size: 2rem;
}

.button-check:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-check:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

.calendar-div{
    max-width: 500px;
  margin: auto;
}

.freeSlot {
margin-left: 20%;
margin-right: 20%;
padding: 10px;
font-size: 20px;
font-weight: bold;
background-color: #8fe6e0;
margin-bottom: 10px;
}
.takenSlot {
margin-left: 20%;
margin-right: 20%;
padding: 10px;
font-size: 20px;
font-weight: bold;
background-color: #df8ea2;
margin-bottom: 10px;
}

.btn-book{
  border-radius: 4px;
  height: 44px;
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7 !important;
  color: #3D5332;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn-book:active,
.btn-book:focus{
  background-color: #3D5332;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn-book:hover{
  background-color: #3D5332 !important;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}

.success-booked{
  margin-left: 20%;
  margin-right: 20%
}

.failed-booked{
  margin-left:20%;
  margin-right:20%
}
</style>
