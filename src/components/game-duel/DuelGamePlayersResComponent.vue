<script setup lang="ts">
import { duelGameStore } from '@/store/duelGameStore';
import { showPrice } from '@/helpers/GameDuelHelpersFoo';
import { storeToRefs } from 'pinia';
import DuelGameCardComponent from '@/components/game-duel/DuelGameCardComponent.vue';
import DuelGameWonderComponent from '@/components/game-duel/DuelGameWonderComponent.vue';
import DuelGameCoinComponent from '@/components/game-duel/DuelGameCoinComponent.vue';
import { toRefs, inject } from 'vue';
import type IUser from '@/interfaces/User';

const storeDuelGame = duelGameStore();
const { player1, player2, turn, tier, destroyBrown, destroyGrey, wonByArt } =
    storeToRefs(storeDuelGame);

const emit = defineEmits(['destrooy-enemy-card-selected']);
const props = defineProps<{
    isMyTurn: boolean;
    currentUserId: IUser['uid'];
    selectWonderCard: boolean;
}>();
const { currentUserId } = toRefs(props);

const wonderCardSelected = inject<any>('wonderCardSelected');

function getNumberOfArtefacts(uid: string): number {
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
    <section :class="['wonders', currentUserId === player1.user.uid ? 'wonders1' : 'wonders2']">
        <DuelGameWonderComponent
            v-for="wonderCard in player1.wonderCards"
            :card="wonderCard"
            :key="wonderCard.id"
            :cash="showPrice(wonderCard, `${player1.user.uid}`)"
            :resCash="player1.resources.cash"
            :class="[
                selectWonderCard &&
                    isMyTurn &&
                    currentUserId === player1.user.uid &&
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
    <section
        :class="[
            'playerCardsTierSection',
            currentUserId === player1.user.uid
                ? 'playerCardsTierSection1'
                : 'playerCardsTierSection2'
        ]"
    >
        <div class="playerCardsContainer">
            <div
                :class="[
                    'playerCardColorContainer',
                    'playerCard1',
                    destroyBrown === player2.user.uid &&
                        destroyBrown !== '' &&
                        'selectCardToDestroy'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player1.cards.brown"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        currentUserId === player2.user.uid && isMyTurn && destroyBrown !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        currentUserId === player2.user.uid && isMyTurn && destroyBrown !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'brown')
                            : null
                    "
                />
            </div>
            <div
                :class="[
                    'playerCardColorContainer',
                    'playerCard2',
                    destroyGrey === player2.user.uid && destroyGrey !== '' && 'selectCardToDestroy'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player1.cards.grey"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        currentUserId === player2.user.uid && isMyTurn && destroyGrey !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        currentUserId === player2.user.uid && isMyTurn && destroyGrey !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'grey')
                            : null
                    "
                />
            </div>
            <div class="playerCardColorContainer playerCard3">
                <DuelGameCardComponent
                    v-for="card in player1.cards.yellow"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCardColorContainer playerCard4">
                <DuelGameCardComponent
                    v-for="card in player1.cards.blue"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCardColorContainer playerCard5">
                <DuelGameCardComponent
                    v-for="card in player1.cards.red"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div
                :class="[
                    'playerCardColorContainer',
                    'playerCard6',
                    wonByArt !== '' && wonByArt === player1.user.uid && 'artWin'
                ]"
            >
                <div
                    :class="[
                        'countArt',
                        currentUserId === player1.user.uid ? '' : 'reverseCountArt'
                    ]"
                >
                    {{ getNumberOfArtefacts(`${player1.user.uid}`) + '/6' }}
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
            <div class="playerCardColorContainer playerCard7">
                <DuelGameCardComponent
                    v-for="card in player1.cards.purple"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
        </div>
    </section>
    <section
        :class="[
            'playerResContainer',
            currentUserId === player1.user.uid ? 'playerResContainer1' : 'playerResContainer2'
        ]"
    >
        <div class="playerCashPointsContainer">
            <div v-if="turn === player1.user.uid" class="animateHand">
                <ion-icon name="time-sharp"></ion-icon>
            </div>
            <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                {{ `${player1.user.displayName || player1.user.email}` }}
            </p>
            <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                {{ `Status: online` }}
            </p>
            <div class="cashPointsContainer">
                <div class="cashSum">{{ player1.resources.cash }}</div>
                <div class="cashSum pointSum">{{ player1.points }}</div>
            </div>
        </div>
        <div class="playerCoins customInput">
            <DuelGameCoinComponent
                v-for="coin in player1.resources.coins"
                :key="coin"
                :coin="coin"
            />
        </div>
    </section>

    <!-- DOWN SECTION -->
    <section :class="['wonders', currentUserId === player1.user.uid ? 'wonders2' : 'wonders1']">
        <DuelGameWonderComponent
            v-for="wonderCard in player2.wonderCards"
            :card="wonderCard"
            :key="wonderCard.id"
            :cash="showPrice(wonderCard, `${player2.user.uid}`)"
            :resCash="player2.resources.cash"
            :class="[
                selectWonderCard &&
                    isMyTurn &&
                    currentUserId === player2.user.uid &&
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
    <section
        :class="[
            'playerCardsTierSection',
            currentUserId === player1.user.uid
                ? 'playerCardsTierSection2'
                : 'playerCardsTierSection1'
        ]"
    >
        <div class="playerCardsContainer">
            <div
                :class="[
                    'playerCardColorContainer',
                    'playerCard1',
                    destroyBrown === player1.user.uid &&
                        destroyBrown !== '' &&
                        'selectCardToDestroy'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player2.cards.brown"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        currentUserId === player1.user.uid && isMyTurn && destroyBrown !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        currentUserId === player1.user.uid && isMyTurn && destroyBrown !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'brown')
                            : null
                    "
                />
            </div>
            <div
                :class="[
                    'playerCardColorContainer',
                    'playerCard2',
                    destroyGrey === player1.user.uid && destroyGrey !== '' && 'selectCardToDestroy'
                ]"
            >
                <DuelGameCardComponent
                    v-for="card in player2.cards.grey"
                    :key="card.id"
                    :card="card"
                    small
                    :style="
                        currentUserId === player1.user.uid && isMyTurn && destroyGrey !== ''
                            ? 'cursor: pointer;'
                            : ''
                    "
                    @click="
                        currentUserId === player1.user.uid && isMyTurn && destroyGrey !== ''
                            ? emit('destrooy-enemy-card-selected', card, 'grey')
                            : null
                    "
                />
            </div>
            <div class="playerCardColorContainer playerCard3">
                <DuelGameCardComponent
                    v-for="card in player2.cards.yellow"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCardColorContainer playerCard4">
                <DuelGameCardComponent
                    v-for="card in player2.cards.blue"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div class="playerCardColorContainer playerCard5">
                <DuelGameCardComponent
                    v-for="card in player2.cards.red"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
            <div
                :class="[
                    'playerCardColorContainer',
                    'playerCard6',
                    wonByArt !== '' && wonByArt === player2.user.uid && 'artWin'
                ]"
            >
                <div
                    :class="[
                        'countArt',
                        currentUserId === player1.user.uid ? 'reverseCountArt' : ''
                    ]"
                >
                    {{ getNumberOfArtefacts(`${player2.user.uid}`) + '/6' }}
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
            <div class="playerCardColorContainer playerCard7">
                <DuelGameCardComponent
                    v-for="card in player2.cards.purple"
                    :key="card.id"
                    :card="card"
                    small
                />
            </div>
        </div>
    </section>
    <section
        :class="[
            'playerResContainer',
            currentUserId === player1.user.uid ? 'playerResContainer2' : 'playerResContainer1'
        ]"
    >
        <div class="playerCashPointsContainer">
            <div v-if="turn === player2.user.uid" class="animateHand">
                <ion-icon name="time-sharp"></ion-icon>
            </div>
            <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                {{ `${player2.user.displayName || player2.user.email}` }}
            </p>
            <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                {{ `Status: online` }}
            </p>
            <div class="cashPointsContainer">
                <div class="cashSum">{{ player2.resources.cash }}</div>
                <div class="cashSum pointSum">{{ player2.points }}</div>
            </div>
        </div>
        <div class="playerCoins customInput">
            <DuelGameCoinComponent
                v-for="coin in player2.resources.coins"
                :key="coin"
                :coin="coin"
            />
        </div>
    </section>
