<template>
  <div>

<MapView> </MapView>

  </div>
</template>

<script>
import MapView from '../components/MapView.vue'

export default {
  name: 'home',
  components: {
    MapView
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {

  },
  mounted() {
    const user = localStorage.getItem('localCredentials')
    if (!user) {
      this.$router.push({ name: 'login' })
      alert('Please log in first')
    }
  }
}
</script>

<style>

</style>
