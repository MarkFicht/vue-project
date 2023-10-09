<script setup lang="ts">
import { ref } from 'vue';

const goToGame = ref<string>('Go to game');

const props = defineProps<{
    header: String;
    video: any;
    desc: string;
    color: string;
    routeTo: string;
}>();
</script>

<template>
    <div class="card" :style="`${color}`">
        <div class="box">{{ video }}</div>
        <div class="box">
            <h2>{{ header }}</h2>
            <p>{{ desc }}</p>
            <RouterLink :to="routeTo" :class="'cardButton'">{{ goToGame }}</RouterLink>
        </div>
        <div class="circle">
            <h2>{{ props.header }}</h2>
            <h3>{{ 'CLOSE' }}</h3>
        </div>
    </div>
</template>

<style scoped>
.gameContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    position: relative;
    width: 300px;
    height: 415px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px 60px;
}
.card .box {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 20px;
}
.card .box h2 {
    text-align: right;
    width: 100%;
    margin-bottom: 25px;
    font-size: 1.9em;
    filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.66));
}
.card .box p {
    font-size: 0.9em;
}
.card .box:nth-child(1)::before {
    content: '';
    position: absolute;
    top: 106px;
    left: -1px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-bottom-left-radius: 20px;
    box-shadow: -6px 6px #eee;
}
.card .box:nth-child(1)::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 105px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-bottom-left-radius: 20px;
    box-shadow: -6px 6px #eee;
}
.card .box:nth-child(2)::before {
    content: '';
    position: absolute;
    bottom: 106px;
    left: -1px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-top-left-radius: 20px;
    box-shadow: -6px -6px #eee;
}
.card .box:nth-child(2)::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 109px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-top-left-radius: 20px;
    box-shadow: -6px -6px #eee;
}
.card .circle {
    position: absolute;
    width: 180px;
    height: 180px;
    background-color: var(--clr);
    border-radius: 50%;
    top: 50%;
    left: -70px;
    color: #eee;
    transform: translateY(-50%);
    border: 10px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3)); */
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.card .box:nth-child(2) {
    background: #fff;
}
.cardButton {
    padding: 8px 30px;
    position: absolute;
    bottom: -30px;
    border: none;
    outline: none;
    border-radius: 30px;
    color: #fff;
    background-color: var(--clr);
    font-size: 1em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.5s;
    /* border: 5px solid #eee; */
    /* box-shadow: 0 0 0 10px #fff; */
    border: 12px solid #eee;
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.3) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.25) inset;
}
.cardButton:hover {
    letter-spacing: 0.4em;
    background-color: tomato;
}
h2 {
    font-size: 2em;
    line-height: 0.9em;
    margin-bottom: 10px;
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
