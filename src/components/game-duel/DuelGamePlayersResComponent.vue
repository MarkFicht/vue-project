<script setup lang="ts">
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import DuelGameCardComponent from '@/components/game-duel/DuelGameCardComponent.vue';
import DuelGameWonderComponent from '@/components/game-duel/DuelGameWonderComponent.vue';
import DuelGameCoinComponent from '@/components/game-duel/DuelGameCoinComponent.vue';
import { toRefs, inject } from 'vue';
import type IUser from '@/interfaces/User';

const storeDuelGame = duelGameStore();
const { player1, player2, turn, tier, destroyBrown, destroyGrey } = storeToRefs(storeDuelGame);

const emit = defineEmits(['destrooy-enemy-card-selected']);
const props = defineProps<{
    isMyTurn: boolean;
    user: IUser;
    selectWonderCard: boolean;
}>();
const { user } = toRefs(props);

const showPrice = inject<any>('showPrice');
const wonderCardSelected = inject<any>('wonderCardSelected');

function countArtefacts(uid: string): number {
    if (uid === player1.value.user.uid) {
        let art = 0;
        if (player1.value.resources.coins.find((coin) => coin === 'artefact7')) {
            art += 1;
        }
        const arrOfArt = player1.value.cards.green.map((green) => green.valuePower[0]);
        return (art += [...new Set(arrOfArt)].length);
    } else {
        let art = 0;
        if (player2.value.resources.coins.find((coin) => coin === 'artefact7')) {
            art += 1;
        }
        const arrOfArt = player2.value.cards.green.map((green) => green.valuePower[0]);
        return (art += [...new Set(arrOfArt)].length);
    }
}
</script>

<template>
    <!-- UP SECTION -->
    <section
        :class="['wonders', user.uid === player1.user.uid ? 'wonders1' : 'wonders2', 'customInput']"
    >
        <DuelGameWonderComponent
            v-for="wonderCard in player1.wonderCards"
            :card="wonderCard"
            :key="wonderCard.id"
            :cash="showPrice(wonderCard, `${player1.user.uid}`)"
            :resCash="player1.resources.cash"
            :class="[
                selectWonderCard &&
                    showPrice(wonderCard, `${player1.user.uid}`) <= player1.resources.cash &&
                    'selectWonderFromPlayer'
            ]"
            @click="
                tier !== 'prepare' && selectWonderCard
                    ? wonderCardSelected(wonderCard, player1.resources.cash)
                    : null
            "
        />
    </section>
    <section :class="['playerSection', user.uid === player1.user.uid ? 'player1' : 'player2']">
        <div class="playerCardContainer">
            <div
                :class="[
                    'playerCard',
                    'playerCard1',
                    user.uid === player2.user.uid &&
                        isMyTurn &&
                        destroyBrown !== '' &&
                        'selectWonderFromPlayer'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player1.cards.brown"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        user.uid === player2.user.uid && isMyTurn && destroyBrown !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        user.uid === player2.user.uid && isMyTurn && destroyBrown !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'brown')
                            : null
                    "
                />
            </div>
            <div
                :class="[
                    'playerCard',
                    'playerCard2',
                    user.uid === player2.user.uid &&
                        isMyTurn &&
                        destroyGrey !== '' &&
                        'selectWonderFromPlayer'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player1.cards.grey"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        user.uid === player2.user.uid && isMyTurn && destroyGrey !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        user.uid === player2.user.uid && isMyTurn && destroyGrey !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'grey')
                            : null
                    "
                />
            </div>
            <div class="playerCard playerCard3">
                <DuelGameCardComponent
                    v-for="card in player1.cards.yellow"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard4">
                <DuelGameCardComponent
                    v-for="card in player1.cards.blue"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard5">
                <DuelGameCardComponent
                    v-for="card in player1.cards.red"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard6">
                <div class="countArt">
                    {{ countArtefacts(`${player1.user.uid}`) + '/6' }}
                </div>
                <DuelGameCardComponent
                    v-for="card in player1.cards.green.sort(
                        (a, b) => a.valuePower[0] - b.valuePower[0]
                    )"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard7">
                <DuelGameCardComponent
                    v-for="card in player1.cards.purple"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
        </div>
        <div class="playerPointsContainer">
            <div class="playerRes">
                <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                    {{ `${player1.user.displayName || player1.user.email}` }}
                </p>
                <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                    {{ `Status: online` }}
                </p>
                <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                    {{ `$: ${player1.resources.cash}` }}
                    <ion-icon name="ribbon-sharp" :style="'margin-left: 10px;'"></ion-icon
                    >{{ `: ${player1.points}` }}
                </p>
            </div>
            <div class="playerCoins customInput">
                <DuelGameCoinComponent
                    v-for="coin in player1.resources.coins"
                    :key="coin"
                    :coin="coin"
                />
            </div>
        </div>
    </section>

    <!-- DOWN SECTION -->
    <section
        :class="['wonders', user.uid === player1.user.uid ? 'wonders2' : 'wonders1', 'customInput']"
    >
        <DuelGameWonderComponent
            v-for="wonderCard in player2.wonderCards"
            :card="wonderCard"
            :key="wonderCard.id"
            :cash="showPrice(wonderCard, `${player2.user.uid}`)"
            :resCash="player2.resources.cash"
            :class="[
                selectWonderCard &&
                    showPrice(wonderCard, `${player2.user.uid}`) <= player2.resources.cash &&
                    'selectWonderFromPlayer'
            ]"
            @click="
                tier !== 'prepare' && selectWonderCard
                    ? wonderCardSelected(wonderCard, player2.resources.cash)
                    : null
            "
        />
    </section>
    <section :class="['playerSection', user.uid === player1.user.uid ? 'player2' : 'player1']">
        <div class="playerCardContainer">
            <div
                :class="[
                    'playerCard',
                    'playerCard1',
                    user.uid === player1.user.uid &&
                        isMyTurn &&
                        destroyBrown !== '' &&
                        'selectWonderFromPlayer'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player2.cards.brown"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        user.uid === player1.user.uid && isMyTurn && destroyBrown !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        user.uid === player1.user.uid && isMyTurn && destroyBrown !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'brown')
                            : null
                    "
                />
            </div>
            <div
                :class="[
                    'playerCard',
                    'playerCard2',
                    user.uid === player1.user.uid &&
                        isMyTurn &&
                        destroyGrey !== '' &&
                        'selectWonderFromPlayer'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player2.cards.grey"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        user.uid === player1.user.uid && isMyTurn && destroyGrey !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        user.uid === player1.user.uid && isMyTurn && destroyGrey !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'grey')
                            : null
                    "
                />
            </div>
            <div class="playerCard playerCard3">
                <DuelGameCardComponent
                    v-for="card in player2.cards.yellow"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard4">
                <DuelGameCardComponent
                    v-for="card in player2.cards.blue"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard5">
                <DuelGameCardComponent
                    v-for="card in player2.cards.red"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard6">
                <div class="countArt">
                    {{ countArtefacts(`${player2.user.uid}`) + '/6' }}
                </div>
                <DuelGameCardComponent
                    v-for="card in player2.cards.green.sort(
                        (a, b) => a.valuePower[0] - b.valuePower[0]
                    )"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCard playerCard7">
                <DuelGameCardComponent
                    v-for="card in player2.cards.purple"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
        </div>
        <div class="playerPointsContainer">
            <div class="playerRes">
                <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                    {{ `${player2.user.displayName || player2.user.email}` }}
                </p>
                <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                    {{ `Status: online` }}
                </p>
                <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                    {{ `$: ${player2.resources.cash}` }}
                    <ion-icon name="ribbon-sharp" :style="'margin-left: 10px;'"></ion-icon
                    >{{ `: ${player2.points}` }}
                </p>
            </div>
            <div class="playerCoins customInput">
                <DuelGameCoinComponent
                    v-for="coin in player2.resources.coins"
                    :key="coin"
                    :coin="coin"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
.playerSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.playerCardContainer {
    width: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playerPointsContainer {
    height: 100%;
    width: 180px;
    margin-right: 20px;
    border-radius: 10px;
    box-shadow:
        5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
}
.playerRes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
}
.playerRes > p {
    height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playerCoins {
    height: 50px;
    width: 160px;
    margin: 10px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
}
.playerCoins > span {
    margin: 0 5px;
}
.player1 {
    grid-area: p1;
}
.player2 {
    grid-area: p2;
}
.playerCard {
    width: 50px;
    height: 150px;
    border-radius: 5px;
    margin: 0 5px;
}
.playerCard1 {
    background-image: linear-gradient(to bottom, rgb(197, 96, 13), 7%, transparent);
}
.playerCard2 {
    background-image: linear-gradient(to bottom, rgb(131, 121, 114), 7%, transparent);
}
.playerCard3 {
    background-image: linear-gradient(to bottom, rgb(255, 239, 9), 7%, transparent);
}
.playerCard4 {
    background-image: linear-gradient(to bottom, rgb(25, 48, 255), 7%, transparent);
}
.playerCard5 {
    background-image: linear-gradient(to bottom, rgb(255, 26, 26), 7%, transparent);
}
.playerCard6 {
    background-image: linear-gradient(to bottom, rgb(18, 219, 0), 7%, transparent);
    position: relative;
}
.countArt {
    position: absolute;
    top: -18px;
    font-size: 9px;
    left: 50%;
    transform: translateX(-50%);
}
.playerCard7 {
    background-image: linear-gradient(to bottom, rgb(124, 11, 189), 7%, transparent);
}
/* --- */
.wonders {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 155px;
    width: 230px;
    padding: 5px;
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.15));
}
.wonders1 {
    grid-area: w1;
}
.wonders2 {
    grid-area: w2;
}
.selectWonderFromPlayer {
    border: 3px dotted tomato;
}
</style>
