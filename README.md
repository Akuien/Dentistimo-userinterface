# T-5-UserInterface



## Description

User interface is the component which communicates with other 4 components through the mqtt broker. This component enables the user to interact with the system via graphically user interface ; the user can sign up, sign in, update their information on the profile page, see the available timeslots through the map which is displayed on the homepage,they can pick a clinic with suitable time and location and book an appointment. On the profile page, the users can see the list of their appointments and delete the appointments they don't want to attend.


## Component Responsibilities

* Display the signin/signup
* Display the map with a list of clinics using leaflet
* Display the calender and booking options for the user
* Display the profile page and the list of appointments
* Enabling Authentication with the use of token
* Using store to hold the state of the system and the user's credentials using vuex library
* Publish messages to the user handler via mqtt connection

## Architectural Style
* Publish and Subscribe
 
This component acts as both a publisher and subscriber.When the user interacts with the user interface it will publish and subscribe to the same topic accordingly, In this way it can connect to other 4 components in the system.

## Technologies

* VueJS
* Node js
* Mqtt
* HiveMQ websocket
* Leaflet
* Vuex
* uuid 

## Get started

* Clone the repository using https://git.chalmers.se/courses/dit355/dit356-2022/t-5/t-5-userinterface.git
* Run "cd client" in the terminal
* Install the dependencies by running "npm install"
* At the end run "npm run serve" to start the application


## Team members

* Akuen Akoi Deng
* Marwa Selwaye
* Kanokwan Haesatith
* Cynthia Tarwireyi
* Nazli Moghaddam
* Jonna Johansson


