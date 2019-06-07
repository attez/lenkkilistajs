import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Workouts from './views/Workouts'
import AddWorkout from './views/AddWorkout'
import Workout from './views/Workout'

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
      path: '/workouts',
      name: 'workouts',
      component: Workouts,
      meta: { requiresAuth: true }
    },
    {
      path: '/addworkout',
      name: 'addworkout',
      component: AddWorkout,
      meta: { requiresAuth: true }
    },
    {
      path: '/workout/:workout_id',
      name: 'workout',
      component: Workout,
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