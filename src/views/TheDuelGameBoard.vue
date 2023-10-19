<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch, provide } from 'vue';
import { getCurrentUser } from '@/helpers/HelpersFoo';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayRemove,
    arrayUnion,
    increment,
    serverTimestamp
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
import DuelGameCoinComponent from '@/components/game-duel/DuelGameCoinComponent.vue';
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
import { gameStore } from '@/store/GameStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import type IUser from '@/interfaces/User';
import debounce from 'lodash-es/debounce';

provide('showPrice', showPrice);
provide('wonderCardSelected', wonderCardSelected);

const headerGameDuel = ref<string>('Duel Game');
const buttonBuyCard = ref<string>('Buy');
const buttonSell = ref<string>('Sell');
const buttonBuildWonder = ref<string>('Build Wonder');
const buttonBackToFeed = ref<string>('Back To Home');
const labelWhoStarts = ref<string>('Who Starts?');
const labelPickCoin = ref<string>('Pick Coin!');
const labelPickCoinOfThree = ref<string>('Pick one Coin of three!');
const labelPickCardFromGraveyard = ref<string>('Pick card from graveyard!');
const labelPickWonder = ref<string>('Pick Wonder!');
const labelDestroyCard = ref<string>('Destroy Enemy Card!');
const labelWonByArt = ref<string>('Winner By Artefacts: ');
const labelWonByAggressive = ref<string>('Winner By Aggressive: ');
const labelWonBySurr = ref<string>('Winner By Surrender: ');

const allPointsP1 = ref<number>(0);
const allPointsP2 = ref<number>(0);
const endGameTimeRedirect = ref<number>(20);
const debounceEndGame = ref<any>(
    debounce(function () {
        router.push('/feed');
    }, endGameTimeRedirect.value * 1000)
);

const storeDuelGame = duelGameStore();
const storeGame = gameStore();
const { duel } = storeToRefs(storeGame);

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
    theRestOfCoins,
    pickCoin,
    pickCoinOfThree,
    pickCardFromGraveyard,
    destroyBrown,
    destroyGrey,
    selectWondersForPlayers,
    selectWondersForPlayersMove,
    chooseWhoWillStart,
    wonByArt,
    wonByAggressive,
    wonBySurr,
    selectedCard,
    selectedWonder,
    isLoading
} = storeToRefs(storeDuelGame);
const usersRef = collection(db, 'users');

const gameStatusRef = collection(db, 'gameStatus');
const gameStatusDuelRef = doc(gameStatusRef, 'Duel');

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');

const user = ref<IUser>({} as IUser);
const router = useRouter();

const actionForCards = ref<boolean>(false);
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
        actionForCards.value = true;

        if (move.value >= 20 && move.value < 40) {
            isLoading.value = true;

            await updateDoc(tableGameDuelRef, {
                tier: 'II'
            });

            if (chooseWhoWillStart.value && isMyTurn.value) {
                actionForCards.value = false;
            }
            isLoading.value = false;
        }

        if (move.value >= 40 && move.value <= 60) {
            isLoading.value = true;

            await updateDoc(tableGameDuelRef, {
                tier: 'III'
            });

            if (chooseWhoWillStart.value && isMyTurn.value) {
                actionForCards.value = false;
            }
            isLoading.value = false;
        }
        if (move.value === 60) {
            isLoading.value = true;
            actionForCards.value = false;

            await updateDoc(tableGameDuelRef, {
                tier: 'end'
            });

            isLoading.value = false;
        }
    }
);

watch(
    () => tier.value,
    () => {
        if (tier.value === 'end') {
            allPointsP1.value =
                player1.value.points +
                Math.floor(player1.value.resources.cash / 3) +
                ((board.value.pawn <= -6 && 10) ||
                    (board.value.pawn <= -3 && 5) ||
                    (board.value.pawn <= -1 && 2) ||
                    0) +
                countPointsFromCoins(player1.value.resources.coins) +
                countPointsFromPurple(player1.value.cards.purple.map((pur) => pur.valuePower[0]));
            allPointsP2.value =
                player2.value.points +
                Math.floor(player2.value.resources.cash / 3) +
                ((board.value.pawn >= 6 && 10) ||
                    (board.value.pawn >= 3 && 5) ||
                    (board.value.pawn >= 1 && 2) ||
                    0) +
                countPointsFromCoins(player2.value.resources.coins) +
                countPointsFromPurple(player2.value.cards.purple.map((pur) => pur.valuePower[0]));
        }
    }
);

