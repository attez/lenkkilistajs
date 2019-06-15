<template>
    <v-container fill-height>  
        <v-layout column>
            <!-- title, add button -->
            <v-flex shrink>
                <v-layout align-baseline>
                    <h1 >Omat harjoitukset</h1>
                    <v-btn :to="{name:'addworkout'}" fab dark color="primary"><v-icon dark>add</v-icon></v-btn>
                </v-layout>
            </v-flex>
            
            <!-- loading spinner -->
            <v-flex d-flex v-if="loading">  
                <v-layout  justify-center align-center >
                    <v-flex shrink>
                        <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                    </v-flex>
                </v-layout>
            </v-flex>

            <!-- contents -->            
            <v-flex d-flex v-else>
                <v-layout>
                    <v-flex xs12 v-if="workouts.length === 0 " >
                        <p>Sinulla ei ole vielä yhtään harjoitusta.</p>
                    </v-flex>
                    <!-- grid for workouts -->
                    <v-flex>
                        <v-container pa-0 fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12 md6 v-for="workout in workouts" :key="workout.id">
                                    <WorkoutInfo :workout="workout"/>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>  
    </v-container>
</template>

<script>
import WorkoutInfo from '@/components/WorkoutInfo'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let db = null
export default {
    name: 'Workouts',
    data() {
        return {
            workouts: [] ,//[{id:1, name:'Eka harjoitus', sport:'Hiihto', description: 'Kuvaus', start_time: new Date()}]
            loading: false

        }
    },
    components: {
        WorkoutInfo
    },
    methods: {
        loadWorkouts() {
            this.loading = true
            db.collection("workouts").where("uid", "==", firebase.auth().currentUser.uid).orderBy("start_time", "desc")
                .get()
                .then(workoutsSnapshot => {
                    workoutsSnapshot.forEach(workout => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(workout.id, " => ", workout.data())
                        this.workouts.push({id: workout.id, ...workout.data()})
                    });
                })
                .catch(error => {
                    console.log("Error getting workouts: ", error)
                    // TODO: show error in UI: failed to load workouts
                })
                .then(() => {
                    this.loading = false
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