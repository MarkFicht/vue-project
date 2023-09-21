<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
    cardsTierOne,
    cardsTierTwo,
    cardsTierThree,
    cardsTierGuild,
    tierOneX,
    tierOneY,
    tierTwoX,
    tierTwoY,
    tierThreeX,
    tierThreeY,
    prepareIdForCards
} from '../helpers/GameDuelInit';
import { getCountRandomObjFromArr } from '@/helpers/HelpersFoo';
import DuelGameCardComponent from '@/components/DuelGameCardComponent.vue';
import type { IGameDuelCard, State } from '@/interfaces/GameDuel';

const state = ref<State>('I');

const headerGameDuel = ref<string>('Duel Game');
const isLoggedIn = ref<boolean>(false);

const tierOneCards = ref<IGameDuelCard[]>([]);
const tierTwoCards = ref<IGameDuelCard[]>([]);
const tierThreeCards = ref<IGameDuelCard[]>([]);

// ---
let auth: any;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else isLoggedIn.value = false;
    });

    tierOneCards.value = prepareIdForCards(getCountRandomObjFromArr(cardsTierOne, 20), 'I');
    tierTwoCards.value = prepareIdForCards(getCountRandomObjFromArr(cardsTierTwo, 20), 'II');
    tierThreeCards.value = prepareIdForCards(
        getCountRandomObjFromArr(
            [
                ...getCountRandomObjFromArr(cardsTierThree, 17),
                ...getCountRandomObjFromArr(cardsTierGuild, 3)
            ],
            20
        ),
        'III'
    );
});

// ---
const cardClick = (gameCard: IGameDuelCard) => {
    //TODO - add action: buy, add in wonder, sell
    //TODO - prepare 3 buttons after select card, for it
    //TODO - change compnent duelgamecardcomponent.vue

    // ACTION SELL
    if (!!gameCard.coversBy && gameCard.coversBy.length > 0) {
        //
    } else {
        if (state.value === 'I')
            tierOneCards.value = setCard(tierOneCards.value, gameCard, 'graveyard');
        if (state.value === 'II')
            tierTwoCards.value = setCard(tierTwoCards.value, gameCard, 'graveyard');
        if (state.value === 'III')
            tierThreeCards.value = setCard(tierThreeCards.value, gameCard, 'graveyard');
    }
};

const setCard = (
    arr: IGameDuelCard[],
    gameCard: IGameDuelCard,
    action: IGameDuelCard['taken']
): IGameDuelCard[] => {
    let prepareArr: IGameDuelCard[] = [];

    if (action === 'graveyard') {
        arr.forEach((card) => {
            prepareArr.push({
                ...card,
                taken: card.id === gameCard.id ? 'graveyard' : card.taken,
                coversBy: card?.coversBy
                    ? card.coversBy.filter((id) => {
                          return id !== gameCard.id;
                      })
                    : []
            });
        });
    }
    return prepareArr;
};
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ headerGameDuel }}</h1>
        </header>

        <section class="wrapper">
            <section class="player2info"></section>
            <section class="player2"></section>
            <section class="wonders2"></section>
            <section class="cards" v-if="state === 'I'">
                <DuelGameCardComponent
                    v-for="(card, index) in tierOneCards"
                    :key="index"
                    :card="card"
                    :x="tierOneX[index]"
                    :y="tierOneY[index]"
                    @click="cardClick(card)"
                />
            </section>
            <section class="cards" v-if="state === 'II'">
                <DuelGameCardComponent
                    v-for="(card, index) in tierTwoCards"
                    :key="index"
                    :card="card"
                    :x="tierTwoX[index]"
                    :y="tierTwoY[index]"
                    @click="cardClick(card)"
                />
            </section>
            <section class="cards" v-if="state === 'III'">
                <DuelGameCardComponent
                    v-for="(card, index) in tierThreeCards"
                    :key="index"
                    :card="card"
                    :x="tierThreeX[index]"
                    :y="tierThreeY[index]"
                    @click="cardClick(card)"
                />
            </section>
            <section class="duel"></section>
            <section class="graveyard"></section>
            <section class="player1info"></section>
            <section class="wonders1"></section>
            <section class="player1">
                <div class="playerCardContainer">
                    <div class="playerCard1"></div>
                    <div class="playerCard2"></div>
                    <div class="playerCard3"></div>
                    <div class="playerCard4"></div>
                    <div class="playerCard5"></div>
                    <div class="playerCard6"></div>
                    <div class="playerCard7"></div>
                </div>
                <div class="playerPointsContainer">
                    <div class="playerCash"></div>
                    <div class="playerCoins"></div>
                </div>
            </section>
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
    grid-template-columns: 2fr 3fr 2fr 1fr 1fr 3fr;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.player1 div {
    width: 60px;
    height: 100%;
    border-radius: 5px;
}
div.playerCardContainer {
    width: 70%;
    display: flex;
    justify-content: left;
    align-items: center;
}
div.playerCardContainer div {
    margin: 0 2px;
}
div.playerPointsContainer {
    border: 1px solid;
    width: 30%;
}
.playerCard1 {
    background-image: linear-gradient(to bottom, rgb(197, 96, 13), 7%, rgba(0, 0, 0, 0));
}
.playerCard2 {
    background-image: linear-gradient(to bottom, rgb(131, 121, 114), 7%, rgba(0, 0, 0, 0));
}
.playerCard3 {
    background-image: linear-gradient(to bottom, rgb(255, 239, 9), 7%, rgba(0, 0, 0, 0));
}
.playerCard4 {
    background-image: linear-gradient(to bottom, rgb(25, 48, 255), 7%, rgba(0, 0, 0, 0));
}
.playerCard5 {
    background-image: linear-gradient(to bottom, rgb(255, 26, 26), 7%, rgba(0, 0, 0, 0));
}
.playerCard6 {
    background-image: linear-gradient(to bottom, rgb(18, 219, 0), 7%, rgba(0, 0, 0, 0));
}
.playerCard7 {
    background-image: linear-gradient(to bottom, rgb(124, 11, 189), 7%, rgba(0, 0, 0, 0));
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
