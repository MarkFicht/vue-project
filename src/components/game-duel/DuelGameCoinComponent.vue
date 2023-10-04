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
    <span
        :class="[
            'boardSingleCoin',
            (coin === 'lowCostWonder' || coin === 'lowCostBlue') && 'lowCost'
        ]"
    >
        {{ displayVal }}
        <ion-icon v-if="coin === 'artefact7'" name="sparkles-sharp"></ion-icon>
        <ion-icon v-if="coin === 'attack1'" name="skull-sharp"></ion-icon>
        <ion-icon v-if="coin === 'point7'" name="ribbon-sharp"></ion-icon>
        <div v-if="coin === 'pointX3'" class="pointX3">
            <ion-icon name="ribbon-sharp"></ion-icon>
        </div>
        <div v-if="coin === 'cash6n4special'" class="cash6n4special">{{ '4$ sp' }}</div>
        <ion-icon v-if="coin === 'lowCostWonder'" name="prism"></ion-icon>
        <div v-if="coin === 'lowCostBlue'" class="lowCostBlue"></div>
        <ion-icon v-if="coin === 'cashBack'" class="cashBack" name="return-up-back"></ion-icon>
        <div v-if="coin === 'point4n6cash'">4<ion-icon name="ribbon-sharp"></ion-icon></div>
        <div v-if="coin === 'repeatWonder'">
            <ion-icon name="reload-outline"></ion-icon><ion-icon name="prism"></ion-icon>
        </div>
    </span>
</template>

<style scoped>
.boardSingleCoin {
    height: 36px;
    width: 36px;
    margin: 1px auto;
    border-radius: 50%;
    font-size: 12px;
    line-height: 12px;
    border: 1px solid #222;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgb(27, 207, 27);
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.3),
        inset -5px -5px 10px rgba(255, 255, 255, 0.4);
}
.pointX3 {
    background-color: rgb(23, 179, 23);
    border: 1px solid #222;
    width: 16px;
    height: 16px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}
.cash6n4special {
    font-size: 8px;
}
.lowCost {
    text-decoration: line-through;
    font-weight: bold;
}
.lowCostBlue {
    height: 14px;
    width: 10px;
    background-color: blue;
    border-radius: 3px;
}
.cashBack {
    font-size: 18px;
}
</style>
