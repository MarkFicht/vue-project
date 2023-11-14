<script setup lang="ts">
import { reactive, ref, type Ref, watch, onBeforeMount, provide } from 'vue';
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
import type IRouteIndicatorNavi from '@/interfaces/RouteIndicatorNavi';
import IndicatorNavi from '@/components/IndicatorNavi.vue';

const header: Ref<string> = ref('Vue Project');
const signIn = ref<string>('Sign In');
const register = ref<string>('Register');
// === TO DO === - Prepared register with google (on android) + forget password

// const forgetPassword = ref<string>('Forgotten');
// const signInGoogle = ref<string>('Sign In Google');
// const signUpGoogle = ref<string>('Sign Up Google');
const displayName = ref<string>('User Name');
const password = ref<string>('Password');
const emailLabel = ref<string>('E-mail');
const keepMe = ref<string>('Keep me log in');

// ---
const activeLink = ref<string>(signIn.value);
const routes = ref<IRouteIndicatorNavi[]>([
    { name: `${signIn.value}`, ionIconClass: `log-in-outline`, to: `` },
    { name: `${register.value}`, ionIconClass: `document-text-outline`, to: `` }
    // { name: `${forgetPassword.value}`, ionIconClass: `refresh-outline`, to: `` }
]);
const updateActiveLink = (val: string) => (activeLink.value = val);
const colors = ref<string[]>([
    `--clr:#2196f3;`,
    '--clr:#008a1b;',
    '--clr:#dc1dff;',
    '--clr:#f3218b;',
    '--clr:#d56f1d;'
]);
provide('indicatorNavi', { activeLink, routes, updateActiveLink, colors });

const errMsg = ref<string>('');
const router = useRouter();

const state = reactive({
    displayName: '',
    password: '',
    email: '',
    keepLogIn: false
});
const rules = reactive({
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    email: {
        required,
        email
    },
    keepLogIn: {}
});
const rulesDisplayNick = reactive({
    displayName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(16)
    }
});

const v$ = useValidate(rules, state);
const v2$ = useValidate(rulesDisplayNick, state);

// ---
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
    state.email = newValEmail.replace(' ', '').toLowerCase();
    errMsg.value = '';
});

// ---
const submitForm = async (e: MouseEvent) => {
    e.preventDefault();

    const result = await v$.value.$validate();
    const resultDisplayNick =
        activeLink.value === register.value ? await v2$.value.$validate() : null;
    const auth = getAuth();

    if (result && activeLink.value === register.value && resultDisplayNick) {
        createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((data) => {
                state.displayName !== '' &&
                    updateProfile(auth.currentUser as any, {
                        displayName: state.displayName
                    });

                router.push('/feed');
            })
            .catch((error) => {
                console.error(error.message);
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errMsg.value = 'E-mail already in use';
                        break;
                    default:
                        errMsg.value = 'Something went wrong';
                        break;
                }
            });
    } else if (result && activeLink.value === signIn.value) {
        signInWithEmailAndPassword(auth, state.email, state.password)
            .then((data) => {
                router.push('/feed');
            })
            .catch((error) => {
                console.error(error.message);
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

// const signInWithGoogle = (e: MouseEvent) => {
//     e.preventDefault();

//     const provider = new GoogleAuthProvider();
//     signInWithPopup(getAuth(), provider)
//         .then((res) => router.push('/feed'))
//         .catch((err) => {
//             console.error(err.message);
//         });
// };
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ header }}</h1>
        </header>

        <section class="login">
            <form action="">
                <h2>{{ activeLink }}</h2>

                <span v-if="activeLink === `${register}`" class="input-box">
                    <label for="login-input">{{ displayName }}</label>
                    <input
                        type="text"
                        :class="'customInput'"
                        id="login-input"
                        :placeholder="`${displayName}...`"
                        maxlength="20"
                        v-model="state.displayName"
                    />
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                </span>
                <span
                    v-if="activeLink === `${register}` && v2$.displayName.$error"
                    class="form-error"
                >
                    {{ v2$.displayName.$errors[0].$message }}</span
                >

                <span class="input-box">
                    <label for="email-input">{{ emailLabel }}</label>
                    <input
                        type="text"
                        :class="'customInput'"
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
                        :class="'customInput'"
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
                        :class="'customButton'"
                        :value="activeLink"
                        @click="(e) => submitForm(e)"
                    />
                </span>
                <!-- <span class="input-box submit-google">
                    <input
                        type="submit"
                        :class="'customButton'"
                        :value="activeLink === `${signIn}` ? signInGoogle : signUpGoogle"
                        @click="signInWithGoogle"
                    />
                    <span class="icon">
                        <ion-icon name="logo-google"></ion-icon>
                    </span>
                </span> -->
                <span v-if="errMsg" class="form-error form-error-submit"> {{ errMsg }}</span>
            </form>
        </section>

        <IndicatorNavi />
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
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
section.login form .input-box input[type='text'],
section.login form .input-box input[type='password'] {
    padding-left: 40px;
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
    font-size: 1.3em;
    width: 100%;
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
}
@media (max-width: 560px) {
    section.login {
        width: 250px;
    }

    section.login form .input-box input {
        height: 36px;
    }

    section.login form h2 {
        font-size: 1.4em;
        margin-bottom: 15px;
        text-align: center;
    }

    section.login form span {
        font-size: 0.65em;
    }

    section.login form > label {
        font-size: 0.65em;
    }

    section.login form input[type='submit'] {
        font-size: 1.2em;
    }

    .form-error {
        font-size: 0.8em !important;
    }
}
</style>
