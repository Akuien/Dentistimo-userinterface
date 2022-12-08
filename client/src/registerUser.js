
class RegisterUser {
  registerNewUser(info) {
    const mqtt = require('mqtt')
    const form = info

    const options = {
      host: '45fb8d87df7040eb8434cea2937cfb31.s1.eu.hivemq.cloud',
      port: 8883,
      protocol: 'mqtts',
      username: 'Team5@Broker',
      password: 'Team5@Broker'
    }

    const client = mqtt.connect(options)

    client.on('connect', function () {
      console.log('Connected')
    })

    client.on('error', function (error) {
      console.log(error)
    })

    client.on('message', function (topic, message) {
      console.log('Received message:', topic, message.toString())
    })

    const userInfo = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
      id: form.id
    }

    const newMessage = JSON.stringify(userInfo)

    client.publish('newUserInfo/test', newMessage)
    client.subscribe('my/test/topic1')
  }
}

export default new RegisterUser()
