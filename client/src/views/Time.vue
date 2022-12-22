<template>
  <b-container>
     <h1> Available Time Slots </h1>
     <h1>booking for dentist {{currentDentist.id }}</h1>
     <b-row no-gutters>
      <b-col cols="12">
        <b-calendar
          class="calendar"
          block
          selected-variant="success"
          today-variant="info"
          nav-button-variant="info"
          v-model="value"
          :date-disabled-fn="dateDisabled"
          :min="min"
          :max="max"
          locale="en-US"
          @selected="showTimeslots(value)"
        >
        </b-calendar>
      </b-col>
    </b-row>
     <b-container class="listitem"
         v-for="time in times"
        v-bind:key="time._id">
             <h1>dentist Name: {{ time.name  }}</h1>
             <b-col> Day: {{ time.day }}</b-col>
            <b-col>Opening Hours: {{ time.openinghour }}:00 - {{ time.closinghour }}:00</b-col>
             <span class="feature">Time Slots:</span> <br />
        {{ time.timeSlots}}<br />
        <br />
          </b-container>
   <b-card
    style="max-width: 10rem;"
    class="mb-2"
    >
     <b-form-radio v-model="selected" name="some-radios" value="B">E.G 8.00-8.30</b-form-radio>
     </b-card>
</b-container>

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
      this.$client.subscribe('ui/dentist/getdentistbyId')
      this.$client.publish('dentists', 'The ui component wants this 1 ' + `${this.$route.params.id}` + ' dentist!!')
      this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        if (topic === 'ui/dentist/getdentistbyId') {
          const response = JSON.parse(payload)
          this.currentDentist = response
          this.id = this.currentDentist.id
        }
      })
    },
    showTimeslots(date) {
      this.$client.subscribe('ui/dentist/getdentistbyId')
      this.$client.publish('dentists', 'The ui component wants this 1 ' + `${this.$route.params.id}` + ' dentist!!')
      this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        if (topic === 'ui/dentist/getdentistbyId') {
          const response = JSON.parse(payload)
          this.currentDentist = response
          this.id = this.currentDentist.id
        }
        const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        const dayOfWeek = new Date(this.value)
        const theDay = dayOfWeek.getDay()

        this.$client.subscribe('ui/dentistTimeSlotsFound')
        const denID = {
          id: this.currentDentist.id,
          day: weekday[theDay],
          date: this.value,
          requestid: Math.floor(Math.random() * 29805688)
        }
        // console.log('checking date ' + this.value)
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
