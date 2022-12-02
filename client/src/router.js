import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserInformation from './views/UserInformation.vue'
import logIn from './views/logIn.vue'
import VerifyEmail from './views/VerifyEmail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/userinformation',
      name: 'userinformation',
      component: UserInformation
    },
    {
      path: '/login',
      name: 'login',
      component: logIn
    },
    {
      path: '/verify/:id',
      name: 'VerifyEmail',
      component: VerifyEmail
    }
  ]
})
