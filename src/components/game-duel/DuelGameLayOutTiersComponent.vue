<script setup lang="ts">
import type { IGameDuelCard } from '@/interfaces/GameDuel';
import DuelGameCardComponent from '@/components/game-duel/DuelGameCardComponent.vue';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import type IUser from '@/interfaces/User';

const storeDuelGame = duelGameStore();
const { selectedCard, player1, player2 } = storeToRefs(storeDuelGame);

defineProps<{
    card: IGameDuelCard;
    x: number;
    y: number;
    cash1P?: number;
    cash2P?: number;
    user: IUser;
}>();
</script>

<template>
    <div
        :class="[
            'cardWrapper',
            card.taken === 'inGame' ? '' : 'invisible',
            card.coversBy?.length !== 0 && card.hide && 'cardHide',
            card.coversBy?.length === 0 && 'canSelect',
            selectedCard.id === card.id && 'selected'
        ]"
        :style="`--x:${x}%; --y:${y}%; --z:${card.id}; cursor: ${
            card.coversBy?.length === 0 ? 'pointer' : 'default'
        };`"
    >
        <DuelGameCardComponent
            :card="card"
            :cash1P="
                card.taken === 'inGame'
                    ? user.uid === player1.user.uid
                        ? cash1P
                        : cash2P
                    : undefined
            "
            :cash2P="
                card.taken === 'inGame'
                    ? user.uid === player1.user.uid
                        ? cash2P
                        : cash1P
                    : undefined
            "
            :res1P="
                card.taken === 'inGame'
                    ? user.uid === player1.user.uid
                        ? player1.resources.cash
                        : player2.resources.cash
                    : undefined
            "
            :res2P="
                card.taken === 'inGame'
                    ? user.uid === player1.user.uid
                        ? player2.resources.cash
                        : player1.resources.cash
                    : undefined
            "
        />
    </div>
</template>

<style scoped>
.cardWrapper {
    position: absolute;
    width: var(--width-tier);
    height: var(--height-tier);
    top: 50%;
    left: 50%;
    border-radius: 5px;
    user-select: none;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    transition: 0.3s all;
    /* z-index: var(--z); */
    opacity: 0;
    animation: prepareLayOut 1.2s calc(var(--z) * 0.25s) linear forwards;
}
.selected::before {
    content: '';
    position: absolute;
    z-index: 1;
    width: var(--width-tier);
    height: var(--height-tier);
    top: 0;
    left: 0;
    border-radius: 5px;
    border: 3px dotted tomato;
    animation: pulseBorder 1.5s ease-in-out infinite;
}
.invisible {
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
        cursor: default;
        z-index: -100;
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
