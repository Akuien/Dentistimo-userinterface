<template>
  <div class="card dentist-list">
    <ul class="list-group list-group-flush">
      <li
        @mouseover="mouseOver(index)"
        @mouseleave="mouseLeave(index)"
        v-bind:key="index"
        v-for="(dentist, index) in dentists"
        class="list-group-item"
      >
        <span class="feature">Name:</span> {{ dentist.name }} <br />
        <span class="feature">Owner:</span>{{ dentist.owner }} <br />
        <span class="feature">Address:</span> {{ dentist.address }}
        {{ dentist.city }} <br />
        <span class="feature">Opening hours:</span> <br />
        monday: {{ dentist.openinghours.monday }}<br />
        tuesday: {{ dentist.openinghours.tuesday }}<br />
        wednesday: {{ dentist.openinghours.wednesday }}<br />
        thursday: {{ dentist.openinghours.thursday }}<br />
        fridayday: {{ dentist.openinghours.friday }}<br />
        <br />

        <p>
          <router-link :to="'/booking/' + dentist._id"
            > Book an appointment </router-link>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DentistList',
  props: {
    dentists: Array
  },
  data() {
    return {
      currentDentist: [],
      dentistid: 0
    }
  },
  methods: {
    mouseOver(index) {
      this.$emit('mouse-over-dentist', index)
    },
    mouseLeave(index) {
      this.$emit('mouse-left-dentist', index)
    }
  }
}
</script>
<style lang="scss" scoped>
.dentist-list {
  overflow-y: scroll;
  height: 90vh;
  li {
    &:hover {
      background-color: #E7F1E5;
    }
  }
}

.feature {
  font-weight: 600;
}

a {
  font-size: 10px;
  text-decoration: none;
}

a:link,
a:visited {
  background-color: white;
  color: #321e23;
  border: 2px solid #c0eec4;
  border-radius: 10px;
  padding: 1px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

a:hover,
a:active {
  background-color: #c0eec4;
  color: #39612f;
}
</style>
