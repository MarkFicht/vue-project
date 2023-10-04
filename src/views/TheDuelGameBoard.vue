<script setup lang="ts">
import { computed, onMounted, ref, watch, provide } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
    increment
} from 'firebase/firestore';
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
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import DuelGameLayOutTiersComponent from '@/components/game-duel/DuelGameLayOutTiersComponent.vue';
import DuelGameWonderComponent from '@/components/game-duel/DuelGameWonderComponent.vue';
import DuelGameBoardDuelComponent from '@/components/game-duel/DuelGameBoardDuelComponent.vue';
import DuelGameGraveyardComponent from '@/components/game-duel/DuelGameGraveyardComponent.vue';
import DuelGamePlayersInfoComponent from '@/components/game-duel/DuelGamePlayersInfoComponent.vue';
import DuelGamePlayersResComponent from '@/components/game-duel/DuelGamePlayersResComponent.vue';
import {
    PlayerDuel,
    type IGameDuelCard,
    BoardDuel,
    type Materials,
    type IGameDuelCoin,
    type IGameDuelWonderCard
} from '@/interfaces/GameDuel';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import type IUser from '@/interfaces/User';

provide('showPrice', showPrice);
provide('wonderCardSelected', wonderCardSelected);

const headerGameDuel = ref<string>('Duel Game');
const buttonBuyCard = ref<string>('Buy');
const buttonSell = ref<string>('Sell');
const buttonBuildWonder = ref<string>('Build Wonder');
const labelWhoStarts = ref<string>('Who Starts?');
const labelPickCoin = ref<string>('Pick coin!');

const storeDuelGame = duelGameStore();
const {
    tierOneCards,
    tierTwoCards,
    tierThreeCards,
    wonderCards,
    graveyard,
    player1,
    player2,
    board,
    turn,
    tier,
    move,
    pickCoin,
    selectedCard,
    selectedWonder,
    isLoading
} = storeToRefs(storeDuelGame);
const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');

const user = ref<IUser>({} as IUser);
const isLoggedIn = ref<boolean>(false);

const actionForCards = ref<boolean>(false);
const whoWillStart = ref<boolean>(false);
const selectWonderCard = ref<boolean>(false);

const isMyTurn = computed((): boolean => {
    return turn.value === user.value.uid;
});

const isSecondPick = computed((): boolean => {
    return (
        wonderCards.value[0]?.taken &&
        wonderCards.value[1]?.taken &&
        wonderCards.value[2]?.taken &&
        wonderCards.value[3]?.taken
    );
});

const canBuyTierCard = computed((): number => {
    if (!selectedCard.value?.id) return -1;
    return showPrice(selectedCard.value, `${user.value.uid}`);
});

const canBuyWonderCard = computed((): boolean => {
    if (!isMyTurn.value) return false;
    if (!selectedCard.value.id) return false;

    if (user.value.uid === player1.value.user.uid) {
        if (!player1.value.wonderCards.find((wc) => wc.activated === 'none')) return false;
        else {
            let canBuy = false;
            player1.value.wonderCards.forEach((wc) => {
                let fullPrice = showPrice(wc, `${user.value.uid}`);
                wc.activated === 'none' && fullPrice <= player1.value.resources.cash
                    ? (canBuy = true)
                    : null;
            });
            return canBuy;
        }
    } else {
        if (!player2.value.wonderCards.find((wc) => wc.activated === 'none')) return false;
        else {
            let canBuy = false;
            player2.value.wonderCards.forEach((wc) => {
                let fullPrice = showPrice(wc, `${user.value.uid}`);
                wc.activated === 'none' && fullPrice <= player2.value.resources.cash
                    ? (canBuy = true)
                    : null;
            });
            return canBuy;
        }
    }
});

