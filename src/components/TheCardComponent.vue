<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import type IUser from '@/interfaces/User';
import type IGame from '@/interfaces/Game';
import { gameStore } from '@/store/GameStore';
import { storeToRefs } from 'pinia';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';

const goToGame = ref<string>('Go to Lobby');
const inLobby = ref<string>('In Lobby');
const acceptBtn = ref<string>('Accept');
const cancelBtn = ref<string>('Cancel');

const emit = defineEmits(['click-lobby', 'click-accept']);

const storeGame = gameStore();
const { duel, gems, reflex } = storeToRefs(storeGame);

const props = defineProps<{
    header: IGame['id'];
    currentUser: IUser;
    video: any;
    desc: string;
    color: string;
    routeTo: string;
    maxPlayers: number;
}>();
const { currentUser } = toRefs(props);

const game = ref<IGame>({
    id: props.header,
    status: 'Free',
    players: []
});

watch(
    () => duel.value.players,
    (newVal) => {
        if (game.value.id === 'Duel') {
            game.value.players = newVal;

            if (newVal.length === 0) game.value.status = 'Free';
            else if (newVal.length === props.maxPlayers) game.value.status = 'Busy';
            else game.value.status = 'Lobby';
        }
    }
);

watch(
    () => gems.value.players,
    (newVal) => {
        if (game.value.id === 'Gems') {
            game.value.players = newVal;

            if (newVal.length === 0) game.value.status = 'Free';
            else if (newVal.length === props.maxPlayers) game.value.status = 'Busy';
            else game.value.status = 'Lobby';
        }
    }
);

watch(
    () => reflex.value.players,
    (newVal) => {
        if (game.value.id === 'Reflex') {
            game.value.players = newVal;

            if (newVal.length === 0) game.value.status = 'Free';
            else if (newVal.length === props.maxPlayers) game.value.status = 'Busy';
            else game.value.status = 'Lobby';
        }
    }
);

// todo check that user is anywhere in other games
// todo check that user is in game
// todo check that user is online
// if (props.players.length < props.maxPlayers && !game.value.players.find(player => player.uid === user.uid)) {
// }
</script>

<template>
    <div class="card" :style="`${color}`">
        <div class="box">{{ video }}</div>
        <div class="box">
            <h2>{{ game.id }}</h2>
            <p>{{ desc }}</p>
            <!-- <RouterLink :to="routeTo" :class="'cardButton'">{{ goToGame }}</RouterLink> -->
            <!-- Process in Lobby -->
            <button
                v-if="game.players.length < props.maxPlayers || maxPlayers === 0"
                :disabled="maxPlayers === 0"
                :class="[
                    'cardButton',
                    !!game.players.find((user) => user.uid === currentUser.uid)
                        ? 'cardButtonLobby'
                        : ''
                ]"
                @click="() => emit('click-lobby')"
            >
                {{
                    maxPlayers === 0
                        ? 'In progress'
                        : !!game.players.find((user) => user.uid === currentUser.uid)
                        ? inLobby
                        : goToGame
                }}
            </button>

            <!-- Process for prepare game -->
            <div v-else class="containerCardButtons">
                <button :class="['cardButton']" @click="() => emit('click-accept')">
                    {{ acceptBtn }}
                </button>
                <button :class="['cardButton']" @click="() => emit('click-lobby')">
                    {{ cancelBtn }}
                </button>
            </div>
        </div>
        <div class="circle">
            <h2>{{ props.header }}</h2>
            <h3>{{ maxPlayers === 0 ? 'IN PROGRESS' : game.status }}</h3>
            <p>{{ maxPlayers === 0 ? 'IN PROGRESS' : `${game.players.length}/${maxPlayers}` }}</p>
        </div>
    </div>
</template>

<style scoped>
.gameContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    position: relative;
    width: 300px;
    height: 415px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px 60px 35px;
}
.card .box {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 20px;
}
.card .box h2 {
    text-align: right;
    width: 100%;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 1.9em;
    filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.2));
}
.card .box p {
    font-size: 0.9em;
}
.card .box:nth-child(1)::before {
    content: '';
    position: absolute;
    top: 106px;
    left: -1px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-bottom-left-radius: 20px;
    box-shadow: -6px 6px #eee;
}
.card .box:nth-child(1)::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 105px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-bottom-left-radius: 20px;
    box-shadow: -6px 6px #eee;
}
.card .box:nth-child(2)::before {
    content: '';
    position: absolute;
    bottom: 106px;
    left: -1px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-top-left-radius: 20px;
    box-shadow: -6px -6px #eee;
}
.card .box:nth-child(2)::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 109px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-top-left-radius: 20px;
    box-shadow: -6px -6px #eee;
}
.card .circle {
    position: absolute;
    width: 180px;
    height: 180px;
    background-color: var(--clr);
    border-radius: 50%;
    top: 50%;
    left: -70px;
    color: #eee;
    transform: translateY(-50%);
    border: 10px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3)); */
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.card .box:nth-child(2) {
    background: #fff;
}
.cardButton {
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
    /* border: 5px solid #eee; */
    /* box-shadow: 0 0 0 10px #fff; */
    border: 12px solid #eee;
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.cardButton:hover {
    letter-spacing: 0.25em;
    background-color: tomato;
}
.cardButtonLobby {
    background-color: tomato !important;
}
.containerCardButtons {
    display: flex;
    justify-content: center;
    align-items: center;
}
.containerCardButtons button:first-child {
    left: 5px;
    font-size: 0.8em;
}
.containerCardButtons button:last-child {
    right: 5px;
    font-size: 0.8em;
}
h2 {
    font-size: 2em;
    line-height: 0.9em;
    margin-bottom: 10px;
    text-align: center;
}
@media (max-width: 720px) {
    h2 {
        font-size: 1.6em;
        margin-bottom: 15px;
        text-align: center;
    }
}
</style>
