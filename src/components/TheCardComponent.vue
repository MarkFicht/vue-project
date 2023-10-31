<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import type IUser from '@/interfaces/User';
import type IGame from '@/interfaces/Game';
import { gameStore } from '@/store/GameStore';
import { storeToRefs } from 'pinia';

const goToGame = ref<string>('Go to Lobby');
const exitLobby = ref<string>('Exit Lobby');

const emit = defineEmits(['click-lobby']);

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
</script>

<template>
    <div :class="['card']" :style="`${color}`">
        <div class="box">{{ video }}</div>
        <div class="box">
            <h2>{{ game.id }}</h2>
            <p>{{ desc }}</p>
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
                        ? 'Soon'
                        : !!game.players.find((user) => user.uid === currentUser.uid)
                        ? exitLobby
                        : goToGame
                }}
            </button>
        </div>
        <div class="circle">
            <h2>{{ props.header }}</h2>
            <p>{{ maxPlayers === 0 ? '-' : game.status }}</p>
            <p>{{ maxPlayers === 0 ? '-' : `${game.players.length}/${maxPlayers}` }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    position: relative;
    width: 280px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 25px 70px 45px;
    transition: all 0.5s;
}
.card .box {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #aaa;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    transition: all 0.5s;
}
.card .box:first-child {
    height: 140px;
}
.card .box h2 {
    text-align: right;
    width: 100%;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 1.7em;
    filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.2));
}
.card .box p {
    font-size: 0.8em;
}
.card .box:nth-child(1)::before {
    content: '';
    position: absolute;
    top: 50px;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: -10px 10px #eee;
}
.card .box:nth-child(1)::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 95px;
    width: 20px;
    height: 20px;
    border-bottom-left-radius: 20px;
    background-color: transparent;
    box-shadow: -6px 6px #eee;
}
.card .box:nth-child(2)::before {
    content: '';
    position: absolute;
    bottom: 90px;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: -10px -10px #eee;
}
.card .box:nth-child(2)::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 99px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-top-left-radius: 20px;
    box-shadow: -6px -6px #eee;
}
.card .circle {
    position: absolute;
    z-index: 2;
    width: 170px;
    height: 170px;
    background-color: var(--clr);
    border-radius: 50%;
    top: 70px;
    left: -70px;
    color: #eee;
    /* transform: translateY(-50%); */
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
.circle > h2 {
    font-size: 1.8em;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 10px;
}
.circle > p {
    font-size: 1.1em;
    letter-spacing: 1px;
}
.card .box:nth-child(2) {
    background: #cdcdcd;
}
.cardButton {
    padding: 8px 30px;
    position: absolute;
    bottom: -26px;
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
    border: 10px solid #eee;
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
    .card {
        margin: 25px 0 45px;
    }
}
@media (max-width: 600px) {
    .card {
        transform: scale(0.8);
        margin: 5px 0 15px;
    }
}
@media (max-width: 560px) {
    .card {
        transform: scale(0.75);
        margin: 0;
    }
}
@media (max-width: 400px) {
    .card {
        transform: scale(0.65);
        margin: 0;
    }
}
</style>
