<script setup lang="ts">
import { toRefs } from 'vue';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import type IUser from '@/interfaces/User';
import DuelGameCoinComponent from '@/components/game-duel/DuelGameCoinComponent.vue';

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
            <div class="boardPawn" :style="`--position:${board.pawn}`">X</div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.3));
    border: none;
    position: relative;
}
/* .duel::after {
    content: '';
    position: absolute;
    width: 350px;
    height: 104px;
    left: -66px;
    background-image: url('@/assets/duel/gameBoard.png');
    background-size: 350px 104px;
    background-repeat: no-repeat;
    transform: rotate(90deg);
    z-index: -1;
} */
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
    border-top: 1px solid #222;
    border-right: 1px solid #222;
    border-bottom: 1px solid #222;
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
    border: 1px solid rgb(168, 64, 46);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
    background: tomato;
    transform: rotate(90deg);
    transition: 0.5s;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.25),
        inset -5px -5px 10px rgba(255, 255, 255, 0.35);
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
    border: 1px solid #222;
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
    /* border: 1px solid brown; */
    /* background-color: rgb(223, 83, 83); */
    background-color: rgb(241, 118, 118);
    display: block;
    position: relative;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.25),
        inset -5px -5px 10px rgba(255, 255, 255, 0.35);
}
.boardPawn {
    position: absolute;
    height: 17px;
    width: 30px;
    border-radius: 50%;
    left: 19px;
    top: 50%;
    font-size: 10px;
    text-align: center;
    line-height: 16px;
    transform: translateY(calc(var(--position) * 100% - 50%));
    transition: 0.5s;
    box-shadow:
        2px 2px 10px rgba(0, 0, 0, 0.15),
        -2px -2px 10px rgba(255, 255, 255, 0.25);
    background: linear-gradient(-45deg, rgb(185, 6, 6), rgb(240, 104, 104));
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
    border-bottom: 2px dotted rgba(135, 135, 135, 0.7);
    left: -18px;
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
    border-top: 2px dotted rgba(135, 135, 135, 0.7);
    left: -18px;
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
.selectCoin {
    border: 3px dotted tomato;
}
</style>
