<template>
    <form @submit.prevent="login">
      <div class="head">
      <h1>Welcome to dentistimo!
        Login
      </h1>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="form.email"
          placeholder="Email"
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="form.password"
          placeholder="Password"
          :invalid-feedback="invalidPassword"
        />
      </div>
      <button style="background:#3D5332" class="btn btn-primary btn-block">Submit</button>
    </form>
  </template>
<script>
export default {
  computed: {
    invalidPassword() {
      if (this.form.password.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  mounted() {
    this.loginResponse()
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onreset(event) {
      event.preventDefault()
      this.email = ''
      this.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    login() {
      const loginInfo = {
        email: this.form.email,
        password: this.form.password
      }
      const logininformation = JSON.stringify(loginInfo)
      this.$client.publish('LoginInfo/test', logininformation, 1, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log(logininformation)
        }
      })
    },
    loginResponse() {
      this.$client.on('message', (topic, message) => {
        if (topic === 'pub/loginResponse') {
          const userRespond = JSON.parse(message)

          this.password = userRespond.password
          this.email = userRespond.email

          localStorage.setItem(
            'localUsername',
            JSON.stringify({
              password: userRespond.password,
              email: userRespond.email
            })
          )
          this.$router.push('/home')
          console.log('here')
          console.log(localStorage)
        } else {
          console.log('error')
        }
      })
    }
  }
}
</script>
  <style>
  .head h1 {
    color: #3D5332;
    margin-top: 20px;
  }
  .login {
    color: white;
    margin: 10px;
  }
  .label {
    color: white;
  }

  </style>
