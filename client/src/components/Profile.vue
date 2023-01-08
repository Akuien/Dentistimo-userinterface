<template>
  <div>
    <div id="profile"> Profile <img id="tooth" src="https://cdn-icons-png.flaticon.com/512/3143/3143588.png" alt= "tooth"></div>
      <div class="container py-5 h-100" style= "background-color: #7DCDBF; border-style: solid;
    border-color: black;">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-6">
            <div id= "card">
              <div class="card-body">

                <div class="row">
                  <div class="col">
                    <p class="mb-0 text">First Name :</p>
                  </div>
                  <div class="col">
                    <p class="text-muted mb-0">{{this.user.firstName}}</p>
                  </div>
                </div>
                <hr>

                <div class="row">
                  <div class="col">
                    <p class="mb-0 text">Last Name :</p>
                  </div>
                  <div class="col">
                    <p class="text-muted mb-0">{{this.user.lastName}}</p>
                  </div>
                </div>
                <hr>

                <div class="row">
                  <div class="col">
                    <p class="mb-0 text">Email :</p>
                  </div>
                  <div class="col">
                    <p class="text-muted mb-0">{{this.user.email}}</p>
                  </div>
                </div>
                <hr>

                <div class="row">
                  <div class="col">
                    <p class="mb-0 text">Phone number :</p>
                  </div>
                  <div class="col">
                    <p class="text-muted mb-0">{{this.user.phoneNumber}}</p>
                  </div>
                </div>
                <hr>
             </div>
            </div>
          </div>
        </div>
        <p>
          <router-link :to="'/userAppointments/' + this.$store.state.id"
            >Your Appointment History</router-link>
        </p>

      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        firstName: this.$store.state.firstName,
        lastName: this.$store.state.lastName,
        email: this.$store.state.email,
        phoneNumber: this.$store.state.phoneNumber
      }
    }
  },
  mounted() {
    console.log(this.user)
  }
}
</script>

<style>
#profile{
  position: relative;
  font-weight: bold;
  font-size: 4rem;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  color: #000000;
}
#tooth{
  position: relative;
  width: 6.5rem;
  height: auto;
}
#card{
  position: relative;
  background-color: #E8E8E8;
  border-radius: 1rem;
  padding-top: 1rem;
}
.row{
  border: 3rem;
  padding: 0.4rem;
}
.text{
  font-weight: bold;
}

</style>
