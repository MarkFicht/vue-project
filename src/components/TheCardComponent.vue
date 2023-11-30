<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import type IUser from '@/interfaces/User';
import type IGame from '@/interfaces/Game';
import { gameStore } from '@/store/GameStore';
import { storeToRefs } from 'pinia';

const goToGame = ref<string>('Lobby');
const exitLobby = ref<string>('Exit');

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

watch([() => duel.value.players], ([newVal]) => {
    if (game.value.id === 'Duel') {
        game.value.players = newVal;

        if (newVal.length === 0) game.value.status = 'Free';
        else if (newVal.length === props.maxPlayers) game.value.status = 'Busy';
        else game.value.status = 'Lobby';
    }
});

watch([() => gems.value.players], ([newVal]) => {
    if (game.value.id === 'Gems') {
        game.value.players = newVal;

        if (newVal.length === 0) game.value.status = 'Free';
        else if (newVal.length === props.maxPlayers) game.value.status = 'Busy';
        else game.value.status = 'Lobby';
    }
});

watch([() => reflex.value.players], ([newVal]) => {
    if (game.value.id === 'Reflex') {
        game.value.players = newVal;

        if (newVal.length === 0) game.value.status = 'Free';
        else if (newVal.length === props.maxPlayers) game.value.status = 'Busy';
        else game.value.status = 'Lobby';
    }
});
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
    width: 200px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px auto 30px;
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
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
    filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.2));
}
.card .box p {
    font-size: 12px;
}
.card .circle {
    position: absolute;
    z-index: 2;
    width: 160px;
    height: 130px;
    background-color: var(--clr);
    border-radius: 50%;
    top: 80px;
    left: -25px;
    color: #eee;
    border: 10px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.circle > h2 {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 5px;
}
.circle > p {
    font-size: 14px;
    letter-spacing: 1px;
}
.card .box:nth-child(2) {
    background: #cdcdcd;
}
.cardButton {
    padding: 8px 22px;
    position: absolute;
    bottom: -26px;
    border: none;
    outline: none;
    border-radius: 30px;
    color: #fff;
    background-color: var(--clr);
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.5s;
    cursor: pointer;
    border: 10px solid #eee;
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.cardButton:hover {
    letter-spacing: 3px;
}
.cardButtonLobby {
    background-color: tomato !important;
}

@media (min-width: 400px) {
    .card {
        margin: 15px 40px 40px;
    }
}

@media (min-width: 720px) {
    .card {
        width: 300px;
        margin: 15px 60px 40px;
    }

    .card .box h2 {
        font-size: 24px;
    }
    .card .box p {
        font-size: 14px;
    }

    .card .box:nth-child(1)::before {
        content: '';
        position: absolute;
        top: 52px;
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
        left: 100px;
        width: 20px;
        height: 20px;
        border-bottom-left-radius: 20px;
        background-color: transparent;
        box-shadow: -6px 6px #eee;
    }
    .card .box:nth-child(2)::before {
        content: '';
        position: absolute;
        bottom: 102px;
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
        left: 102px;
        width: 20px;
        height: 20px;
        background-color: transparent;
        border-top-left-radius: 20px;
        box-shadow: -6px -6px #eee;
    }

    .card .circle {
        width: 160px;
        height: 160px;
        top: 70px;
        left: -55px;
    }
    .circle > h2 {
        font-size: 24px;
    }
    .circle > p {
        font-size: 18px;
    }

    .cardButton {
        padding: 8px 30px;
        font-size: 16px;
        bottom: -27px;
    }
}
</style>
