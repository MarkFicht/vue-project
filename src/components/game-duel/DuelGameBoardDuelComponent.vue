<script setup lang="ts">
import { toRefs } from 'vue';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import type IUser from '@/interfaces/User';

const storeDuelGame = duelGameStore();
const { board, pickCoin, player2 } = storeToRefs(storeDuelGame);

const emit = defineEmits(['coin-selected']);
const props = defineProps<{
    isMyTurn: boolean;
    user: IUser;
}>();
const { isMyTurn } = toRefs(props);
</script>

<template>
    <section class="duel">
        <div
            :class="[
                'boardPanishment',
                user.uid === player2.user.uid ? 'rotateBoardPanishment' : ''
            ]"
        >
            <div :style="!board.punishment1 ? 'opacity: 0;' : ''">-5$</div>
            <div :style="!board.punishment2 ? 'opacity: 0;' : ''">-2$</div>
            <div :style="!board.punishment3 ? 'opacity: 0;' : ''">-2$</div>
            <div :style="!board.punishment4 ? 'opacity: 0;' : ''">-5$</div>
        </div>
        <div :class="['boardDuel', user.uid === player2.user.uid ? 'rotateBoardDuel' : '']">
            <span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span><span class="boardBorder"></span
            ><span class="boardBorder"></span>
            <div class="boardPawn" :style="`--position:${board.pawn}`"></div>
            <div class="boardDuelPoints">
                <div>10</div>
                <div>5</div>
                <div>2</div>
                <div>0</div>
                <div>2</div>
                <div>5</div>
                <div>10</div>
            </div>
        </div>
        <div :class="['boardCoins', isMyTurn && pickCoin !== '' && 'selectCoin']">
            <span
                v-for="coin in board.coins"
                :key="coin"
                class="boardSingleCoin"
                @click="isMyTurn && pickCoin !== '' ? emit('coin-selected', coin) : null"
                >{{ coin }}</span
            >
        </div>
    </section>
</template>

<style scoped>
.duel {
    grid-area: duel;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.4));
}
.boardCoins {
    height: 200px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: rgb(76, 160, 50);
    border-top: 2px solid #222;
    border-right: 2px solid #222;
    border-bottom: 2px solid #222;
}
.boardSingleCoin {
    height: 36px;
    width: 36px;
    margin: 1px auto;
    border-radius: 50%;
    border: 2px solid #222;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgb(27, 207, 27);
}
.boardPanishment {
    height: 300px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;
}
.boardPanishment > div {
    width: 42px;
    height: 18px;
    border: 2px solid rgb(168, 64, 46);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
    background: tomato;
    transform: rotate(90deg);
    transition: 0.5s;
}
.boardPanishment > div:nth-child(2) {
    margin-bottom: 115px;
}
.rotateBoardPanishment {
    transform: scaleY(-1) scaleX(-1);
}
.rotateBoardPanishment > div {
    transform: rotate(-90deg);
}
.boardDuel {
    position: relative;
    height: 330px;
    width: 60px;
    border-radius: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(241, 118, 118);
    border: 2px solid #222;
}
.rotateBoardDuel {
    transform: rotate(180deg) scaleX(-1);
}
.rotateBoardDuel .boardDuelPoints {
    transform: rotate(180deg) scaleX(-1);
}
.boardDuelPoints {
    width: 20px;
    height: 330px;
    position: absolute;
    left: 2px;
    top: 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.boardDuelPoints > div:nth-child(1) {
    margin-top: 33px;
}
.boardDuelPoints > div:nth-child(2) {
    margin-top: 25px;
}
.boardDuelPoints > div:nth-child(3) {
    margin-top: 20px;
}
.boardDuelPoints > div:nth-child(5) {
    margin-bottom: 20px;
}
.boardDuelPoints > div:nth-child(6) {
    margin-bottom: 25px;
}
.boardDuelPoints > div:nth-child(7) {
    margin-bottom: 33px;
}
.boardBorder {
    height: 13px;
    width: 25px;
    margin: 2px 11px 2px auto;
    border-radius: 50%;
    border: 1px solid brown;
    /* background-color: rgb(223, 83, 83); */
    background-color: rgb(241, 118, 118);
    display: block;
    position: relative;
}
.boardPawn {
    position: absolute;
    height: 17px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid rgb(180, 0, 0);
    background-color: rgb(245, 9, 9);
    left: 19px;
    top: 50%;
    transform: translateY(calc(var(--position) * 100% - 50%));
    transition: 0.5s;
}
.boardBorder:nth-child(10) {
    background-color: rgba(151, 151, 151, 0.5);
}
.boardBorder:nth-child(10)::before,
.boardBorder:nth-child(7)::before,
.boardBorder:nth-child(4)::before,
.boardBorder:nth-child(1)::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 50px;
    border-bottom: 2px dotted rgba(151, 151, 151, 0.7);
    left: -20px;
    bottom: -4px;
}
.boardBorder:nth-child(10)::after,
.boardBorder:nth-child(13)::after,
.boardBorder:nth-child(16)::after,
.boardBorder:nth-child(19)::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 50px;
    border-top: 2px dotted rgba(151, 151, 151, 0.7);
    left: -20px;
    top: -4px;
}
.boardBorder:nth-child(7),
.boardBorder:nth-child(13),
.boardBorder:nth-child(4),
.boardBorder:nth-child(16) {
    background-color: rgba(151, 151, 151, 0.5);
}
.boardBorder:nth-child(1),
.boardBorder:nth-child(19) {
    background-color: tomato;
}
</style>
