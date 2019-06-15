<template>
    <v-toolbar app color="primary darken-1" dark>
        <v-toolbar-title class="headline text-uppercase mr-4" @click="$router.push({name:'home'})" style="cursor: pointer">
            <span>Lenkki</span>
            <span class="font-weight-light">Lista</span>
        </v-toolbar-title>
      
        <v-toolbar-items>
            <v-btn v-if="isAuthtenticated" flat :to="{name: 'workouts'}"> Omat harjoitukset</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn v-if="isAuthtenticated" flat @click="onSignOut">
            <span class="hidden-xs-only">Kirjaudu ulos</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
  
    </v-toolbar>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import bus from '@/EventBus'

export default {
    name: 'Navbar',
    data () {
        return {
            isAuthtenticated: !!firebase.auth().currentUser

        }
    },
    methods: {
        onSignOut () {
            firebase.auth().signOut()
            bus.$emit('userChanged', null)
            this.$router.push('/')
        }
    },
    created(){
        // listen log ins and outs
        bus.$on('userChanged', user => { 
            this.isAuthtenticated = !!user
        })
    }
}
</script>

<style>

</style>