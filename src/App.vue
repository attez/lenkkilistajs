<template>
  <v-app>
    <Navbar></Navbar>

    <v-content>
      <router-view :key="$route.path"/> <!-- key-attribuutin ansiosta komponentti luodaan aina uudestaan kun reitti muuttuu
                                              vaikka käyttäjä siirtyy saman komponentin sisällä, esim. track/1 -> track/2 -->
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      user: null
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => { 
      this.user = user
      console.log("auth state changed")
    })
  }
}
</script>
