<template>
    <v-card class="elevation-4"> <!--shadow-->
    <v-card-title primary-title class="headline">Kirjaudu sisään</v-card-title>
        <v-form @submit.prevent="onSignIn" ref="form">
            <v-card-text>
                    <v-alert v-model="signInError" type="error" outline>
                        {{ signInErrorMessage }}
                    </v-alert>
                    <v-text-field :disabled="loading" prepend-icon="person" name="login" label="Sähköposti" type="email" v-model="email" :rules="rules.email"></v-text-field>
                    <v-text-field :disabled="loading" prepend-icon="lock" name="password" label="Salasana" type="password" v-model="password" :rules="[rules.emptyPassword]"></v-text-field>                
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" color="primary" type="submit">Kirjaudu sisään</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"
import bus from '@/EventBus'

export default {
    name: 'SignIn',
    data() {
        return {
            email:'',
            password: '',
            signInError: false,
            signInErrorMessage: '',
            rules: {
                email: [ //https://vuetifyjs.com/en/components/forms#form
                    v => !!v || 'Sähköpostiosoite vaaditaan',
                    v => /.+@.+/.test(v) || 'Anna kelvollinen sähköpostiosoite'
                ],
                emptyPassword: 
                    v => !!v || 'Salasana vaaditaan'
            },
            loading: false

        }
    },
    methods: {
        onSignIn() {
            this.setError(null)
            if(!this.$refs.form.validate()) {
                return }
            this.loading = true
            this.signInUser(this.email, this.password)
            .then(() => {
                this.loading = false
            })
        },
        signInUser(email, password) {
            return firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
                // console.log(user)
                bus.$emit('userChanged', user)
                this.$router.push({name:'workouts'})
            })
            .catch(error=> {
                console.log(error)
                this.setError(error.message) 
            })
        },
        setError(msg) {
            this.signInErrorMessage = msg // TODO: implement translations

        }
    },
    computed: {
        
    },
    watch: {
        signInErrorMessage (msg) {
            this.signInError = !!msg
        },
        signInError (value) {
            if (!value)
                this.signInErrorMessage = ''
        }
    }

}
</script>

<style>

</style>