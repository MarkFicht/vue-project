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
    grid-area: grv;
    padding: 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px 7px;
    justify-content: center;
    /* display: inline-flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; */
}
.selectFromGraveyard {
    border: 3px dotted tomato;
}
</style>
