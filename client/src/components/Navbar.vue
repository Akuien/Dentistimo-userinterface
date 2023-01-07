<template>
    <div id="app">
    <b-navbar-nav class="navbar">
      <b-navbar-brand href="/"> Dentistimo
      <img src="../assets/tooth 17.59.57.png">
    </b-navbar-brand>
      <b-navbar type="light" >
      <b-nav-item href="/home" icon="">Home</b-nav-item>
      <b-nav-item router-link :to="'/userInformation/' + this.$store.state.id ">Profile</b-nav-item>
      <b-nav-item href="/" v-on:click="logout" icon="">Logout</b-nav-item>
    </b-navbar>
  </b-navbar-nav>
    </div>
  </template>

<script>

export default {
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }

  }
}

</script>

<style>

.navbar-nav {
  height: 70px;
  font-weight: bold;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3ab286;
}
.nav-item  {
  font-size:23px;
  margin: 1px;
  margin-top: -0.5em;
  padding-bottom: 0.5px;
  background-color: #3ab286;
  padding: 0.01rem 2rem;
  font-weight: bold;
  color: black;
}

a:link, a:visited {
  font-family:Arial, Helvetica, sans-serif;
  border-radius: 8px;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.5em;
  color: black;
}

a:hover, a:active {
  background-color: #6df2f953;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;

}
.navbar-nav .icon-container {
  float: left;

}
</style>
