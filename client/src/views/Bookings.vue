<template>
    <body>
      <div>
        <Navbar />
        <div class="container">
          <h2 class="p-3 text-center">USER APPOINTMENT</h2>
          <table class="blueTable">
            <thead>
              <tr>
                <th>NAME</th>
                <th>DENTIST</th>
                <th>BOOKING DATE & TIME</th>
                <!--   <th>AppointmentID</th> -->
              </tr>
            </thead>
            <tbody v-for="appointment in appointments" :key="appointment.id">
              <tr>
                <!-- need to render by current user , v-if=currentUser-->
                <td>{{ appointment.users }}</td>
                <td>{{ appointment.dentists.name }}</td>
                <td>{{ appointment.start }}</td>
                <!--    <td>{{ appointment._id}}</td> -->
                <td>
                  <!-- <button
                    id="delButton"
                    v-on:click="deleteAppointment(appointment._id)"
                  >
                    Cancel
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
  </template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: { Navbar },
  data() {
    return {
    //   publish1: {
    //     topic: 'availability/deleteappointment',
    //     qus: 1,
    //     payload: this.$route.params.appointmentid // param correct ?
    //   },
      publish2: {
        topic: 'availability/getuserappointments',
        qus: 1,
        payload: this.$store.state.id
      },
      appointments: undefined
    }
  },
  mounted() {
    this.getUserAppointments()
    // this.deleteAppointment()
  },
  methods: {
    getUserAppointments() {
      const { topic, qos, payload } = this.publish2
      console.log(this.publish2) // Ok
      this.$client.publish(topic, payload, qos, (error) => {
        console.log('Step 1 Publish') // ok
        console.log(payload.toString()) // ok
        if (error) {
          console.log(error)
        }
      })
      this.$client.on('message', (topic, payload) => {
        console.log(topic, payload.toString())
        if (topic === 'ui/getuserappointments') {
          console.log('User appointment Received')
          const response = JSON.parse(payload)
          console.log('Appointment HERE')
          console.log(response)
          this.appointments = response
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