</template>

<style scoped>
/* === CARDS WONDERS - background === */
.wonders {
    height: 100%;
    width: calc(var(--width-wonder) * 2 + 35px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.33));
}
.wonders > div {
    /* transform: scale(1.25); */
}
.wonders1 {
    grid-area: w1;
    align-items: end;
}
.wonders2 {
    grid-area: w2;
    align-items: start;
}
/* === CARDS TIER - background === */
.playerCardsTierSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.playerCardsTierSection1 {
    grid-area: p1;
}
.playerCardsTierSection2 {
    grid-area: p2;
}
.playerCardsContainer {
    width: calc(var(--width-tier) * 7 + 24px);
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.playerCardColorContainer {
    width: var(--width-tier);
    height: calc(1 / 4 * var(--height-tier) * 7 + 6px);
    border-radius: 5px;
}
.playerCard1 {
    background-image: linear-gradient(to bottom, rgba(197, 96, 13, 0.33), 60%, transparent);
}
.playerCard2 {
    background-image: linear-gradient(to bottom, rgba(131, 121, 114, 0.33), 60%, transparent);
}
.playerCard3 {
    background-image: linear-gradient(to bottom, rgba(255, 239, 9, 0.33), 60%, transparent);
}
.playerCard4 {
    background-image: linear-gradient(to bottom, rgba(25, 48, 255, 0.33), 60%, transparent);
}
.playerCard5 {
    background-image: linear-gradient(to bottom, rgba(255, 26, 26, 0.33), 60%, transparent);
}
.playerCard6 {
    background-image: linear-gradient(to bottom, rgba(18, 219, 0, 0.33), 60%, transparent);
    position: relative;
}
.countArt {
    position: absolute;
    top: -18px;
    font-size: 9px;
    left: 50%;
    transform: translateX(-50%);
}
.reverseCountArt {
    left: 110%;
    top: 182px;
}
.playerCard7 {
    background-image: linear-gradient(to bottom, rgba(124, 11, 189, 0.33), 60%, transparent);
}

/* === PLAYER RESOURCES - cash, points, coins === */
.playerResContainer {
    height: calc(1 / 4 * var(--height-tier) * 7 - 44px);
    width: var(--width-board);
    border-radius: 10px;
    /* box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px rgba(255, 255, 255, 1); */
    gap: 7px;
    display: flex;
    align-items: start;
    flex-direction: column;
}
.playerResContainer1 {
    grid-area: c1;
    justify-content: end;
}
.playerResContainer2 {
    grid-area: c2;
    justify-content: start;
    flex-direction: column-reverse;
}
.playerCashPointsContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
}
.playerCashPointsContainer > p {
    height: 22px;
    width: 100%;
    line-height: 22px;
    margin: 0;
    padding: 0 12px;
    font-size: 0.85em;
    display: flex;
    justify-content: start;
    align-items: center;
}
.cashPointsContainer {
    position: relative;
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cashSum {
    bottom: 50%;
    right: 50%;
    transform: translateX(-50%) translateY(50%) scale(1.35);
}
.pointSum {
    bottom: 50%;
    right: 50%;
    transform: translateX(150%) translateY(50%) scale(1.25);
}
.animateHand {
    position: absolute;
    top: 46px;
    left: 18px;
    margin-left: 5px;
    animation: animateHand 1s infinite ease-in-out;
}
.playerCoins {
    height: 46px;
    width: calc(var(--width-board) - 20px);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
}
.playerCoins > span {
    margin: 0 5px;
}

/* === === */
.selectWonderFromPlayer::after {
    content: '';
    position: relative;
    width: var(--width-wonder);
    height: var(--height-wonder);
    display: flex;
    border-radius: 5px;
    z-index: 1000;
    border: 3px dotted tomato;
    animation: pulseBorder 1.5s ease-in-out infinite;
}
.selectCardToDestroy > div {
    margin-bottom: 3px;
}
.selectCardToDestroy > div::after {
    content: '';
    position: relative;
    width: var(--width-tier);
    height: calc(var(--height-tier) / 4.5);
    border-radius: 5px;
    border: 3px dotted tomato;
    animation: pulseBorder 1.5s ease-in-out infinite;
}
.artWin::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -2px;
    width: calc(var(--width-tier) + 4px);
    height: calc(1 / 4 * var(--height-tier) * 7 + 6px);
    border: 3px double tomato;
    transform: scale(1.1);
    animation: pulse 1.5s infinite ease-in-out;
}
</style>
