<script setup lang="ts">
const props = defineProps<{
    header: String;
}>();
</script>

<template>
    <h2>{{ props.header }}</h2>

    <RouterLink :to="'/feed/duel-game'" :class="'customButton'">{{ 'Go to game' }}</RouterLink>
</template>

<style scoped>
h2 {
    font-size: 2em;
    line-height: 0.9em;
    margin-bottom: 20px;
    text-align: center;
}
@media (max-width: 720px) {
    h2 {
        font-size: 1.6em;
        margin-bottom: 15px;
        text-align: center;
    }
}
</style>
