<script setup lang="ts">
import { onMounted, ref, provide } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
    increment,
    serverTimestamp
} from 'firebase/firestore';
import db from '@/firebase/index';
import { useRouter } from 'vue-router';
import type IRouteIndicatorNavi from '@/interfaces/RouteIndicatorNavi';
import IndicatorNavi from '@/components/IndicatorNavi.vue';
import TheGame from '@/components/TheGame.vue';
import TheSettings from '@/components/TheSettings.vue';
import TheLogout from '@/components/TheLogout.vue';
import type IUser from '@/interfaces/User';

const header = ref<string>('Feed Panel');
const gamesPage = ref<string>('Games');
const settings = ref<string>('Settings');
const logOut = ref<string>('log Out');

const iconGame = ref<string>(`game-controller-outline`);
const iconSettings = ref<string>(`settings-outline`);
const iconLogout = ref<string>(`log-out-outline`);

const router = useRouter();

const statusRef = collection(db, 'status');
// const statusGameDuelRef = doc(statusRef, 'Duel');

const currentUser = ref<IUser>({} as IUser);

// ---
const activeLink = ref<string>(gamesPage.value);
const routes = ref<IRouteIndicatorNavi[]>([
    { name: `${gamesPage.value}`, ionIconClass: iconGame.value, to: `/feed/games` },
    { name: `${settings.value}`, ionIconClass: iconSettings.value, to: `/feed/settings` },
    { name: `${logOut.value}`, ionIconClass: iconLogout.value, to: `/feed/logout` }
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

// ---
onMounted(async () => {
    await getCurrentUser().then(async (user: any) => {
        currentUser.value = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || ''
        };

        const docSnap = await getDoc(doc(statusRef, user.uid));

        if (docSnap.exists()) {
            console.log('%c status user -> ', 'background: #222; color: #bada55', docSnap.data());
        } else {
            await setDoc(doc(statusRef, user.uid), {
                online: 'online',
                timestamp: serverTimestamp()
            });
        }
    });

    routes.value.find(({ name, to }) => {
        if (to === router.currentRoute.value.path) {
            activeLink.value = name;
            return true;
        }
        return false;
    });
});

// ---
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ header }}</h1>
        </header>

        <section class="wrapper">
            <TheGame
                v-if="activeLink === gamesPage"
                :header="gamesPage"
                :currentUser="currentUser"
            />
            <TheSettings
                v-if="activeLink === settings"
                :header="settings"
                :currentUser="currentUser"
            />
            <TheLogout v-if="activeLink === logOut" :header="logOut" :currentUser="currentUser" />
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
/* --- Wrapper card --- */
section.wrapper {
    position: relative;
    width: 80vw;
    min-height: calc(100vh - 230px);
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
    .header {
        height: 25px;
        line-height: 25px;
        margin-bottom: 20px;
    }
    h1 {
        font-size: 1.8rem;
    }
    section.wrapper {
        /* width: 100%; */
        padding: 20px 25px;
        margin: 0 auto;
        min-height: calc(100vh - 210px);
    }
}
@media (max-width: 560px) {
    .header {
        height: 25px;
        line-height: 25px;
    }
    section.wrapper {
        min-height: calc(100vh - 200px);
    }
    /* section.nav {
        transform: scale(0.7);
        margin: 0;
        margin-top: 35px;
    } */
}
@media (max-width: 360px) {
    /*  */
}
</style>
