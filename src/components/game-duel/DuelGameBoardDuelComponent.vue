<script setup lang="ts">
import { toRefs } from 'vue';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import type IUser from '@/interfaces/User';
import DuelGameCoinComponent from '@/components/game-duel/DuelGameCoinComponent.vue';

const storeDuelGame = duelGameStore();
const { board, pickCoin, player2, wonByAggressive } = storeToRefs(storeDuelGame);

const emit = defineEmits(['coin-selected']);
const props = defineProps<{
    isMyTurn: boolean;
    user: IUser;
}>();
const { isMyTurn } = toRefs(props);
</script>

<template>
    <section class="duel">
        <div :class="['punishment']">
            <div
                :class="[user.uid !== player2.user.uid ? 'punishment1' : 'punishment4']"
                :style="!board.punishment1 ? 'opacity: 0;' : ''"
            ></div>
            <div
                :class="[user.uid !== player2.user.uid ? 'punishment2' : 'punishment3']"
                :style="!board.punishment2 ? 'opacity: 0;' : ''"
            ></div>
            <div
                :class="[user.uid !== player2.user.uid ? 'punishment3' : 'punishment2']"
                :style="!board.punishment3 ? 'opacity: 0;' : ''"
            ></div>
            <div
                :class="[user.uid !== player2.user.uid ? 'punishment4' : 'punishment1']"
                :style="!board.punishment4 ? 'opacity: 0;' : ''"
            ></div>
        </div>

        <div :class="['boardPawn', user.uid === player2.user.uid && 'rotatePawnDuel']">
            <div
                :class="['pawn', wonByAggressive !== '' && 'pawnWin']"
                :style="`--position:${board.pawn}`"
            ></div>
        </div>

        <div :class="['boardCoins', isMyTurn && pickCoin !== '' && 'selectCoin']">
            <DuelGameCoinComponent
                v-for="coin in board.coins"
                :key="coin"
                :coin="coin"
                :style="isMyTurn && pickCoin !== '' && `cursor: pointer;`"
                @click="isMyTurn && pickCoin !== '' ? emit('coin-selected', coin) : null"
            />
        </div>
    </section>
</template>

<style scoped>
.duel {
    --board-width: 150px;
    --board-height: calc(350px + 10px);

    grid-area: duel;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--board-width);
    height: var(--board-height);
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.3));
    background-image: url('@/assets/duel/board.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
/* Punishment cards */
.punishment {
    position: absolute;
    height: var(--board-height);
    width: 10%;
    top: 0;
    left: 23.9%;
    transition: 0.5s;
}
.punishment div {
    position: absolute;
    border-radius: 4px;
    transition: 0.5s;
}
.punishment1 {
    top: 10.5%;
    right: 0;
    width: 18.5px;
    height: 42px;
    background-image: url('@/assets/duel/sprites.webp');
    background-size: 64px 64px;
}
.punishment2 {
    top: 25.7%;
    right: 9%;
    width: 15.5px;
    height: 36px;
    background-image: url('@/assets/duel/sprites.webp');
    background-size: 64px 64px;
    background-position: 45.5px 0px;
}
.punishment3 {
    top: 64.2%;
    right: 9%;
    width: 15.5px;
    height: 36px;
    background-image: url('@/assets/duel/sprites.webp');
    background-size: 64px 64px;
    background-position: 45.5px 0px;
}
.punishment4 {
    top: 78%;
    right: 0;
    width: 18.5px;
    height: 42px;
    background-image: url('@/assets/duel/sprites.webp');
    background-size: 64px 64px;
}

/* Pawn */
.boardPawn {
    position: absolute;
    height: var(--board-height);
    width: 14%;
    top: 0;
    left: 35.9%;
    transition: 0.5s;
}
.pawn {
    position: absolute;
    width: 39px;
    height: 14px;
    background-image: url('@/assets/duel/sprites.webp');
    background-size: 118px 118px;
    background-repeat: no-repeat;
    background-position: -55px -98px;
    left: -6px;
    top: 50%;
    font-size: 10px;
    text-align: center;
    line-height: 18px;
    transform: translateY(calc(var(--position) * 125% - 50%));
    transition: 0.5s;
    z-index: 10;
}

/* Coins field */
.boardCoins {
    position: absolute;
    height: var(--board-height);
    width: 19.5%;
    height: 54%;
    top: 23%;
    left: 58%;
    transition: 0.5s;
    border: 3px dotted transparent;
}
.boardCoins > span {
    position: absolute;
    left: 1px;
}
.boardCoins > span:nth-child(1) {
    top: 5px;
}
.boardCoins > span:nth-child(2) {
    top: 42px;
}
.boardCoins > span:nth-child(3) {
    top: 79px;
}
.boardCoins > span:nth-child(4) {
    top: 116px;
}
.boardCoins > span:nth-child(5) {
    top: 152px;
}
/* ROTATE */
.rotatePawnDuel {
    transform: rotate(180deg) scaleX(-1);
}

/* --------------- */
.selectCoin {
    border: 3px dotted tomato;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    animation: pulseBorder 1.5s ease-in-out infinite;
}

.pawnWin::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -2px;
    width: 41px;
    height: 19px;
    border: 3px double tomato;
    transform: scale(1.1);
    animation: pulse 1.5s infinite ease-in-out;
}
</style>
