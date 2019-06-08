<template>
    <v-sheet class="pa-1" color="red lighten-4" width=140>
        <v-layout column align-center>
            <v-flex>
                <v-flex class="caption font-weight-light">
                    {{ name }}
                </v-flex>
                <v-flex class="title">
                    <slot></slot> {{ unit }}                      
                </v-flex>
            </v-flex>
        </v-layout>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        name: String,
        unit: String
    }
    
}
</script>

<style>

</style>

