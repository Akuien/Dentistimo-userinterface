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
                v-for="appointment in appointments.timeSlots"
                v-bind:key="appointment.timeSlots" >
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
  </b-container>
</template>

<script>

export default {
  name: 'TimeSlots',
  components: { },
  data() {
    return {
      value: '',
      appointments: [],
      timeSlots: [],
      dentists: [],
      client: {
        connected: false
      }
    }
  },
  mounted() {
    this.$client.on('connect', () => {
      console.log('Connected!')
    })
    this.$client.subscribe('sendTimeSlots')
    this.$client.publish('appointment/getAllTimeslots', 'send us timeslots!!!!')
    this.$client.on('message', (topic, message) => {
      console.log(topic, message.toString())
      if (topic === 'sendTimeSlots') {
        console.log('timeslots recieved!')
        const response = JSON.parse(message)
        console.log('response: ')
        console.log(response)
        this.appointment = response
        this.timeSlots = response.timeSlots
        console.log(this.appointment)
      }
    })
  },
  bookAppointment(appointment) {}
}

</script>
