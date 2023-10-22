<script setup lang="ts">
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import DuelGameCardComponent from '@/components/game-duel/DuelGameCardComponent.vue';

const storeDuelGame = duelGameStore();
const { graveyard, pickCardFromGraveyard } = storeToRefs(storeDuelGame);

const emit = defineEmits(['pick-card-from-graveyard']);
const props = defineProps<{
    isMyTurn: boolean;
}>();
</script>

<template>
    <section
        :class="[
            'graveyard',
            'customInput',
            isMyTurn && pickCardFromGraveyard !== '' && 'selectFromGraveyard'
        ]"
        :style="graveyard.length >= 24 ? 'overflow-y: scroll;' : ''"
    >
        <DuelGameCardComponent
            v-for="card in graveyard"
            :key="card.id"
            :card="card"
            small
            :style="isMyTurn && pickCardFromGraveyard !== '' && `cursor: pointer;`"
            @click="
                isMyTurn && pickCardFromGraveyard !== ''
                    ? emit('pick-card-from-graveyard', card)
                    : null
            "
        />
    </section>
</template>

<style scoped>
.graveyard {
    position: relative;
    grid-area: grv;
    padding: 8px !important;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    justify-content: center;
    /* display: inline-flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; */
}
.selectFromGraveyard::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    border: 3px dotted tomato;
    animation: pulseBorder 1.5s ease-in-out infinite;
}
.selectFromGraveyard > div {
    cursor: pointer !important;
    z-index: 10;
}
</style>
