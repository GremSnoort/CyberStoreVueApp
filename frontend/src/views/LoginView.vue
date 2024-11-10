<template>
<div>
    <form @submit.prevent="authenticate()" class="login-form">
        <label for="">E-mail:</label>
        <input v-model="auth.email" type="email">

        <label for="">Password</label>
        <input v-model="auth.password" type="password">

        <button type="submit">Login</button>
    </form>
</div>
</template>

<script>
import { userLogin } from '../api.js'

export default {
    data () {
        return {
            auth: { email: '', password: '' },
            user: {},
        }
    },
    methods: {
        /**
         * Attempts to authenticate the user
         *
         * @return {mixed}
         */
        async authenticate () {
            let credentials = this.auth
            console.log(credentials)

            const data = await userLogin(credentials)
            console.log(data)

            window.localStorage.setItem('accessToken', data.accessToken)
            window.localStorage.setItem('authUser', JSON.stringify(data.displayName))

            //this.$http.post('http://localhost:8090/user/login', credentials).then((response) => {
                /**
                 * Now that we successfully retrieved the token and the user information
                 * we have a couple of options:
                 * 
                 *     1) Save the token in local storage 
                 *         - Keeps the token saved even when the browser is closed
                 *     2) Save the token in session storage
                 *         - Deletes the token when user closes the browser or even the tab
                 *     3) Save the token in a cookie
                 *
                 *  Both local and session storage api are the same so I'll use the local storage 
                 *  for the sake of the example
                 *  
                 */
                //window.localStorage.setItem('token', response.data.token)
                //window.localStorage.setItem('auth-user', JSON.stringify(response.data.user))
                //this.$route.router.go({name: 'example-component'})
            //}).catch((errors) => {
                // catch errors
            //})
        }
    }
}
</script>

<style scoped>
.login-form {
    width: 100%;
}
</style>