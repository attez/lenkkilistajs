<template>

    <v-container fluid fill-height>
        <v-layout column>
            <template v-if="workout">
                <v-flex shrink> <h1>Reitti {{ workout_id }} - {{ workout.name }}</h1> </v-flex>
                <v-flex><Map :workout="workout"></Map></v-flex>
            </template>
        </v-layout>        
    </v-container>


</template>

<script>
import Map from '@/components/Map'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
let db = null

export default {
    name: 'Workout',
    components: {
        Map
    },
    data() {
        return {
            workout_id: this.$route.params.workout_id,
            workout: null
        }
    },
    methods: {
        loadWorkout() {
            let workoutRef = db.collection("workouts").doc(this.workout_id)

            workoutRef.get().then(doc => {
                if (!doc.exists) {
                    //TODO: show error: not found
                    console.log(`Workout: No document with id ${this.workout_id} found.`)
                    return
                }
                this.workout = {id:doc.id, ...doc.data(), tracks:[]}
                
                // get subcollection
                return workoutRef.collection('tracks').get()
            })
            .then (tracks => {
                tracks.forEach(track => {
                    let track_data = track.data()
                    // convert GeoPoints to  [lat, lng] arrays
                    track_data.segments.forEach(segment => {
                        segment.convertedCoordinates = this.convertGeoPoints(segment.coordinates)
                    }) 
                    this.workout.tracks.push({id: track.id, ...track_data})
                    // if a track would contain a segment subcollection then we could add the promises to to an array and use Promise.all?
                })
                return
            })
            .catch(error => {
                //TODO: show error: failed to load
                console.log(error)

            })

        },
        convertGeoPoints(geoPoints) {
            console.log("converting geopoints")
            let latLongs = geoPoints.map(point => {
                return [point.latitude, point.longitude]
            })
            return latLongs
        }

    },
    created() {
        db = firebase.firestore();
        this.loadWorkout()
    }
}
</script>

<style>

</style>
