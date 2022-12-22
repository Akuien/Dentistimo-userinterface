<template>
    <body>
      <div>
        <Navbar />
        <div class="container">
             <p v-if="appointments.length">There are no posts yet.</p>
          <h2 class="p-3 text-center">USER APPOINTMENT</h2>
          <b-container class="listitem"
         v-for="appointment in appointments"
        v-bind:key="appointment._id">
            <p><b-col>daay: {{ appointments.requestid  }}</b-col></p>
            <b-col>day: {{ appointments.day }}</b-col>
            <b-col> date: {{ appointment.day }}</b-col>
            <b-col> start: {{ appointment.date }}</b-col>

          <h1>booking for {{appointments.requestid }}</h1>
          <h1>booking  2: {{appointments.appointmentsArray.day}}</h1>
          <h1>booking {{appointments.appointmentsArray}}</h1>
          </b-container>
        </div>
      </div>
    </body>
  </template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  props: ['appointment'],
  components: { Navbar },
  data() {
    return {
      appointments: []
    }
  },
  mounted() {
    this.getUserAppointments()
  },
  methods: {
    getUserAppointments() {
      this.$client.subscribe('ui/userAppointmentsFound')
      const userIdForApp = {
        user: this.$store.state.id,
        requestid: Math.floor(Math.random() * 29805688)
      }

      const newRewquest = JSON.stringify(userIdForApp)
      this.$client.publish('availability/getuserappointments', newRewquest)
      console.log('step 1')

      this.$client.on('message', (topic, payload) => {
        console.log(topic, payload.toString())
        if (topic === 'ui/userAppointmentsFound') {
          const response = JSON.parse(payload)
          console.log('appointments: ', response)

          this.appointments = response
          this.requestid = this.appointments.requestid
          console.log('hiee' + this.appointments)
          console.log('hiee again' + this.appointments.requestid)
          console.log('hiee again' + this.appointments.appointmentsArray)
        }
      })
    }

  }
}
</script>

  <style lang="scss" scoped >
  body {
    background: linear-gradient(to right, #1aa9d7, #12e7dd);
    // background:#1aa9d7 ;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
  }
  .contain {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 50%;
  }
  table.blueTable {
    border: 6px solid #1aa9d7;
    background-color: #12e7dd;
    width: 100%;
    text-align: center;
  }
  table.blueTable td,
  table.blueTable th {
    border: 1px solid #1aa9d7;
    padding: 3px 2px;
  }
  table.blueTable tbody td {
    font-size: 20px;
  }
  table.blueTable thead {
    background: #1aa9d7;
    background: -moz-linear-gradient(top, #53bee1 0%, #31b1db 66%, #1aa9d7 100%);
    background: -webkit-linear-gradient(
      top,
      #53bee1 0%,
      #31b1db 66%,
      #1aa9d7 100%
    );
    background: linear-gradient(to bottom, #53bee1 0%, #31b1db 66%, #1aa9d7 100%);
    border-bottom: 0px solid #444444;
  }
  table.blueTable thead th {
    font-size: 20px;
    font-weight: bold;
    color: #280bac;
    text-align: center;
    border-left: 2px solid #1aa9d7;
  }
  table.blueTable thead th:first-child {
    border-left: none;
  }
  .container {
    margin-top: 50px;
  }
  </style>
