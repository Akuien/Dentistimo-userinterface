<template>
  <div class="head">
     <h1>booking for {{current.owner }}</h1>
        <h1>name: {{current.name}}</h1>
        <h1>name: {{current._id}}</h1>
  <button style="background:#3D5332" class="btn btn-primary btn-block">Submit</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      current: {},
      publish: {
        topic: 'dentist/getdentistbyId',
        qos: 2,
        payload: `${this.$route.params.id}`
      }

    }
  },
  mounted() {
    const { topic, qos, payload } = this.publish
    this.$client.subscribe('ui/dentist/getdentistbyId')
    // this.$client.publish('dentist/getdentistbyId', 'The ui component wants this  1' + `${this.$route.params.id}` + ' dentist for testing!!')
    this.$client.publish(topic, payload, qos, (error) => {
      console.log('Step 1 Publish')
      if (error) {
        console.log(error)
      }
    })

    this.$client.on('message', (topic, payload) => {
      console.log(topic, payload.toString())
      if (topic === 'ui/dentist/getdentistbyId') {
        const response = JSON.parse(payload)
        console.log('Dentist: ', response)

        this.current = response
        console.log('this is the den: ' + this.current.name)
      }
    })
  }
}
</script>
