<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue';
import type { IGameDuelCoin } from '@/interfaces/GameDuel';

const displayVal = ref<string>('');

const props = defineProps<{
    coin: IGameDuelCoin['effect'];
}>();
const { coin } = toRefs(props);

onMounted(() => {
    switch (coin.value) {
        case 'artefact7':
            displayVal.value = '7';
            break;
        case 'attack1':
            displayVal.value = '1+';
            break;
        case 'point7':
            displayVal.value = '7';
            break;
        case 'pointX3':
            displayVal.value = '3x ';
            break;
        case 'cash6n4special':
            displayVal.value = '6$+';
            break;
        case 'lowCostWonder':
            displayVal.value = '$$';
            break;
        case 'lowCostBlue':
            displayVal.value = '$$';
            break;
        case 'cashBack':
            displayVal.value = '$';
            break;
        case 'point4n6cash':
            displayVal.value = '6$';
            break;
        case 'repeatWonder':
            displayVal.value = '';
            break;

        default:
            displayVal.value = coin.value;
            break;
    }
});
</script>

<template>
    <span :class="['boardSingleCoin', `${coin}`]"></span>
</template>

<style scoped>
.boardSingleCoin {
    position: relative;
    z-index: 10;
    height: var(--coin-size);
    width: var(--coin-size);
    border-radius: 50%;
    background-repeat: no-repeat;
    display: flex;
    background-image: url('@/assets/duel/coins.webp');
    background-size: calc(var(--coin-size) * 4) calc(var(--coin-size) * 4);
}
.point4n6cash {
    background-position: 0 0;
}
.lowCostWonder {
    background-position: calc(var(--coin-size) * -1) 0;
}
.cashBack {
    background-position: calc(var(--coin-size) * -2) 0;
}
.artefact7 {
    background-position: calc(var(--coin-size) * -3) 0;
}

.lowCostBlue {
    background-position: 0 calc(var(--coin-size) * -1);
}
.pointX3 {
    background-position: calc(var(--coin-size) * -1) calc(var(--coin-size) * -1);
}
.point7 {
    background-position: calc(var(--coin-size) * -2) calc(var(--coin-size) * -1);
}
.attack1 {
    background-position: calc(var(--coin-size) * -3) calc(var(--coin-size) * -1);
}
.repeatWonder {
    background-position: 0px calc(var(--coin-size) * -2);
}
.cash6n4special {
    background-position: calc(var(--coin-size) * -1) calc(var(--coin-size) * -2);
}
</style>
