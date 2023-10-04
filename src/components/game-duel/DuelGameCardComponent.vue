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
});
</script>

<template>
    <div :class="['card', `card${card.id}`, small && 'small']" :style="`--bgColor:${bgColor};`">
        <div
            v-if="card.taken === 'inGame' && cash1P !== undefined && cash1P >= 0"
            :class="['cashSumP1', res1P !== undefined && cash1P > res1P && 'colorRed']"
        >
            {{ cash1P }}
        </div>
        <div
            v-if="card.taken === 'inGame' && cash2P !== undefined && cash2P >= 0"
            :class="['cashSumP2', res2P !== undefined && cash2P > res2P && 'colorRed']"
        >
            {{ cash2P }}
        </div>
        <!--  -->
        <div v-if="specialChar" class="specialChar">
            {{ specialChar + 's' }}
        </div>

        <div v-if="!card.hide || card.coversBy?.length === 0" class="standardPower">
            <div v-if="artefact" :style="'margin-right: 1px;'">
                {{ artefact }}<ion-icon name="sparkles-sharp"></ion-icon>
            </div>
            <div v-if="point">{{ point }}<ion-icon name="ribbon-sharp"></ion-icon></div>
            <div v-if="attack">
                <ion-icon v-for="num in attack" :key="num" name="skull-sharp"></ion-icon>
            </div>

            <div v-if="clay" class="resources" :style="'width: 100%;'">
                <div v-for="num in clay" :key="num" class="clay">c</div>
            </div>
            <div v-if="brick" class="resources" :style="'width: 100%;'">
                <div v-for="num in brick" :key="num" class="brick">b</div>
            </div>
            <div v-if="wood" class="resources" :style="'width: 100%;'">
                <div v-for="num in wood" :key="num" class="wood">w</div>
            </div>
            <div v-if="paper" class="resources" :style="'width: 100%;'">
                <div v-for="num in paper" :key="num" class="paper">p</div>
            </div>
            <div v-if="glass" class="resources" :style="'width: 100%;'">
                <div v-for="num in glass" :key="num" class="glass">g</div>
            </div>

            <div v-if="cash">
                {{ cash + '$' }}
            </div>

            <div v-if="discount" class="resources discount" :style="'width: 100%;'">
                <div v-if="discount === 1" class="clay">c</div>
                <div v-if="discount === 2" class="brick">b</div>
                <div v-if="discount === 3" class="wood">w</div>
                <div v-if="discount === 4" class="paper">p</div>
                <div v-if="discount === 4" class="glass">g</div>
            </div>
            <div
                v-if="materials === 1"
                class="resources"
                :style="'width: 100%; transform: scale(.8);'"
            >
                <div class="clay">c</div>
                /
                <div class="brick">b</div>
                /
                <div class="wood">w</div>
            </div>
            <div v-if="materials === 2" class="resources" :style="'width: 100%;'">
                <div class="paper">p</div>
                /
                <div class="glass">g</div>
            </div>

            <div v-if="cashBack">
                {{
                    (cashBack === 1 && 'W_2') ||
                    (cashBack === 2 && 'Y_1') ||
                    (cashBack === 3 && 'G_3') ||
                    (cashBack === 4 && 'B_2') ||
                    (cashBack === 5 && 'R_1')
                }}
            </div>
            <div v-if="guild">
                {{
                    (guild === 1 && 'Y_x') ||
                    (guild === 2 && 'BG_x') ||
                    (guild === 3 && 'W_x2') ||
                    (guild === 4 && 'B_x') ||
                    (guild === 5 && 'G_x') ||
                    (guild === 6 && '$_3') ||
                    (guild === 7 && 'R_x')
                }}
            </div>
        </div>

        <div v-if="!small && specialCharCost" class="specialCharCost">
            {{ specialCharCost + 's' }}
        </div>
        <div v-if="!small && (!card.hide || card.coversBy?.length === 0)" class="standardCost">
            <div v-if="cashCost" class="resources" :style="'width: 100%;'">
                <div class="cash">{{ cashCost + '$' }}</div>
            </div>
            <div v-if="clayCost" class="resources" :style="'width: 100%;'">
                <div v-for="num in clayCost" :key="num" class="clay">c</div>
            </div>
            <div v-if="brickCost" class="resources" :style="'width: 100%;'">
                <div v-for="num in brickCost" :key="num" class="brick">b</div>
            </div>
            <div v-if="woodCost" class="resources" :style="'width: 100%;'">
                <div v-for="num in woodCost" :key="num" class="wood">w</div>
            </div>
            <div v-if="paperCost" class="resources" :style="'width: 100%;'">
                <div v-for="num in paperCost" :key="num" class="paper">p</div>
            </div>
            <div v-if="glassCost" class="resources" :style="'width: 100%;'">
                <div v-for="num in glassCost" :key="num" class="glass">g</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cashSumP1 {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 12px;
    line-height: 17px;
    border-radius: 50%;
    background-color: gold;
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%) translateY(-140%);
    border: 1px solid #333;
    z-index: 1000;
    font-weight: bold;
}
.cashSumP2 {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 12px;
    line-height: 17px;
    border-radius: 50%;
    background-color: silver;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-30%);
    border: 1px solid #333;
    z-index: 1000;
    font-weight: bold;
}
.colorRed {
    color: red;
}
.card {
    position: relative;
    border: 1px solid #222;
    border-radius: 5px;
    width: 60px;
    height: 69px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    transition: 0.3s;
    background-color: var(--bgColor);
    color: #222;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.2),
        inset -5px -5px 10px rgba(255, 255, 255, 0.1);
}
.resources > div {
    width: 13px;
    height: 13px;
    line-height: 13px;
    font-size: 11px;
    border: 1px solid gold;
    border-radius: 50%;
    margin-left: 2px;
}
.discount > div {
    position: relative;
}
.discount > div::before {
    content: '1';
    position: absolute;
    top: -1px;
    right: 8px;
    width: 7px;
    height: 7px;
    font-size: 5px;
    line-height: 5px;
    text-align: center;
    background-color: gold;
    border: 1px solid #222;
    border-radius: 50%;
}
.clay {
    background-color: crimson;
}
.brick {
    background-color: slategrey;
}
.wood {
    background-color: greenyellow;
}
.paper {
    background-color: coral;
}
.glass {
    background-color: cornflowerblue;
}
.small {
    height: 20px !important;
    grid-template-rows: 1fr !important;
    width: 50px;
}
.small .standardPower {
    font-size: 11px;
    line-height: 11px;
}
/* ------------------- */
.specialChar {
    font-size: 10px;
    position: absolute;
    top: 1px;
    right: 1px;
}
.standardPower {
    grid-row: 1;
    grid-column: 1 / 4;
    font-size: 13px;
    line-height: 13px;
}
/* ------------------- */
.specialCharCost {
    font-size: 9px;
    position: absolute;
    top: 7px;
    left: 1px;
}
.standardCost {
    grid-row: 2;
    grid-column: 1;
    display: flex;
    justify-content: start;
    /* flex-direction: column; */
}
.standardCost > .resources > div {
    width: 9px;
    height: 9px;
    line-height: 8px;
    font-size: 8px;
    border: 1px solid gold;
    border-radius: 50%;
    margin-left: 1px;
}
.cash {
    width: 12px !important;
    height: 12px !important;
    text-align: center;
    font-size: 9px !important;
    border: 1px solid goldenrod !important;
    background-color: gold;
}
</style>
