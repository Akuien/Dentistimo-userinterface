<template>
  <div>
    <div>
    <b-modal ref="modal" hide-footer id="modal-center" centered title="Welcome to Dentistimo!">
      <div class="d-block text-center">
        <h3>Book your appointment anytime anywhere!</h3>
      </div>
      <b-button class="mt-3" block @click="hideModal">Close</b-button>
    </b-modal>
  </div>

    <!-- /.row -->
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
    <!-- /.row -->
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
    this.$refs.modal.show()
    this.$client.on('connect', () => {
      // console.log('Connected!')
    })
    this.$client.subscribe('ui/dentist/getAllDentists')
    this.$client.publish('dentist/getAllDentists', 'The ui component wants dentists list to display on the map!!')

    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'ui/dentist/getAllDentists') {
        const response = JSON.parse(payload)
        this.dentists = response.map(response => {
          response.iconSize = [40, 40]
          return response
        })
      }
      // console.log(this.dentists)
    })
  },
  methods: {
    mouseOverDentist(index) {
      this.dentists[index].iconSize = this.largeIcon
    },
    mouseLeftDentist(index) {
      this.dentists[index].iconSize = this.normalIcon
    },
    hideModal() {
      this.$refs.modal.hide()
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
