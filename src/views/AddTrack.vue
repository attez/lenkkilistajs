<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3><h1>Uusi reitti</h1></v-flex>
        </v-layout>                   
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-form ref="form" @submit.prevent="onAddTrack">
                
                    <v-text-field
                        name="name"
                        label="Reitin nimi"
                        v-model="track.name"
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
                    <span v-if="track.file">{{ track.file.name }}</span>
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
                        v-model="track.sport"
                    ></v-select>
                        
                    <v-textarea
                        name="description"
                        label="Reitin kuvaus"
                        v-model="track.description"
                    ></v-textarea>

                    <v-btn class="primary" type="submit">Tallenna reitti</v-btn>

                
                </v-form>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import router from '@/router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'AddTrack',
    data() {
        return {
            track: {
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
                name: [v=>!!v || 'Anna reitin nimi']
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
            this.track.file = file
            // if needed, could use here FileReader API to read the file
            console.log(this.track.file)
            this.validateFileField()
        },
        onAddTrack() {
            //validate
            if(!this.validateFileField() || !this.$refs.form.validate()) {
                console.log("form not valid")
                return
            }
            this.saveTrack(this.track)


            //FormData -> fetch
            //check error and push to route page
        },
        validateFileField() {
            this.fileError = !this.track.file
            return !this.fileError
        },
        saveTrack(track) { //if using vuex this function would  be placed in vuex store
            const formData = new FormData()
            for (const [prop, val] of Object.entries(track)) {
                formData.append(prop, val)
            }

            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                fetch('https://example.com/profile/avatar', {
                    method: 'POST',
                    headers:  new Headers({
                        'Authorization': 'Bearer ' + idToken //,
                        //'Content-Type': 'multipart/form-data'
                    }),
                    body: formData
                
                })
                .then(response => {
                    if(response.ok) {
                        // workout added succesfully
                        router.push({name:'mytracks'})
                    }
                    else {
                        response.json().then(json => {
                            //get error message
                            console.log(json)
                        })
                    }
                })
                .catch(error => {
                    console.error('Error:', error)
                    // show error on ui
                    
                    })


                }).catch(function(error) {
                    console.error(error)
                });



        }
    },
    computed: {
        
    },
    watch: {
        trackSport: v=>{console.log(v)}
        
    }
}
</script>

<style>

</style>
