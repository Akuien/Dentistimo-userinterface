<template>
  <div id="app">
  <b-navbar-nav class="navbar">
    <b-navbar-brand href="/"> Dentistimo
    <img src="./assets/tooth 17.59.57.png">
  </b-navbar-brand>
    <b-navbar type="light" >
    <b-nav-item href="/" icon="">Home</b-nav-item>
    <b-nav-item href="/userinformation" icon="">Profile</b-nav-item>
    <b-nav-item href="/Login" icon="">Login</b-nav-item>
  </b-navbar>
</b-navbar-nav>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>
<script>

export default {
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar-nav {
  height: 65px;
  font-weight: bold;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.nav-item  {
  font-size:23px;
  margin: 3px;
  margin-top: -0.5em;
  padding-bottom: 0.5px;
  background-color: white;
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
