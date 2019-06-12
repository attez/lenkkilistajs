import Vue from 'vue'
const EventBus = new Vue()
export default EventBus
/*
Event bus is used to notify components of changes in other (sibling) components.
Events:
    userChanged: when user status changes (login, logout)


Instead of bus could just use firebase.auth().onAuthStateChanged on components' created() hooks. Or vuex.

*/
