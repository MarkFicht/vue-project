<script setup lang="ts">
import { onMounted, ref, provide, watch } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import type RouteIndicatorNavi from '@/interfaces/RouteIndicatorNavi';
import IndicatorNavi from '@/components/IndicatorNavi.vue';
import TheReflexGame from '@/components/TheReflexGame.vue';
import TheDuelGame from '@/components/TheDuelGame.vue';
import TheQuatroGame from '@/components/TheQuatroGame.vue';
import TheSettings from '@/components/TheSettings.vue';
import TheLogout from '@/components/TheLogout.vue';

const header = ref<string>('Feed Panel');
const gameReflex = ref<string>('Reflex');
const gameDuel = ref<string>('Duel');
const gameQuatro = ref<string>('Quatro');
const settings = ref<string>('Settings');
const logOut = ref<string>('log Out');

const router = useRouter();
const isLoggedIn = ref<boolean>(false);

// ---
const activeLink = ref<string>(gameReflex.value);
const routes = ref<RouteIndicatorNavi[]>([
    {
        name: `${gameReflex.value}`,
        ionIconClass: `game-controller-outline`,
        to: `/feed/reflex-game`
    },
    { name: `${gameDuel.value}`, ionIconClass: `game-controller-outline`, to: `/feed/duel-game` },
    {
        name: `${gameQuatro.value}`,
        ionIconClass: `game-controller-outline`,
        to: `/feed/quatro-game`
    },
    { name: `${settings.value}`, ionIconClass: `settings-outline`, to: `/feed/settings` },
    { name: `${logOut.value}`, ionIconClass: `log-out-outline`, to: `/feed/logout` }
]);
const updateActiveLink = (val: string) => {
    activeLink.value = val;
};
provide('indicatorNavi', {
    activeLink,
    routes,
    updateActiveLink
});

// ---
let auth: any;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else isLoggedIn.value = false;
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
const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/');
    });
};
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ header }}</h1>
        </header>

        <section class="wrapper">
            <TheReflexGame v-if="activeLink === gameReflex" :header="gameReflex" />
            <TheDuelGame v-if="activeLink === gameDuel" :header="gameDuel" />
            <TheQuatroGame v-if="activeLink === gameQuatro" :header="gameQuatro" />
            <TheSettings v-if="activeLink === settings" :header="settings" />
            <TheLogout v-if="activeLink === logOut" :header="logOut" />
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
    height: calc(100vh - 230px);
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
        height: calc(100vh - 210px);
    }
}
@media (max-width: 560px) {
    .header {
        height: 25px;
        line-height: 25px;
        margin-top: 5px;
    }
    section.wrapper {
        height: calc(100vh - 200px);
    }
    section.nav {
        transform: scale(0.7);
        margin: 0;
        margin-top: 35px;
    }
}
@media (max-width: 360px) {
    section.nav {
        transform: scale(0.65);
    }
}
</style>
