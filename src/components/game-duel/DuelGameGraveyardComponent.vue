<script setup lang="ts">
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import DuelGameCardComponent from '@/components/game-duel/DuelGameCardComponent.vue';

const storeDuelGame = duelGameStore();
const { graveyard } = storeToRefs(storeDuelGame);
</script>

<template>
    <section
        :class="['graveyard', 'customInput']"
        :style="graveyard.length >= 24 ? 'overflow-y: scroll;' : ''"
    >
        <DuelGameCardComponent v-for="card in graveyard" :key="card.id" :card="card" small />
    </section>
</template>

<style scoped>
.graveyard {
    grid-area: grv;
    padding: 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 3px 10px;
    /* display: inline-flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; */
}
</style>
