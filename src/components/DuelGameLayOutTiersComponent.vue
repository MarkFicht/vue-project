<script setup lang="ts">
import { toRefs } from 'vue';
import type { IGameDuelCard } from '@/interfaces/GameDuel';
import DuelGameCardComponent from '@/components/DuelGameCardComponent.vue';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';

const storeDuelGame = duelGameStore();
const { selectedCard, player1, player2 } = storeToRefs(storeDuelGame);

const props = defineProps<{
    card: IGameDuelCard;
    x: number;
    y: number;
    reversColor: string;
    cash1P?: number;
    cash2P?: number;
}>();
const { card } = toRefs(props);
</script>

<template>
    <div
        v-if="card.taken === 'inGame'"
        :class="[
            'cardWrapper',
            card.coversBy?.length !== 0 && card.hide && 'cardHide',
            card.coversBy?.length === 0 && 'canSelect',
            selectedCard.id === card.id && 'selected'
        ]"
        :style="`--x:${x}%; --y:${y}%; --z:${card.id}; --reversCol:${reversColor}; cursor: ${
            card.coversBy?.length === 0 ? 'pointer' : 'default'
        };`"
    >
        <DuelGameCardComponent
            :card="card"
            :cash1P="cash1P"
            :cash2P="cash2P"
            :res1P="player1.resources.cash"
            :res2P="player2.resources.cash"
        />
    </div>
    <div v-else :class="['cardWrapper', 'invisible']" :style="`--x:${x}%; --y:${y}%; --z:${-10};`">
        <DuelGameCardComponent :card="card" />
    </div>
</template>

<style scoped>
.cardWrapper {
    border-radius: 5px;
    width: 50px;
    height: 60px;
    transition: 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    user-select: none;
    transform: translateY(-250%) translateX(-250%);
    /* z-index: var(--z); */
    /* transform: translateY(var(--y)) translateX(var(--x)); */
    animation: prepareLayOut 1.2s calc(var(--z) * 0.25s) linear forwards;
}
.cardHide > div {
    background-color: var(--reversCol) !important;
    border: 2px solid rgb(63, 63, 63) !important;
    color: transparent !important;
}
.canSelect:hover {
    /* transform: translateY(var(--y)) translateX(var(--x)) scale(1.05); */
}
.selected::before {
    content: '';
    position: absolute;
    z-index: 1;
    width: 50px;
    height: 60px;
    top: 0;
    left: 0;
    border: 4px dotted tomato;
    border-radius: 5px;
}
.invisible {
    z-index: var(--z);
    transform: translateY(var(--y)) translateX(var(--x));
    animation: invisible 0.5s linear forwards;
}
@keyframes invisible {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
}
@keyframes prepareLayOut {
    0% {
        transform: translateY(-250%) translateX(-250%);
        opacity: 0;
    }
    60% {
        transform: translateY(-250%) translateX(-250%);
        opacity: 0;
    }
    70% {
        opacity: 1;
    }
    100% {
        transform: translateY(var(--y)) translateX(var(--x));
        opacity: 1;
    }
}
</style>
