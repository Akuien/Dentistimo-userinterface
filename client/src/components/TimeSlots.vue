<template>
  <b-container>
     <h1> Available Time Slots </h1>
   <b-card
    style="max-width: 10rem;"
    class="mb-2"
    >
     <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">E.G 8.00-8.30
      <div class=" grid">
      <div class="container">
        <ul v-if="layout === 'grid'" class="card-list">
          <li v-for="appointment in appointments.timeSlots" :key="appointment.id">
              <h3>{{ appointment.start }}</h3>
          </li>
        </ul>
      </div>
    </div>
    </b-form-radio>
     </b-card>
</b-container>
</template>

<script>
export default {
  name: 'TimeSlots',
  data() {
    return {
      appointments: []
    }
  },
  methods: {
    publishTimeslots() {

    }
  }
}
</script>
