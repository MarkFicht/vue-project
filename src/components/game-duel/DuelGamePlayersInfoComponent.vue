<script setup lang="ts">
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';

const storeDuelGame = duelGameStore();
const { player1, player2, turn } = storeToRefs(storeDuelGame);
</script>

<template>
    <section class="playerInfo">
        <div :class="['player1info', 'customInput', turn === player1.user.uid && 'boldParagraf']">
            <p>
                {{ `Nick: ${player1.user.displayName || player1.user.email}` }}
            </p>
            <p>
                {{ `Timer: 90` }}
            </p>
        </div>
        <div :class="['player2info', 'customInput', turn === player2.user.uid && 'boldParagraf']">
            <p>
                {{ `Nick: ${player2.user.displayName || player2.user.email}` }}
            </p>
            <p>
                {{ `Timer: 90` }}
            </p>
        </div>
    </section>
</template>

<style scoped>
.playerInfo {
    grid-area: pi;
    margin: 0 auto;
}
.playerInfo > div {
    height: 60px;
    margin-bottom: 15px;
    padding: 5px 15px !important;
    font-size: 1em;
    display: block;
}
.boldParagraf > p {
    font-weight: bold;
}
</style>
