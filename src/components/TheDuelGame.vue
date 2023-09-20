<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import {
    cardsTierOne,
    cardsTierTwo,
    cardsTierThree,
    cardsTierGuild
} from '../helpers/GameDuelInit';
import DuelGameCardComponent from '@/components/DuelGameCardComponent.vue';

const props = defineProps<{
    header: String;
}>();

const isLoggedIn = ref<boolean>(false);

// ---
let auth: any;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else isLoggedIn.value = false;
    });
});
</script>

<template>
    <h2>{{ props.header }}</h2>

    <RouterLink :to="'/feed/duel-game'">{{ 'Go to game' }}</RouterLink>

    <!-- <section class="cards">
        <DuelGameCardComponent v-for="(card, index) in cardsTierOne" :key="index" :card="card" />
    </section> -->

    <!-- <section class="cards">
        <DuelGameCardComponent v-for="(card, index) in cardsTierTwo" :key="index" :card="card" />
    </section> -->

    <!-- <section class="cards">
        <DuelGameCardComponent v-for="(card, index) in cardsTierThree" :key="index" :card="card" />
    </section> -->

    <!-- <section class="cards">
        <DuelGameCardComponent v-for="(card, index) in cardsTierGuild" :key="index" :card="card" />
    </section> -->
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
