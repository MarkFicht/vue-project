<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import {
    cardsTierOne,
    cardsTierTwo,
    cardsTierThree,
    cardsTierGuild
} from '../helpers/GameDuelInit';
import DuelGameCardComponent from '@/components/DuelGameCardComponent.vue';
import type { GameDuelCard } from '@/interfaces/GameDuel';

const gameDuel = ref<string>('Duel Game');
const isLoggedIn = ref<boolean>(false);

const tierCards = ref<Array<GameDuelCard[]>>([[]]);

// ---
let auth: any;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else isLoggedIn.value = false;
    });

    prepareTierOne(getRandomObjFromArr(cardsTierOne, 20));
});

// ---
const cardClick = (gameCard: GameDuelCard) => {
    console.log('%c card -> ', 'background: #222; color: #bada55', gameCard);

    // remove action
    if (!!gameCard.coversBy && gameCard.coversBy.length > 0) {
        //
    } else {
        let arr: Array<GameDuelCard[]> = [];
        tierCards.value.forEach((row) => {
            let firstNest: any[] = [];
            row.forEach((card) => {
                firstNest.push({
                    ...card,
                    coversBy: card?.coversBy
                        ? card.coversBy.filter((id) => {
                              return id !== gameCard.id;
                          })
                        : []
                });
            });
            arr.push(firstNest);
        });

        let arr2: Array<GameDuelCard[]> = [];
        arr.forEach((row) => {
            // arr2.push(row.filter((card: GameDuelCard) => card.id !== gameCard.id));
            arr2.push(
                row.map((card: GameDuelCard) => {
                    return card.id !== gameCard.id ? card : { ...card, taken: true };
                })
            );
        });

        tierCards.value = arr2;
    }
};