watch([() => selectedWonder.value, () => selectedCard.value], () => {
    if (!selectedWonder.value?.id || !selectedCard.value?.id) {
        selectWonderCard.value = false;
    }
});
watch(
    () => player2.value.wonderCards,
    async () => {
        isLoading.value = true;
        player2.value.wonderCards.length === 4 &&
            move.value === 0 &&
            (await updateDoc(tableGameDuelRef, {
                tier: 'I'
            }),
            (actionForCards.value = true));
        isLoading.value = false;
    }
);

watch(
    () => move.value,
    async () => {
        if (move.value >= 20 && move.value < 40) {
            isLoading.value = true;
            await updateDoc(tableGameDuelRef, {
                tier: 'II'
            });

            if (move.value === 20) {
                let checkTurn: any = turn.value;
                checkTurn =
                    checkTurn === player1.value.user.uid
                        ? player2.value.user.uid
                        : player1.value.user.uid;
                if (board.value.pawn > 0) checkTurn = player1.value.user.uid;
                else if (board.value.pawn < 0) checkTurn = player2.value.user.uid;

                storeDuelGame.upgradeTurn(`${checkTurn}`);

                if (turn.value === user.value.uid) {
                    actionForCards.value = false;
                    whoWillStart.value = true;
                }
            }
            isLoading.value = false;
        }

        if (move.value >= 40 && move.value <= 60) {
            isLoading.value = true;

            await updateDoc(tableGameDuelRef, {
                tier: 'III'
            });

            if (move.value === 40) {
                let checkTurn: any = turn.value;
                checkTurn =
                    checkTurn === player1.value.user.uid
                        ? player2.value.user.uid
                        : player1.value.user.uid;
                if (board.value.pawn > 0) checkTurn = player1.value.user.uid;
                else if (board.value.pawn < 0) checkTurn = player2.value.user.uid;

                storeDuelGame.upgradeTurn(`${checkTurn}`);

                if (turn.value === user.value.uid) {
                    actionForCards.value = false;
                    whoWillStart.value = true;
                }
            }
            isLoading.value = false;
        }
        // TODO - add end game
    }
);

watch(
    () => pickCoin.value,
    () => {
        if (pickCoin.value !== '' && isMyTurn.value) {
            actionForCards.value = false;
            selectedCard.value = {} as IGameDuelCard;
        } else {
            actionForCards.value = true;
        }
    }
);

// ---
onMounted(async () => {
    isLoading.value = true;

    let auth: any;
    auth = getAuth();
    onAuthStateChanged(auth, (data) => {
        if (data) {
            isLoggedIn.value = true;
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
        // TODO - play for who starts - set turn on empty string + start for it
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
            move: 0,
            pickCoin: ''
        });

        const docSnap2 = await getDoc(tableGameDuelRef);
        if (docSnap2.exists()) {
            console.log('Document data second time:', docSnap2.data());
        } else {
            console.log('No such document!');
        }
    }

    await storeDuelGame.subFirebaseConnect(`${user.value.uid}`);

    // Check state after refresh or leave
    // --- TODO: check select wonders
    // ----
    tier.value !== 'prepare' && (actionForCards.value = true);
    // --- Check coin
    if (pickCoin.value !== '' && isMyTurn.value) {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    } else {
        actionForCards.value = true;
    }
    // --- Check who starts
    if (move.value === 20 || move.value === 40) {
        let checkTurn: any = turn.value;
        checkTurn =
            checkTurn === player1.value.user.uid ? player2.value.user.uid : player1.value.user.uid;
        if (board.value.pawn > 0) checkTurn = player1.value.user.uid;
        else if (board.value.pawn < 0) checkTurn = player2.value.user.uid;

        storeDuelGame.upgradeTurn(`${checkTurn}`);

        if (turn.value === user.value.uid) {
            actionForCards.value = false;
            whoWillStart.value = true;
        }
    }

    isLoading.value = false;
});

// ---
async function chooseWhoStarts(id: string): Promise<void> {
    isLoading.value = true;

    storeDuelGame.upgradeTurn(`${id}`);

    actionForCards.value = true;
    whoWillStart.value = false;

    isLoading.value = false;
}

