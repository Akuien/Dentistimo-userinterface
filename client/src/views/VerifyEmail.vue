<template>
  <div>
    <table
      role="presentation"
      style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);"
    >
      <tbody>
        <tr>
          <td
            align="center"
            style="padding: 1rem 2rem; vertical-align: top; width: 100%;"
          >
            <table
              role="presentation"
              style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;"
            >
              <tbody>
                <tr>
                  <td style="padding: 40px 0px 0px;">
                    <div style="text-align: center;">
                      <div style="padding-bottom: 20px;">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2818/2818366.png"
                          alt="Company"
                          style="width: 56px;"
                        />
                      </div>
                    </div>
                    <div
                      style="padding: 20px; background-color: rgb(255, 255, 255);"
                    >
                      <div style="color: rgb(0, 0, 0); text-align: center;">
                        <h1 style="margin: 1rem 0">Welcome to Dentistimo</h1>
                        <p style="padding-bottom: 16px">
                          Your account is now verified!. Thank you for signing up to Dentistimo. We're looking forward to provide you
                          with the best service! Click the link below to login
                          to your account:
                        </p>
                        <p style="padding-bottom: 16px">
                          <a
                            href="http://localhost:8080/login"
                            style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #3ab286;display: inline-block;margin: 0.5rem 0;"
                            >Login to your account</a
                          >
                        </p>
                        <p style="padding-bottom: 16px">Best regards,</p>
                        <p style="padding-bottom: 16px">Dentisimo team 5</p>
                      </div>
                    </div>
                    <div
                      style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;"
                    ></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VerifyEmail',
  mounted: function () {
    this.verifyAccount()
  },
  methods: {
    verifyAccount() {
      this.$client.on('connect', () => {
        console.log('Connected!')
      })
      const verifyUser = { user_id: this.$route.params.id }
      const updateUser = JSON.stringify(verifyUser)
      this.$client.publish('Users/verify', updateUser)
      console.log(verifyUser)
    }
  }
}
</script>
<style lang="sass" scoped></style>
