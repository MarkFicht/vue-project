<script setup lang="ts">
import { reactive, ref, type Ref, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import useValidate from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';

const isLoginRegister = ref<boolean>(true);

const header: Ref<string> = ref('Vue Project');
const signIn = ref<string>('Sign In');
const register = ref<string>('Register');
const signUpGoogle = ref<string>('Sign Up Google');
const signInGoogle = ref<string>('Sign In Google');
const displayName = ref<string>('User Name');
const password = ref<string>('Password');
const emailLabel = ref<string>('E-mail');
const keepMe = ref<string>('Keep me log in');

const errMsg = ref<string>('');
const router = useRouter();

const state = reactive({
    displayName: '',
    password: '',
    email: '',
    keepLogIn: false
});

const rules = reactive({
    // displayName: {
    //     required: !isLoginRegister.value ? required : {},
    //     minLength: minLength(6),
    //     maxLength: maxLength(20)
    // },
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    email: {
        required,
        email
    },
    keepLogIn: {}
});

const v$ = useValidate(rules, state);

onBeforeMount(async () => {
    const checkLoggedIn = await new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });

    checkLoggedIn && router.push('/feed');
});

watch([() => state.email, () => state.password], ([newValEmail, newValPassword]) => {
    errMsg.value = '';
});

const submitForm = async (e: MouseEvent) => {
    e.preventDefault();

    const result = await v$.value.$validate();
    const auth = getAuth();

    if (result && !isLoginRegister.value) {
        createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((data) => {
                state.displayName !== '' &&
                    updateProfile(auth.currentUser as any, {
                        displayName: state.displayName
                    });

                router.push('/feed');
            })
            .catch((error) => {
                console.error(
                    '%c error -> ',
                    'background: #222; color: #bada55',
                    error.code,
                    error.message
                );
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errMsg.value = 'E-mail already in use';
                        break;
                    default:
                        errMsg.value = 'Something went wrong';
                        break;
                }
            });
    } else if (result && isLoginRegister.value) {
        signInWithEmailAndPassword(auth, state.email, state.password)
            .then((data) => {
                router.push('/feed');
            })
            .catch((error) => {
                console.error(
                    '%c error -> ',
                    'background: #222; color: #bada55',
                    error.code,
                    error.message
                );
                switch (error.code) {
                    case 'auth/invalid-email':
                        errMsg.value = 'Invalid e-mail';
                        break;
                    case 'auth/user-not-found':
                        errMsg.value = 'User not found';
                        break;
                    case 'auth/wrong-password':
                        errMsg.value = 'Incorrect password';
                        break;
                    default:
                        errMsg.value = 'E-mail or password was Incorrect';
                        break;
                }
            });
    }
};

const signInWithGoogle = (e: MouseEvent) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((res) => {
            console.log('%c user google -> ', 'background: #222; color: #bada55', res.user);
            router.push('/feed');
        })
        .catch((err) => {
            console.error(
                '%c error -> ',
                'background: #222; color: #bada55',
                err.code,
                err.message
            );
        });
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

                <span v-if="!isLoginRegister" class="input-box">
                    <label for="login-input">{{ displayName }}</label>
                    <input
                        type="text"
                        id="login-input"
                        :placeholder="`${displayName}...`"
                        maxlength="20"
                        v-model="state.displayName"
                    />
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                </span>
                <!-- <span v-if="v$.displayName.$error" class="form-error">
                    {{ v$.displayName.$errors[0].$message }}</span
                > -->

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

                <label> <input type="checkbox" v-model="state.keepLogIn" />{{ keepMe }} </label>

                <span class="input-box">
                    <input
                        type="submit"
                        :value="isLoginRegister ? signIn : register"
                        @click="(e) => submitForm(e)"
                    />
                </span>
                <span class="input-box submit-google">
                    <input
                        type="submit"
                        :value="isLoginRegister ? signInGoogle : signUpGoogle"
                        @click="signInWithGoogle"
                    />
                    <span class="icon">
                        <ion-icon name="logo-google"></ion-icon>
                    </span>
                </span>
                <span v-if="errMsg" class="form-error form-error-submit"> {{ errMsg }}</span>
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
    height: 40px;
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
    margin-top: 15px;
    box-shadow:
        5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px #fff;
    width: 100%;
    padding: 10px;
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
.submit-google {
    margin-top: 10px !important;
}
.submit-google .icon {
    top: 45% !important;
    font-size: 1.8em !important;
}
.form-error {
    color: tomato !important;
    font-size: 0.9em !important;
    text-align: center;
    display: block;
    margin-bottom: -8px;
}
.form-error-submit {
    margin-top: 6px;
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
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
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

@media (max-width: 720px) {
    section.login {
        width: 300px;
        padding: 20px 25px;
    }

    .header {
        height: 25px;
        line-height: 25px;
        margin-bottom: 20px;
    }
    h1 {
        font-size: 1.8rem;
    }
    section.login form h2 {
        font-size: 1.6em;
        margin-bottom: 15px;
        text-align: center;
    }
    section.nav {
        transform: scale(0.9);
        margin-top: 50px;
    }
}
@media (max-width: 560px) {
    section.login {
        width: 250px;
    }

    section.login form .input-box input {
        height: 36px;
    }
}
</style>
