<template>
    <v-card>
        <v-card-text> {{ workout.start_time | date }} </v-card-text>
        <v-card-title primary-title>
            <router-link :to="{name: ''}"> <h2> {{ workout.name }} </h2> </router-link>
        </v-card-title>
        <v-card-text>
            <p>{{ workout.description }}</p>
        </v-card-text>
        
        
    </v-card>
</template>

<script>
export default {
    name: 'WorkoutInfo',
    data() {
        return {

        }

    },
    props: {
        workout: null
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

