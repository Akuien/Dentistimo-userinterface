<template>
<b-container-fluid>
<div class="page">
    <div id="profile"> Profile <img id="tooth" src="https://cdn-icons-png.flaticon.com/512/3143/3143588.png" alt= "tooth"></div>
<div class="container py-5 h-100">
  <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-8">
          <div id= "card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0 text">First Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.firstName}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0 text">Last Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.lastName}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0 text">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.email}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0 text">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.phoneNumber}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0 text">Password</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{user.password}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <br/><br/><br/><br/>
          <b-button id="buttons">Update your information <img id="icon" src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png" alt= "pen"></b-button>
          <br/><br/>
          <b-button id="buttons">Delete your account <img id="icon" src="https://cdn-icons-png.flaticon.com/512/5073/5073837.png" alt= "trash"></b-button>
        </div>
  </div>
  </div>
</div>
</div>
</b-container-fluid>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'userInformation',
  data() {
    return {
      users: [],
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
      }
    }
  },
  mounted: function () {
    this.getUserByID()
  },
  methods: {
    getUserByID() {
      Api.get(`/users/${this.$route.params.user_id}`)
        .then((response) => {
          this.user = response.data
          console.log(response.data)
        })
        .catch((error) => {
          this.user = error
          console.log(error)
        })
    }

  }
}
</script>

<style>
.page{
  background-color:#7DCDBF;
}
#card{
  position: relative;
  background-color: #FEF2F2;
  border-radius: 3rem;
  top: 3vw;
}
.text{
  font-weight: bold;
}
.row{
  border: 1rem;
}
#profile{
  position: relative;
  font-weight: bold;
  font-size: 4rem;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  top: 4vw;
  color: #3D5332;
}

  #tooth{
    position: relative;
    width: 6.5rem;
    height: auto;
  }
  #buttons{
    background-color: #3D5332;
  }
  #icon{
    position: relative;
    width: 2rem;
    height: auto;
  }
</style>
