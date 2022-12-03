<template>
  <main>
    <div>
    <b-modal ref="modal" hide-footer id="modal-center" centered title="Welcome to Dentistimo!">
      <div class="d-block text-center">
        <h3>Book your appointment anytime anywhere!</h3>
      </div>
      <b-button class="mt-3" block @click="hideModal">Close</b-button>
    </b-modal>
  </div>
    <div id="gg-map">

    </div>
  </main>
  </template>

<script>
import L, { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import jsonData from '../assets/dentists.json'
import { Api } from '@/Api'
import mqtt from 'mqtt'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

export default {
  name: 'Map',
  data() {
    return {
      data: jsonData,
      center: [57.685, 11.999],
      map: Map,
      dentists: {},
      loaded: false,
      subscription: {
        topic: 'dentists/data',
        qos: 2
      }
    }
  },

  mounted() {
    this.$refs.modal.show()
    this.viewMap()
    delete Icon.Default.prototype._getIconUrl
    Icon.Default.mergeOptions({
      iconUrl: require('../assets/tooth_.png')
    })
    this.loaded = true
  },
  methods: {
    hideModal() {
      this.$refs.modal.hide()
    },
    viewMap() {
      const map = L.map('gg-map').setView(this.center, 12)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        style: 'mapbox://styles/marsel96/clamxgs7x001r14o6nn7nihah',
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoibWFyc2VsOTYiLCJhIjoiY2xhaHhiZ2V0MDRsdTNxcDZjcHVmMjAweCJ9.kiILHcqN9vpZ_Eun0gvyJg'
      }).addTo(map)
      getData()
      async function getData() {
        const response = await Api.get('/dentists')
        const data = await response.json()
        const { latitude, longitude } = data

        L.marker([latitude, longitude]).addTo(map)
        document.getElementById('latitude').textContent = latitude
        document.getElementById('longitude').textContent = longitude
      }

      // this.marker = L.marker([57.685, 11.800], Icon).addTo(map)
    },
    ConnectMqtt() {
      const client = mqtt.connect({
        host: process.env.HOST,
        port: process.env.PORT,
        protocol: 'mqtts',
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      })
      client.on('connect', () => {
        console.log('Connected successfully!')
      })
      client.on('error', error => {
        console.log('Not connected', error)
      })
    },
    Subscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('fail', error)
          return
        }
        this.success = true
        console.log('Subscribe to topic', res)
      })
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
  .mt-3{
    background-color: #17a2b8;
  }
h3 {
font-size:x-large;
font-family: Arial, Helvetica, sans-serif;
color: gray;
}
  </style>
