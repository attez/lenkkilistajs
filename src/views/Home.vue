<template>
<v-container grid-list-lg>
  <v-layout column>
    <v-flex> <AppDescription/> </v-flex>
    <v-layout column v-if="!isAuthtenticated" style="max-width:600px; width:100%; " align-self-center grow>
      <v-flex> <SignIn/> </v-flex>
      <v-flex> <SignUp/> </v-flex>
    </v-layout>

    
     
  </v-layout>
</v-container>
</template>

<script>
  import AppDescription from '../components/AppDescription'
  import SignUp from '../components/SignUp'
  import SignIn from '../components/SignIn'
  import bus from '@/EventBus'
  import * as firebase from 'firebase/app'
  import 'firebase/auth'
  

  export default {
    name: 'Home',
    components: {
      AppDescription,
      SignUp,
      SignIn
    },
    data() {
      return {
        isAuthtenticated: !!firebase.auth().currentUser

      }
    },
    created(){
        bus.$on('userChanged', user => { 
            this.isAuthtenticated = !!user
        })
    }
  }
</script>
