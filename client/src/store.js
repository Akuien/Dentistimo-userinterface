import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    firstname: null,
    lastname: null,
    email: null,
    id: null
  }
})

export default store
