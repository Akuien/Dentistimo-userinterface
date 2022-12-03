<template>
    <div class="home">
      <Nav/>
              <!-- About-->
          <section class="page-section bg-white" id="about">
              <div class="container px-4 px-lg-5">
                  <div class="row gx-4 gx-lg-5 justify-content-center">
                      <gmap-map
                          :center= "center"
                          :zoom= "10"
                          style= "width:100%;  height:600px;"
                          v-bind="infoOptions">
                          <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            @click ="getSchedule(index + 1); scrollMeTo('schedule')"
                            @mouseover="openWindow(m, index)"
                          ></gmap-marker>
                          <gmap-info-window
                            @closeclick="window_open=false"
                            :opened="window_open"
                            :position="infoPosition"
                            :options="infoOptions"
                        >

                        </gmap-info-window>
                      </gmap-map>
                      <hr class="divider" />
                  </div>
              </div>
          </section>
          <!-- Services-->
          <section class="page-section" id="services">
              <div class="container px-4 px-lg-5">
                  <h2 class="text-center mt-0">At Your Service</h2>
                  <hr class="divider" />
                  <div class="row gx-4 gx-lg-5">
                      <div class="col-lg-3 col-md-6 text-center">
                          <div class="mt-5">
                              <div class="mb-2"><i class="bi-gem fs-1 text-primary"></i></div>
                              <h3 class="h4 mb-2">Acute Dental</h3>
                              <p class="text-muted mb-0">Extreme toothache, damaged tooth etc</p>
                          </div>
                      </div>
                      <div class="col-lg-3 col-md-6 text-center">
                          <div class="mt-5">
                              <div class="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                              <h3 class="h4 mb-2">Dental Check-up</h3>
                              <p class="text-muted mb-0">x-rays and examination of teeth and gums</p>
                          </div>
                      </div>
                      <div class="col-lg-3 col-md-6 text-center">
                          <div class="mt-5">
                              <div class="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                              <h3 class="h4 mb-2">Dental Hygienist</h3>
                              <p class="text-muted mb-0">Tartar removal and preventative dental care</p>
                          </div>
                      </div>
                      <div class="col-lg-3 col-md-6 text-center">
                          <div class="mt-5">
                              <div class="mb-2"><i class="bi-heart fs-1 text-primary"></i></div>
                              <h3 class="h4 mb-2">General Dentist</h3>
                              <p class="text-muted mb-0">All kinds of treatments</p>
                          </div>
                      </div>
                  </div>
              </div>
              <hr class="divider" />
          </section>
          <!-- Call to action-->
          <section class="page-section bg-white text-black" ref="schedule">
              <div class="container px-4 px-lg-5 text-center">
                  <h2 class="mt-0">Choose an available time</h2>
                  <div class="simple-example">
                      <vue-meeting-selector
                        class="meetingSelectedClass(meeting)"
                        v-model="meeting"
                        :date="date"
                        :loading="loading"
                        :class-names="classNames"
                        :meetings-days="meetingsDays"
                         @next-date="nextDate"
                        @previous-date="previousDate"
                        >

                  </vue-meeting-selector>
                  <!-- <p>Meeting Selected: {{ meeting.date}} </p>   -->
                  <hr class="divider" />
                  <!-- <p> {{ meeting ? meeting : 'No Meeting selected' }}</p> -->
                  <button class="btn btn-primary btn-xl" @click="scrollMeTo('contact')" id="confirm" :disabled="check">{{confirmed}}</button>
                </div>
              </div>
          </section>
          <!-- Contact-->
          <section class="page-section" ref="contact">
              <div class="container px-4 px-lg-5">
                  <div class="row gx-4 gx-lg-5 justify-content-center">
                      <div class="col-lg-8 col-xl-6 text-center">
                          <h2 class="mt-0">Please Enter your personal information</h2>
                          <hr class="divider" />
                          <p class="text-muted mb-5">Your personal information is only used to contact you back if needed!</p>
                      </div>
                  </div>
                  <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
                    <div class="col-lg-6">
                      <form id="contactForm">
                      <br>
                       <!-- Name input-->
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                  <label for="name">Full name</label>
                                  <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                              </div>

                              <!-- Phone number input-->
                              <div class="form-floating mb-3">

                                  <input class="form-control" type="text" id="phone" data-sb-validations="required"
                                         oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                                         <label for="phone">Phone number</label>
                                  <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                              </div>

                      <div style="text-align:center">
                        <button class="btn btn-primary btn-xl" :disabled="check" @click="sendForm()">{{confirmed}}</button>
                        <br><br><br>
                      </div>
                      </form>
                    </div>
                  </div>
              </div>
          </section>
          <!-- Footer-->
          <footer class="bg-light py-5" id="footer">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                      <div class="col-lg-4 text-center mb-5 mb-lg-0">
                          <i class="bi-phone fs-2 mb-3 text-muted"></i>

                          <div>Contact: +46 1234567
                          <p>info@gitlab.com</p>

                          </div>

                      </div>

                  </div>
              <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2021 - Group 12</div></div>
          </footer>

