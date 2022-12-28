<template>
<div>
  <NavbarVue/>
  <div class="page">
  <div v-if="Profile">
    <profile> </profile>
        <div>
          <br/>
          <b-button id="button" v-on:click="handleToggle(false)">Update your information <img id="icon" src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png" alt= "pen"></b-button>
          <br/><br/><br/><br/><br/>
        </div>
  </div>
  <div v-else>
    <update-profile> </update-profile>
      <div>
        <br/>
        <b-button id="buttons" style="background-color: #ab1a1ae4" v-on:click="handleToggle(true)">Cancel</b-button>
        <br/><br/><br/>
      </div>
  </div>
</div>
</div>
</template>

<script>
import NavbarVue from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'
import UpdateProfile from '../components/updateProfile.vue'
export default {
  name: 'userInformation',
  components: { Profile, UpdateProfile, NavbarVue },
  data() {
    return {
      Profile: true
    }
  },
  methods: {
    handleToggle(value) {
      this.Profile = value
    }
  }
}
</script>

<style>
  .page{
    background-color:#7dcdc0;
  }
  #button{
    background-color: #3D5332;
  }
  #buttons{
    height: 3rem;
    width: 6rem;
    background-color: #3D5332;
  }
  #icon{
    position: relative;
    width: 2rem;
    height: auto;
  }

</style>
