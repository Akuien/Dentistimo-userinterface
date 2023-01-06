<template>
  <body>
    <div>
      <!-- <Navbar /> -->
      <div class="container">
        <h1 class="head">APPOINTMENT HISTORY</h1>
        <b-container class="listitem"
       v-for="appointment in appointments"
      v-bind:key="appointment._id">
          <p><b-col>Appointment Number: {{ appointment.dentist  }}</b-col></p>
          <b-col>On: {{ appointment.day }}</b-col>
          <b-col> Date: {{ appointment.date }}</b-col>
          <b-col> Booked Time: {{ appointment.start }}</b-col><br>
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
      this.$client.subscribe('getUserAppointments/response/found')
      const userIdForAppointments = {
        user: this.$store.state.id,
        requestid: Math.floor(Math.random() * 29805688)
      }
      const newRewquest = JSON.stringify(userIdForAppointments)
      this.$client.publish('getUserAppointments/request', newRewquest, { qos: 1, retain: false }, (error) => {
        if (error) {
          console.log(error)
        }
      })

      this.$client.on('message', (topic, payload) => {
      // console.log(topic, payload.toString())
        if (topic === 'getUserAppointments/response/found') {
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
      this.$client.publish('availability/deleteappointments', newRewquest, { qos: 1, retain: false }, (error) => {
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
  background:  #FDF0CA;
  // background:#1aa9d7 ;
  height: 600vh;
}

.listitem {
  margin-top: 50px;
  color: #000000;
  background-color: #ffffff ;
  padding: 2%;
  border-style: solid;
  border-color: #000000;
}
.head {
  color: rgb(255, 255, 255);
  font-family: sans-serif;
  font-weight: 900;
}
#delButton {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

#delButton:hover {
  background-color: #fff;
}

#delButton:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}
</style>
