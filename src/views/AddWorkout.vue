<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3><h1>Uusi harjoitus</h1></v-flex>
        </v-layout>                   
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-alert
                    v-model="errors.add.show"
                    type="error"
                    outline
                    >
                    {{errors.add.message}}
                 </v-alert>
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
                        v-model="errors.file.show"
                        type="error"
                        outline
                        >
                        {{ errors.file.message }}
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
            errors: {
                add: {
                    show:false,
                    message:''
                },
                file: {
                    show: false,
                    message: 'Valitse GPX-tiedosto.' 
                }
            },
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
            this.errors.add.show = false
            //validate
            if(!this.validateFileField() || !this.$refs.form.validate()) {
                console.log("AddWorkout: Form not valid.")
                return
            }
            this.saveWorkout(this.workout)
            .then(message => {
                console.log(message)
                this.$router.push({name:'workouts'})
            })
            .catch(error => {
                console.error(error)
                this.errors.add.message = error.message
            })
        },
        validateFileField() {
            this.errors.file.show = !this.workout.file
            return !this.errors.file.show
        },
        saveWorkout(workout) { //if using vuex this function would be placed in vuex store
            return new Promise((resolve, reject) => {
                // make form data from workout object
                const formData = new FormData()
                for (const [prop, val] of Object.entries(workout)) {
                    formData.append(prop, val)
                }

                firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(idToken => {
                    return fetch(process.env.VUE_APP_API_URL, {
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
                        resolve("Workout added.")
                    }
                    else { // workout NOT added
                        response.json() //get error message
                        .then(json => {                        
                            reject(new Error(json.message))
                        })
                        .catch(() => {
                            console.log("AddWorkout: Failed to add workout. No json error message.")
                            reject(new Error("Harjoituksen lisääminen epäonnistui."))
                            })
                    }
                })
                .catch(error => {
                     // TODO: modify or extend error: failed to add workout, network error
                    reject(error)
                    
                })
            })
        }
    },
    watch: {
        'errors.add.message' (msg) {
            this.errors.add.show = !!msg
        },
        'errors.add.show' (show) {
            if (!show) {
                this.errors.add.message = null
            }
        }
    }
}
</script>

<style>

</style>