function showPrice(selectedCard: IGameDuelWonderCard | IGameDuelCard, uid: string): number {
    if (!selectedCard?.id) return -1;
    let buyForCash = 0;
    let arrCBW: { type: Materials; val: number }[] = [];
    let arrPG: { type: Materials; val: number }[] = [];
    let missingMaterials: string[] = [];
    let buyForFree = false;
    const p1Res = player1.value.resources;
    const p2Res = player2.value.resources;

    if (player1.value.user.uid === uid) {
        arrCBW = [
            {
                type: 'clay',
                val: p1Res.clayOne ? 1 : 2 + p2Res.clayValue
            },
            {
                type: 'brick',
                val: p1Res.brickOne ? 1 : 2 + p2Res.brickValue
            },
            {
                type: 'wood',
                val: p1Res.woodOne ? 1 : 2 + p2Res.woodValue
            }
        ];
        arrCBW = arrCBW.sort((a, b) => b.val - a.val);
        arrPG = [
            {
                type: 'paper',
                val: p1Res.paperGlassOne ? 1 : 2 + p2Res.paperValue
            },
            {
                type: 'glass',
                val: p1Res.paperGlassOne ? 1 : 2 + p2Res.glassValue
            }
        ];
        arrPG = arrPG.sort((a, b) => b.val - a.val);

        selectedCard.cost.forEach((cost, i) => {
            if (cost === 'specialChar') {
                p1Res.specialChars.find((sc) => {
                    if (sc === selectedCard.valueCost[i]) {
                        buyForFree = true;
                        return true;
                    }
                });
            } else if (cost === 'cash') {
                buyForCash += selectedCard.valueCost[i];
            } else if (cost === 'clay') {
                let numberOfClay = selectedCard.valueCost[i] - p1Res.clayValue;
                if (numberOfClay <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfClay; index++) {
                        missingMaterials.push('clay');
                    }
                }
            } else if (cost === 'brick') {
                let numberOfBrick = selectedCard.valueCost[i] - p1Res.brickValue;
                if (numberOfBrick <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfBrick; index++) {
                        missingMaterials.push('brick');
                    }
                }
            } else if (cost === 'wood') {
                let numberOfWood = selectedCard.valueCost[i] - p1Res.woodValue;
                if (numberOfWood <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfWood; index++) {
                        missingMaterials.push('wood');
                    }
                }
            } else if (cost === 'paper') {
                let numberOfPaper = selectedCard.valueCost[i] - p1Res.paperValue;
                if (numberOfPaper <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfPaper; index++) {
                        missingMaterials.push('paper');
                    }
                }
            } else if (cost === 'glass') {
                let numberOfGlass = selectedCard.valueCost[i] - p1Res.glassValue;
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
                val: p2Res.clayOne ? 1 : 2 + p1Res.clayValue
            },
            {
                type: 'brick',
                val: p2Res.brickOne ? 1 : 2 + p1Res.brickValue
            },
            {
                type: 'wood',
                val: p2Res.woodOne ? 1 : 2 + p1Res.woodValue
            }
        ];
        arrCBW = arrCBW.sort((a, b) => b.val - a.val);
        arrPG = [
            {
                type: 'paper',
                val: p2Res.paperGlassOne ? 1 : 2 + p1Res.paperValue
            },
            {
                type: 'glass',
                val: p2Res.paperGlassOne ? 1 : 2 + p1Res.glassValue
            }
        ];
        arrPG = arrPG.sort((a, b) => b.val - a.val);

        selectedCard.cost.forEach((cost, i) => {
            if (cost === 'specialChar') {
                p2Res.specialChars.find((sc) => {
                    if (sc === selectedCard.valueCost[i]) {
                        buyForFree = true;
                        return true;
                    }
                });
            } else if (cost === 'cash') {
                buyForCash += selectedCard.valueCost[i];
            } else if (cost === 'clay') {
                let numberOfClay = selectedCard.valueCost[i] - p2Res.clayValue;
                if (numberOfClay <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfClay; index++) {
                        missingMaterials.push('clay');
                    }
                }
            } else if (cost === 'brick') {
                let numberOfBrick = selectedCard.valueCost[i] - p2Res.brickValue;
                if (numberOfBrick <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfBrick; index++) {
                        missingMaterials.push('brick');
                    }
                }
            } else if (cost === 'wood') {
                let numberOfWood = selectedCard.valueCost[i] - p2Res.woodValue;
                if (numberOfWood <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfWood; index++) {
                        missingMaterials.push('wood');
                    }
                }
            } else if (cost === 'paper') {
                let numberOfPaper = selectedCard.valueCost[i] - p2Res.paperValue;
                if (numberOfPaper <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfPaper; index++) {
                        missingMaterials.push('paper');
                    }
                }
            } else if (cost === 'glass') {
                let numberOfGlass = selectedCard.valueCost[i] - p2Res.glassValue;
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

    missingMaterials = removeOptionalMaterials(missingMaterials, arrCBW, arrPG, uid);
    missingMaterials.forEach((mat) => {
        buyForCash +=
            arrCBW.find(({ type }) => type === mat)?.val ||
            arrPG.find(({ type }) => type === mat)?.val ||
            0;
    });

    if (buyForFree) return 0;
    else return buyForCash;
}

