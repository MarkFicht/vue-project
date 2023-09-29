<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import db from '@/firebase/index';
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
    prepareIdForCards,
    cardsWonder,
    coins
} from '../helpers/GameDuelInit';
import { getCountRandomObjFromArr } from '@/helpers/HelpersFoo';
import DuelGameCardComponent from '@/components/DuelGameCardComponent.vue';
import DuelGameLayOutCardsComponent from '@/components/DuelGameLayOutCardsComponent.vue';
import DuelGameWonderComponent from '@/components/DuelGameWonderComponent.vue';
import {
    PlayerDuel,
    type IGameDuelCard,
    BoardDuel,
    type Materials,
    type IGameDuelPlayer
} from '@/interfaces/GameDuel';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import type IUser from '@/interfaces/User';

const storeDuelGame = duelGameStore();
const {
    tierOneCards,
    tierTwoCards,
    tierThreeCards,
    wonderCards,
    selectedCard,
    graveyard,
    player1,
    player2,
    board,
    turn,
    tier,
    move
} = storeToRefs(storeDuelGame);
const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');

const user = ref<IUser>({} as IUser);

const headerGameDuel = ref<string>('Duel Game');
const isLoggedIn = ref<boolean>(false);
const actionForCards = ref<boolean>(false);

const isSecondPick = computed(() => {
    return (
        wonderCards.value[0]?.taken &&
        wonderCards.value[1]?.taken &&
        wonderCards.value[2]?.taken &&
        wonderCards.value[3]?.taken
    );
});

const isMyTurn = computed(() => {
    return turn.value === user.value.uid;
});

watch(
    () => player2.value.wonderCards,
    async () => {
        player2.value.wonderCards.length === 4 &&
            move.value === 0 &&
            (await updateDoc(tableGameDuelRef, {
                tier: 'I'
            }),
            (actionForCards.value = true));
    }
);

watch(
    () => move.value,
    async () => {
        if (move.value >= 20 && move.value < 40) {
            await updateDoc(tableGameDuelRef, {
                tier: 'II'
            });

            if (move.value === 20) {
                let checkTurn: any = turn.value;
                checkTurn =
                    checkTurn === player1.value.user.uid
                        ? player2.value.user?.uid || 0
                        : player1.value.user.uid;
                if (board.value.pawn > 0) checkTurn = player1.value.user.uid;
                else if (board.value.pawn < 0) checkTurn = player2.value.user?.uid || 0;

                await updateDoc(tableGameDuelRef, {
                    turn: checkTurn
                });
            }
        }

        if (move.value >= 40 && move.value <= 60) {
            await updateDoc(tableGameDuelRef, {
                tier: 'III'
            });

            if (move.value === 40) {
                let checkTurn: any = turn.value;
                checkTurn =
                    checkTurn === player1.value.user.uid
                        ? player2.value.user?.uid || 0
                        : player1.value.user.uid;
                if (board.value.pawn > 0) checkTurn = player1.value.user.uid;
                else if (board.value.pawn < 0) checkTurn = player2.value.user?.uid || 0;

                await updateDoc(tableGameDuelRef, {
                    turn: checkTurn
                });
            }
        }
        // TODO - add end game
    }
);

