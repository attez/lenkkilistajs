<template>
    <v-card>
        <v-card-text> {{ workout.start_time | date }} </v-card-text>
        <v-card-title primary-title>
            <router-link :to="{name: 'workout', params: {workout_id: workout.id } }"> <h2> {{ workout.name }} </h2> </router-link>
        </v-card-title>
        <v-card-text>
            <p>{{ workout.description }}</p>
            <WorkoutProperty name="ominaisuus" unit="km">124.20</WorkoutProperty>

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

