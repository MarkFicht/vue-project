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
// const forgetPassword = ref<string>('Forgotten');
// === TO DO === - Prepared register with google (on android) + forget password

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
            .then(async (data) => {
                state.displayName !== '' &&
                    (await updateProfile(getAuth().currentUser as any, {
                        displayName: state.displayName
                    }).finally(() => router.push('/feed')));
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
    display: block;
    min-height: 30px;
    line-height: 30px;
    margin: 20px 0;
    text-align: center;
}
h1 {
    font-weight: 600;
    font-size: 32px;
    color: #eee;
    filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.8));
    letter-spacing: 0.1em;
}
/* --- Login card --- */
section.login {
    position: relative;
    width: 260px;
    padding: 15px 12px;
    color: #444;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.25);
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
    font-size: 24px;
    line-height: 24px;
    margin: 5px 0 20px;
    text-align: center;
}
section.login form span {
    display: block;
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
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
}
section.login form .input-box input[type='text'],
section.login form .input-box input[type='password'] {
    padding-left: 36px;
    font-size: 12px;
}
section.login form .input-box .icon {
    position: absolute;
    left: 12px;
    top: 54%;
    color: #444;
    font-size: 18px;
}
section.login form > label {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    margin-top: 15px;
}
section.login form input[type='checkbox'] {
    margin-right: 10px;
}
section.login form input[type='submit'] {
    margin-top: 15px;
    font-size: 14px;
    width: 100%;
}
.submit-google {
    margin-top: 10px !important;
}
.submit-google .icon {
    top: 45% !important;
    font-size: 1.8em !important;
}
/* --- Display Errors --- */
.form-error {
    color: tomato !important;
    font-size: 12px !important;
    letter-spacing: 0.05em;
    text-align: center;
    display: block;
    margin-bottom: -8px;
}
.form-error-submit {
    margin-top: 6px;
}

@media (min-width: 420px) {
    section.login {
        width: 300px;
        padding: 25px 20px;
    }
}

@media (min-width: 560px) {
    .header {
        min-height: 40px;
        line-height: 40px;
        margin: 25px 0;
    }
    h1 {
        font-size: 36px;
    }
    section.login {
        width: 420px;
        padding: 25px 30px;
    }

    section.login form h2 {
        font-size: 28px;
        line-height: 30px;
    }

    section.login form .input-box {
        margin-top: 20px;
    }
    section.login form .input-box label {
        font-size: 16px;
    }
    section.login form .input-box input[type='text'],
    section.login form .input-box input[type='password'] {
        font-size: 16px;
        height: 50px;
        line-height: 50px;
    }
    section.login form > label {
        font-size: 16px;
        margin-top: 20px;
    }
    section.login form input[type='submit'] {
        margin-top: 20px;
        font-size: 20px;
        height: 50px;
    }

    .form-error {
        font-size: 14px !important;
        margin-top: 5px;
        margin-bottom: -3px;
    }
}
</style>
