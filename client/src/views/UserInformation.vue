<template>
<div>
  <div class="page" >
  <div v-if="Profile">
    <profile> </profile>
        <div>
          <b-button id="button" v-on:click="handleToggle(false)">Update your information <img id="icon" src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png" alt= "pen"></b-button>
          <br/><br/>
        </div>
  </div>
  <div v-else>
    <update-profile> </update-profile>
        <b-button id="mybtn" v-on:click="handleToggle(true)">Go back to profile page</b-button>
  </div>
</div>
</div>
</template>

<script>
import Profile from '../components/Profile.vue'
import UpdateProfile from '../components/updateProfile.vue'
export default {
  name: 'userInformation',
  components: { Profile, UpdateProfile },
  data() {
    return {
      Profile: true
    }
  },
  mounted() {
    const user = localStorage.getItem('localCredentials')
    if (!user) {
      this.$router.push({ name: 'login' })
      alert('Please log in first')
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
    background-color:#FDF0CA;
  }
  #button{
    background-color: #000000;
    position: relative;
    bottom: 5rem;
  }
  #buttons{
    position: relative;
    height: 3rem;
    width: 6rem;
    background-color: #000000;
    bottom: 4rem;
  }
  #icon{
    position: relative;
    width: 2rem;
    height: 10px;
  }

#mybtn {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 10px 225px 255px 10px 10px 255px 225px 10px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 16px;
  line-height: 5px;
  outline: none;
  padding: 1rem;
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

#mybtn:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

#mybtn:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

</style>
