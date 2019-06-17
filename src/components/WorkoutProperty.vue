<template>
    <v-sheet class="pa-1" color="primary lighten-1" width=140>
        <v-layout column align-center>
            <v-flex>
                <div class="caption font-weight-light">
                    {{ name }}
                </div>
                <div class="title">
                    {{ formattedProperty.value }} {{ formattedProperty.unit }}                 
                </div>
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
    methods: {
        formatTime(seconds) {
            if (!seconds) {
                console.warn('WorkoutProperty: Could not format time.')
                return ''
            }
            let s = Math.floor( seconds % 60 )
            let m = Math.floor( (seconds/60) % 60 )
            let h = Math.floor( (seconds/(60*60)) )
            return h.toString().padStart(2, '0') +':'+ m.toString().padStart(2, '0') +':'+ s.toString().padStart(2, '0')
        }
    },
    props: {
        name: String,
        type: String,
        value: Number
    },
    computed: {
        formattedProperty: function() {
            let unit = ''
            let value = '-' // default value for missing value
            if (this.value) {
                switch(this.type) {
                    case 'distance':
                        unit = 'km'
                        value = (this.value/1000).toFixed(2)
                        break
                    case 'elevation':
                        unit = 'm'
                        value = this.value.toFixed(0)
                        break
                    case 'time':
                        unit = ''
                        value = this.formatTime(this.value)
                        break
                    case 'speed':
                        unit = 'km/h'
                        value = (this.value * 3.6).tgitoFixed(1) // (m/s) to (km/h)
                        break

                    default:
                        console.warn(`WorkoutProperty: Could not find formatter for type ${this.type}.`)

                }

            }
            return {unit: unit, value: value}
        }

    }
    
}
</script>

<style>

</style>