<template>
      <div class="signin-box">
      <form>
        <div class="head">
          <h2>Sign Up</h2>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.firstName" name="" required=""/>
          <label>First Name</label>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.lastName" name="" required=""/>
          <label>Last Name</label>
        </div>

        <div class="form-group">
          <input type="number" class="form-control" v-model="form.snn" name="" required=""/>
          <label>SNN</label>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.phoneNumber" name="" required=""/>
          <label>Phone Number</label>
        </div>

        <div class="form-group">
          <input type="email" class="form-control" v-model="form.email" name="" required=""/>
          <label>Email</label>
        </div>

        <div class="form-group">
          <input type="password" class="form-control" v-model="form.password" name="" required=""/>
          <label>Password</label>
        </div>

        <button style="background:#3D5332" class="btn" @click="sendUserDetails()">Sign Up</button>
      </form>
    </div>
  </template>

<script>

export default {
  name: 'signUp',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        snn: '',
        phoneNumber: '',
        email: '',
        password: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    sendUserDetails() {
      const userInfo = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        snn: this.form.snn,
        phoneNumber: this.form.phoneNumber,
        email: this.form.email,
        password: this.form.password
      }

      const newMessage = JSON.stringify(userInfo)

      this.$client.publish('UserInfo/test', newMessage)
    }
  }
}
</script>

  <style scoped>
  .head h1 {
    color: #000000;
    margin: 0 0 30px;
    padding: 0;
    text-align: center;
  }
  .signin-box .form-group {
  position: relative;
}
.signin-box .form-group input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(0, 0, 0);
  margin-bottom: 25px;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0);
  outline: none;
  background: transparent;
}

.signin-box .form-group label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(0, 0, 0);
  pointer-events: none;
  transition: .5s;
}

.signin-box .form-group input:focus ~ label,
.signin-box .form-group input:valid ~ label {
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
