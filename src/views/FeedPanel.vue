<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const header = ref<string>('Feed Panel');

const isLoggedIn = ref<boolean>(false);
const router = useRouter();

let auth: any;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else isLoggedIn.value = false;
    });
});

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/');
    });
};
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ header }}</h1>
        </header>
        <button @click="handleSignOut">log out</button>
    </main>
</template>

<style scoped></style>
