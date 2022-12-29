<template>
  <body>
    <div>
      <!-- <Navbar /> -->
      <div class="container">
        <h2 class="head">Appointments</h2>
        <b-container class="listitem"
       v-for="appointment in appointments"
      v-bind:key="appointment._id">
          <p><b-col>dentist id: {{ appointment.dentist  }}</b-col></p>
          <b-col>day: {{ appointment.day }}</b-col>
          <b-col> date: {{ appointment.date }}</b-col>
          <b-col> start: {{ appointment.start }}</b-col>
          <button id="delButton"
        v-on:click="deleteAppointment(appointment._id)"
        >Delete Appointment</button>
        </b-container>
      </div>
    </div>
  </body>
</template>

<script>
// import Navbar from '../components/Navbar.vue'
export default {
  components: { },
  data() {
    return {
      appointments: undefined
    }
  },
  mounted() {
    this.getUserAppointments()
  // this.deleteAppointment()
  },
  methods: {
    getUserAppointments() {
      this.$client.subscribe('ui/userAppointmentsFound')
      const userIdForAppointments = {
        user: this.$store.state.id,
        requestid: Math.floor(Math.random() * 29805688)
      }

      const newRewquest = JSON.stringify(userIdForAppointments)
      this.$client.publish('availability/getuserappointments', newRewquest)
      console.log('step 1')

      this.$client.on('message', (topic, payload) => {
      // console.log(topic, payload.toString())
        if (topic === 'ui/userAppointmentsFound') {
          const response = JSON.parse(payload)
          // console.log('appointments: ', response)
          this.appointments = response
        }
      })
    },
    deleteAppointment(appointmentid) {
      this.$client.subscribe('ui/deleteappointments')
      const IdForAppointments = {
        appointment: appointmentid,
        requestid: Math.floor(Math.random() * 29805688)
      }
      const newRewquest = JSON.stringify(IdForAppointments)
      this.$client.publish('availability/deleteappointments', newRewquest, (error) => {
        console.log('Step 1')
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        if (topic === 'ui/deleteappointments') {
          console.log('deleted')

          const response = JSON.parse(payload)
          this.appointments = response
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped >
body {
  background:  #3D5332;
  // background:#1aa9d7 ;
  height: 600vh;
  font-family: Arial, Helvetica, sans-serif;
}

.listitem {
  margin-top: 50px;
  color: #3D5332;
}
.head {
  color: white;
  font-family: sans-serif;
}
#delButton {
background-color: #3D5332;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
}
</style>