</div>
  </template>

<script>
import mqtt from 'mqtt'
import Navbar from './components/navbar.vue'
import VueMeetingSelector from 'vue-meeting-selector'
import '../../public/css/styles.css'
import { dentists } from '../../public/assets/dentistRegistry.json'

export default {
  name: 'Home',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Navbar,
    VueMeetingSelector
  },
  data() {
    return {
    // MQTT
          connection: {
          host: 'broker.emqx.io',
          port: 8083,
          endpoint: '/mqtt',
          clean: true,
          connectTimeout: 4000,
          reconnectPeriod: 4000,
          clientId: 'emqx_cloudf7693719',
          username: 'group12',
          password: '12',
        },
        subscriptionWillMsg: {
          topic: 'WillMsg12',
          qos: 2,
        },
        subscriptionBackend: {
          topic: 'Backend',
          qos: 2,
        },
        subscriptionMap: {
          topic: 'Map',
          qos: 2,
        },
        check: false,
        connected: 'Continue',
        confirmed: 'Confirm',
        //Map
        infoPosition: null,
        infoContent: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          },
          maxWidth: 10000,
          content: null
        },
        window_open: false,
        currentMidx: null, 
        coordinates: {
             lat: 0, 
             lng: 0
           },
        center: { lat: 57.70635929297478, lng: 11.965216102046611},
           currentPlace: null,
           dentists: [],
           places: [],
          //Schedule 
           date: new Date(),
        meetingsDays: [],
        meeting:  null,       //<-- Selected date and time
        loading: true,
        nbDaysToDisplay: 5,
        selectedClinic: 0,  //<-- Data type: Number
        Clinic_ID: 'Clinic',
  
        }
    },
    computed: {
      // because of line-height, font-type you might need to change top value
      classNames() {
        return {
          tabLoading: 'loading-div',
        };
      },
      markers(){
        return dentists.map(({
           name, coordinate: {longitude, latitude}, openinghours: {monday, tuesday, wednesday,thursday, friday}, address})=> ({
          name: {
            name,
            color: '#333',
            fontSize: '10px'
          },
          address,
          position: {
            lng: longitude,
            lat: latitude          
          },
          openinghours:{
            monday,
            tuesday, 
            wednesday,
            thursday,
            friday
          }
        })
        );
      }
    },
    mounted() {
        this.geolocate();
        this.createConnection();
        this.getClinics();
    },
    methods: {
        //MQTT
        createConnection() {
        const { host, port, endpoint, ...options } = this.connection
        const connectUrl = `ws://${host}:${port}${endpoint}`
        try {
          this.client = mqtt.connect(connectUrl, options)
        } catch (error) {
          console.log('mqtt.connect error', error)
        }
        this.client.on('connect', () => {
          this.doSubscribe()
          console.log('Connection succeeded!')
        })
        this.client.on('error', error => {
          console.log('Connection failed', error)
        })
        this.client.on('message', (topic, message) => {
          if(topic=='WillMsg12'){
            window.alert(message);
            this.check = true;
            this.connected = 'No connection';
            this.confirmed = 'Unable to confirm time';
          }
          else if(topic == 'Backend'){
            if (message == "bookFail") {
              window.alert("Appointment could not be made");
            } else if (message == "bookSuccess") {
              window.alert("Appointment was successfully booked");
              this.getSchedule(this.selectedClinic);
            } else {
              // load schedule
              this.meetingsDays= (JSON.parse(message))[this.Clinic_ID + this.selectedClinic];
              this.loading = false;
            }
  
          }
          console.log(`Received message ${message} from topic ${topic}`)
        })
      },
      doSubscribe() {
        var { topic, qos } = this.subscriptionWillMsg
        this.client.subscribe(topic, { qos }, (error, res) => {
          if (error) {
            console.log('Subscribe to topics error', error)
            return
          }
          this.subscribeSuccess = true
          console.log('Subscribe to topics res', res)
        })
        var { topic, qos } = this.subscriptionMap
        this.client.subscribe(topic, { qos }, (error, res) => {
          if (error) {
            console.log('Subscribe to topics error', error)
            return
          }
          this.subscribeSuccess = true
          console.log('Subscribe to topics res', res)
        })
        var { topic, qos } = this.subscriptionBackend
        this.client.subscribe(topic, { qos }, (error, res) => {
          if (error) {
            console.log('Subscribe to topics error', error)
            return
          }
          this.subscribeSuccess = true
          console.log('Subscribe to topics res', res)
        })
      },
      doUnSubscribe() {
        const { topic } = this.subscription
        this.client.unsubscribe(topic, error => {
          if (error) {
            console.log('Unsubscribe error', error)
          }
        })
      },
      doPublish(topic, payload) {
        this.client.publish(topic, payload, 2, error => {
          if (error) {
            console.log('Publish error', error)
          }
        })
      },
      destroyConnection() {
        if (this.client.connected) {
          try {
              this.client.end()
              this.client = {
                connected: false,
              }
              console.log('Successfully disconnected!')
            } catch (error) {
              console.log('Disconnect failed', error.toString())
              }
            }
          },
      //Map
          getPosition: function(marker) {  
        return {
          lat: parseFloat(marker.position.lat),
          lng: parseFloat(marker.position.lng)
        }
      },
      openWindow(marker, idx) {  
  
        this.infoPosition = this.getPosition(marker);
  
        this.infoOptions.content = '<div id="iw" class="iw-container">'+                                    
                                      '<div class="iw-body">'+                                                             
                                          '<h5 class="iw-address">'+
                                              marker.name.name+
                                          '</h5>'+
                                          '<h6 class="iw-address">'+
                                             'Address: '+ marker.address+
                                          '</h6>'+ 
                                          '<h8 class="iw-address">'+' Monday: '+ marker.openinghours.monday + ' || '+'</h8>'+
                                          '<h7 class="iw-address">'+ 'Tuesday: '+ marker.openinghours.tuesday+' || '+'</h7>'+
                                          '<h8 class="iw-address">'+ 'Wednsday: '+ marker.openinghours.wednesday+ ' || '+ '</h8>'+
                                          '<h8 class="iw-address">'+ 'Thursday: '+ marker.openinghours.thursday+ ' || '+'</h8>'+
                                          '<h8 class="iw-address">'+ 'Friday: '+ marker.openinghours.friday  + '</h8>'+
                                      '</div>'                                                            
                                   '</div>';
  
        if (this.currentMidx === idx) {
          this.window_open = !this.window_open;
        }
        else {
          this.window_open = true;
          this.currentMidx = idx;
        }
      },
      setPlace(place) {
        this.currentPlace = place;
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      },
      getClinics() {
        this.doSubscribe("frontend/allClinics");
        console.log("getting all clinics");
        this.client.on("message", (topic, message) => {
          if (topic == "allClinics") {
            var string = message.toString();
            var json = JSON.parse(string);
            this.clinics = json;
            console.log(json);
          }
        });
      },
      //Schedule
      formatingDate(d) {
        //const d =  new Date(meeting.date);
        const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
      },
      // @click on button-right
      async nextDate() {
        window.alert('There are no more time slots available. Please choose one of the existing ones!');
      },
      // @click on button-left
      async previousDate() {
        window.alert('You cannot book the past dates');
      },
      getSchedule(clinicNumber){
        this.selectedClinic = clinicNumber
        this.doPublish('Frontend/schedule',  this.Clinic_ID+this.selectedClinic);
      },
      //Other
      scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
      },
      sendForm(){
        if(this.selectedClinic == null || this.meeting == null){
          window.alert('Please select a clinic and a time to confirm your booking');
        } else {
          var bookingRequestData = {'dentistid': this.selectedClinic, 'date': this.meeting}
          this.doPublish("Frontend/bookingform", JSON.stringify(bookingRequestData))
        }
      }
  
    },
  }
  </script>
  
  <style scoped lang="scss">
    .simple-example {
     margin-top: 5em;
     margin-left: 2em;
      margin-right: 2em;
     margin-bottom: 5em;
     }
  </style>