function removeOptionalMaterials(
    missingMaterials: string[],
    arrCBW: { type: Materials; val: number }[],
    arrPG: { type: Materials; val: number }[],
    uid: string
): string[] {
    let arr = missingMaterials;
    const p1Res = player1.value.resources;
    const p2Res = player2.value.resources;

    if (player1.value.user.uid === uid) {
        for (let index = 0; index < p1Res.materialsCBW; index++) {
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
        for (let index = 0; index < p1Res.materialsPG; index++) {
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
        for (let index = 0; index < p2Res.materialsCBW; index++) {
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
        for (let index = 0; index < p2Res.materialsPG; index++) {
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

const wonderSelectedForPlayer = async (id: number) => {
    if (!isMyTurn.value) return null;

    isLoading.value = true;
    let newCard = {} as IGameDuelWonderCard;
    const newArrWonders = wonderCards.value.map((data) => {
        return data.id === id ? ((newCard = { ...data, taken: true }), newCard) : data;
    });

    if (turn.value === player1.value.user.uid) {
        await updateDoc(tableGameDuelRef, {
            player1: {
                ...player1.value,
                wonderCards: [...player1.value.wonderCards, { ...newCard }]
            },
            wonderCards: newArrWonders
        });
        storeDuelGame.upgradeTurn(`${player2.value.user.uid}`);
    } else {
        await updateDoc(tableGameDuelRef, {
            player2: {
                ...player2.value,
                wonderCards: [...player2.value.wonderCards, { ...newCard }]
            },
            wonderCards: newArrWonders
        });
        storeDuelGame.upgradeTurn(`${player1.value.user.uid}`);
    }
    isLoading.value = false;
};

const tierCardClick = (gameCard: IGameDuelCard) => {
    if (!isMyTurn.value) return null;
    if (pickCoin.value !== '') return null;
    if (whoWillStart.value) return null;

    selectedCard.value = {} as IGameDuelCard;
    selectedWonder.value = {} as IGameDuelWonderCard;
    selectWonderCard.value = false;

    if (!!gameCard.coversBy && gameCard.coversBy.length > 0) {
        return;
    } else if (gameCard.taken !== 'inGame') {
        return;
    } else {
        selectedCard.value = gameCard;
    }
};

const coinSelected = async (coin: IGameDuelCoin['effect']) => {
    isLoading.value = true;
    if (turn.value === player1.value.user.uid) {
        await updateDoc(tableGameDuelRef, {
            'gameBoard.coins': arrayRemove(coin),
            'player1.resources.coins': arrayUnion(coin),
            pickCoin: ''
        });
        storeDuelGame.upgradeTurn(`${player2.value.user.uid}`);
    } else {
        await updateDoc(tableGameDuelRef, {
            'gameBoard.coins': arrayRemove(coin),
            'player2.resources.coins': arrayUnion(coin),
            pickCoin: ''
        });
        storeDuelGame.upgradeTurn(`${player1.value.user.uid}`);
    }
    storeDuelGame.upgradeMove();
    isLoading.value = false;
};

const prepareSelectWonder = () => {
    if (!isMyTurn.value) return null;

    selectWonderCard.value = true;
};

function wonderCardSelected(wonderCard: IGameDuelWonderCard, cash: number): any {
    if (!isMyTurn.value) return null;
    let fullPrice = showPrice(wonderCard, `${user.value.uid}`);
    if (fullPrice > cash) return null;
    else selectedWonder.value = wonderCard;
    storeDuelGame.setCardToWonder();
}
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ headerGameDuel }}</h1>
        </header>

        <section class="wrapper">
            <div v-if="isLoading" class="loading">
                <LoadingSpinner />
            </div>

            <DuelGameBoardDuelComponent
                :isMyTurn="isMyTurn"
                :user="user"
                @coin-selected="coinSelected"
            />

            <DuelGameGraveyardComponent />

            <DuelGamePlayersInfoComponent />

            <DuelGamePlayersResComponent
                :user="user"
                :selectWonderCard="selectWonderCard"
                @wonder-card-selected="wonderCardSelected"
            />

            <section class="cards cardsWonder" v-if="tier === 'prepare'">
                <div v-if="!isSecondPick" class="pickWonders">
                    <DuelGameWonderComponent
                        v-if="wonderCards[0] && !wonderCards[0].taken"
                        :card="wonderCards[0]"
                        @click="wonderSelectedForPlayer(wonderCards[0].id)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[1] && !wonderCards[1].taken"
                        :card="wonderCards[1]"
                        @click="wonderSelectedForPlayer(wonderCards[1].id)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[2] && !wonderCards[2].taken"
                        :card="wonderCards[2]"
                        @click="wonderSelectedForPlayer(wonderCards[2].id)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[3] && !wonderCards[3].taken"
                        :card="wonderCards[3]"
                        @click="wonderSelectedForPlayer(wonderCards[3].id)"
                    />
                </div>
                <div v-if="isSecondPick" class="pickWonders">
                    <DuelGameWonderComponent
                        v-if="wonderCards[4] && !wonderCards[4].taken"
                        :card="wonderCards[4]"
                        @click="wonderSelectedForPlayer(wonderCards[4].id)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[5] && !wonderCards[5].taken"
                        :card="wonderCards[5]"
                        @click="wonderSelectedForPlayer(wonderCards[5].id)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[6] && !wonderCards[6].taken"
                        :card="wonderCards[6]"
                        @click="wonderSelectedForPlayer(wonderCards[6].id)"
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[7] && !wonderCards[7].taken"
                        :card="wonderCards[7]"
                        @click="wonderSelectedForPlayer(wonderCards[7].id)"
                    />
                </div>
            </section>
            <section class="cards cardsTier" v-if="tier === 'I'">
                <DuelGameLayOutTiersComponent
                    v-for="(card, index) in tierOneCards"
                    :key="index"
                    :card="card"
                    :user="user"
                    :x="tierOneX[index]"
                    :y="tierOneY[index]"
                    :reversColor="'rgb(145, 19, 19)'"
                    :cash1P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player1.user.uid}`) : -1
                    "
                    :cash2P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player2.user.uid}`) : -1
                    "
                    @click="tierCardClick(card)"
                />
            </section>
            <section class="cards cardsTier" v-if="tier === 'II'">
                <DuelGameLayOutTiersComponent
                    v-for="(card, index) in tierTwoCards"
                    :key="index"
                    :card="card"
                    :user="user"
                    :x="tierTwoX[index]"
                    :y="tierTwoY[index]"
                    :reversColor="'rgb(58, 59, 160)'"
                    :cash1P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player1.user.uid}`) : -1
                    "
                    :cash2P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player2.user.uid}`) : -1
                    "
                    @click="tierCardClick(card)"
                />
            </section>
            <section class="cards cardsTier" v-if="tier === 'III'">
                <DuelGameLayOutTiersComponent
                    v-for="(card, index) in tierThreeCards"
                    :key="index"
                    :card="card"
                    :user="user"
                    :x="tierThreeX[index]"
                    :y="tierThreeY[index]"
                    :reversColor="card.tier === 'guild' ? 'rgb(107, 36, 128)' : 'rgb(175, 85, 202)'"
                    :cash1P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player1.user.uid}`) : -1
                    "
                    :cash2P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player2.user.uid}`) : -1
                    "
                    @click="tierCardClick(card)"
                />
            </section>

            <section v-if="actionForCards && selectedCard?.id" class="playerAction">
                <button
                    :disabled="
                        canBuyTierCard < 0 ||
                        !isMyTurn ||
                        (turn === player1.user.uid
                            ? canBuyTierCard > player1.resources.cash
                            : canBuyTierCard > player2.resources.cash)
                    "
                    class="customButton"
                    @click="
                        () =>
                            isMyTurn
                                ? (storeDuelGame.setCardTaken(canBuyTierCard),
                                  selectWonderCard === false)
                                : null
                    "
                >
                    {{ `${buttonBuyCard} ${canBuyTierCard >= 0 ? canBuyTierCard : ''}` }}
                </button>
                <button
                    :disabled="!selectedCard?.id"
                    class="customButton"
                    @click="
                        () =>
                            isMyTurn
                                ? (storeDuelGame.setCardGraveyard(), selectWonderCard === false)
                                : null
                    "
                >
                    {{ buttonSell }}
                </button>
                <button
                    :disabled="!canBuyWonderCard"
                    class="customButton"
                    @click="() => (isMyTurn ? prepareSelectWonder() : null)"
                >
                    {{ buttonBuildWonder }}
                </button>
            </section>
            <section v-else-if="whoWillStart" class="playerAction">
                <button class="customButton" @click="() => chooseWhoStarts(`${player1.user.uid}`)">
                    {{ player1.user.displayName }}
                </button>
                <p>{{ ` ${labelWhoStarts} ` }}</p>
                <button class="customButton" @click="() => chooseWhoStarts(`${player2.user.uid}`)">
                    {{ player2.user.displayName }}
                </button>
            </section>
            <section v-else-if="isMyTurn && pickCoin !== ''" class="playerAction">
                <p>{{ labelPickCoin }}</p>
            </section>
            <section v-else class="playerAction"></section>
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
    margin: 15px auto;
    text-align: center;
    width: 1110px;
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
    width: 1110px;
    height: 720px;
    padding: 20px;
    margin: 0 auto;
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
    grid-template-columns: 230px 450px 200px 190px;
    grid-template-rows: 155px 320px 50px 155px;
    background-color: #eee;
    animation: showElement 2s linear;
}
.loading {
    position: absolute;
    top: 0;
    left: 0;
    /* background-color: rgba(255, 255, 255, 0.35); */
    border-radius: 20px;
    width: 100%;
    height: 100%;
    z-index: 100000;
}
.playerAction {
    grid-area: act;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    animation: showElement 0.5s linear;
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
    filter: drop-shadow(0 0 35px rgba(0, 0, 0, 0.3));
}
.pickWonders {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 155px;
    width: 230px;
    animation: showElement 0.5s linear;
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.5));
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
@media (max-width: 1200px) {
    /* section.wrapper {
        transform: scale(0.8);
    } */
}
@media (max-width: 720px) {
}
@media (max-width: 560px) {
}
@media (max-width: 360px) {
}
</style>
