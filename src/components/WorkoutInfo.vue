<template>
    <v-card>
        <v-card-text> {{ workout.start_time | date }} </v-card-text>
        <v-card-title primary-title>
            <router-link :to="{name: 'workout', params: {workout_id: workout.id } }"> <h2>{{ workout.name }}</h2> </router-link>
        </v-card-title>
        <v-card-text>
            <p>{{ workout.description }}</p>
            <h4>Miten pitkään?</h4>
            <WorkoutProperty name="kokonaisaika" type="time" :value="workout.total_time"></WorkoutProperty>
            <WorkoutProperty name="aika liikkeessä" type="time" :value="workout.moving_time"></WorkoutProperty>
            <h4>Miten paljon?</h4>
            <WorkoutProperty name="kokonaismatka" type="distance" :value="workout.distance"></WorkoutProperty>
            <WorkoutProperty name="nousumetrejä" type="elevation" :value="workout.uphill"></WorkoutProperty>
            <WorkoutProperty name="laskumetrejä" type="elevation" :value="workout.downhill"></WorkoutProperty>
            <h4>Miten kovaa?</h4>
            <WorkoutProperty name="keskinopeus" type="speed" :value="workout.avg_with_stops"></WorkoutProperty>
            <WorkoutProperty name="keskinopeus liikkeessä" type="speed" :value="workout.avg_without_stops"></WorkoutProperty>
            <WorkoutProperty name="suurin nopeus" type="speed" :value="workout.max_speed"></WorkoutProperty>


        </v-card-text>
        
        
    </v-card>
</template>

<script>
import WorkoutProperty from '@/components/WorkoutProperty'
export default {
    name: 'WorkoutInfo',
    data() {
        return {

        }

    },
    props: {
        workout: null
    },
    components: {
        WorkoutProperty
    }
    /*
    HAHMOTELMA

    1. ajankohta ja laji: aloitus, lopetus [otsikon yläpuolelle]
    2. Otsikkko [isolla]
    3. kuvaus
    4. tiedot lenkistä omiin ryhmitelyihin laatikoihin
    Miten pitkään?
    - kestot: kokonaiskesto, josta liikkeessä (pyssädyksissä)    
    Miten paljon?
    - matkat: kokonaismatka ja - korkeuserot: nousua, laskua
    Miten kovaa?
    - nopeudet: keskinopeus, keskinopeus liikkeessä, suurin nopeus
    

    
    */
    
}
</script>

<style>

</style>

