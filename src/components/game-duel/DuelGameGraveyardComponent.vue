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
    <section :class="['graveyard', 'customInput']">
        <div
            :class="[
                graveyard.length >= 16 && 'addScrollbar',
                pickCardFromGraveyard !== '' && 'selectFromGraveyard',
                isMyTurn && 'addCursorPointer'
            ]"
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
        </div>
    </section>
</template>

<style scoped>
.graveyard {
    position: relative;
    grid-area: grv;
    padding: 0 !important;
    height: 100%;
}
.graveyard > div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: start;
    max-height: 100%;
    padding: 10px 23px;
    gap: 2px;
}
.addScrollbar {
    padding: 10px 12px !important;
    overflow-y: scroll;
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
.addCursorPointer > div {
    cursor: pointer !important;
    z-index: 10;
}
</style>
