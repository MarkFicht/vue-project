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
    grid-area: duel;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--width-board);
    height: var(--height-board);
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.2));
    background-image: url('@/assets/duel/board.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
/* Punishment cards */
.punishment {
    position: absolute;
    height: var(--height-board);
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
    top: 10%;
    right: 0;
    width: 27px;
    height: 60px;
    background-size: 92px 92px;
    background-image: url('@/assets/duel/sprites.webp');
}
.punishment2 {
    top: 25.5%;
    right: 16%;
    width: 22.5px;
    height: 51px;
    background-size: 92px 92px;
    background-image: url('@/assets/duel/sprites.webp');
    background-position: 66px 0px;
}
.punishment3 {
    top: 64.2%;
    right: 16%;
    width: 22.5px;
    height: 51px;
    background-size: 92px 92px;
    background-image: url('@/assets/duel/sprites.webp');
    background-position: 66px 0px;
}
.punishment4 {
    top: 77.8%;
    right: 0;
    width: 27px;
    height: 60px;
    background-size: 92px 92px;
    background-image: url('@/assets/duel/sprites.webp');
}

/* Pawn */
.boardPawn {
    position: absolute;
    height: var(--height-board);
    width: calc(var(--width-board) * 1 / 5.35);
    top: 0;
    left: 35.9%;
    transition: 0.5s;
}
.pawn {
    position: absolute;
    width: 55px;
    height: 20px;
    background-image: url('@/assets/duel/sprites.webp');
    background-size: 170px 170px;
    background-repeat: no-repeat;
    background-position: -81px -142px;
    left: -9px;
    top: 50%;
    font-size: 10px;
    text-align: center;
    line-height: 18px;
    transform: translateY(calc(var(--position) * 120.5% - 50%));
    transition: 0.5s;
    z-index: 10;
}

/* Coins field */
.boardCoins {
    position: absolute;
    height: var(--height-board);
    width: 26.5%;
    height: 53.8%;
    top: 23.1%;
    left: 58.7%;
    transition: 0.5s;
    border: 3px dotted transparent;
}
.boardCoins > span {
    position: absolute;
    left: 2px;
}
.boardCoins > span:nth-child(1) {
    top: 8px;
}
.boardCoins > span:nth-child(2) {
    top: 60px;
}
.boardCoins > span:nth-child(3) {
    top: 111px;
}
.boardCoins > span:nth-child(4) {
    top: 162px;
}
.boardCoins > span:nth-child(5) {
    top: 211px;
}
/* ROTATE */
.rotatePawnDuel {
    transform: rotate(180deg) scaleX(-1);
}

/* --------------- */
.selectCoin {
    border: 3px dotted tomato;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    animation: pulseBorder 1.5s 1.5s ease-in-out infinite;
}

.pawnWin::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -1px;
    width: 41px;
    height: 19px;
    border: 3px double tomato;
    transform: scale(1.1);
    animation: pulse 1.5s infinite ease-in-out;
}
</style>
