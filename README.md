# T-5-UserInterface



## Description

User interface is the component which communicates with other 4 components through the mqtt broker. This component enables the user to interact with the system via graphically user interface ; the user can sign up, sign in, update their information on the profile page, see the available timeslots through the map which is displayed on the homepage,they can pick a clinic with suitable time and location and book an appointment. 

## Component Responsibilities

* Display the signin/signup
* Display the map with a list of clinics using leaflet
* Display the calender and booking options for the user
* Display the profile page 
* Enabling Authentication with the use of token
* Using store to hold the state of the system and the user's credentials using vuex library
* Publish messages to the user handler via mqtt connection

## Architectural Style
* Publish and Subscribe
 
This component acts as both a publisher and subscriber.

