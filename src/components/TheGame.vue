<script setup lang="ts">
import TheCardComponent from '@/components/TheCardComponent.vue';
import type IUser from '@/interfaces/User';
import { inject, onMounted, watch, onBeforeMount, ref } from 'vue';
import { gameStore } from '@/store/GameStore';
import { storeToRefs } from 'pinia';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
    increment
} from 'firebase/firestore';
import db from '@/firebase/index';

const props = defineProps<{
    header: String;
    currentUser: IUser;
}>();
const { colors } = inject<any>('indicatorNavi');

const storeGame = gameStore();
const { duel } = storeToRefs(storeGame);
const gameStatusRef = collection(db, 'gameStatus');
const statusGameDuelRef = doc(gameStatusRef, 'Duel');

watch(
    () => duel.value.players,
    (newVal) => {
        console.log('%c newVal -> ', 'background: #222; color: #bada55', newVal);
    }
);

onBeforeMount(async () => {
    await storeGame.subFirebaseConnect();
});

async function addToLobby(user: IUser): Promise<any> {
    // TODO - atm its only for Duel game - itf check user on other lobby
    if (duel.value.players.find((user) => user.uid === props.currentUser.uid)) {
        await updateDoc(statusGameDuelRef, {
            players: arrayRemove(props.currentUser)
        });
    } else {
        await updateDoc(statusGameDuelRef, {
            players: arrayUnion(props.currentUser)
        });
    }
}
</script>

<template>
    <section class="gameContainer">
        <TheCardComponent
            :header="'Duel'"
            :currentUser="currentUser"
            :desc="`A board game inspired by a strategy game called '7 Wonders of the World'`"
            :video="'Video soon!'"
            :color="colors[0]"
            :route-to="'/feed/duel-game'"
            :max-players="2"
            @click="addToLobby"
        />
        <TheCardComponent
            :header="'Gems'"
            :currentUser="currentUser"
            :desc="`IN PROGRESS`"
            video="'IN PROGRESS - Video soon!'"
            :color="colors[1]"
            :route-to="'/feed/splendor-game'"
            :max-players="0"
        />
        <TheCardComponent
            :header="'Reflex'"
            :currentUser="currentUser"
            :desc="`IN PROGRESS`"
            video="'IN PROGRESS - Video soon!'"
            :color="colors[2]"
            :route-to="'/feed/reflex-game'"
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
}
</style>
