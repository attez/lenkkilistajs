<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3><h1>Omat harjoitukset</h1></v-flex>
        </v-layout>                   
        <v-layout column>
            <v-flex v-for="workout in workouts" :key="workout.id" xs12 sm6 offset-sm3>
                <WorkoutInfo :workout="workout"/>
            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>
import WorkoutInfo from '@/components/WorkoutInfo'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

console.log("workout run")
let db = null
export default {
    name: 'Workouts',
    data() {
        return {
            workouts:[{id:1, name:'Eka harjoitus', sport:'Hiihto', description: 'Kuvaus', start_time: new Date()}]

        }
    },
    components: {
        WorkoutInfo
    },
    methods: {
        loadWorkouts() {
            db.collection("workouts").where("uid", "==", firebase.auth().currentUser.uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data())
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error)
                })

        }
    },
    created() {
        db = firebase.firestore();
        this.loadWorkouts()
    }
}
</script>

<style>

</style>
