import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserInformation from './views/UserInformation.vue'
import logIn from './views/logIn.vue'
import VerifyEmail from './views/VerifyEmail.vue'
import Booking from './views/Booking.vue'
import Bookings from './views/Bookings.vue'
import Time from './views/Time.vue'

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
      path: '/booking/:id',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/time/:id',
      name: 'Time',
      component: Time
    },
    {
      path: '/verify/:id',
      name: 'VerifyEmail',
      component: VerifyEmail
    },
    {
      path: '/userAppointments/:id',
      name: 'Bookings',
      component: Bookings
    }

  ]
})
