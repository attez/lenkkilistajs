import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app"
import 'firebase/auth'
import FormatDate from '@/filters/date'
import {meterToKm, round} from '@/filters/format'
//import bus from '@/EventBus'


Vue.config.productionTip = false

Vue.filter('date', FormatDate)
Vue.filter('meterToKm', meterToKm)
Vue.filter('round', round)


const firebaseConfig = {
  apiKey: "AIzaSyCHSAF2pHlm9OlZ3zQ69li_z5Qc6-lz4g4",
  authDomain: "lenkkilista.firebaseapp.com",
  databaseURL: "https://lenkkilista.firebaseio.com",
  projectId: "lenkkilista",
  storageBucket: "lenkkilista.appspot.com",
  messagingSenderId: "947864487154",
  appId: "1:947864487154:web:b070335b278d6d7f"
}
// Initialize Firebase
console.log("INIT FIREBASE")
firebase.initializeApp(firebaseConfig);



// init vue after firebase user status has been resolved
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  console.log("AUTH ID CHANGED")
  console.log(user)
  // bus.$emit('userChanged', user) // there is now vue component listerning events at this point
  new Vue({
    router,
    render: h => h(App)
    //could use created method to save user to store, now using directly user in firebase object
  }).$mount('#app')

  unsubscribe() // stop listening onAuthState changes
})
 
