<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3><h1>Uusi harjoitus</h1></v-flex>
        </v-layout>                   
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-form ref="form" @submit.prevent="onAddWorkout">
                
                    <v-text-field
                        name="name"
                        label="Harjoituksen nimi"
                        v-model="workout.name"
                        :rules="rules.name"
                    ></v-text-field>
  
                    <!-- Let's display prettier v-btn instead of standard input file select button -->
                    <v-btn small class="primary" @click="onSelectFile">Valitse GPX-tiedosto</v-btn>               
                    <input
                        type="file"
                        name="file"
                        style="display:none"
                        ref="fileInput"
                        accept=".gpx"
                        @change="onFileSelected">
                    <span v-if="workout.file">{{ workout.file.name }}</span>
                    <v-alert
                        v-model="fileError"
                        type="error"
                        outline
                        >
                        Valitse GPX-tiedosto.
                    </v-alert>

                    <v-select
                        :items="sports"
                        name="sport"
                        label="Laji"
                        v-model="workout.sport"
                    ></v-select>
                        
                    <v-textarea
                        name="description"
                        label="Harjoituksen kuvaus"
                        v-model="workout.description"
                    ></v-textarea>

                    <v-btn class="primary" type="submit">Tallenna harjoitus</v-btn>

                
                </v-form>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'AddWorkout',
    data() {
        return {
            workout: {
                name:'',
                description: '',
                sport:'',
                file: null,
            },

            fileError: false,
            sports: [
                {text:'[Ei lajia]', value: ''},
                'Alamäkiluistelu',
                'Alppihiihto',
                'Ampumahiihto',
                'Hiihto',
                'Hiihtosuunnistus',
                'Juoksu',
                'Kävely',
                'Laskettelu',
                'Maantiepyöräily',
                'Maastopyöräily',
                'Soutu',
                'Purjehdus',
                'Pyöräsuunnistus',
                'Suunnistus',
                'Uinti'

            ],
            rules: {
                name: [v=>!!v || 'Anna harjoituksen nimi']
            }

        }
    },
    methods: {
        onSelectFile() {
            this.$refs.fileInput.click() //simulate click on the actual file input button
        },
        onFileSelected(event) {
            
            const files = event.target.files
            if (!files.length) return // event is called with empty file list if user cancels dialog after file has been chosen
            let file = files[0] // only one file accepted in file input
            this.workout.file = file
            // if needed, could use here FileReader API to read the file
            // console.log(this.workout.file)
            this.validateFileField()
        },
        onAddWorkout() {
            //validate
            if(!this.validateFileField() || !this.$refs.form.validate()) {
                console.log("AddWorkout: Form not valid.")
                return
            }
            this.saveWorkout(this.workout)
        },
        validateFileField() {
            this.fileError = !this.workout.file
            return !this.fileError
        },
        saveWorkout(workout) { //if using vuex this function would be placed in vuex store
            // make form data from workout object
            const formData = new FormData()
            for (const [prop, val] of Object.entries(workout)) {
                formData.append(prop, val)
            }

            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(idToken => {
                return fetch('http://localhost:8000/' , {
                    method: 'POST',
                    headers:  new Headers({
                        'Authorization': 'Bearer ' + idToken //,
                        //'Content-Type': 'multipart/form-data'
                    }),
                    body: formData
                
                })
            })
            .then(response => {
                if (response.ok) { // workout added succesfully  
                    this.$router.push({name:'workouts'})
                }
                else { // workout NOT added
                    response.json() //get error message
                    .then(json => {                        
                        console.error(json)
                        // TODO: show error from json in UI.
                    })
                    .catch(error => {
                        console.error("AddWorkout: Failed to load error message.")
                        console.log(error)
                        })
                }
            })
            .catch(error => {
                console.error('Error:', error)
                // TODO: show generic error on UI.
                
            })

        }
    }
}
</script>

<style>

</style>