function getRandomObjFromArr(arr: GameDuelCard[], n: number) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len) throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function prepareTierOne(arr: GameDuelCard[]) {
    arr.map((data, i) => {
        let j = i + 1;
        let k = 0;
        if (i < 2) k = 2;
        else if (i < 5) k = 3;
        else if (i < 9) k = 4;
        else if (i < 14) k = 5;
        else if (i < 20) k = 0;
        return { ...data, id: j, coversBy: k !== 0 ? [j + k, j + k + 1] : [] };
    }).forEach((data, i) => {
        if (i < 2) tierCards.value[0].push(data);
        else if (i === 2) tierCards.value.push([data]);
        else if (i < 5) tierCards.value[1].push(data);
        else if (i === 5) tierCards.value.push([data]);
        else if (i < 9) tierCards.value[2].push(data);
        else if (i === 9) tierCards.value.push([data]);
        else if (i < 14) tierCards.value[3].push(data);
        else if (i === 14) tierCards.value.push([data]);
        else if (i < 20) tierCards.value[4].push(data);
    });
}
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ gameDuel }}</h1>
        </header>

        <section class="wrapper">
            <section class="player2info"></section>
            <section class="player2"></section>
            <section class="wonders2"></section>
            <section class="cards">
                <section class="row row1">
                    <DuelGameCardComponent
                        v-for="(card, index) in tierCards[0]"
                        :key="index"
                        :card="card"
                        @click="cardClick(card)"
                    />
                </section>
                <section class="row row2">
                    <DuelGameCardComponent
                        v-for="(card, index) in tierCards[1]"
                        :key="index"
                        :card="card"
                        @click="cardClick(card)"
                    />
                </section>
                <section class="row row3">
                    <DuelGameCardComponent
                        v-for="(card, index) in tierCards[2]"
                        :key="index"
                        :card="card"
                        @click="cardClick(card)"
                    />
                </section>
                <section class="row row4">
                    <DuelGameCardComponent
                        v-for="(card, index) in tierCards[3]"
                        :key="index"
                        :card="card"
                        @click="cardClick(card)"
                    />
                </section>
                <section class="row row5">
                    <DuelGameCardComponent
                        v-for="(card, index) in tierCards[4]"
                        :key="index"
                        :card="card"
                        @click="cardClick(card)"
                    />
                </section>
                <!-- <section class="row row6"></section> -->

                <!-- <DuelGameCardComponent
                    v-for="(card, index) in cardsTierOne"
                    :key="index"
                    :card="card"
                /> -->
            </section>
            <section class="duel"></section>
            <section class="graveyard"></section>
            <section class="player1info"></section>
            <section class="wonders1"></section>
            <section class="player1"></section>

            <!-- <section class="cards">
            <DuelGameCardComponent v-for="(card, index) in cardsTierTwo" :key="index" :card="card" />
        </section> -->

            <!-- <section class="cards">
            <DuelGameCardComponent v-for="(card, index) in cardsTierThree" :key="index" :card="card" />
        </section> -->

            <!-- <section class="cards">
            <DuelGameCardComponent v-for="(card, index) in cardsTierGuild" :key="index" :card="card" />
        </section> -->
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.header {
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
    margin-bottom: 25px;
    text-align: center;
}
h1 {
    font-weight: 600;
    font-size: 2.1rem;
    color: #eee;
    filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.8));
    letter-spacing: 0.1em;
}
/* --- Wrapper card --- */
section.wrapper {
    position: relative;
    width: 90vw;
    height: calc(100vh - 116px);
    padding: 30px;
    margin-bottom: 40px;
    color: #444;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.25);
    /* box-shadow:
        15px 15px 20px rgba(0, 0, 0, 0.1),
        -15px -15px 20px rgba(0, 0, 0, 0.1); */
    border-radius: 20px;
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */
    display: grid;
    grid-template-areas:
        'w2   p2   p2   p2   p2   p1i '
        'w2   card card card duel p2i '
        '.    card card card duel .   '
        '.    card card card duel grv '
        'w1   card card card duel grv '
        'w1   p1   p1   p1   p1   .   ';
    grid-template-columns: 2fr 3fr 2fr 2fr 1fr 2fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: #eee;
    animation: showElement 2s linear;
}
.player2 {
    grid-area: p2;
    border: 1px solid;
}
.player2info {
    grid-area: p2i;
    border: 1px solid;
}
.wonders2 {
    grid-area: w2;
    border: 1px solid;
}
.player1 {
    grid-area: p1;
    border: 1px solid;
}
.player1info {
    grid-area: p1i;
    border: 1px solid;
}
.wonders1 {
    grid-area: w1;
    border: 1px solid;
}
.cards {
    position: relative;
    grid-area: card;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.cards .row {
    height: 70px;
    width: 100%;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cards .row1 {
    position: absolute;
    top: 50%;
    transform: translatey(-210%);
    /* background-color: rgba(255, 0, 0, 1); */
    z-index: 2;
}
.cards .row2 {
    position: absolute;
    top: 50%;
    transform: translatey(-140%);
    /* background-color: rgba(255, 255, 0, 1); */
    z-index: 3;
}
.cards .row3 {
    position: absolute;
    top: 50%;
    transform: translatey(-70%);
    /* background-color: rgba(255, 0, 255, 1); */
    z-index: 4;
}
.cards .row4 {
    position: absolute;
    top: 50%;
    transform: translatey(0);
    /* background-color: rgba(0, 0, 255, 1); */
    z-index: 5;
}
.cards .row5 {
    position: absolute;
    top: 50%;
    transform: translatey(70%);
    /* background-color: rgba(0, 255, 255, 1); */
    z-index: 6;
}
.cards .row6 {
    position: absolute;
    top: 50%;
    transform: translatey(140%);
    /* background-color: rgba(255, 0, 25, 1); */
    z-index: 7;
}
.duel {
    grid-area: duel;
    border: 1px solid;
}
.graveyard {
    grid-area: grv;
    border: 1px solid;
}
@keyframes showElement {
    0%,
    30% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@media (max-width: 720px) {
    /* .header {
        height: 25px;
        line-height: 25px;
        margin-bottom: 20px;
    }
    h1 {
        font-size: 1.8rem;
    }
    section.wrapper {
        padding: 20px 25px;
        margin: 0 auto;
        height: calc(100vh - 210px);
    } */
}
@media (max-width: 560px) {
    /* .header {
        height: 25px;
        line-height: 25px;
        margin-top: 5px;
    }
    section.wrapper {
        height: calc(100vh - 200px);
    }
    section.nav {
        transform: scale(0.7);
        margin: 0;
        margin-top: 35px;
    } */
}
@media (max-width: 360px) {
    /* section.nav {
        transform: scale(0.65);
    } */
}
</style>