watch(
    [() => wonByArt.value, () => wonByAggressive.value, () => wonBySurr.value],
    async ([artNewVal, aggrNewVal, surNewVal]) => {
        // TODO - who lose, who win, info players about it + remove db + show last cards for last player + button redirect or redirect after 20s + redirect after refresh(check uid)
        if (surNewVal !== '' || artNewVal !== '' || aggrNewVal !== '') {
            const playersUid = duel.value.players.map((user) => user.uid);

            await updateDoc(gameStatusDuelRef, {
                isStarted: false,
                players: []
            });

            playersUid.forEach(async (uid) => {
                await updateDoc(doc(usersRef, uid), {
                    game: '',
                    readyToGame: false,
                    online: 'online',
                    timestamp: serverTimestamp()
                });
            });

            await deleteDoc(tableGameDuelRef);

            // router.push('/feed');

            // --- Redirect to game
            // debounceEndGame.value();
        }
    }
);

// ---
onBeforeMount(async () => {
    await storeGame.subFirebaseConnect();
});

onMounted(async () => {
    isLoading.value = true;
    let stopCode = false;

    const docGameStatusSnap = await getDoc(gameStatusDuelRef);

    // TODO - add watch to redirect or Fn for it + 20s delay
    // TODO - ADD THE SAME + info who win for opponent

    await getCurrentUser().then(async (dataAuth) => {
        if (dataAuth) {
            if (docGameStatusSnap.exists()) {
                const userFb = docGameStatusSnap
                    .data()
                    .players.find((user: IUser) => user.uid === (dataAuth as IUser).uid);

                if (userFb) {
                    user.value = {
                        uid: userFb.uid,
                        email: userFb.email,
                        displayName: userFb.displayName,
                        game: userFb.game,
                        readyToGame: userFb.readyToGame,
                        timestamp: userFb.timestamp,
                        online: userFb.online
                    };

                    if (userFb.game !== 'Duel' || !userFb.readyToGame) {
                        isLoading.value = false;
                        stopCode = true;
                    }
                } else {
                    isLoading.value = false;
                    stopCode = true;
                }
            } else {
                const usersSnap = await getDoc(doc(usersRef, (dataAuth as IUser).uid));

                if (usersSnap.exists()) {
                    if (usersSnap.data().game !== 'Duel') {
                        isLoading.value = false;
                        stopCode = true;
                    }
                } else {
                    isLoading.value = false;
                    stopCode = true;
                }
            }
        }
    });

    if (stopCode) {
        // --- Redirect to game
        router.push('/feed');
        return null;
    }

    // firebase - set and check game cards
    const prepareRandomCoins = getCountRandomObjFromArr(coins, 10);
    const prepareWonderCards = getCountRandomObjFromArr(cardsWonder, 8);

    const docSnap = await getDoc(tableGameDuelRef);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        if (
            !docSnap.data()?.player2.user.uid &&
            docSnap.data()?.player1.user.uid !== user.value.uid
        ) {
            // Block create twice schema for game
        }
    } else {
        // --- Create all schema for game (build only in once from two players)
        if (
            docGameStatusSnap.exists() &&
            docGameStatusSnap.data().players[0].uid === user.value.uid
        ) {
            const arrPlayers = docGameStatusSnap.data().players;
            await setDoc(tableGameDuelRef, {
                player1: { ...new PlayerDuel(), user: arrPlayers[0] },
                player2: { ...new PlayerDuel(), user: arrPlayers[1] },
                // --- Who starts + 'selectWondersForPlayers' - 9th uid is for start tier I
                selectWondersForPlayers: [
                    arrPlayers[0].uid,
                    arrPlayers[1].uid,
                    arrPlayers[1].uid,
                    arrPlayers[0].uid,
                    arrPlayers[1].uid,
                    arrPlayers[0].uid,
                    arrPlayers[0].uid,
                    arrPlayers[1].uid,
                    arrPlayers[0].uid
                ],
                selectWondersForPlayersMove: 0,
                chooseWhoWillStart: false,
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
                pickCoin: '',
                pickCoinOfThree: '',
                pickCardFromGraveyard: '',
                destroyBrown: '',
                destroyGrey: '',
                wonByArt: '',
                wonByAggressive: '',
                wonBySurr: ''
            });
        }

        const docSnap2 = await getDoc(tableGameDuelRef);
        if (docSnap2.exists()) {
            console.log('Document data second time:', docSnap2.data());
        } else {
            console.log('No such document!');
        }
    }

    await storeDuelGame.subFirebaseConnect(`${user.value.uid}`);

    // Check state after refresh or leave
    tier.value !== 'prepare' || docSnap.data()?.tier !== 'prepare'
        ? (actionForCards.value = true)
        : null;

    // --- Check coin
    if (pickCoin.value !== '' && isMyTurn.value) {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    }
    // --- check pickCoinOfThree
    else if (pickCoinOfThree.value !== '' && isMyTurn.value) {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    }
    // --- check pickCardFromGraveyard
    else if (pickCardFromGraveyard.value !== '' && isMyTurn.value) {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    }
    // --- check destroyEnemyCard
    else if ((destroyBrown.value !== '' || destroyGrey.value !== '') && isMyTurn.value) {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    }
    // --- check END GAME
    else if (wonByArt.value !== '' || wonByAggressive.value !== '' || wonBySurr.value !== '') {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    }

    isLoading.value = false;
});

