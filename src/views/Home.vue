<template>
<v-container>
  <v-layout column>
    <v-flex xs-12> <AppDescription/> </v-flex>
    <v-flex xs-12> <SignUp/> </v-flex>
    <v-flex xs-12> <SignIn/> </v-flex>
    
  </v-layout>
</v-container>
</template>

<script>
  import AppDescription from '../components/AppDescription'
  import SignUp from '../components/SignUp'
  import SignIn from '../components/SignIn'

  export default {
    components: {
      AppDescription,
      SignUp,
      SignIn
    }
  }
</script>
