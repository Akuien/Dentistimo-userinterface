<template>
  <div class="login-box">
<form @submit.prevent="login">
      <div class="head">
      <h2>
        Login
      </h2>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="form.email"
          name="" required=""
        />
         <label>Email</label>
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="form.password"
          name="" required=""
          :invalid-feedback="invalidPassword"
        />
         <label>Password</label>
      </div>
      <button style="background:#3D5332" class="btn">Log In</button>
    </form>

  </div>
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
    this.subscribe()
  },
  methods: {
    Authentication() {
      this.$router.push('/signUp')
    },
    subscribe() {
      this.$client.subscribe('pub/#', 1, (error, res) => {
        if (error) {
          console.log(error)
        }
        console.log('Subscribed to ', res)
      })
    },
    handleClick() {
      localStorage.removeItem('token')
      this.$router.push('/home')
    },
    created() {
      const local = JSON.parse(localStorage.getItem('localCredentials'))
      this.$store.state.email = local.email
      this.$store.state.password = local.password
      this.$store.state.id = local.id
      console.log(this.$store.state.email, this.$store.state.id)
    },

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
          this.$store.state.id = userRespond._id
          this.$store.state.password = userRespond.password
          this.$store.state.email = userRespond.email
          this.$store.state.firstName = userRespond.firstName
          this.$store.state.lastName = userRespond.lastName
          this.$store.state.phoneNumber = userRespond.phoneNumber

          localStorage.setItem(
            'localCredentials',
            JSON.stringify({
              id: userRespond._id,
              password: userRespond.password,
              email: userRespond.email,
              firstName: userRespond.firstName,
              lastName: userRespond.lastName,
              phoneNumber: userRespond.phoneNumber
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
  <style scoped>
  .login-box .form-group {
  position: relative;
}
  .head h1 {
    color: #000000;
    margin: 0 0 30px;
    padding: 0;
    text-align: center;
  }
.login-box .form-group input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(0, 0, 0);
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0);
  outline: none;
  background: transparent;
}

.login-box .form-group label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(0, 0, 0);
  pointer-events: none;
  transition: .5s;
}

.login-box .form-group input:focus ~ label,
.login-box .form-group input:valid ~ label {
  top: -20px;
  left: 0;
  color: #050505;
  font-size: 12px;
}

.btn{
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7 !important;
  color: #3D5332;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn:active,
.btn:focus{
  background-color: #3D5332;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{
  background-color: #3D5332 !important;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}

  </style>
