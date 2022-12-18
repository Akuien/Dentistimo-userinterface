<template>
    <div>
      <form>
        <div class="head">
          <h1>Sign Up</h1>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.firstName" placeholder="First Name"/>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.lastName" placeholder="Last Name" />
        </div>

        <div class="form-group">
          <input type="number" class="form-control" v-model="form.snn" placeholder="SNN" />
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="form.phoneNumber" placeholder="Phone number"/>
        </div>

        <div class="form-group">
          <input type="email" class="form-control" v-model="form.email" placeholder="Email" />
        </div>

        <div class="form-group">
          <input type="password" class="form-control" v-model="form.password" placeholder="Password"/>
        </div>

        <button style="background:#3D5332" class="btn btn-primary btn-block" @click="sendUserDetails()">Submit</button>
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
    margin-top: 50px;
  }
  </style>
