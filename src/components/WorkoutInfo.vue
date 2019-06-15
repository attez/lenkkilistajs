<template>
    <v-card v-if="workout" class="workout-card">
        <v-card-text>
            <div>{{ workout.start_time | date }}</div>
            <div class="mb-3">
                <router-link :to="{name: 'workout', params: {workout_id: workout.id } }">
                    <h2 class="d-inline" style="vertical-align: middle">{{ workout.name }}</h2>
                </router-link>
                <v-chip small disabled color="accent" dark class="white--text">{{workout.sport}}</v-chip>
            </div>
            <p>{{ workout.description }}</p>
            <h4>Miten pitkään?</h4>
            <!-- outer grid-list affects gutters also in here, if needed can be overwritter adding ma-0 to v-layout and pa-0 to v-flex s-->
            <v-layout wrap>
                <v-flex shrink><WorkoutProperty name="kokonaisaika" type="time" :value="workout.total_time"></WorkoutProperty></v-flex>
                <v-flex shrink><WorkoutProperty name="aika liikkeessä" type="time" :value="workout.moving_time"></WorkoutProperty></v-flex>
            </v-layout>
            <h4>Miten paljon?</h4>
            <v-layout wrap>
                <v-flex shrink><WorkoutProperty name="kokonaismatka" type="distance" :value="workout.distance"></WorkoutProperty></v-flex>
                <v-flex shrink><WorkoutProperty name="nousumetrejä" type="elevation" :value="workout.uphill"></WorkoutProperty></v-flex>
                <v-flex shrink><WorkoutProperty name="laskumetrejä" type="elevation" :value="workout.downhill"></WorkoutProperty></v-flex>
            </v-layout>
            <h4>Miten kovaa?</h4>
            <v-layout wrap>
                <v-flex shrink><WorkoutProperty name="keskinopeus" type="speed" :value="workout.avg_with_stops"></WorkoutProperty></v-flex>
                <v-flex shrink><WorkoutProperty name="keskinopeus liikkeessä" type="speed" :value="workout.avg_without_stops"></WorkoutProperty></v-flex>
                <v-flex shrink><WorkoutProperty name="suurin nopeus" type="speed" :value="workout.max_speed"></WorkoutProperty></v-flex>
            </v-layout>

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
        workout: Object
    },
    components: {
        WorkoutProperty
    }
    
}
</script>

<style>
    .workout-card {
        line-height: 1.1
    }
</style>