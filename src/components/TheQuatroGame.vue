<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

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