const canBuy = computed((): number => {
    if (!selectedCard.value?.id) return -1;
    let buyForCash = 0;
    let arrCBW: { type: Materials; val: number }[] = [];
    let arrPG: { type: Materials; val: number }[] = [];
    let missingMaterials: string[] = [];
    let buyForFree = false;

    if (turn.value === player1.value.user.uid) {
        arrCBW = [
            {
                type: 'clay',
                val: player1.value.resources.clayOne ? 1 : 2 + player2.value.resources.clayValue
            },
            {
                type: 'brick',
                val: player1.value.resources.brickOne ? 1 : 2 + player2.value.resources.brickValue
            },
            {
                type: 'wood',
                val: player1.value.resources.woodOne ? 1 : 2 + player2.value.resources.woodValue
            }
        ];
        arrCBW = arrCBW.sort((a, b) => b.val - a.val);
        arrPG = [
            {
                type: 'paper',
                val: player1.value.resources.paperGlassOne
                    ? 1
                    : 2 + player2.value.resources.paperValue
            },
            {
                type: 'glass',
                val: player1.value.resources.paperGlassOne
                    ? 1
                    : 2 + player2.value.resources.glassValue
            }
        ];
        arrPG = arrPG.sort((a, b) => b.val - a.val);

        selectedCard.value.cost.forEach((cost, i) => {
            if (cost === 'specialChar') {
                player1.value.resources.specialChars.find((sc) => {
                    if (sc === selectedCard.value.valueCost[i]) {
                        buyForFree = true;
                        return true;
                    }
                });
            } else if (cost === 'cash') {
                buyForCash += selectedCard.value.valueCost[i];
            } else if (cost === 'clay') {
                let numberOfClay =
                    selectedCard.value.valueCost[i] - player1.value.resources.clayValue;
                if (numberOfClay <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfClay; index++) {
                        missingMaterials.push('clay');
                    }
                }
            } else if (cost === 'brick') {
                let numberOfBrick =
                    selectedCard.value.valueCost[i] - player1.value.resources.brickValue;
                if (numberOfBrick <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfBrick; index++) {
                        missingMaterials.push('brick');
                    }
                }
            } else if (cost === 'wood') {
                let numberOfWood =
                    selectedCard.value.valueCost[i] - player1.value.resources.woodValue;
                if (numberOfWood <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfWood; index++) {
                        missingMaterials.push('wood');
                    }
                }
            } else if (cost === 'paper') {
                let numberOfPaper =
                    selectedCard.value.valueCost[i] - player1.value.resources.paperValue;
                if (numberOfPaper <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfPaper; index++) {
                        missingMaterials.push('paper');
                    }
                }
            } else if (cost === 'glass') {
                let numberOfGlass =
                    selectedCard.value.valueCost[i] - player1.value.resources.glassValue;
                if (numberOfGlass <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfGlass; index++) {
                        missingMaterials.push('glass');
                    }
                }
            }
        });
    } else {
        arrCBW = [
            {
                type: 'clay',
                val: player2.value.resources.clayOne ? 1 : 2 + player1.value.resources.clayValue
            },
            {
                type: 'brick',
                val: player2.value.resources.brickOne ? 1 : 2 + player1.value.resources.brickValue
            },
            {
                type: 'wood',
                val: player2.value.resources.woodOne ? 1 : 2 + player1.value.resources.woodValue
            }
        ];
        arrCBW = arrCBW.sort((a, b) => b.val - a.val);
        arrPG = [
            {
                type: 'paper',
                val: player2.value.resources.paperGlassOne
                    ? 1
                    : 2 + player1.value.resources.paperValue
            },
            {
                type: 'glass',
                val: player2.value.resources.paperGlassOne
                    ? 1
                    : 2 + player1.value.resources.glassValue
            }
        ];
        arrPG = arrPG.sort((a, b) => b.val - a.val);

        selectedCard.value.cost.forEach((cost, i) => {
            if (cost === 'specialChar') {
                player2.value.resources.specialChars.find((sc) => {
                    if (sc === selectedCard.value.valueCost[i]) {
                        buyForFree = true;
                        return true;
                    }
                });
            } else if (cost === 'cash') {
                buyForCash += selectedCard.value.valueCost[i];
            } else if (cost === 'clay') {
                let numberOfClay =
                    selectedCard.value.valueCost[i] - player2.value.resources.clayValue;
                if (numberOfClay <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfClay; index++) {
                        missingMaterials.push('clay');
                    }
                }
            } else if (cost === 'brick') {
                let numberOfBrick =
                    selectedCard.value.valueCost[i] - player2.value.resources.brickValue;
                if (numberOfBrick <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfBrick; index++) {
                        missingMaterials.push('brick');
                    }
                }
            } else if (cost === 'wood') {
                let numberOfWood =
                    selectedCard.value.valueCost[i] - player2.value.resources.woodValue;
                if (numberOfWood <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfWood; index++) {
                        missingMaterials.push('wood');
                    }
                }
            } else if (cost === 'paper') {
                let numberOfPaper =
                    selectedCard.value.valueCost[i] - player2.value.resources.paperValue;
                if (numberOfPaper <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfPaper; index++) {
                        missingMaterials.push('paper');
                    }
                }
            } else if (cost === 'glass') {
                let numberOfGlass =
                    selectedCard.value.valueCost[i] - player2.value.resources.glassValue;
                if (numberOfGlass <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfGlass; index++) {
                        missingMaterials.push('glass');
                    }
                }
            }
        });
    }

    missingMaterials = removeOptionalMaterials(missingMaterials, arrCBW, arrPG);
    missingMaterials.forEach((mat) => {
        buyForCash +=
            arrCBW.find(({ type }) => type === mat)?.val ||
            arrPG.find(({ type }) => type === mat)?.val ||
            0;
    });

    if (buyForFree) return 0;
    else return buyForCash;
});

