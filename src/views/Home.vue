<template>
<v-container>
  <v-layout column>
    <v-flex xs-12> <AppDescription/> </v-flex>
    <v-flex v-if="!isAuthtenticated" xs-12> <SignUp/> </v-flex>
    <v-flex v-if="!isAuthtenticated" xs-12> <SignIn/> </v-flex>
    
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
