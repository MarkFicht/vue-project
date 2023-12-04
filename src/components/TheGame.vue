<script setup lang="ts">
import TheCardComponent from '@/components/TheCardComponent.vue';
import TheInLobby from '@/components/TheInLobby.vue';
import { useRouter } from 'vue-router';
import type IUser from '@/interfaces/User';
import { inject, watch, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { gameStore } from '@/store/GameStore';
import { storeToRefs } from 'pinia';
import {
    usersRef,
    gameStatusDuelRef,
    gameStatusGemsRef,
    gameStatusReflexRef
} from '@/helpers/HelpersFirebaseConst';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import bellNotify from '@/assets/bell-notification.mp3';
import bell from '@/assets/bell.mp3';
import type IGame from '@/interfaces/Game';

const router = useRouter();

const props = defineProps<{
    header: String;
    currentUser: IUser;
}>();
const { colors } = inject<any>('indicatorNavi');

const storeGame = gameStore();
const { duel, gems, reflex } = storeToRefs(storeGame);

const audioNotify = ref<HTMLAudioElement>(new Audio(bellNotify));
const audioBell = ref<HTMLAudioElement>(new Audio(bell));

watch([() => duel.value.players], async ([newVal], [oldVal]) => {
    if (newVal.length === 2 && oldVal.length !== newVal.length) audioNotify.value.play();

    // --- Redirect to game
    if (
        newVal.length === 2 &&
        newVal.find((user) => user.uid === props.currentUser.uid) &&
        !newVal.find((user) => !user.readyToGame)
    ) {
        await updateDoc(gameStatusDuelRef, { isStarted: true });
    }
});
watch([() => duel.value.isStarted], async ([newVal]) => {
    if (newVal === false) await storeGame.deleteGameDuel();

    // --- Redirect to game
    if (
        duel.value.players.find((user) => user.uid === props.currentUser.uid) &&
        !duel.value.players.find((user) => !user.readyToGame)
    ) {
        audioBell.value.play();
        const timer = setTimeout(() => {
            clearTimeout(timer);
            router.push('/duel-game');
        }, 3 * 1000);
    }
});

watch([() => gems.value.players], async ([newVal], [oldVal]) => {
    // if (newVal.length === 2 && oldVal.length !== newVal.length) audioNotify.value.play();
    // // --- Redirect to game
    // if (
    //     newVal.length === 2 &&
    //     newVal.find((user) => user.uid === props.currentUser.uid) &&
    //     !newVal.find((user) => !user.readyToGame)
    // ) {
    //     await updateDoc(gameStatusGemsRef, { isStarted: true });
    // }
});
watch([() => gems.value.isStarted], async ([newVal]) => {
    console.log('%c gems val isStarted -> ', 'background: #222; color: #bada55', newVal);
    if (newVal === false) await storeGame.deleteGameGems();
    // TODO --- Redirect to game
});

watch([() => reflex.value.players], async ([newVal], [oldVal]) => {
    // if (newVal.length === 2 && oldVal.length !== newVal.length) audioNotify.value.play();
    // // --- Redirect to game
    // if (
    //     newVal.length === 2 &&
    //     newVal.find((user) => user.uid === props.currentUser.uid) &&
    //     !newVal.find((user) => !user.readyToGame)
    // ) {
    //     await updateDoc(gameStatusReflexRef, { isStarted: true });
    // }
});
watch([() => reflex.value.isStarted], async ([newVal]) => {
    console.log('%c reflex val isStarted -> ', 'background: #222; color: #bada55', newVal);
    if (newVal === false) await storeGame.deleteGameReflex();
    // TODO --- Redirect to game
});

// TODO timers with timestamp + remove away/offline players from lobby + set 30s from timestamp
// TODO remove players and game if all players Disconnected/away

// ---
onBeforeMount(async () => {
    await storeGame.subFirebaseConnect();
});

onBeforeUnmount(async () => {
    storeGame.unSubFirebaseConnect();
});

// ---
async function addAndRemoveToLobby(selectedGame: IGame['id']): Promise<any> {
    if (selectedGame === 'Duel') {
        if (duel.value.players.find((user) => user.uid === props.currentUser.uid)) {
            await updateDoc(doc(usersRef, props.currentUser.uid), {
                game: '',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            });

            const newPlayersDuel = duel.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusDuelRef, {
                players: newPlayersDuel
            });
        } else {
            await updateDoc(doc(usersRef, props.currentUser.uid), {
                game: 'Duel',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            });
            await updateDoc(gameStatusDuelRef, {
                players: arrayUnion({ ...props.currentUser, game: 'Duel', readyToGame: false })
            });

            const newPlayersGems = gems.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusGemsRef, {
                players: newPlayersGems
            });

            const newPlayersReflex = reflex.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusReflexRef, {
                players: newPlayersReflex
            });
        }
    } else if (selectedGame === 'Gems') {
        if (gems.value.players.find((user) => user.uid === props.currentUser.uid)) {
            await updateDoc(doc(usersRef, props.currentUser.uid), {
                game: '',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            });

            const newPlayersGems = gems.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusGemsRef, {
                players: newPlayersGems
            });
        } else {
            await updateDoc(doc(usersRef, props.currentUser.uid), {
                game: 'Gems',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            });
            await updateDoc(gameStatusGemsRef, {
                players: arrayUnion({ ...props.currentUser, game: 'Gems', readyToGame: false })
            });

            const newPlayersDuel = duel.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusDuelRef, {
                players: newPlayersDuel
            });

            const newPlayersReflex = reflex.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusReflexRef, {
                players: newPlayersReflex
            });
        }
    } else if (selectedGame === 'Reflex') {
        if (reflex.value.players.find((user) => user.uid === props.currentUser.uid)) {
            await updateDoc(doc(usersRef, props.currentUser.uid), {
                game: '',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            });

            const newPlayersReflex = reflex.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusReflexRef, {
                players: newPlayersReflex
            });
        } else {
            await updateDoc(doc(usersRef, props.currentUser.uid), {
                game: 'Reflex',
                readyToGame: false,
                online: 'online',
                timestamp: serverTimestamp()
            });
            await updateDoc(gameStatusReflexRef, {
                players: arrayUnion({ ...props.currentUser, game: 'Reflex', readyToGame: false })
            });

            const newPlayersDuel = duel.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusDuelRef, {
                players: newPlayersDuel
            });

            const newPlayersGems = gems.value.players.filter((user) => {
                return user.uid !== props.currentUser.uid ? user : null;
            });
            await updateDoc(gameStatusGemsRef, {
                players: newPlayersGems
            });
        }
    }
}
</script>

