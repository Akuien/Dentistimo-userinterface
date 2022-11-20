<template>
    <div>
      <b-button v-b-toggle.sidebar-no-header variant="clear" size="sm" style="float:right" id="sidebar-btn">  <img src="../assets/icons8-sidebar-30.png" alt="">  <b-col md="6" class="mb-3">
    </b-col> </b-button>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
        <template #default="{ hide }">
          <div class="p-3">
            <h4 id="sidebar-no-header-title"> <a class="navbar-brand" href="/">
      <div class="logo-image">
            <img src="../assets/default.png" class="img-fluid">
      </div>
</a></h4>
            <nav class="mb-3">
              <b-nav vertical>
                <b-nav-item active @click="hide">Update Account</b-nav-item>
                <b-nav-item href="#link-1" @click="hide"> View Appointment Info</b-nav-item>
                <b-nav-item href="#link-2" @click="hide">Cancel Appointment</b-nav-item>
                <b-nav-item href="#link-3" @click="hide">Logout</b-nav-item>
              </b-nav>
            </nav>
            <b-button variant="info" block @click="hide">Close</b-button>
          </div>
        </template>
      </b-sidebar>
    </div>
  </template>

<style>

a:link, a:visited {
  font-size: 1.5em;
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
background-color: #CFF8F8  ;
}

#sidebar-btn {

}

</style>
