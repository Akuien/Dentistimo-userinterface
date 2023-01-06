<template>
  <div>
    <div class="row">
      <div class="col-10">
        <DentistMap :dentists="dentists"></DentistMap>
      </div>
      <div class="col-2">
        <DentistList
          @mouse-over-dentist="mouseOverDentist"
          @mouse-left-dentist="mouseLeftDentist"
          :dentists="dentists"
        ></DentistList>
      </div>
    </div>
  </div>
</template>

<script>
import DentistList from './DentistList.vue'
import DentistMap from './DentistMap.vue'
export default {
  name: 'MapView',
  components: {
    DentistList,
    DentistMap
  },
  data() {
    return {
      client: {},
      dentists: [],
      normalIcon: [40, 40],
      largeIcon: [80, 80]
    }
  },
  mounted() {
    this.$client.on('connect', () => {
      // console.log('Connected!')
    })
    this.$client.subscribe('getAllDentists/response')
    this.$client.publish('dentist/getAllDentists/request', 'The ui component wants dentists list for the map!!', { qos: 1, retain: false }, (error) => {
      if (error) {
        console.log(error)
      }
    })
    this.$client.on('message', (topic, payload) => {
      if (topic === 'getAllDentists/response') {
        const response = JSON.parse(payload)
        this.dentists = response.map(response => {
          response.iconSize = [40, 40]
          return response
        })
      }
    })
  },
  methods: {
    mouseOverDentist(index) {
      this.dentists[index].iconSize = this.largeIcon
    },
    mouseLeftDentist(index) {
      this.dentists[index].iconSize = this.normalIcon
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 900px;
  border-radius: 10px;
  border: 2px solid black;
}

h3 {
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  color: gray;
}
</style>
