<template>
  <b-container>
     <h1> Available Time Slots </h1>
     <h1>booking for dentist {{currentDentist.id }}</h1>
     <b-container class="listitem"
         v-for="time in times"
        v-bind:key="time._id">
             <h1>dentist Name: {{ time.name  }}</h1>
            <b-col>Opening Hour: {{ time.openinghour }}</b-col>
            <b-col> Closing Hour: {{ time.closinghour }}</b-col>
            <b-col> Day: {{ time.day }}</b-col>
             <span class="feature">Opening hours:</span> <br />
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
    return {
      selected: '',
      currentDentist: [],
      id: 0,
      times: undefined
    }
  },
  mounted() {
    this.$client.subscribe('ui/dentist/getdentistbyId')
    this.$client.publish('dentists', 'The ui component wants this 1 ' + `${this.$route.params.id}` + ' dentist!!')
    this.$client.publish('dentist/getdentistbyId', `${this.$route.params.id}`, 1, (error) => {
      if (error) {
        console.log(error)
      }
    })

    this.$client.on('message', (topic, payload) => {
      // console.log(topic, payload.toString())
      if (topic === 'ui/dentist/getdentistbyId') {
        // console.log('Dentist RECEIVED!!!!')
        const response = JSON.parse(payload)
        // console.log('Dentist: ', response)

        this.currentDentist = response
        this.id = this.currentDentist.id
        // console.log(this.currentDentist)
        // console.log(this.currentDentist.numberOfDentists)
        console.log(this.id)
      }
      this.getUserAppointments()
    })
    console.log('2 test ' + this.id)
  },
  methods: {
    getUserAppointments() {
      this.$client.subscribe('ui/dentistTimeSlotsFound')
      const denID = {
        id: this.currentDentist.id,
        requestid: Math.floor(Math.random() * 29805688)
      }
      console.log('checking id ' + this.id)
      const newRewquest = JSON.stringify(denID)
      this.$client.publish('dentist/getTimeslots', newRewquest)
      console.log('step 1')

      this.$client.on('message', (topic, payload) => {
        console.log(topic, payload.toString())
        console.log('step 2')
        if (topic === 'ui/dentistTimeSlotsFound') {
          const response = JSON.parse(payload)
          // console.log('appointments: ', response)
          this.times = response
        }
      })
    }

  }
}
</script>
