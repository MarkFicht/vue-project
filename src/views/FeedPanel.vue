<script setup lang="ts">
import { onBeforeMount, ref, provide } from 'vue';
import { getCurrentUser } from '@/helpers/HelpersFoo';
import { usersRef } from '@/helpers/HelpersFirebaseConst';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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

const currentUser = ref<IUser>({} as IUser);

// ---
const activeLink = ref<string>(gamesPage.value);
const routes = ref<IRouteIndicatorNavi[]>([
    { name: `${gamesPage.value}`, ionIconClass: iconGame.value, to: `/feed` },
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

// TO DO - add WCAG 2.2

// ---
onBeforeMount(async () => {
    await getCurrentUser().then(async (user: any) => {
        currentUser.value = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || ''
        };

        const docSnap = await getDoc(doc(usersRef, user.uid));
        if (docSnap.exists()) {
            currentUser.value = docSnap.data() as IUser;
        } else {
            const newUser = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || '',
                game: '',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            };

            currentUser.value = newUser as IUser;

            await setDoc(doc(usersRef, user.uid), {
                ...newUser
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
/* --- Wrapper card --- */
section.wrapper {
    position: relative;
    width: 96vw;
    height: calc(100vh - 210px);
    min-height: 420px;
    padding: 15px 10px;
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

@media (min-width: 560px) {
    .header {
        min-height: 40px;
        line-height: 40px;
        margin: 25px 0;
    }
    h1 {
        font-size: 36px;
    }
    section.wrapper {
        height: calc(100vh - 230px);
    }
}

@media (min-width: 720px) {
    section.wrapper {
        padding: 20px 15px;
        margin: 0 auto;
    }
}

@media (min-width: 1024px) {
    section.wrapper {
        margin: 0 auto;
        width: 990px;
    }
}
</style>
