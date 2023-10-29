<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue';
import type { IGameDuelCard } from '@/interfaces/GameDuel';

// --- power
const point = ref<number>(0);
const artefact = ref<number>(0);
const attack = ref<number>(0);

const clay = ref<number>(0);
const brick = ref<number>(0);
const wood = ref<number>(0);
const paper = ref<number>(0);
const glass = ref<number>(0);

const cash = ref<number>(0);
const specialChar = ref<number>(0);
const discount = ref<number>(0);
const materials = ref<number>(0);
const cashBack = ref<number>(0);
const guild = ref<number>(0);

// --- cost
const specialCharCost = ref<number>(0);

const clayCost = ref<number>(0);
const brickCost = ref<number>(0);
const woodCost = ref<number>(0);
const paperCost = ref<number>(0);
const glassCost = ref<number>(0);
const cashCost = ref<number>(0);

// --- BG color
const bgColor = ref<string>('');
const reversBg = ref<string>('');

const props = defineProps<{
    card: IGameDuelCard;
    small?: boolean;
    cash1P?: number;
    cash2P?: number;
    res1P?: number;
    res2P?: number;
}>();
const { card } = toRefs(props);

onMounted(() => {
    card.value.power.forEach((pow, i) => {
        switch (pow) {
            case 'points':
                point.value = card.value.valuePower[i];
                break;
            case 'artefact':
                artefact.value = card.value.valuePower[i];
                break;
            case 'attack':
                attack.value = card.value.valuePower[i];
                break;

            case 'clay':
                clay.value = card.value.valuePower[i];
                break;
            case 'brick':
                brick.value = card.value.valuePower[i];
                break;
            case 'wood':
                wood.value = card.value.valuePower[i];
                break;
            case 'paper':
                paper.value = card.value.valuePower[i];
                break;
            case 'glass':
                glass.value = card.value.valuePower[i];
                break;

            case 'cash':
                cash.value = card.value.valuePower[i];
                break;
            case 'specialChar':
                specialChar.value = card.value.valuePower[i];
                break;
            case 'discount':
                discount.value = card.value.valuePower[i];
                break;
            case 'materials':
                materials.value = card.value.valuePower[i];
                break;
            case 'cashBack':
                cashBack.value = card.value.valuePower[i];
                break;
            case 'guild':
                guild.value = card.value.valuePower[i];
                break;

            default:
                break;
        }
    });
    card.value.cost.forEach((cost, i) => {
        switch (cost) {
            case 'specialChar':
                specialCharCost.value = card.value.valueCost[i];
                break;

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

            case 'cash':
                cashCost.value = card.value.valueCost[i];
                break;

            default:
                break;
        }
    });

    switch (card.value.color) {
        case 'red':
            bgColor.value = 'rgb(255, 39, 39)';
            break;
        case 'green':
            bgColor.value = 'rgb(14, 165, 14)';
            break;
        case 'blue':
            bgColor.value = 'rgb(74, 74, 252)';
            break;
        case 'yellow':
            bgColor.value = 'rgb(255, 255, 44)';
            break;
        case 'brown':
            bgColor.value = 'rgb(197, 69, 69)';
            break;
        case 'grey':
            bgColor.value = 'rgb(161, 161, 161)';
            break;
        case 'purple':
            bgColor.value = 'rgb(192, 23, 192)';
            break;

        default:
            break;
    }

    switch (card.value.tier) {
        case 'I':
            reversBg.value = 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)';
            break;
        case 'II':
            reversBg.value = 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)';
            break;
        case 'III':
            reversBg.value = '0 calc(var(--height-tier) * -7)';
            break;
        case 'guild':
            reversBg.value = 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';
            break;

        default:
            break;
    }
});
</script>

<template>
    <div
        :class="[
            'card',
            `card${card.idImg}`,
            !card.hide || card.coversBy?.length === 0 ? '' : 'hideCard',
            small && 'small'
        ]"
        :style="`--reversBg:${reversBg};`"
    >
        <div
            v-if="card.taken === 'inGame' && cash1P !== undefined && cash1P >= 0"
            :class="['cashSum cashSumP1', res1P !== undefined && cash1P > res1P && 'toHighPrice']"
        >
            {{ cash1P }}
        </div>
        <div
            v-if="card.taken === 'inGame' && cash2P !== undefined && cash2P >= 0"
            :class="['cashSum cashSumP2', res2P !== undefined && cash2P > res2P && 'toHighPrice']"
        >
            {{ cash2P }}
        </div>
        <p>{{ card.color === 'green' && card.valuePower[0] }}</p>
    </div>