// ---
async function chooseWhoStarts(id: string): Promise<void> {
    isLoading.value = true;

    await storeDuelGame.upgradeTurnAndMove(`${id}`, true);
    await updateDoc(tableGameDuelRef, {
        chooseWhoWillStart: false
    });

    actionForCards.value = true;
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
    if ((selectedCard as IGameDuelCard)?.color === 'blue') {
        if (player1.value.user.uid === uid) {
            if (player1.value.resources.coins.find((coin) => coin === 'lowCostBlue')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        } else {
            if (player2.value.resources.coins.find((coin) => coin === 'lowCostBlue')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        }
    }

    if ((selectedCard as IGameDuelWonderCard)?.activated) {
        if (player1.value.user.uid === uid) {
            if (player1.value.resources.coins.find((coin) => coin === 'lowCostWonder')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        } else {
            if (player2.value.resources.coins.find((coin) => coin === 'lowCostWonder')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        }
    }

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
    if (!isMyTurn.value || wonBySurr.value !== '') return null;

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
            wonderCards: newArrWonders,
            selectWondersForPlayersMove: increment(1)
        });
        storeDuelGame.upgradeTurnAndMove(
            `${selectWondersForPlayers.value[selectWondersForPlayersMove.value]}`,
            true
        );
    } else {
        await updateDoc(tableGameDuelRef, {
            player2: {
                ...player2.value,
                wonderCards: [...player2.value.wonderCards, { ...newCard }]
            },
            wonderCards: newArrWonders,
            selectWondersForPlayersMove: increment(1)
        });
        storeDuelGame.upgradeTurnAndMove(
            `${selectWondersForPlayers.value[selectWondersForPlayersMove.value]}`,
            true
        );
    }

    isLoading.value = false;
};

const tierCardClick = (gameCard: IGameDuelCard) => {
    if (!isMyTurn.value) return null;
    if (chooseWhoWillStart.value) return null;
    if (wonByArt.value) return null;
    if (wonByAggressive.value) return null;

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

const prepareSelectWonder = () => {
    if (!isMyTurn.value) return null;

    selectWonderCard.value = true;
};

function wonderCardSelected(wonderCard: IGameDuelWonderCard, cash: number): any {
    if (!isMyTurn.value) return null;
    let fullPrice = showPrice(wonderCard, `${user.value.uid}`);
    if (fullPrice > cash) return null;
    else selectedWonder.value = wonderCard;

    actionForCards.value = false;
    storeDuelGame.setCardToWonder(fullPrice);
}

const coinSelected = async (coin: IGameDuelCoin['effect']) => {
    isLoading.value = true;
    actionForCards.value = false;

    let cash = 0;
    switch (coin) {
        case 'point4n6cash':
            cash += 6;
            break;
        case 'cash6n4special':
            cash += 6;
            break;
        default:
            break;
    }
    if (turn.value === player1.value.user.uid) {
        await updateDoc(tableGameDuelRef, {
            'gameBoard.coins': arrayRemove(coin),
            'player1.resources.coins': arrayUnion(coin),
            pickCoin: ''
        });
        cash !== 0 &&
            (await updateDoc(tableGameDuelRef, {
                'player1.resources.cash': increment(6)
            }));
    } else {
        await updateDoc(tableGameDuelRef, {
            'gameBoard.coins': arrayRemove(coin),
            'player2.resources.coins': arrayUnion(coin),
            pickCoin: ''
        });
        cash !== 0 &&
            (await updateDoc(tableGameDuelRef, {
                'player2.resources.cash': increment(6)
            }));
    }

    // Check game over || upgrade turne and move
    storeDuelGame.countArtefacts(turn.value);

    if (wonByArt.value === '' && wonByAggressive.value === '' && pickCoin.value === '') {
        storeDuelGame.upgradeTurnAndMove(
            turn.value === player1.value.user.uid
                ? `${player2.value.user.uid}`
                : `${player1.value.user.uid}`
        );
    }

    isLoading.value = false;
};

const coinSelectedOfThree = async (coin: IGameDuelCoin['effect']) => {
    isLoading.value = true;
    actionForCards.value = false;

    let cash = 0;
    switch (coin) {
        case 'point4n6cash':
            cash += 6;
            break;
        case 'cash6n4special':
            cash += 6;
            break;
        default:
            break;
    }
    if (turn.value === player1.value.user.uid) {
        await updateDoc(tableGameDuelRef, {
            'gameBoard.coins': arrayRemove(coin),
            'player1.resources.coins': arrayUnion(coin),
            pickCoinOfThree: ''
        });
        cash !== 0 &&
            (await updateDoc(tableGameDuelRef, {
                'player1.resources.cash': increment(6)
            }));
    } else {
        await updateDoc(tableGameDuelRef, {
            'gameBoard.coins': arrayRemove(coin),
            'player2.resources.coins': arrayUnion(coin),
            pickCoinOfThree: ''
        });
        cash !== 0 &&
            (await updateDoc(tableGameDuelRef, {
                'player2.resources.cash': increment(6)
            }));
    }

    // Check game over || upgrade turne and move
    storeDuelGame.countArtefacts(turn.value);

    if (wonByArt.value === '' && wonByAggressive.value === '' && pickCoinOfThree.value === '') {
        if (turn.value === player1.value.user.uid) {
            if (player1.value.resources.coins.find((coin) => coin === 'repeatWonder')) {
                storeDuelGame.upgradeTurnAndMove(`${player1.value.user.uid}`);
            } else {
                storeDuelGame.upgradeTurnAndMove(`${player2.value.user.uid}`);
            }
        } else {
            if (player2.value.resources.coins.find((coin) => coin === 'repeatWonder')) {
                storeDuelGame.upgradeTurnAndMove(`${player2.value.user.uid}`);
            } else {
                storeDuelGame.upgradeTurnAndMove(`${player1.value.user.uid}`);
            }
        }
    }

    isLoading.value = false;
};

const graveyardCardSelected = async (gameCard: IGameDuelCard) => {
    isLoading.value = true;
    actionForCards.value = false;

    await updateDoc(tableGameDuelRef, {
        graveyard: arrayRemove(gameCard),
        pickCardFromGraveyard: ''
    });

    selectedCard.value = gameCard;
    await storeDuelGame.setCardTaken(0, gameCard.tier);

    isLoading.value = false;
};

const destrooyEnemyCardSelected = async (gameCard: IGameDuelCard, color: 'brown' | 'grey') => {
    isLoading.value = true;
    actionForCards.value = false;

    if (color === 'brown') {
        await updateDoc(tableGameDuelRef, {
            destroyBrown: ''
        });
    } else {
        await updateDoc(tableGameDuelRef, {
            destroyGrey: ''
        });
    }

    selectedCard.value = gameCard;
    await storeDuelGame.setCardGraveyard(gameCard.tier);

    isLoading.value = false;
};

const countPointsFromPurple = (valPowPurple: number[]): number => {
    let points = 0;
    valPowPurple.forEach((purplePow) => {
        if (purplePow === 1) {
            const a = player1.value.cards.yellow.length;
            const b = player2.value.cards.yellow.length;
            points += a > b ? a : b;
        }
        if (purplePow === 2) {
            const a = player1.value.cards.brown.length + player1.value.cards.grey.length;
            const b = player2.value.cards.brown.length + player2.value.cards.grey.length;
            points += a > b ? a : b;
        }
        if (purplePow === 3) {
            const a = player1.value.wonderCards.length;
            const b = player2.value.wonderCards.length;
            points += a > b ? a * 2 : b * 2;
        }
        if (purplePow === 4) {
            const a = player1.value.cards.blue.length;
            const b = player2.value.cards.blue.length;
            points += a > b ? a : b;
        }
        if (purplePow === 5) {
            const a = player1.value.cards.green.length;
            const b = player2.value.cards.green.length;
            points += a > b ? a : b;
        }
        if (purplePow === 1) {
            const a = Math.floor(player1.value.resources.cash / 3);
            const b = Math.floor(player2.value.resources.cash / 3);
            points += a > b ? a : b;
        }
        if (purplePow === 7) {
            const a = player1.value.cards.red.length;
            const b = player2.value.cards.red.length;
            points += a > b ? a : b;
        }
    });
    return points;
};

const countPointsFromCoins = (coins: IGameDuelCoin['effect'][]): number => {
    let points = 0;
    coins.forEach((coin) => {
        coin === 'point4n6cash' && (points += 4);
        coin === 'point7' && (points += 7);
        coin === 'pointX3' && (points += 3 * coins.length);
    });
    return points;
};

async function prepareGameToRemoveFromDB(user: IUser): Promise<void> {
    await updateDoc(tableGameDuelRef, {
        wonBySurr: user.uid
    });
    actionForCards.value = false;
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

            <DuelGameGraveyardComponent
                :isMyTurn="isMyTurn"
                @pick-card-from-graveyard="graveyardCardSelected"
            />

            <DuelGamePlayersInfoComponent
                :user="user"
                @prepare-game-to-remove-from-db="prepareGameToRemoveFromDB"
            />

            <DuelGamePlayersResComponent
                :user="user"
                :selectWonderCard="selectWonderCard"
                :isMyTurn="isMyTurn"
                @destrooy-enemy-card-selected="destrooyEnemyCardSelected"
            />

            <!-- MAIN WINDOW FOR CARDS -->
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

            <!-- MAIN CONTAINER FOR END GAME WITH CARDS, ETC. -->
            <section class="cards countPoints" v-if="tier === 'end'">
                <p :style="allPointsP1 > allPointsP2 ? 'font-weight: bold;' : ''">
                    {{ `${player1.user.displayName || player1.user.email}`
                    }}<ion-icon
                        v-if="allPointsP1 > allPointsP2"
                        class="animateHand"
                        name="thumbs-up-sharp"
                    ></ion-icon>
                </p>
                <div class="containerPoints customInput">
                    <div class="currentPoints">
                        <ion-icon name="ribbon-sharp"></ion-icon>{{ ':' + `${player1.points}` }}
                    </div>
                    <div class="cashPoints">
                        {{ '$:' + `${Math.floor(player1.resources.cash / 3)}` }}
                    </div>
                    <div class="purplePoints">
                        <div class="miniCard"></div>
                        {{
                            ':' +
                            `${countPointsFromPurple(
                                player1.cards.purple.map((pur) => pur.valuePower[0])
                            )}`
                        }}
                    </div>
                    <div class="coinsPoints">
                        <div class="miniCoin"></div>
                        {{ ':' + `${countPointsFromCoins(player1.resources.coins)}` }}
                    </div>
                    <div class="pawnPoints">
                        <ion-icon name="skull-sharp"></ion-icon
                        >{{
                            ':' +
                            `${
                                (board.pawn <= -6 && 10) ||
                                (board.pawn <= -3 && 5) ||
                                (board.pawn <= -1 && 2) ||
                                0
                            }`
                        }}
                    </div>
                    <div class="sumPoints">
                        {{ '= ' + `${allPointsP1}` }}
                    </div>
                </div>

                <p :style="allPointsP2 > allPointsP1 ? 'font-weight: bold;' : ''">
                    {{ `${player2.user.displayName || player2.user.email}`
                    }}<ion-icon
                        v-if="allPointsP2 > allPointsP1"
                        class="animateHand"
                        name="thumbs-up-sharp"
                    ></ion-icon>
                </p>
                <div class="containerPoints customInput">
                    <div class="currentPoints">
                        <ion-icon name="ribbon-sharp"></ion-icon>{{ ':' + `${player2.points}` }}
                    </div>
                    <div class="cashPoints">
                        {{ '$:' + `${Math.floor(player2.resources.cash / 3)}` }}
                    </div>
                    <div class="purplePoints">
                        <div class="miniCard"></div>
                        {{
                            ':' +
                            `${countPointsFromPurple(
                                player2.cards.purple.map((pur) => pur.valuePower[0])
                            )}`
                        }}
                    </div>
                    <div class="coinsPoints">
                        <div class="miniCoin"></div>
                        {{ ':' + `${countPointsFromCoins(player2.resources.coins)}` }}
                    </div>
                    <div class="pawnPoints">
                        <ion-icon name="skull-sharp"></ion-icon
                        >{{
                            ':' +
                            `${
                                (board.pawn >= 6 && 10) ||
                                (board.pawn >= 3 && 5) ||
                                (board.pawn >= 1 && 2) ||
                                0
                            }`
                        }}
                    </div>
                    <div class="sumPoints">
                        {{ '= ' + `${allPointsP2}` }}
                    </div>
                </div>
            </section>

            <!-- ACTIONS -->
            <section v-if="actionForCards && selectedCard?.id && !isLoading" class="playerAction">
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
                                  (selectWonderCard = false),
                                  (actionForCards = false))
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
                                ? (storeDuelGame.setCardGraveyard(),
                                  (selectWonderCard = false),
                                  (actionForCards = false))
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
            <section v-else-if="wonByArt !== ''" class="playerAction">
                <p :style="'font-weight: bold;'">
                    {{
                        labelWonByArt +
                        `${
                            wonByArt === player1.user.uid
                                ? player1.user.displayName || player1.user.email
                                : player2.user.displayName || player2.user.email
                        }`
                    }}<ion-icon class="animateHand" name="thumbs-up-sharp"></ion-icon>
                </p>
            </section>
            <section v-else-if="wonByAggressive !== ''" class="playerAction">
                <p :style="'font-weight: bold;'">
                    {{
                        labelWonByAggressive +
                        `${
                            wonByAggressive === player1.user.uid
                                ? player1.user.displayName || player1.user.email
                                : player2.user.displayName || player2.user.email
                        }`
                    }}<ion-icon class="animateHand" name="thumbs-up-sharp"></ion-icon>
                </p>
            </section>
            <section v-else-if="wonBySurr !== ''" class="playerAction">
                <p :style="'font-weight: bold;'">
                    {{
                        labelWonBySurr +
                        `${
                            wonByAggressive === player1.user.uid
                                ? player1.user.displayName || player1.user.email
                                : player2.user.displayName || player2.user.email
                        }`
                    }}<ion-icon class="animateHand" name="thumbs-up-sharp"></ion-icon>
                </p>
                <button
                    class="customButton"
                    @click="() => (debounceEndGame.cancel(), router.push('/feed'))"
                >
                    {{ buttonBackToFeed }}
                </button>
            </section>
            <section v-else-if="isMyTurn && chooseWhoWillStart && !isLoading" class="playerAction">
                <button
                    class="customButton"
                    @click="async () => await chooseWhoStarts(`${player1.user.uid}`)"
                >
                    {{ player1.user.displayName }}
                </button>
                <p>{{ ` ${labelWhoStarts} ` }}</p>
                <button
                    class="customButton"
                    @click="async () => await chooseWhoStarts(`${player2.user.uid}`)"
                >
                    {{ player2.user.displayName }}
                </button>
            </section>
            <section v-else-if="isMyTurn && pickCoin !== '' && !isLoading" class="playerAction">
                <p>{{ labelPickCoin }}</p>
            </section>
            <section
                v-else-if="isMyTurn && pickCoinOfThree !== '' && !isLoading"
                class="playerAction"
            >
                <p>{{ labelPickCoinOfThree }}</p>
                <DuelGameCoinComponent
                    v-for="i in 3"
                    :key="theRestOfCoins[i]"
                    :coin="theRestOfCoins[i]"
                    @click="coinSelectedOfThree(theRestOfCoins[i])"
                />
            </section>
            <section
                v-else-if="isMyTurn && pickCardFromGraveyard !== '' && !isLoading"
                class="playerAction"
            >
                <p>{{ labelPickCardFromGraveyard }}</p>
            </section>
            <section v-else-if="isMyTurn && destroyBrown !== '' && !isLoading" class="playerAction">
                <p>{{ labelDestroyCard }}</p>
            </section>
            <section v-else-if="isMyTurn && destroyGrey !== '' && !isLoading" class="playerAction">
                <p>{{ labelDestroyCard }}</p>
            </section>
            <section v-else-if="isMyTurn && tier === 'prepare' && !isLoading" class="playerAction">
                <p>{{ labelPickWonder }}</p>
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
        '.    card duel pi  '
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
.playerAction > span {
    margin: 0;
    margin-left: 10px;
    cursor: pointer;
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
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.35));
}
.animateHand {
    margin-left: 5px;
    animation: animateHand 1.5s infinite ease-in-out;
}
/* END GAME */
.countPoints {
    width: 360px;
    height: 240px;
    box-shadow:
        5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px rgba(255, 255, 255, 1);
    padding: 15px;
    border-radius: 10px;
    margin: auto;
}
.countPoints > p {
    display: block;
    width: 100%;
    text-align: center;
    height: 24px;
    line-height: 24px;
    letter-spacing: 1px;
    padding: 0;
    margin: 0;
}
.containerPoints {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin-bottom: 15px;
    text-align: center;
    height: 60px;
    line-height: 40px;
    letter-spacing: 1px;
    padding: 3px;
    font-size: 14px;
}
.containerPoints > div {
    width: 46px;
    height: 50px;
    display: inline-flex;
    position: relative;
    justify-content: center;
    align-items: center;
}
.containerPoints > div::before {
    content: '';
    position: absolute;
    height: 40px;
    width: 5px;
    top: 5px;
    right: -2px;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px #fff;
}
.containerPoints > div:last-child::before {
    display: none;
}
.miniCard {
    height: 12px;
    width: 9px;
    border: 1px solid;
    border-radius: 2px;
    margin: 0 1px;
    background-color: purple;
}
.miniCoin {
    height: 9px;
    width: 9px;
    border: 1px solid;
    border-radius: 50%;
    margin: 0 1px;
    background-color: green;
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
