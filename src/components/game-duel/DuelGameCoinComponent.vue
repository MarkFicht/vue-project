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
    height: 31px;
    width: 31px;
    border-radius: 50%;
    background-repeat: no-repeat;
    display: flex;
}
.point4n6cash {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: 0 0;
}
.lowCostWonder {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -31px 0;
}
.cashBack {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -62px 0;
}
.artefact7 {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -93px 0;
}

.lowCostBlue {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: 0 -31px;
}
.pointX3 {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -31px -31px;
}
.point7 {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -62px -31px;
}
.attack1 {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -93px -31px;
}
.repeatWonder {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: 0px -62px;
}
.cash6n4special {
    background-image: url('@/assets/duel/coins.webp');
    background-size: 124px 124px;
    background-position: -31px -62px;
}
</style>