function removeOptionalMaterials(
    missingMaterials: string[],
    arrCBW: { type: Materials; val: number }[],
    arrPG: { type: Materials; val: number }[]
): string[] {
    let arr = missingMaterials;
    if (turn.value === player1.value.user.uid) {
        for (let index = 0; index < player1.value.resources.materialsCBW; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrCBW[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrCBW[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else {
                    arr.find((str, i) => {
                        if (str === arrCBW[2].type) {
                            found = true;
                            j = i;
                            return true;
                        } else return false;
                    });
                    if (found) {
                        arr.splice(j, 1);
                    } else null;
                }
            }
        }
        for (let index = 0; index < player1.value.resources.materialsPG; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrPG[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrPG[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else null;
            }
        }
    } else {
        for (let index = 0; index < player2.value.resources.materialsCBW; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrCBW[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrCBW[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else {
                    arr.find((str, i) => {
                        if (str === arrCBW[2].type) {
                            found = true;
                            j = i;
                            return true;
                        } else return false;
                    });
                    if (found) {
                        arr.splice(j, 1);
                    } else null;
                }
            }
        }
        for (let index = 0; index < player2.value.resources.materialsPG; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrPG[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrPG[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else null;
            }
        }
    }

    return arr;
}

// ---
onMounted(async () => {
    let auth: any;
    auth = getAuth();
    onAuthStateChanged(auth, (data) => {
        if (data) {
            isLoggedIn.value = true;
            // user.value = Object.assign(user.value, data);
            user.value = {
                uid: data.uid,
                email: data.email || '',
                displayName: data.displayName || ''
            };
        } else isLoggedIn.value = false;
    });

    // firebase - set and check game cards
    const prepareRandomCoins = getCountRandomObjFromArr(coins, 10);
    let prepareWonderCards = getCountRandomObjFromArr(cardsWonder, 8);
    prepareWonderCards = prepareWonderCards.map((data, i) => {
        return { ...data, id: i };
    });

    const docSnap = await getDoc(tableGameDuelRef);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());

        if (
            !docSnap.data()?.player2?.user?.uid &&
            docSnap.data()?.player1?.user?.uid !== user.value.uid
        ) {
            // TODO - remove playes if leave, for 2 mins + build document correctly
            await updateDoc(tableGameDuelRef, {
                player2: { ...new PlayerDuel(), user: user.value, _id: user.value.uid }
            });
        }
    } else {
        await setDoc(tableGameDuelRef, {
            player1: { ...new PlayerDuel(), user: user.value, _id: user.value.uid },
            player2: { ...new PlayerDuel() },
            turn: user.value.uid,
            gameBoard: {
                ...new BoardDuel(),
                coins: [
                    prepareRandomCoins[0],
                    prepareRandomCoins[1],
                    prepareRandomCoins[2],
                    prepareRandomCoins[3],
                    prepareRandomCoins[4]
                ]
            },
            tierICards: prepareIdForCards(getCountRandomObjFromArr(cardsTierOne, 20), 'I'),
            tierIICards: prepareIdForCards(getCountRandomObjFromArr(cardsTierTwo, 20), 'II'),
            tierIIICards: prepareIdForCards(
                getCountRandomObjFromArr(
                    [
                        ...getCountRandomObjFromArr(cardsTierThree, 17),
                        ...getCountRandomObjFromArr(cardsTierGuild, 3)
                    ],
                    20
                ),
                'III'
            ),
            wonderCards: prepareWonderCards,
            graveyard: [],
            theRestOfCoins: [
                prepareRandomCoins[5],
                prepareRandomCoins[6],
                prepareRandomCoins[7],
                prepareRandomCoins[8],
                prepareRandomCoins[9]
            ],
            tier: 'prepare',
            move: 0
        });

        const docSnap2 = await getDoc(tableGameDuelRef);
        if (docSnap2.exists()) {
            console.log('Document data second time:', docSnap2.data());
        } else {
            console.log('No such document!');
        }
    }

    tier !== 'prepare' && (actionForCards.value = true);
    await storeDuelGame.subFirebaseConnect(`${user.value.uid}`);
});

// ---
const cardClick = (gameCard: IGameDuelCard) => {
    if (!isMyTurn.value) return null;

    selectedCard.value = {} as IGameDuelCard;

    if (!!gameCard.coversBy && gameCard.coversBy.length > 0) {
        return;
    } else if (gameCard.taken !== 'inGame') {
        return;
    } else {
        selectedCard.value = gameCard;
    }
};

const pickWonder = async (id: number) => {
    if (!isMyTurn.value) return null;

    const newArrWonders = wonderCards.value.map((data) => {
        return data.id === id ? { ...wonderCards.value[id], taken: true } : data;
    });

    if (turn.value === player1.value.user.uid) {
        await updateDoc(tableGameDuelRef, {
            player1: {
                ...player1.value,
                wonderCards: [
                    ...player1.value.wonderCards,
                    { ...wonderCards.value[id], taken: true }
                ]
            },
            turn: player2.value.user?.uid || 0,
            wonderCards: newArrWonders
        });
    } else {
        await updateDoc(tableGameDuelRef, {
            player2: {
                ...player2.value,
                wonderCards: [
                    ...player2.value.wonderCards,
                    { ...wonderCards.value[id], taken: true }
                ]
            },
            turn: player1.value.user.uid,
            wonderCards: newArrWonders
        });
    }
};
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ headerGameDuel }}</h1>
        </header>

        <section class="wrapper">
            <section class="playerSection player2">
                <div class="playerCardContainer">
                    <div class="playerCard playerCard1">
                        <DuelGameCardComponent
                            v-for="card in player2.cards.brown"
                            :key="card.id"
                            :card="card"
                            small
                        />
                    </div>
                    <div class="playerCard playerCard2">
                        <DuelGameCardComponent
                            v-for="card in player2.cards.grey"
                            :key="card.id"
                            :card="card"
                            small
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
                        <DuelGameCardComponent
                            v-for="card in player2.cards.green"
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
                    <div class="playerCash">
                        <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                            {{ `Nick: ${player2.user.displayName || player2.user.email}` }}
                        </p>
                        <p :style="turn === player2.user.uid ? `font-weight: bold;` : ''">
                            {{ `Cash: ${player2.resources.cash} | Points: ${player2.points}` }}
                        </p>
                    </div>
                    <div class="playerCoins"></div>
                </div>
            </section>
            <section class="wonders wonders2 customInput">
                <DuelGameWonderComponent
                    v-for="wonderCard in player2.wonderCards"
                    :card="wonderCard"
                    :key="wonderCard.id"
                />
            </section>
            <section class="cards cardsWonder" v-if="tier === 'prepare'">
                <div v-if="!isSecondPick" class="pickWonders">
                    <DuelGameWonderComponent
                        v-if="wonderCards[0] && !wonderCards[0].taken"
                        :card="wonderCards[0]"
                        @click="pickWonder(0)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[1] && !wonderCards[1].taken"
                        :card="wonderCards[1]"
                        @click="pickWonder(1)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[2] && !wonderCards[2].taken"
                        :card="wonderCards[2]"
                        @click="pickWonder(2)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[3] && !wonderCards[3].taken"
                        :card="wonderCards[3]"
                        @click="pickWonder(3)"
                    />
                </div>
                <div v-if="isSecondPick" class="pickWonders">
                    <DuelGameWonderComponent
                        v-if="wonderCards[4] && !wonderCards[4].taken"
                        :card="wonderCards[4]"
                        @click="pickWonder(4)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[5] && !wonderCards[5].taken"
                        :card="wonderCards[5]"
                        @click="pickWonder(5)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[6] && !wonderCards[6].taken"
                        :card="wonderCards[6]"
                        @click="pickWonder(6)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[7] && !wonderCards[7].taken"
                        :card="wonderCards[7]"
                        @click="pickWonder(7)"
                    />
                </div>
            </section>
            <section class="cards cardsTier" v-if="tier === 'I'">
                <DuelGameLayOutCardsComponent
                    v-for="(card, index) in tierOneCards"
                    :key="index"
                    :card="card"
                    :x="tierOneX[index]"
                    :y="tierOneY[index]"
                    :reversColor="'rgb(145, 19, 19)'"
                    @click="cardClick(card)"
                />
            </section>
            <section class="cards cardsTier" v-if="tier === 'II'">
                <DuelGameLayOutCardsComponent
                    v-for="(card, index) in tierTwoCards"
                    :key="index"
                    :card="card"
                    :x="tierTwoX[index]"
                    :y="tierTwoY[index]"
                    :reversColor="'rgb(58, 59, 160)'"
                    @click="cardClick(card)"
                />
            </section>
            <section class="cards cardsTier" v-if="tier === 'III'">
                <DuelGameLayOutCardsComponent
                    v-for="(card, index) in tierThreeCards"
                    :key="index"
                    :card="card"
                    :x="tierThreeX[index]"
                    :y="tierThreeY[index]"
                    :reversColor="card.tier === 'guild' ? 'rgb(107, 36, 128)' : 'rgb(175, 85, 202)'"
                    @click="cardClick(card)"
                />
            </section>

            <section class="duel">
                <div class="boardPanishment">
                    <div :style="board.player1.length >= 1 ? 'background: tomato;' : ''">-5</div>
                    <div :style="board.player1.length === 2 ? 'background: tomato;' : ''">-2</div>
                    <div :style="board.player2.length === 2 ? 'background: tomato;' : ''">-2</div>
                    <div :style="board.player2.length >= 1 ? 'background: tomato;' : ''">-5</div>
                </div>
                <div class="boardDuel">
                    <span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span><span class="boardBorder"></span
                    ><span class="boardBorder"></span>
                    <div class="boardPawn" :style="`--position:${board.pawn}`"></div>
                </div>
                <div class="boardCoins">
                    <span v-for="coin in board.coins" :key="coin" class="boardSingleCoin">{{
                        coin
                    }}</span>
                </div>
            </section>
            <section class="graveyard customInput">
                <DuelGameCardComponent
                    v-for="card in graveyard"
                    :key="card.id"
                    :card="card"
                    small
                />
            </section>
            <section class="playerInfo">
                <div class="player1info customInput">
                    <p>
                        {{ `Nick: ${player1.user.displayName || player1.user.email}` }}
                    </p>
                    <p>
                        {{ `Turn: ${turn === player1.user.uid ? 'YOU' : ''}` }}
                    </p>
                </div>
                <div class="player2info customInput">
                    <p>
                        {{ `Nick: ${player2.user.displayName || player2.user.email}` }}
                    </p>
                    <p>
                        {{ `Turn: ${turn === player2.user.uid ? 'YOU' : ''}` }}
                    </p>
                </div>
            </section>
            <section class="wonders wonders1 customInput">
                <DuelGameWonderComponent
                    v-for="wonderCard in player1.wonderCards"
                    :card="wonderCard"
                    :key="wonderCard.id"
                />
            </section>
            <section v-if="actionForCards" class="playerAction">
                <button
                    :disabled="
                        canBuy < 0 ||
                        !isMyTurn ||
                        (turn === player1.user.uid
                            ? canBuy > player1.resources.cash
                            : canBuy > player2.resources.cash)
                    "
                    class="customButton"
                    @click="() => (isMyTurn ? storeDuelGame.setCardTaken(canBuy) : null)"
                >
                    {{ `take ${canBuy >= 0 ? canBuy : ''}` }}
                </button>
                <button
                    :disabled="!selectedCard?.id"
                    class="customButton"
                    @click="() => (isMyTurn ? storeDuelGame.setCardGraveyard() : null)"
                >
                    sell
                </button>
                <button
                    :disabled="!selectedCard?.id"
                    class="customButton"
                    @click="() => (isMyTurn ? storeDuelGame.setCardToWonder() : null)"
                >
                    build wonder
                </button>
            </section>
            <section v-else class="playerAction"></section>
            <section class="playerSection player1">
                <div class="playerCardContainer">
                    <div class="playerCard playerCard1">
                        <DuelGameCardComponent
                            v-for="card in player1.cards.brown"
                            :key="card.id"
                            :card="card"
                            small
                        />
                    </div>
                    <div class="playerCard playerCard2">
                        <DuelGameCardComponent
                            v-for="card in player1.cards.grey"
                            :key="card.id"
                            :card="card"
                            small
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
                        <DuelGameCardComponent
                            v-for="card in player1.cards.green"
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
                    <div class="playerCash">
                        <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                            {{ `Nick: ${player1.user.displayName || player1.user.email}` }}
                        </p>
                        <p :style="turn === player1.user.uid ? `font-weight: bold;` : ''">
                            {{ `Cash: ${player1.resources.cash} | Points: ${player1.points}` }}
                        </p>
                    </div>
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
    margin-top: 15px;
    margin-bottom: 15px;
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
    width: 1200px;
    height: 720px;
    padding: 20px;
    margin-bottom: 20px;
    color: #444;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    display: grid;
    grid-template-areas:
        'w2   p2   p2   pi  '
        '.    card duel .   '
        '.    act  duel grv '
        'w1   p1   p1   grv ';
    grid-template-columns: 220px 550px 200px 190px;
    grid-template-rows: 155px 320px 50px 155px;
    background-color: #eee;
    animation: showElement 2s linear;
}
.wonders {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 155px;
    width: 220px;
    padding: 5px;
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.15));
}
.wonders1 {
    grid-area: w1;
}
.wonders2 {
    grid-area: w2;
}
.playerInfo {
    grid-area: pi;
    margin: 0 auto;
}
.playerInfo > div {
    height: 60px;
    margin-bottom: 15px;
    padding: 5px 15px !important;
    font-size: 1em;
    display: block;
}
.playerSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.playerCardContainer {
    width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playerPointsContainer {
    height: 100%;
    width: 200px;
    display: flex;
    justify-content: left;
    align-items: center;
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
}
.playerCard7 {
    background-image: linear-gradient(to bottom, rgb(124, 11, 189), 7%, transparent);
}
.playerAction {
    grid-area: act;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    animation: showElement 2s linear;
}
.playerAction > button {
    margin: 0 10px;
    font-size: 16px;
    line-height: 16px;
    height: 32px;
    padding: 6px 10px;
}
.cards {
    position: relative;
    grid-area: card;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.cardsWonder {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.05));
}
.cardsTier {
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.4));
}
.pickWonders {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 155px;
    width: 220px;
    animation: showElement 2s linear;
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.5));
}
.duel {
    grid-area: duel;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.4));
}
.boardCoins {
    height: 200px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: rgb(76, 160, 50);
}
.boardSingleCoin {
    height: 36px;
    width: 36px;
    margin: 1px auto;
    border-radius: 50%;
    border: 1px solid;
    display: block;
    background-color: rgb(27, 207, 27);
}
.boardPanishment {
    height: 300px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.boardPanishment > div {
    width: 42px;
    height: 18px;
    border: 1px solid rgb(168, 64, 46);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
    transform: rotate(90deg);
}
.boardPanishment > div:nth-child(2) {
    margin-bottom: 95px;
}
.boardDuel {
    position: relative;
    height: 300px;
    width: 50px;
    border-radius: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(241, 118, 118);
}
.boardBorder {
    height: 13px;
    width: 30px;
    margin: 1px auto;
    border-radius: 50%;
    border: 1px solid brown;
    background-color: rgb(223, 83, 83);
    display: block;
}
.boardPawn {
    position: absolute;
    height: 15px;
    width: 30px;
    border-radius: 50%;
    border: 3px solid rgb(180, 0, 0);
    background-color: rgb(245, 9, 9);
    top: 50%;
    transform: translateY(calc(var(--position) * 100% - 50%));
    transition: 0.5s;
}
.boardBorder:nth-child(10) {
    background-color: gray;
}
.boardBorder:nth-child(7),
.boardBorder:nth-child(13),
.boardBorder:nth-child(4),
.boardBorder:nth-child(16) {
    background-color: gray;
}
.boardBorder:nth-child(1),
.boardBorder:nth-child(19) {
    background-color: tomato;
}
.graveyard {
    grid-area: grv;
    display: inline-flex;
    padding: 10px;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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
}
@media (max-width: 560px) {
}
@media (max-width: 360px) {
}
</style>
