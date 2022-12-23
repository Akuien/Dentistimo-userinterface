<template>
     <b-container>
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
                v-for="time in times"
                v-bind:key="time.id" >
                {{ time.timeSlots }}
              </div>
            </div>
          </form>
        </div>
    </b-form-radio>
     </b-card>
  </b-container>
</template>

<script>

export default {
  name: 'TimeSlots',
  components: { },
  data() {
    return {
      value: '',
      timeSlots: [],
      dentists: [],
      client: {
        connected: false
      },
      weekday:
      ['sunday', 'monday', 'tuesday',
        'wednesday', 'thursday', 'friday', 'saturday']
    }
  },
  methods: {
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
  },
  mounted() {
    this.getDentist()
  }
}
</script>
