const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://127.0.0.1:1883') // public broker mqtt://broker.hivemq.com

client.on('connect', function () { // When connected
  // Subscribe to a topic
  client.subscribe('topic1/test', function () {
    // When a message arrives, print it to the console
    client.on('message', function (topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'")
    })
  })
})
