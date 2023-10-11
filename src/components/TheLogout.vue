<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const props = defineProps<{
    header: String;
}>();

const router = useRouter();

// ---
let auth: any;
onMounted(() => {
    auth = getAuth();
});

// ---
const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/');
    });
};
</script>

<template>
    <h2>{{ props.header }}</h2>
    <button :class="'customButton'" @click="handleSignOut">log out</button>
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
