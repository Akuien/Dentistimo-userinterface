<template>
  <div class="row map">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-bind:key="index"
        v-for="(dentist, index) in dentists"
        :lat-lng="
          latLng(dentist.coordinate.latitude, dentist.coordinate.longitude)
        "
      >
        <l-icon :icon-size="dentist.iconSize" :icon-url="icon"></l-icon>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import dentistLocation from '../assets/dentistLocation.png'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
export default {
  name: 'DentistMap',
  props: {
    dentists: Array
  },
  data() {
    return {
      zoom: 13,
      center: L.latLng(57.70887, 11.97456),
      url: 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=e9655d6e495d40bdbb86b7df9b549141',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(57.70887, 11.97456),
      icon: dentistLocation,
      iconSize: [40, 40]
    }
  },
  components: {
    LMap,
    LMarker,
    LTileLayer,
    LIcon
  },
  methods: {
    latLng: function (lat, lng) {
      return L.latLng(lat, lng)
    }
  }
}
</script>
<style scoped lang="scss">
.map {
        height: 100%;
  margin: 0;
}
</style>
