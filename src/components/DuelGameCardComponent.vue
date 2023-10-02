<script setup lang="ts">
import { toRefs } from 'vue';
import type { IGameDuelCard } from '@/interfaces/GameDuel';

const props = defineProps<{
    card: IGameDuelCard;
    small?: boolean;
    cash1P?: number;
    cash2P?: number;
    res1P?: number;
    res2P?: number;
}>();
const { card } = toRefs(props);
</script>

<template>
    <div
        :class="['card', `card${card.id}`, small && 'small']"
        :style="`background: ${card.color};`"
    >
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
        <div
            v-for="(power, i) in card.power"
            :key="power"
            :class="[
                power === 'specialChar' && 'specialChar',
                power === 'materials' && 'materials',
                power === 'artefact' && 'artefact',
                power === 'cashBack' && 'artefact',
                power !== 'materials' &&
                    power !== 'specialChar' &&
                    power !== 'artefact' &&
                    power !== 'cashBack' &&
                    'standardPower'
            ]"
        >
            {{ power === 'specialChar' ? `${card.valuePower[i]}s` : '' }}
            {{ power === 'materials' ? `${card.valuePower[i] === 1 ? 'c/b/w' : 'p/g'}` : '' }}
            {{ power === 'artefact' ? `${card.valuePower[i]}a` : '' }}
            {{
                power === 'discount'
                    ? `${
                          (card.valuePower[i] === 1 && 'C') ||
                          (card.valuePower[i] === 2 && 'B') ||
                          (card.valuePower[i] === 3 && 'W') ||
                          (card.valuePower[i] === 4 && 'P/G')
                      }_d`
                    : ''
            }}
            {{
                power === 'cashBack'
                    ? `${
                          (card.valuePower[i] === 1 && 'W_2') ||
                          (card.valuePower[i] === 2 && 'Y_1') ||
                          (card.valuePower[i] === 3 && 'G_3') ||
                          (card.valuePower[i] === 4 && 'B_2') ||
                          (card.valuePower[i] === 5 && 'R_1')
                      },`
                    : ''
            }}
            {{
                power === 'guild'
                    ? `${
                          (card.valuePower[i] === 1 && 'Y_x') ||
                          (card.valuePower[i] === 2 && 'BG_x') ||
                          (card.valuePower[i] === 3 && 'W_x2') ||
                          (card.valuePower[i] === 4 && 'B_x') ||
                          (card.valuePower[i] === 5 && 'G_x') ||
                          (card.valuePower[i] === 6 && '$_3') ||
                          (card.valuePower[i] === 7 && 'R_x')
                      },`
                    : ''
            }}
            {{ power === 'cash' ? `${card.valuePower[i]}$` : '' }}
            {{
                power !== 'materials' &&
                power !== 'specialChar' &&
                power !== 'artefact' &&
                power !== 'discount' &&
                power !== 'cash' &&
                power !== 'cashBack'
                    ? `${card.valuePower[i]} ${power[0]}`
                    : ''
            }}
        </div>

        <div
            v-if="card.cost?.length !== 0 && card.cost?.find((cost) => cost === 'specialChar')"
            :class="['specialCharCost']"
        >
            {{
                `${card.cost
                    .map((cost, i) => {
                        return cost === 'specialChar' ? `${card.valueCost[i]}s` : '';
                    })
                    .filter((val) => val !== '')}`
            }}
        </div>
        <div
            v-if="card.cost?.length !== 0 && card.cost?.find((cost) => cost !== 'specialChar')"
            :class="['standardCost']"
        >
            {{
                `${card.cost
                    .map((cost, i) => {
                        return cost !== 'specialChar'
                            ? `${card.valueCost[i]}${cost === 'cash' ? '$' : cost[0]}`
                            : '';
                    })
                    .filter((val) => val !== '')}`
            }}
        </div>
    </div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    filter: brightness(0.4);
}
.cashSumP1 {
    position: absolute;
    width: 17px;
    height: 17px;
    font-size: 12px;
    line-height: 17px;
    border-radius: 50%;
    background-color: goldenrod;
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%) translateY(-65%);
    border: 2px solid #444;
    filter: brightness(1.3);
    z-index: 1000;
    font-weight: bold;
}
.cashSumP2 {
    position: absolute;
    width: 17px;
    height: 17px;
    font-size: 12px;
    line-height: 17px;
    border-radius: 50%;
    background-color: silver;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    border: 2px solid #444;
    filter: brightness(1.3);
    z-index: 1000;
    font-weight: bold;
}
.colorRed {
    color: red;
}
.card {
    position: relative;
    border: 1px solid;
    border-radius: 5px;
    width: 50px;
    height: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    font-size: 10px;
    line-height: 10px;
    filter: brightness(1.3);
    transition: 0.3s;
}
.small {
    height: 20px !important;
}
/* ------------------- */
.specialChar {
    grid-row: 3 / 5;
    grid-column: 5;
}
.materials {
    grid-row: 2 / 4;
    grid-column: 2 / 6;
}
.artefact {
    grid-row: 2 / 4;
    grid-column: 2 / 3;
}
.standardPower {
    grid-row: 2 / 4;
    grid-column: 3 / 5;
    font-size: 11px;
    line-height: 11px;
}
/* ------------------- */
.specialCharCost {
    grid-column: 1;
    grid-row: 3 / 4;
}
.standardCost {
    grid-column: 1 / 4;
    grid-row: 1;
    display: flex;
    justify-content: start;
}
</style>
