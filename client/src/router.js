import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserInformation from './views/UserInformation.vue'
import logIn from './views/logIn.vue'
import VerifyEmail from './views/VerifyEmail.vue'
import Calender from './views/Calender.vue'
import Booking from './views/Booking.vue'
import Bookings from './views/Bookings.vue'

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
      path: '/calender/:id',
      name: 'Calender',
      component: Calender
    },
    {
      path: '/booking/:id',
      name: 'Booking',
      component: Booking
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
