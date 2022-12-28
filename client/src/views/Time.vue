<template>
  <div>
    <h1 class="header"> Booking for dentist: <strong> {{currentDentist.name }} </strong> </h1>
  <b-container>
    <h3 class="header-2"> Select an appointment date: </h3>
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
          locale="en-US"
          @selected="showTimeslots(dateValue)">
        </b-calendar>
      </b-col>
    </b-row>
    <h2> </h2>
    <h3 class="header-2"> Select an appointment timeslot: </h3>
     <b-container class="listitem"
         v-for="time in times"
         v-bind:key="time._id">
               <b-col> Day: {{ time.day }}</b-col>
              <b-col>Opening Hours: {{ time.openinghour }}:00 - {{ time.closinghour }}:00</b-col>

             <span class="feature">Time Slots:</span> <br />

      <div
        v-for="time in times"
        :key="time._id"
        :value="value">
        <b-form-select v-model="timeSlots">
  <b-form-select-option  v-for="(slot, index) in time.timeSlots" :key="index" :value="value">  {{ index }} - {{ slot }}
  </b-form-select-option>
</b-form-select>

<b-form-group label="Available slots" v-slot="{ ariaDescribedby }" v-model="timeSlots">
      <b-form-radio v-model="timeSlots" :aria-describedby="ariaDescribedby" name="some-radios" v-for="(slot, index) in time.timeSlots" :key="index" :value="value">{{ slot }}</b-form-radio>
    </b-form-group>
    <div class="mt-3">Selected: <strong>{{ timeSlots }}</strong></div>
      </div>

    <!-- <div class="mt-3">Selected: <strong>{{ selectedItem }}</strong></div> -->
          </b-container>
          <b-button outline variant="light" class="btnBook" > Book now </b-button>
   <!--  <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Dismissible Alert!
      </b-alert> -->
</b-container>
</div>
</template>

<script>
export default {
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
      showAlert: false,
      fail: '',
      selectedItem: null,
      timeSlots: '',
      slotsm: '',
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
      selected: '',
      currentDentist: [],
      id: 0,
      times: undefined
    }
  },
  mounted() {
    this.getDentist()
  },
  methods: {
    dateDisabled(ymd, date) {
    // Disable weekends (Sunday = `0`, Saturday = `6`)
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },
    getDentist() {
      this.$client.subscribe('ui/get-dental-clinic')
      // this.$client.publish('dentists', 'The ui component wants this 1 ' + `${this.$route.params.id}` + ' dentist!!')
      this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        if (topic === 'ui/get-dental-clinic') {
          const response = JSON.parse(payload)
          this.currentDentist = response
          this.id = this.currentDentist.id
        }
      })
    },
    showTimeslots(date) {
      this.$client.subscribe('ui/get-dental-clinic')
      // this.$client.publish('dentists', 'The ui component wants this 1 ' + `${this.$route.params.id}` + ' dentist!!')
      this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        if (topic === 'ui/get-dental-clinic') {
          const response = JSON.parse(payload)
          this.currentDentist = response
          this.id = this.currentDentist.id
        }
        const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        const dayOfWeek = new Date(this.dateValue)
        const theDay = dayOfWeek.getDay()

        this.$client.subscribe('ui/dentistTimeSlotsFound')
        const denID = {
          id: this.currentDentist.id,
          day: weekday[theDay],
          date: this.dateValue,
          requestid: Math.floor(Math.random() * 29805688)
        }
        // console.log('checking date ' + this.dateValue)
        // console.log('checking day:::' + weekday[theDay])
        const newRewquest = JSON.stringify(denID)
        this.$client.publish('dentist/getTimeslots', newRewquest)

        this.$client.on('message', (topic, payload) => {
          if (topic === 'ui/dentistTimeSlotsFound') {
            const response = JSON.parse(payload)
            this.times = response
          }
        })
      })
    }
  }
}
</script>

<style>
.header {
color: #308aa0aa;;
margin: 20px;
font-weight: bold;

}
.container {
  margin-top: 40px;
  background-color: #85e5fd62;
  border-radius: 10px;
  margin-bottom: 50px;
}
.header-2 {
color: #308aa0aa;
padding: 5px;
margin: 30px;
border: 2px solid #4a9aae77;
  border-radius: 10px;
}
.btnBook {
margin: 50px;
color: #45b5d5;
width: 20em;

}
.listitem {
  margin: 10px;
  font-weight: bold;
  color: #255e6d;
  font-size: large;
}
</style>
