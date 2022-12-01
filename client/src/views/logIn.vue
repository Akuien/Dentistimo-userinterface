<template>
    <div>
      <div class="main" >
        <div v-if="signIn">
          <sign-in @handleLogin="handleLogin()" :v-bind="signIn" />
        </div>
        <div v-else>
          <sign-up />
        </div>
        <button class="button-1" v-on:click="handleToggle(true)">Log In</button>
        <button class="button-2" v-on:click="handleToggle(false)">Sign Up</button>
      </div>
    </div>
  </template>
<script>
import signIn from '../components/signIn.vue'
import signUp from '../components/signUp.vue'
export default {
  components: { signIn, signUp },
  data() {
    return {
      signIn: true
    }
  },
  methods: {
    handleToggle(value) {
      this.signIn = value
    },
    handleLogin() {
      this.$emit('handleLogin', true)
    }
  }
}
</script>
  <style>
  .main {
    max-width: 40%;
    margin: 30px auto;
    background: #7DCDBF;
    background: url("../../public/images/tooth.png") no-repeat center center fixed ;
    padding: 40px;
    border-radius: 10px;
    margin-top: 10px;
  }
  .button-1 {
    color: white;
    background-color: #3D5332;
    padding: 5px 32px;
    text-align: center;
    border: solid;
  }
  .button-2 {
    color: white;
    background-color: #3D5332;
    padding: 5px 32px;
    text-align: center;
    border: solid;
  }
  @media only screen and (min-device-width: 360px) and (max-device-height: 768px) and (-webkit-device-pixel-ratio: 3) {
    .main {
      max-width: 80%;
    }
  }
  </style>
