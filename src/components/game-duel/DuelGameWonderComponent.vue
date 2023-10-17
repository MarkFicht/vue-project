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
const reversColor = ref<string>('');

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
    takeReversColor();
});

watch(
    () => card.value.activated,
    () => {
        takeReversColor();
    }
);

function takeReversColor(): void {
    switch (card.value.activated) {
        case 'I':
            reversColor.value = 'rgb(145, 19, 19)';
            break;
        case 'II':
            reversColor.value = 'rgb(58, 59, 160)';
            break;
        case 'III':
            reversColor.value = 'rgb(175, 85, 202)';
            break;
        case 'guild':
            reversColor.value = 'rgb(107, 36, 128)';
            break;
        default:
            break;
    }
}
</script>

<template>
    <div :class="['card']" :style="`--activeColor: ${reversColor};`">
        <div
            v-if="card.taken"
            :class="[
                'cashSum',
                resCash !== undefined && cash !== undefined && cash > resCash && 'colorRed'
            ]"
        >
            {{ cash }}
        </div>

        <div class="wonderIcon"><ion-icon name="prism"></ion-icon></div>

        <div class="cost">
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

        <div class="power">
            <div v-if="effect === 1"><ion-icon name="reload-outline"></ion-icon></div>
            <div v-if="effect === 2"><ion-icon name="trash-outline"></ion-icon></div>
            <div v-if="effect === 3" class="takeCoin"></div>

            <div v-if="cashPow" class="cash">
                {{ cashPow + '$' }}
            </div>

            <div v-if="breakRes === 1" class="breakBrown">{{ '/' }}</div>
            <div v-if="breakRes === 2" class="breakGrey">{{ '/' }}</div>
            <div v-if="breakRes === 3" class="cash" :style="'text-decoration: line-through;'">
                {{ breakRes + '$' }}
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

            <div v-if="attack">
                <ion-icon v-for="num in attack" :key="num" name="skull-sharp"></ion-icon>
            </div>

            <div v-if="point">{{ point }}<ion-icon name="ribbon-sharp"></ion-icon></div>
        </div>
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: showElement 0.5s linear;
}
.cashSum {
    position: absolute;
    width: 17px;
    height: 17px;
    font-size: 12px;
    line-height: 17px;
    border-radius: 50%;
    background-color: gold;
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%) translateY(-110%);
    border: 1px solid #444;
    font-weight: bold;
}
.wonderIcon {
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translateX(-50%);
}
.colorRed {
    color: red;
}
.card {
    position: relative;
    border: 1px solid #333;
    border-radius: 5px;
    width: 80px;
    height: 60px;
    margin: 0 20px 0 5px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    font-size: 11px;
    line-height: 11px;
    transition: 0.3s;
    cursor: pointer;
    background-color: darksalmon;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px rgba(255, 255, 255, 0.2);
}
.card::before {
    content: '';
    position: absolute;
    top: 4px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: var(--activeColor);
    right: -10px;
    width: 10px;
    height: 50px;
    border: 1px solid;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.15),
        inset -5px -5px 10px rgba(255, 255, 255, 0.3);
}
.cost {
    display: flex;
    flex-direction: column;
}
.resources > div {
    width: 10px;
    height: 10px;
    line-height: 10px;
    font-size: 9px;
    border: 1px solid gold;
    border-radius: 50%;
    margin-left: 1px;
}
.cash {
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    border: 1px solid goldenrod;
    background-color: gold;
    border-radius: 50%;
    margin-left: 1px;
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
.power {
    display: flex;
    flex-direction: column;
}
.breakGrey {
    height: 14px;
    width: 9px;
    background-color: gray;
    border-radius: 2px;
    font-size: 10px;
    border: 1px solid #333;
}
.breakBrown {
    height: 14px;
    width: 9px;
    background-color: brown;
    border-radius: 2px;
    font-size: 10px;
    border: 1px solid #333;
}
.takeCoin {
    position: relative;
    width: 10px;
    height: 10px;
    border: 1px solid #333;
    border-radius: 50%;
    background-color: green;
}
.takeCoin::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 1px;
    z-index: 10;
    width: 10px;
    height: 10px;
    border: 1px solid #333;
    border-radius: 50%;
    background-color: rgb(0, 148, 0);
}
.takeCoin::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 3px;
    z-index: 10;
    width: 10px;
    height: 10px;
    border: 1px solid #333;
    border-radius: 50%;
    background-color: rgb(0, 163, 0);
}
</style>
