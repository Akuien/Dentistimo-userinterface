import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import mqtt from 'mqtt'
import store from './store/store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

const connectUrl = 'wss://45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud:8884/mqtt'

Vue.prototype.$client = mqtt.connect(connectUrl, {
  username: 'Team5@Broker',
  password: 'Team5@Broker',
  clean: true,
  clientId: 'mqttUI'
})


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
