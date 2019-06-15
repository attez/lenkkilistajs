import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
// Firebase App (the core Firebase SDK) is always required and must be listed first before other firebase imports
import * as firebase from "firebase/app"
import 'firebase/auth'
import FormatDate from '@/filters/date'
import {meterToKm, round} from '@/filters/format'
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'


Vue.config.productionTip = false

// Vue filters
Vue.filter('date', FormatDate)
Vue.filter('meterToKm', meterToKm)
Vue.filter('round', round)

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHSAF2pHlm9OlZ3zQ69li_z5Qc6-lz4g4",
  authDomain: "lenkkilista.firebaseapp.com",
  databaseURL: "https://lenkkilista.firebaseio.com",
  projectId: "lenkkilista",
  storageBucket: "lenkkilista.appspot.com",
  messagingSenderId: "947864487154",
  appId: "1:947864487154:web:b070335b278d6d7f"
}
console.log("INIT FIREBASE")
firebase.initializeApp(firebaseConfig);


// Init vue after firebase user status has been resolved so that we can route user correctly.

// eslint-disable-next-line
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  console.log("AUTH STATE LOADED, INITIALIZING VUE APP")
  // console.log(user)
  // if using vuex could store user here
  new Vue({
    router,
    render: h => h(App)
    //could use created method to save user to store, now using directly user in firebase object
  }).$mount('#app')

  unsubscribe() // stop listening onAuthState changes
})


// LEAFLET:  https://korigan.github.io/Vue2Leaflet/#/quickstart.md
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
 