</template>

<style scoped>
.cashSumP1 {
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%) translateY(-145%);
}
.cashSumP2 {
    background-position: -116px -89.5px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-40%);
}
.toHighPrice {
    color: red;
}
.small {
    height: 17.5px !important;
    margin-bottom: 1px;
}

/* Cards main background */
.card {
    position: relative;
    border-radius: 5px;
    width: var(--width-tier);
    height: var(--height-tier);
    background-repeat: no-repeat;
    background-size: calc(var(--width-tier) * 12) calc(var(--height-tier) * 8);
    background-image: url('@/assets/duel/cards.webp');

    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    /* transition: 0.3s; */
    color: #222;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.2),
        inset -5px -5px 10px rgba(255, 255, 255, 0.1);
}
.hideCard {
    background-position: var(--reversBg) !important;
    background-color: red !important;
}

.card1 {
    background-position: 0 0;
}
.card2 {
    background-position: calc(var(--width-tier) * -1) 0;
}
.card3 {
    background-position: calc(var(--width-tier) * -2) 0;
}
.card4 {
    background-position: calc(var(--width-tier) * -3) 0;
}
.card5 {
    background-position: calc(var(--width-tier) * -4) 0;
}
.card6 {
    background-position: calc(var(--width-tier) * -5) 0;
}
.card7 {
    background-position: calc(var(--width-tier) * -6) 0;
}
.card8 {
    background-position: calc(var(--width-tier) * -7) 0;
}
.card9 {
    background-position: calc(var(--width-tier) * -8) 0;
}
.card10 {
    background-position: calc(var(--width-tier) * -9) 0;
}
.card11 {
    background-position: calc(var(--width-tier) * -10) 0;
}
.card12 {
    background-position: calc(var(--width-tier) * -11) 0;
}
.card13 {
    background-position: 0 calc(var(--height-tier) * -1);
}
.card14 {
    background-position: calc(var(--width-tier) * -1) calc(var(--height-tier) * -1);
}
.card15 {
    background-position: calc(var(--width-tier) * -2) calc(var(--height-tier) * -1);
}
.card16 {
    background-position: calc(var(--width-tier) * -3) calc(var(--height-tier) * -1);
}
.card17 {
    background-position: calc(var(--width-tier) * -4) calc(var(--height-tier) * -1);
}
.card18 {
    background-position: calc(var(--width-tier) * -5) calc(var(--height-tier) * -1);
}
.card19 {
    background-position: calc(var(--width-tier) * -6) calc(var(--height-tier) * -1);
}
.card20 {
    background-position: calc(var(--width-tier) * -7) calc(var(--height-tier) * -1);
}
.card21 {
    background-position: calc(var(--width-tier) * -8) calc(var(--height-tier) * -1);
}
.card22 {
    background-position: calc(var(--width-tier) * -9) calc(var(--height-tier) * -1);
}
.card23 {
    background-position: calc(var(--width-tier) * -10) calc(var(--height-tier) * -1);
}
.card24 {
    background-position: calc(var(--width-tier) * -11) calc(var(--height-tier) * -1);
}
.card25 {
    background-position: 0 calc(var(--height-tier) * -2);
}
.card26 {
    background-position: calc(var(--width-tier) * -1) calc(var(--height-tier) * -2);
}
.card27 {
    background-position: calc(var(--width-tier) * -2) calc(var(--height-tier) * -2);
}
.card28 {
    background-position: calc(var(--width-tier) * -3) calc(var(--height-tier) * -2);
}
.card29 {
    background-position: calc(var(--width-tier) * -4) calc(var(--height-tier) * -2);
}
.card30 {
    background-position: calc(var(--width-tier) * -5) calc(var(--height-tier) * -2);
}
.card31 {
    background-position: calc(var(--width-tier) * -6) calc(var(--height-tier) * -2);
}
.card32 {
    background-position: calc(var(--width-tier) * -7) calc(var(--height-tier) * -2);
}
.card33 {
    background-position: calc(var(--width-tier) * -8) calc(var(--height-tier) * -2);
}
.card34 {
    background-position: calc(var(--width-tier) * -10) calc(var(--height-tier) * -2);
}
.card35 {
    background-position: calc(var(--width-tier) * -9) calc(var(--height-tier) * -2);
}
.card36 {
    background-position: calc(var(--width-tier) * -11) calc(var(--height-tier) * -2);
}
.card37 {
    background-position: 0 calc(var(--height-tier) * -3);
}
.card38 {
    background-position: calc(var(--width-tier) * -1) calc(var(--height-tier) * -3);
}
.card39 {
    background-position: calc(var(--width-tier) * -2) calc(var(--height-tier) * -3);
}
.card40 {
    background-position: calc(var(--width-tier) * -3) calc(var(--height-tier) * -3);
}
.card41 {
    background-position: calc(var(--width-tier) * -4) calc(var(--height-tier) * -3);
}
.card42 {
    background-position: calc(var(--width-tier) * -5) calc(var(--height-tier) * -3);
}
.card43 {
    background-position: calc(var(--width-tier) * -6) calc(var(--height-tier) * -3);
}
.card44 {
    background-position: calc(var(--width-tier) * -7) calc(var(--height-tier) * -3);
}
.card45 {
    background-position: calc(var(--width-tier) * -8) calc(var(--height-tier) * -3);
}
.card46 {
    background-position: calc(var(--width-tier) * -9) calc(var(--height-tier) * -3);
}
.card47 {
    background-position: calc(var(--width-tier) * -10) calc(var(--height-tier) * -3);
}
.card48 {
    background-position: calc(var(--width-tier) * -11) calc(var(--height-tier) * -3);
}
.card49 {
    background-position: 0 calc(var(--height-tier) * -4);
}
.card50 {
    background-position: calc(var(--width-tier) * -1) calc(var(--height-tier) * -4);
}
.card51 {
    background-position: calc(var(--width-tier) * -2) calc(var(--height-tier) * -4);
}
.card52 {
    background-position: calc(var(--width-tier) * -3) calc(var(--height-tier) * -4);
}
.card53 {
    background-position: calc(var(--width-tier) * -4) calc(var(--height-tier) * -4);
}
.card54 {
    background-position: calc(var(--width-tier) * -5) calc(var(--height-tier) * -4);
}
.card55 {
    background-position: calc(var(--width-tier) * -6) calc(var(--height-tier) * -4);
}
.card56 {
    background-position: calc(var(--width-tier) * -7) calc(var(--height-tier) * -4);
}
.card57 {
    background-position: calc(var(--width-tier) * -8) calc(var(--height-tier) * -4);
}
.card58 {
    background-position: calc(var(--width-tier) * -9) calc(var(--height-tier) * -4);
}
.card59 {
    background-position: calc(var(--width-tier) * -10) calc(var(--height-tier) * -4);
}
.card60 {
    background-position: calc(var(--width-tier) * -11) calc(var(--height-tier) * -4);
}
.card61 {
    background-position: 0 calc(var(--height-tier) * -5);
}
.card62 {
    background-position: calc(var(--width-tier) * -1) calc(var(--height-tier) * -5);
}
.card63 {
    background-position: calc(var(--width-tier) * -2) calc(var(--height-tier) * -5);
}
.card64 {
    background-position: calc(var(--width-tier) * -3) calc(var(--height-tier) * -5);
}
.card65 {
    background-position: calc(var(--width-tier) * -4) calc(var(--height-tier) * -5);
}
.card66 {
    background-position: calc(var(--width-tier) * -5) calc(var(--height-tier) * -5);
}
.card67 {
    background-position: calc(var(--width-tier) * -6) calc(var(--height-tier) * -5);
}
.card68 {
    background-position: calc(var(--width-tier) * -7) calc(var(--height-tier) * -5);
}
.card69 {
    background-position: calc(var(--width-tier) * -8) calc(var(--height-tier) * -5);
}
.card70 {
    background-position: calc(var(--width-tier) * -9) calc(var(--height-tier) * -5);
}
.card71 {
    background-position: calc(var(--width-tier) * -10) calc(var(--height-tier) * -5);
}
.card72 {
    background-position: calc(var(--width-tier) * -11) calc(var(--height-tier) * -5);
}
.card73 {
    background-position: 0 calc(var(--height-tier) * -6);
}
</style>
