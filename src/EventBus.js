import Vue from 'vue'
const EventBus = new Vue()
export default EventBus

// instead of bus could just use firebase.auth().onAuthStateChanged on components' created() hooks