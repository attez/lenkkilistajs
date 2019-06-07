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
export default {
    name: 'Workouts',
    data() {
        return {
            workouts:[{id:1, name:'Eka harjoitus', sport:'Hiihto', description: 'Kuvaus', start_time: new Date()}]

        }
    },
    components: {
        WorkoutInfo
    }
}
</script>

<style>

</style>
