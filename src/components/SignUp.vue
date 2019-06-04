<template>
    <v-card class="elevation-6"> <!--shadow-->
    <v-card-title primary-title class="headline">Rekisteröityminen</v-card-title>
        <v-form @submit.prevent="onSignup" ref="form">
            <v-card-text>
                    <v-alert v-model="signUpError" type="error" outline>
                        {{ signUpErrorMessage }}
                    </v-alert>
                    <v-text-field prepend-icon="person" name="login" label="Sähköposti" type="email" v-model="email" :rules="rules.email"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Salasana" type="password" v-model="password" :rules="[rules.emptyPassword]"></v-text-field>
                    <v-text-field prepend-icon="lock" name="passwordConfirm" label="Salasana uudelleen" type="password" v-model="passwordConfirm" :rules="[rules.emptyPassword, passwordsEqual]"></v-text-field>
                
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Rekisteröidy</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"
import bus from '@/EventBus'

export default {
    name: 'SignUp',
    data() {
        return {
            email:'',
            password: '',
            passwordConfirm: '',
            signUpError: false,
            signUpErrorMessage: '',
            rules: {
                email: [ //https://vuetifyjs.com/en/components/forms#form
                    v => !!v || 'Sähköpostiosoite vaaditaan',
                    v => /.+@.+/.test(v) || 'Anna kelvollinen sähköpostiosoite'
                ],
                emptyPassword: 
                    v => !!v || 'Salasana vaaditaan'
                //passwordsEqual must be computed property so that if first field is changed the second field is re-validated
            }

        }
    },
    methods: {
        onSignup() {
            this.setError(null)
            if(!this.$refs.form.validate()) {
                return }
            this.signUpUser(this.email, this.password)
            // push to routes page?/ same page
            console.log(`User registeration with email: ${this.email}, password: ${this.password} and password confirmation: ${this.passwordConfirm}`)
        },
        signUpUser(email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                console.log(user)
                bus.$emit('userChanged', user)
            })
            .catch(error=> {
                console.log(error)
                this.setError(error.message) 
            })
        },
        setError(msg) {
            this.signUpErrorMessage = msg // TODO: implement translations

        }
    },
    computed: {
        passwordsEqual() {
            return this.password === this.passwordConfirm || 'Salasanat eivät ole samat'
        }

    },
    watch: {
        signUpErrorMessage (msg) {
            this.signUpError = !!msg
        },
        signUpError (value) {
            if (!value)
                this.signUpErrorMessage = ''
        }
    }

}
</script>

<style>

</style>
