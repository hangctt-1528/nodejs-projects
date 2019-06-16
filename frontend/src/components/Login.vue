<template>
    <button @click='onSigninClick'>Signin</button>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    components: {
    },
    data: () => {
        return {
            auth2: null
        }
    },
    mounted() {
        window.onload = () => {
            window.gapi.load('auth2', () => {
                this.auth2 = window.gapi.auth2.init({
                    client_id: '354051376530-ieo4tp8dfqqdlj152tu3sn1asliikd4u.apps.googleusercontent.com'
                });
            });
        }
    },
    methods: {
        onSigninClick() {
            axios.get('/index')
            .then(response => {
                console.log("hihi")
            })
            .catch(error => {

            })
            this.auth2.grantOfflineAccess().then(this.signInCallback);
        },
        signInCallback(authResult) {
            axios({
                method: 'post',
                url: '/storeauthcode',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: "application/json",
                data: {
                    'code': authResult['code']
                }
            })
            .then(response => {
                console.log("success")
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
}
</script>
