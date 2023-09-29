<script setup lang="ts">
import { toRefs } from 'vue';
import type { IGameDuelWonderCard } from '@/interfaces/GameDuel';

const props = defineProps<{ card: IGameDuelWonderCard }>();
const { card } = toRefs(props);
</script>

<template>
    <div :class="['card']">
        <div class="cost">
            {{
                `${card.cost
                    .map((cost, i) => ` ${card.valueCost[i]}${cost === 'cash' ? '$' : cost[0]}`)
                    .filter((val) => val !== '')}`
            }}
        </div>
        <div class="power">
            {{
                `${card.power
                    .map((power, i) => ` ${card.valuePower[i]}_${power}`)
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
    animation: showElement 2s linear;
}
.card {
    position: relative;
    border: 1px solid;
    border-radius: 5px;
    width: 80px;
    height: 60px;
    margin: 0 20px 0 5px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-size: 11px;
    line-height: 11px;
    filter: brightness(1.3);
    transition: 0.3s;
    cursor: pointer;
    background-color: aquamarine;
}
.card::before {
    content: '';
    position: absolute;
    top: 4px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    right: -10px;
    width: 10px;
    height: 50px;
    border: 1px solid;
}
.cost {
    display: flex;
    flex-direction: column;
}
.power {
    display: flex;
    flex-direction: column;
}
@keyframes showElement {
    0%,
    30% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
