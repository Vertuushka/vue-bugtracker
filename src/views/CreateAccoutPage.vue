<template>
    <Navbar />
    <div class="centralizer flex-center">
        <div class="login flex-column gap-24">
            <p class="logo-text">Create new account</p>
            <form @submit.prevent="registerUser" class="flex-column gap-16">
                <label for="username" class="flex-column gap-8">
                    Username
                    <input type="text" name="username" id="username" v-model="username" required>
                </label>
                <label for="email" class="flex-column gap-8">
                    Email
                    <input type="email" name="email" id="email" v-model="email" required>
                </label>
                <label for="password" class="flex-column gap-8">
                    Password
                    <input type="password" name="password" id="password" v-model="password" required>
                </label>
                <div class="auth-form-controls flex-between">
                    <router-link class="link" to="/login">Log in</router-link>
                    <button type="submit" class="btn-primary-mini">Sign up</button>
                </div>
            </form>
            <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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
    import { auth, db } from '../firebase';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { doc, setDoc } from "firebase/firestore";
    export default {
        name: "Signup",
        components: {
            Navbar
        },
        data() {
            return {
                email: '',
                password: '',
                username: '',
                errorMessage: ''
            }
        },
        methods: {
            async registerUser() {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                    const user = userCredential.user;
                    this.errorMessage = '';

                    await setDoc(doc(db, "user", user.uid), {
                        uid: user.uid,
                        username: this.username
                    });
                    this.$router.push("/login");
                } catch (error) {
                    this.errorMessage = error.message;
                }
            }
        }
    }
</script>