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
    increment,
    serverTimestamp
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
const statusRef = collection(db, 'status');

// watch(
//     () => duel.value.players,
//     (newVal) => {
//         console.log('%c newVal -> ', 'background: #222; color: #bada55', newVal);
//     }
// );

onBeforeMount(async () => {
    await storeGame.subFirebaseConnect();
});

// TODO - only for duel game atm
async function addAndRemoveToLobby(): Promise<any> {
    if (duel.value.players.find((user) => user.uid === props.currentUser.uid)) {
        await updateDoc(doc(statusRef, props.currentUser.uid), {
            game: '',
            readyToGame: false,
            online: 'online',
            timestamp: serverTimestamp()
        });
        const newPlayers = duel.value.players.filter((user) => {
            return user.uid !== props.currentUser.uid ? user : null;
        });
        await updateDoc(statusGameDuelRef, {
            players: newPlayers
        });
    } else {
        await updateDoc(doc(statusRef, props.currentUser.uid), {
            game: 'Duel',
            readyToGame: false,
            online: 'online',
            timestamp: serverTimestamp()
        });
        await updateDoc(statusGameDuelRef, {
            players: arrayUnion({ ...props.currentUser, game: 'Duel', readyToGame: false })
        });
    }
}

// TODO - 2 only for duel game atm - readyToGame
async function acceptInLobby(): Promise<any> {
    if (duel.value.players.length === 2) {
        if (duel.value.players.find((user) => user.uid === props.currentUser.uid)) {
            await updateDoc(doc(statusRef, props.currentUser.uid), {
                readyToGame: true
            });
            const newPlayers = duel.value.players.map((user) => {
                return user.uid === props.currentUser.uid
                    ? { ...user, readyToGame: true }
                    : { ...user };
            });
            await updateDoc(statusGameDuelRef, {
                players: newPlayers
            });
        }
    }
}

// TODO - 2 only for duel game atm - readyToGame
async function cancelInLobby(): Promise<any> {
    if (duel.value.players.length === 2) {
        if (duel.value.players.find((user) => user.uid === props.currentUser.uid)) {
            duel.value.players.forEach(async ({ uid }) => {
                if (uid === props.currentUser.uid) {
                    await updateDoc(doc(statusRef, uid), {
                        game: '',
                        readyToGame: false
                    });
                } else {
                    await updateDoc(doc(statusRef, uid), {
                        readyToGame: false
                    });
                }
            });

            const newPlayers = duel.value.players
                .filter((user) => {
                    return user.uid !== props.currentUser.uid ? user : null;
                })
                .map((user) => {
                    return { ...user, readyToGame: false };
                });

            await updateDoc(statusGameDuelRef, {
                players: newPlayers
            });
        }
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
            @click-lobby="addAndRemoveToLobby"
            @click-accept="acceptInLobby"
            @click-cancel="cancelInLobby"
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
