<script setup lang="ts">
import { toRefs, onMounted } from 'vue';
import type { IGameDuelCard } from '@/interfaces/GameDuel';

const props = defineProps<{ card: IGameDuelCard; x: number; y: number }>();
const { card } = toRefs(props);

onMounted(() => {
    console.log('%c card -> ', 'background: #222; color: #bada55', card);
});
</script>

<template>
    <div
        v-if="card.taken === 'inGame'"
        :class="['card', `card${card.id}`, card.coversBy?.length === 0 && 'canSelect']"
        :style="`--x:${x}%; --y:${y}%; background: ${card.color}; cursor: ${
            card.coversBy?.length === 0 ? 'pointer' : 'default'
        };`"
    >
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
    <div
        v-else
        :class="['card', `card${card.id}`, 'invisible']"
        :style="`--x:${x}%; --y:${y}%; background: ${card.color};`"
    ></div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    filter: brightness(0.4);
}
.card {
    border: 1px solid;
    border-radius: 5px;
    width: 50px;
    height: 60px;
    margin: 0 3px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    font-size: 7px;
    line-height: 7px;
    filter: brightness(1.3);
    transition: 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(var(--y)) translateX(var(--x));
}
.canSelect:hover {
    transform: translateY(var(--y)) translateX(var(--x)) scale(1.05);
}
.invisible {
    animation: invisible 0.5s linear forwards;
}
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
    font-size: 7px;
    line-height: 7px;
}
.standardPower {
    grid-row: 2 / 4;
    grid-column: 3 / 5;
    font-size: 9px;
    line-height: 9px;
}
/* ------------------- */
.specialCharCost {
    grid-column: 1;
    grid-row: 3 / 4;
    font-size: 6px;
    line-height: 6px;
}
.standardCost {
    grid-column: 1 / 4;
    grid-row: 1;
    font-size: 6px;
    line-height: 6px;
    display: flex;
    justify-content: start;
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
</style>
