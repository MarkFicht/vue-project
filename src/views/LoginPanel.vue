<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';
import useValidate from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators';
import type User from '@/interfaces/User';

const isLoginRegister = ref<boolean>(true);

const header: Ref<string> = ref('Vue Project');
const signIn = ref<string>('Sign In');
const register = ref<string>('Register');
const username = ref<string>('User Name');
const password = ref<string>('Password');
const emailLabel = ref<string>('E-mail');
const keepMe = ref<string>('Keep me log in');

const state = reactive({
    username: '',
    password: '',
    email: '',
    keepLogIn: false
});

const rules = reactive({
    username: { required, minLength: minLength(6), maxLength: maxLength(20) },
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    email: {
        required,
        email
        // unique: helpers.withAsync(async (val: string) => {
        //     if (val.trim().length === 0) return true;
        //     if (user?.value) return true;

        //     let isUnique = true;

        //     new Promise<boolean>((resolve, reject) => {
        //         try {
        //             userList.value.find((user) => {
        //                 if (user.email === val) {
        //                     isUnique = false;
        //                     return true;
        //                 }
        //                 return false;
        //             });
        //             resolve(isUnique);
        //         } catch (error) {
        //             reject(error);
        //         }
        //     });

        //     // const emailRegex =
        //     //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //     return isUnique
        //         ? isUnique
        //         : {
        //               $valid: isUnique,
        //               $message: 'Email is already exists',
        //               $pending: false
        //           };
        // })
    },
    keepLogIn: {}
});

const v$ = useValidate(rules, state);

const submitForm = async (e: MouseEvent) => {
    e.preventDefault();

    const result = await v$.value.$validate();
    if (result) {
        alert('success');
    } else {
        //
    }
};
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ header }}</h1>
        </header>

        <section class="login">
            <form action="">
                <h2>{{ isLoginRegister ? signIn : register }}</h2>
                <span class="input-box">
                    <label for="login-input">{{ username }}</label>
                    <input
                        type="text"
                        id="login-input"
                        :placeholder="`${username}...`"
                        v-model="state.username"
                    />
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                </span>
                <span v-if="v$.username.$error" class="form-error">
                    {{ v$.username.$errors[0].$message }}</span
                >
                <span class="input-box">
                    <label for="password-input">{{ password }}</label>
                    <input
                        type="password"
                        id="password-input"
                        :placeholder="`${password}...`"
                        v-model="state.password"
                    />
                    <span class="icon">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                </span>
                <span v-if="v$.password.$error" class="form-error">
                    {{ v$.password.$errors[0].$message }}</span
                >

                <span class="input-box">
                    <label for="email-input">{{ emailLabel }}</label>
                    <input
                        type="text"
                        id="email-input"
                        :placeholder="`${emailLabel}...`"
                        v-model="state.email"
                    />
                    <span class="icon">
                        <ion-icon name="mail-outline"></ion-icon>
                    </span>
                </span>
                <span v-if="v$.email.$error" class="form-error">
                    {{
                        v$.email.$errors[0]?.$message || v$.email.$errors[0]?.$response.$message
                    }}</span
                >
                <label> <input type="checkbox" v-model="state.keepLogIn" />{{ keepMe }} </label>
                <span class="input-box">
                    <input
                        type="submit"
                        :value="isLoginRegister ? signIn : register"
                        @click="(e) => submitForm(e)"
                    />
                </span>
            </form>
        </section>

        <section class="nav show-nav">
            <nav>
                <a
                    :style="`--clr:#f3218b;`"
                    :class="[isLoginRegister && 'active']"
                    @click="() => (isLoginRegister = true)"
                >
                    <span class="icon"><ion-icon name="log-in-outline"></ion-icon></span>
                    <span class="text">{{ signIn }}</span>
                </a>
                <a
                    :style="`--clr:#2196f3;`"
                    :class="[!isLoginRegister && 'active']"
                    @click="() => (isLoginRegister = false)"
                >
                    <span class="icon"><ion-icon name="document-text-outline"></ion-icon></span>
                    <span class="text">{{ register }}</span>
                </a>
                <div class="indicator"></div>
            </nav>
        </section>
    </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
