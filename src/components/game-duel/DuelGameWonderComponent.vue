<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import type { IGameDuelWonderCard } from '@/interfaces/GameDuel';

const props = defineProps<{ card: IGameDuelWonderCard; cash?: number; resCash?: number }>();
const { card } = toRefs(props);

// --- power
const effect = ref<number>(0);
const cashPow = ref<number>(0);
const breakRes = ref<number>(0);
const materials = ref<number>(0);
const attack = ref<number>(0);
const point = ref<number>(0);

// --- cost
const clayCost = ref<number>(0);
const brickCost = ref<number>(0);
const woodCost = ref<number>(0);
const paperCost = ref<number>(0);
const glassCost = ref<number>(0);
const cashCost = ref<number>(0);

//---
const bgPosition = ref<string>('');

onMounted(() => {
    card.value.power.forEach((pow, i) => {
        switch (pow) {
            case 'effect':
                effect.value = card.value.valuePower[i];
                break;
            case 'cash':
                cashPow.value = card.value.valuePower[i];
                break;
            case 'break':
                breakRes.value = card.value.valuePower[i];
                break;
            case 'materials':
                materials.value = card.value.valuePower[i];
                break;
            case 'attack':
                attack.value = card.value.valuePower[i];
                break;
            case 'points':
                point.value = card.value.valuePower[i];
                break;

            default:
                break;
        }
    });
    card.value.cost.forEach((cost, i) => {
        switch (cost) {
            case 'clay':
                clayCost.value = card.value.valueCost[i];
                break;
            case 'brick':
                brickCost.value = card.value.valueCost[i];
                break;
            case 'wood':
                woodCost.value = card.value.valueCost[i];
                break;
            case 'paper':
                paperCost.value = card.value.valueCost[i];
                break;
            case 'glass':
                glassCost.value = card.value.valueCost[i];
                break;

            default:
                break;
        }
    });
    takeBgPosition();
});

watch(
    () => card.value.activated,
    () => {
        takeBgPosition();
    }
);

function takeBgPosition(): void {
    switch (card.value.activated) {
        case 'I':
            bgPosition.value = 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)';
            break;
        case 'II':
            bgPosition.value = 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)';
            break;
        case 'III':
            bgPosition.value = '0 calc(var(--height-tier) * -7)';
            break;
        case 'guild':
            bgPosition.value = 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';
            break;
        default:
            break;
    }
}
</script>

<template>
    <div :class="['cardWrapper']" :style="`--bg-position: ${bgPosition};`">
        <div :class="['card', `card${card.id}`]"></div>
        <div :class="['tierCardForWonder', bgPosition !== '' && 'getImg']"></div>
        <div
            v-if="card.taken && card.activated === 'none'"
            :class="[
                'cashSum',
                resCash !== undefined && cash !== undefined && cash > resCash && 'toHighPrice'
            ]"
        >
            {{ cash }}
        </div>
    </div>
</template>

<style scoped>
.cardWrapper {
    position: relative;
    /* margin: 0 20px 0 5px; */
    margin: 0 15px 0 0;
    border-radius: 5px;
    width: var(--width-wonder);
    height: var(--height-wonder);
    transition: 0.3s;
    cursor: pointer;
    animation: showElement 0.5s linear;
}
/* Cards main background */
.card {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--width-wonder);
    height: var(--height-wonder);
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: calc(var(--width-wonder) * 5) calc(var(--height-wonder) * 4);
    background-image: url('@/assets/duel/wonders.webp');
    z-index: 10;
    /* box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px rgba(255, 255, 255, 0.2); */
}
.tierCardForWonder {
    content: '';
    position: absolute;
    left: calc(var(--width-wonder));
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: calc(var(--width-tier) * 12) calc(var(--height-tier) * 8);
    background-position: var(--bg-position);
    top: -7px;
    left: 61px;
    transform: rotate(-90deg);
    width: var(--width-tier);
    height: var(--height-tier);
    z-index: 1;
    /* box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.15),
        inset -5px -5px 10px rgba(255, 255, 255, 0.3); */
}
.getImg {
    background-image: url('@/assets/duel/cards.webp');
}
.card9 {
    background-position: 0 0;
}
.card12 {
    background-position: calc(var(--width-wonder) * -1) 0;
}
.card10 {
    background-position: calc(var(--width-wonder) * -2) 0;
}
.card11 {
    background-position: calc(var(--width-wonder) * -3) 0;
}
.card6 {
    background-position: calc(var(--width-wonder) * -4) 0;
}

.card8 {
    background-position: 0 calc(var(--height-wonder) * -1);
}
.card7 {
    background-position: calc(var(--width-wonder) * -1) calc(var(--height-wonder) * -1);
}
.card5 {
    background-position: calc(var(--width-wonder) * -2) calc(var(--height-wonder) * -1);
}
.card1 {
    background-position: calc(var(--width-wonder) * -3) calc(var(--height-wonder) * -1);
}
.card4 {
    background-position: calc(var(--width-wonder) * -4) calc(var(--height-wonder) * -1);
}
.card3 {
    background-position: 0 calc(var(--height-wonder) * -2);
}
.card2 {
    background-position: calc(var(--width-wonder) * -1) calc(var(--height-wonder) * -2);
}

/* Coin with sum */
.cashSum {
    bottom: 50%;
    right: -15px;
    transform: translateY(50%);
}
.toHighPrice {
    color: red;
}

/* === FLIP CARD IN THE FUTURE === */
/* The flip card container - set the width and height */
.flip-card {
    width: var(--width-wonder);
    height: var(--height-wonder);
    perspective: 400px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}
.flip-card-front {
    /*  */
}
.flip-card-back {
    transform: rotateY(180deg);
}
/* .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
} */
</style>