<template>
    <section class="gameContainer">
        <!-- LOADING FOR PLAYERS CONTAINTERS -->
        <TheInLobby
            v-if="
                duel.players.length === 2 &&
                duel.players.find((user) => user.uid === currentUser.uid)
            "
            :currentUser="currentUser"
        />

        <!-- GAME CARDS CONTAINTERS -->
        <TheCardComponent
            :header="'Duel'"
            :currentUser="currentUser"
            :desc="`A board game inspired by a strategy game called '7 Wonders of the World'`"
            :video="'Video soon!'"
            :color="colors[0]"
            :route-to="'/duel-game'"
            :max-players="2"
            @click-lobby="addAndRemoveToLobby('Duel')"
        />
        <TheCardComponent
            :header="'Gems'"
            :currentUser="currentUser"
            :desc="`A board game inspired by a strategy game called 'Splendor'`"
            video="Video soon!"
            :color="colors[1]"
            :route-to="'/gems-game'"
            :max-players="0"
        />
        <TheCardComponent
            :header="'Reflex'"
            :currentUser="currentUser"
            :desc="`Game written from 0 in canvasJS. Cooperation against zombies`"
            video="Video soon!"
            :color="colors[2]"
            :route-to="'/reflex-game'"
            :max-players="0"
        />
    </section>
</template>

<style scoped>
.gameContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
