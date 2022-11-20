<template>
  <main>

    <div id="gg-map">

    </div>
  </main>
  </template>

<script>
import L from 'leaflet'
import mapboxgl from 'mapbox-gl'
export default {
  name: 'Map',
  data() {
    return {
      ggMap: Map
    }
  },
  mounted() {
    this.viewMap()
  },
  methods: {
    viewMap() {
      this.ggMap = L.map('gg-map').setView([57.685, 11.999], 12)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        style: 'mapbox://styles/marsel96/clamxgs7x001r14o6nn7nihah',
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoibWFyc2VsOTYiLCJhIjoiY2xhaHhiZ2V0MDRsdTNxcDZjcHVmMjAweCJ9.kiILHcqN9vpZ_Eun0gvyJg'
      }).addTo(this.ggMap)
      // create the marker
      new mapboxgl.Marker()
        .setLngLat([57.685, 11.999])
        .addTo(this.ggMap)
    }
  }
}

</script>

  <style scoped>

  #gg-map {
    min-height: 200vh;
    width: 100%;
    height: 100;
    border: 2px solid darkgrey;
  }
  </style>