.header {
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    margin-bottom: 25px;
    text-align: center;
}
h1 {
    font-weight: 600;
    font-size: 2.1rem;
    color: #eee;
    filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.8));
    letter-spacing: 0.1em;
}
/* --- Login card --- */
section.login {
    position: relative;
    width: 380px;
    padding: 40px;
    color: #444;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.25);
    /* box-shadow:
        15px 15px 20px rgba(0, 0, 0, 0.1),
        -15px -15px 20px rgba(0, 0, 0, 0.1); */
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #eee;
    animation: showElement 2s linear;
}
section.login form {
    position: relative;
    width: 100%;
}
section.login form h2 {
    font-size: 2em;
    line-height: 0.9em;
    margin-bottom: 20px;
    text-align: center;
}
section.login form span {
    font-size: 0.75em;
    font-weight: 300;
}
section.login form .input-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
}
section.login form .input-box label {
    width: 100%;
    font-size: 1.1em;
    font-weight: 600;
    letter-spacing: 0.05em;
}
section.login form .input-box input {
    border: none;
    outline: none;
    background: transparent;
    border-radius: 10px;
    font-size: 1em;
}
section.login form .input-box input[type='text'],
section.login form .input-box input[type='password'] {
    width: 100%;
    padding: 15px 20px;
    padding-left: 40px;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px #fff;
    font-size: 1.2em;
}
section.login form .input-box .icon {
    position: absolute;
    left: 15px;
    top: 52%;
    color: #444;
    font-size: 1.5em;
}
section.login form > label {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 0.8em;
    margin-top: 15px;
}
section.login form input[type='checkbox'] {
    margin-right: 5px;
}
section.login form input[type='submit'] {
    margin-top: 30px;
    box-shadow:
        5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px #fff;
    width: 100%;
    padding: 15px 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.3em;
    color: #444;
    letter-spacing: 0.05em;
}
section.login form input[type='submit']:focus {
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px #fff;
}
.form-error {
    color: tomato !important;
    font-size: 0.9em !important;
    text-align: center;
    display: block;
}
/* --- Navi --- */
section.nav {
    /* position: fixed; */
    /* z-index: 10000; */
    /* bottom: 50px; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 15px;
    width: 190px;
    height: 60px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.5));
    animation: showElement 2s linear;
}
section.nav nav {
    display: flex;
    width: 140px;
}
section.nav nav a {
    position: relative;
    list-style: none;
    width: 70px;
    height: 60px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    font-weight: 500;
}
section.nav nav a .icon {
    position: relative;
    display: block;
    line-height: 65px;
    font-size: 1.5em;
    text-align: center;
    transition: 0.5s;
    color: #666;
}
section.nav nav a.active .icon {
    transform: translateY(-32px);
    color: var(--clr);
}
section.nav nav a .text {
    position: absolute;
    color: #fff;
    padding: 2px 7px;
    border-radius: 12px;
    font-weight: 400;
    font-size: 0.75em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    transform: translateY(15px);
    opacity: 0;
}
section.nav nav a.active .text {
    transform: translateY(-4px);
    background: var(--clr);
    opacity: 1;
}
.indicator {
    position: absolute;
    top: -35px;
    width: 70px;
    height: 70px;
    background: #eee;
    border-radius: 50%;
    transition: 0.5s;
    z-index: 1;
}
.indicator::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: 5px;
    left: -28px;
    background: transparent;
    box-shadow: 15px 18px #eee;
}
.indicator::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: 5px;
    right: -28px;
    background: transparent;
    box-shadow: -15px 18px #eee;
}
section.nav nav a:nth-child(1).active ~ .indicator {
    transform: translateX(calc(70px * 0));
}
section.nav nav a:nth-child(2).active ~ .indicator {
    transform: translateX(calc(70px * 1));
}
@keyframes showElement {
    0%,
    30% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
/* 
@media (max-width: 1024px) {
    .header {
        margin-top: 30px;
        text-align: center;
    }
}
@media (max-width: 680px) {
    .header {
        margin-top: 0px;
        text-align: center;
    }
} */
</style>
