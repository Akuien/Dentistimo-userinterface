<template>
    <div>
      <br><br>
      <div>
        <h1>Welcome to dentistimo!</h1>
      </div>
      <div class="main" id="background">
        <div v-if="signIn">
          <sign-in @handleLogin="handleLogin()" :v-bind="signIn" />
        </div>
        <div v-else>
          <sign-up />
        </div>
        <br>
        <button class="button-1" v-on:click="handleToggle(true)">Already have an account?</button>
        <button class="button-1" v-on:click="handleToggle(false)">Don't have an account?</button>
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
  <style scoped>
  .main {
    background: url("../../public/images/tooth.png") no-repeat center center fixed ;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 425px;
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 10px 20px 0 rgba(#999, .25);
    padding: .75rem;
    border-style: solid;
    border-color: black;
    padding-right: 40px;
    padding-left: 40px;
  }

.button-1 {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 3px 2px;
  border-radius: 10px 225px 255px 10px 10px 255px 225px 10px;
  border-style: solid;
  border-width: 1px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 14px;
  line-height: 5px;
  outline: none;
  margin: 1%;
  padding: 0.9rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
h1{
  font-weight: 700;
}

.button-1:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-1:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

  @media only screen and (min-device-width: 360px) and (max-device-height: 768px) and (-webkit-device-pixel-ratio: 3) {
    .main {
      max-width: 80%;
    }
  }

  </style>
