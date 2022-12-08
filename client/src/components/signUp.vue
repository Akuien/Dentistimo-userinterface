<template>
    <div>
      <form>
        <div class="head">
          <h1>Sign Up</h1>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="firstName" placeholder="First Name"/>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="lastName" placeholder="Last Name" />
        </div>

        <div class="form-group">
          <input type="number" class="form-control" v-model="id" placeholder="ID" />
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="phoneNumber" placeholder="Phone number"/>
        </div>

        <div class="form-group">
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>

        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <button style="background:#3D5332" class="btn btn-primary btn-block" @click="sendUserDetails()">Submit</button>
      </form>
    </div>
  </template>

<script>
import registerUser from '../registerUser'

export default {
  data() {
    return {
      info: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        id: ''
      }
    }
  },
  methods: {
    sendUserDetails() { registerUser.RegisterUser(this.info) }
  }
}
</script>

  <style scoped>
  .head h1 {
    margin-top: 50px;
  }
  </style>
