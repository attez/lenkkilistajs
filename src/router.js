import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tracks from './views/Tracks'
import AddTrack from './views/AddTrack'
import Track from './views/Track'

import * as firebase from 'firebase/app'
import 'firebase/auth'


Vue.use(Router)

const router = new Router({
  //mode: history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    
    },
    {
      path: '/mytracks',
      name: 'mytracks',
      component: Tracks,
      meta: { requiresAuth: true }
    },
    {
      path: '/addtrack',
      name: 'addtrack',
      component: AddTrack,
      meta: { requiresAuth: true }
    },
    {
      path: '/track/:track_id',
      name: 'track',
      component: Track,
      meta: { requiresAuth: true }

    }
  ]

})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth) // if any of the route object in the path requested requires auth then true is returned
  const isAuthenticated = !!firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router