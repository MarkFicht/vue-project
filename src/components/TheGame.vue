<script setup lang="ts">
import TheCardComponent from '@/components/TheCardComponent.vue';
import { useRouter } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
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
import { getCurrentUser } from '@/helpers/HelpersFoo';

const router = useRouter();

const props = defineProps<{
    header: String;
    currentUser: IUser;
}>();
const { colors } = inject<any>('indicatorNavi');

const acceptBtn = ref<string>('Accept');
const cancelBtn = ref<string>('Cancel');
const labelWaiting = ref<string>('Waiting for approval');

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

// TODO - create other redirections
watch(
    () => duel.value.players,
    async (newVal) => {
        // redirect to game
        if (
            newVal.length === 2 &&
            newVal.find((user) => user.uid === props.currentUser.uid) &&
            !newVal.find((user) => !user.readyToGame)
        ) {
            await updateDoc(statusGameDuelRef, {
                isStarted: true
            });
        }
    }
);
watch(
    () => duel.value.isStarted,
    async (newVal) => {
        // redirect to game
        if (duel.value.players.find((user) => user.uid === props.currentUser.uid)) {
            router.push('/feed/duel-game');
        }
    }
);

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
        <!-- Full screen + Process for prepare game -->
        <!-- TODO - atm its work only for duel game -->
        <div v-if="duel.players.length === 2" class="infoAboutPlayers">
            <p>{{ labelWaiting + ': ' + 'Duel' + ' Game' }}</p>
            <div>
                <p>{{ duel.players[0].displayName || duel.players[0].email }}{{ ': ' }}</p>
                <LoadingSpinner
                    v-if="!duel.players[0].readyToGame"
                    small
                    :style="'margin-left: 10px;'"
                />
                <ion-icon
                    v-else
                    class="animateHand"
                    name="thumbs-up-sharp"
                    :style="'margin-left: 10px;'"
                ></ion-icon>
            </div>
            <div>
                <p>{{ duel.players[1].displayName || duel.players[1].email }}{{ ': ' }}</p>
                <LoadingSpinner
                    v-if="!duel.players[1].readyToGame"
                    small
                    :style="'margin-left: 10px;'"
                />
                <ion-icon
                    v-else
                    class="animateHand"
                    name="thumbs-up-sharp"
                    :style="'margin-left: 10px;'"
                ></ion-icon>
            </div>
            <div
                v-if="!duel.players.find((user) => user.uid === currentUser.uid)?.readyToGame"
                class="containerApproveButtons"
            >
                <button @click="acceptInLobby">
                    {{ acceptBtn }}
                </button>
                <button @click="cancelInLobby">
                    {{ cancelBtn }}
                </button>
            </div>
        </div>

        <!-- GAME CARDS CONTAINTERS -->
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
.infoAboutPlayers {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    /* justify-content: center; */
    padding-top: 22vh;
    align-items: center;
    flex-direction: column;
    background-color: rgba(100, 50, 150, 0.9);
    color: #eee;
    border-radius: 19px;
    transition: all 0.5s;
    animation: showElement 0.7s linear;
}
.infoAboutPlayers > p {
    font-size: 2.2em !important;
    letter-spacing: 2px;
    font-weight: bold;
}
.infoAboutPlayers > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    font-size: 1.7em !important;
    letter-spacing: 1px;
}
.cardButton:hover {
    letter-spacing: 0.25em;
    background-color: tomato;
}
.containerApproveButtons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 360px;
    height: 50px;
}
.containerApproveButtons > button {
    border: none;
    top: 0;
    height: 50px;
    padding: 8px 30px;
    position: absolute;
    bottom: -30px;
    border: none;
    outline: none;
    border-radius: 30px;
    color: #fff;
    background-color: var(--clr);
    font-size: 1em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.5s;
    cursor: pointer;
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.containerApproveButtons > button:hover {
    letter-spacing: 0.25em;
    background-color: tomato;
}
.containerApproveButtons button:first-child {
    left: 5px;
    font-size: 0.8em;
}
.containerApproveButtons button:last-child {
    right: 5px;
    font-size: 0.8em;
}
.animateHand {
    animation: animateHand 1.5s infinite ease-in-out;
}
</style>
