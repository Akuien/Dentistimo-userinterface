<template>
  <div>
    <NavbarVue/>
<MapView> </MapView>

  </div>
</template>

<script>
import MapView from '../components/MapView.vue'
import NavbarVue from '../components/Navbar.vue'
export default {
  name: 'home',
  components: {
    MapView,
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

</style>
