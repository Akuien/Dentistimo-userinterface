<template>
  <div>
    <div id="profile"> Edit Profile <img id="tooth" src="https://cdn-icons-png.flaticon.com/512/3143/3143588.png" alt= "tooth"></div>
        <b-form>
          <div class="container py-5 h-100" style= "background-color: #7DCDBF; border-style: solid;
    border-color: black;">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-6">
                <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
                 {{ message }}
                  </b-alert>

                <div id= "card">
                  <div class="card-body">

                      <b-form-group id="input-group-1" label="Edit new first name:" label-for="input-1">
                          <b-form-input id="input-1"
                            v-model="form.firstName"
                            placeholder="Enter new last name"
                            required>
                          </b-form-input>
                      </b-form-group>

                      <b-form-group id="input-group-2" label="Edit new last name:" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          v-model="form.lastName"
                          placeholder="Enter new last name"
                          required>
                        </b-form-input>
                      </b-form-group>

                      <b-form-group id="input-group-3" label="Edit new phone number:" label-for="input-3">
                        <b-form-input
                          id="input-3"
                          v-model="form.phoneNumber"
                          type="number"
                          placeholder="Enter new phone number"
                          required>
                        </b-form-input>
                        <br/>
                        </b-form-group>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>
          <b-button @click="updateUser()" id="buttons">  Update  </b-button>
        </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      showDismissibleAlert: false,
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: ''
      }
    }
  },
  mounted() {
    this.form.firstName = this.$store.state.firstName
    this.form.lastName = this.$store.state.lastName
    this.form.phoneNumber = this.$store.state.phoneNumber
    this.subscribe()
    this.userUpdated()
    this.$client.on('connect', () => {
      console.log('Connected!')
    })
  },
  methods: {
    subscribe() {
      this.$client.subscribe('ui/#', 1, (error, res) => {
        if (error) {
          console.log(error)
        }
        console.log('Subscribed to ', res)
      })
    },

    updateUser() {
      const user = {
        id: this.$store.state.id,
        firstName: this.form.firstName || this.$store.state.firstName,
        lastName: this.form.lastName || this.$store.state.lastName,
        email: this.$store.state.email,
        phoneNumber: this.form.phoneNumber || this.$store.state.phoneNumber,
        password: this.$store.state.password
      }
      const userInfo = JSON.stringify(user)
      this.$client.publish('user/updateUser/request', userInfo, { qos: 1, retain: false }, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log(userInfo)
        }
      })
    },

    userUpdated() {
      this.$client.on('message', (topic, message) => {
        if (topic === 'user/updateUser/response') {
          const userNew = JSON.parse(message)
          this.$store.state.firstName = userNew.firstName
          this.$store.state.lastName = userNew.lastName
          this.$store.state.email = userNew.email
          this.$store.state.phoneNumber = userNew.phoneNumber

          localStorage.setItem(
            'localCredentials',
            JSON.stringify({
              id: this.$store.state._id,
              firstName: userNew.firstName,
              lastName: userNew.lastName,
              email: userNew.email,
              phoneNumber: userNew.phoneNumber
            })
          )
          this.message = 'Your Profile has been updated!'
          this.showDismissibleAlert = true
        } else {
          this.$client.on('message', (topic, message) => {
            if (topic === 'ui/UserError') {
              console.log(message.toString())
            }
          })
        }
      })
    }
  }
}

</script>

<style>
#input-group-1, #input-group-2, #input-group-3{
  padding: 0.5rem 2rem 0.5rem 2rem;
}
</style>
