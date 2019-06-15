<template>
  <v-app>
    <Navbar></Navbar>

    <v-content>
      <router-view :key="$route.path"/> <!-- key-attribuutin ansiosta komponentti luodaan aina uudestaan kun reitti muuttuu
                                              vaikka käyttäjä siirtyy saman komponentin sisällä, esim. workout/1 -> workout/2 -->
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      user: null
    }
  }
}
</script>