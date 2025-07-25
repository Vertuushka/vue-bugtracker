<template>
    <Navbar />
    <div class="centralizer flex-center">
        <div class="login flex-column gap-24">
            <p class="logo-text">Log in</p>
            <form @submit.prevent="loginUser" class="flex-column gap-16">
                <label for="email" class="flex-column gap-8">
                    Email
                    <input type="email" name="email" id="email" v-model="email" required>
                </label>
                <label for="password" class="flex-column gap-8">
                    Password
                    <input type="password" name="password" id="password" v-model="password" required>
                </label>
                <div class="auth-form-controls flex-between">
                    <router-link class="link" to="/signup">Register</router-link>
                    <button type="submit" class="btn-primary-mini">Log in</button>
                </div>
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<style>
    .centralizer {
        width: 100%;
        flex: 1;
    }
    .login {
        margin: auto;
        padding: 32px;
        border: 1px solid var(--separator);
        border-radius: 8px;
    }

</style>

<script>
    import Navbar from "../components/Navbar.vue"
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from "../firebase";
    export default {
        name: "Login",
        components: {
            Navbar
        },
        data() {
            return {
                email: '',
                password: '',
                errorMessage: '',
            }
        },
        methods: {
            async loginUser() {
                try {
                    const userCredentials = await signInWithEmailAndPassword(auth, this.email, this.password);
                    this.errorMessage = "";
                    this.$router.push("/");
                } catch (error) {
                    this.errorMessage = error.message;
                }
            }
        }
    }
</script>