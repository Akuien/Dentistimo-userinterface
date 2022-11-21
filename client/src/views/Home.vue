<template>
  <div>
    <NavbarVue/>
    <div id="map-container">
<Map> </Map>
</div>
  </div>
</template>

<script>
import Map from '../components/MapBox.vue'
import NavbarVue from '../components/Navbar.vue'
export default {
  name: 'home',
  components: {
    Map: Map,
    NavbarVue
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {

  }
}
</script>

<style>
#map-container {

}
</style>
