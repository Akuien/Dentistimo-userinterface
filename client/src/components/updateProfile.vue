<template>
  <div>
    <div id="profile"> Edit Profile <img id="tooth" src="https://cdn-icons-png.flaticon.com/512/3143/3143588.png" alt= "tooth"></div>
        <b-form>
          <div class="container py-5 h-100" style= "background-color: #7DCDBF">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-6">
                <div id= "card">
                  <div class="card-body">

                      <b-form-group id="input-group-1" label="Edit your first name:" label-for="input-1">
                          <b-form-input id="input-1"
                            v-model="form.firstName"
                            placeholder="Enter new first name"
                            required>
                          </b-form-input>
                      </b-form-group>

                      <b-form-group id="input-group-2" label="Edit your last name:" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          v-model="form.lastName"
                          placeholder="Enter new last name"
                          required>
                        </b-form-input>
                      </b-form-group>

                      <b-form-group id="input-group-3" label="Edit your phone number:" label-for="input-3">
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
          </div>
          <b-button @click="updateUser()" id="buttons">  Submit  </b-button>
        </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: ''
      }

    }
  },
  mounted() {
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
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.$store.state.email,
        phoneNumber: this.form.phoneNumber,
        password: this.$store.state.password

      }
      const userInfo = JSON.stringify(user)
      this.$client.publish('user/updateUser', userInfo, 1, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log(userInfo)
        }
      })
    },

    userUpdated() {
      this.$client.on('message', (topic, message) => {
        if (topic === 'ui/userUpdated') {
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
          this.$router.push('/')
          console.log('here')
          console.log(localStorage)
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
