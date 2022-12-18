import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    email: null,
    password: null,
    id: null,
    forum: null
  }
})
export default store
