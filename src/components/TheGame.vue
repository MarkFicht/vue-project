<script setup lang="ts">
import TheCardComponent from '@/components/TheCardComponent.vue';
import { inject } from 'vue';
const props = defineProps<{
    header: String;
}>();
const { activeLink, routes, updateActiveLink, colors } = inject<any>('indicatorNavi');
</script>

<template>
    <section class="gameContainer">
        <TheCardComponent
            :header="'Duel'"
            :desc="`A board game inspired by a strategy game called '7 Wonders of the World'`"
            :video="'Video here soon!'"
            :color="colors[0]"
            :route-to="'/feed/duel-game'"
            :max-players="2"
        />
        <TheCardComponent
            :header="'Gems'"
            :desc="`IN PROGRESS`"
            video="'Video here soon!'"
            :color="colors[1]"
            :route-to="'/feed/splendor-game'"
            :max-players="0"
        />
        <TheCardComponent
            :header="'Reflex'"
            :desc="`IN PROGRESS`"
            video="'Video here soon!'"
            :color="colors[2]"
            :route-to="'/feed/reflex-game'"
            :max-players="0"
        />
    </section>
</template>

<style scoped>
.gameContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
}
</style>
