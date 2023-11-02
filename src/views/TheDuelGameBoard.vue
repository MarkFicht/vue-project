<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref, watch, provide } from 'vue';
import { getCurrentUser } from '@/helpers/HelpersFoo';
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
    cardsWonder,
    coins
} from '@/helpers/GameDuelInit';
import { prepareIdForCards, showPrice } from '@/helpers/GameDuelHelpersFoo';
import { getCountRandomObjFromArr } from '@/helpers/HelpersFoo';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import DuelGameLayOutTiersComponent from '@/components/game-duel/DuelGameLayOutTiersComponent.vue';
import DuelGameWonderComponent from '@/components/game-duel/DuelGameWonderComponent.vue';
import DuelGameCoinComponent from '@/components/game-duel/DuelGameCoinComponent.vue';
import DuelGameBoardDuelComponent from '@/components/game-duel/DuelGameBoardDuelComponent.vue';
import DuelGameGraveyardComponent from '@/components/game-duel/DuelGameGraveyardComponent.vue';
import DuelGamePlayersInfoComponent from '@/components/game-duel/DuelGamePlayersInfoComponent.vue';
import DuelGamePlayersResComponent from '@/components/game-duel/DuelGamePlayersResComponent.vue';
import DuelGameEndGameComponent from '@/components/game-duel/DuelGameEndGameComponent.vue';
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
import bell from '@/assets/bell.mp3';
import soundWin from '@/assets/win.mp3';
import soundLost from '@/assets/lost.mp3';

provide('wonderCardSelected', wonderCardSelected);

const buttonBuyCard = ref<string>('Buy for');
const buttonSell = ref<string>('Sell for');
const buttonBuildWonder = ref<string>('Build Wonder');
const buttonBackToFeed = ref<string>('Go Back');
const labelWhoStarts = ref<string>('Who Starts?');
const labelPickCoin = ref<string>('Pick Coin!');
const labelPickCoinOfThree = ref<string>('Pick one Coin of three!');
const labelPickCardFromGraveyard = ref<string>('Pick card from graveyard!');
const labelPickWonder = ref<string>('Pick Wonder!');
const labelOpponentPickWonder = ref<string>('Opponent Need To Pick Wonder...');
const labelDestroyCard = ref<string>('Destroy Enemy Card!');
const labelWonByArt = ref<string>('Winner By Artefacts: ');
const labelWonByAggressive = ref<string>('Winner By Aggressive: ');
const labelWonBySurr = ref<string>('Winner By Surrender: ');
const labelWonByPoints = ref<string>('Winner By Points: ');

const audioBell = ref<HTMLAudioElement>(new Audio(bell));
const audioWin = ref<HTMLAudioElement>(new Audio(soundWin));
const audioLost = ref<HTMLAudioElement>(new Audio(soundLost));
audioBell.value.volume = 0.66;
audioWin.value.volume = 0.66;
audioLost.value.volume = 0.66;

const endGameTimeRedirect = ref<number>(20);
const debounceEndGame = ref<any>(
    debounce(function () {
        router.push('/feed');
    }, endGameTimeRedirect.value * 1000)
);

const actionForCards = ref<boolean>(false);
const selectWonderCard = ref<boolean>(false);

const storeGame = gameStore();
const { duel } = storeToRefs(storeGame);

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
    wonByPoints,
    selectedCard,
    selectedWonder,
    isLoading,
    endGameAnimationEnd
} = storeToRefs(storeDuelGame);

const usersRef = collection(db, 'users');

const gameStatusRef = collection(db, 'gameStatus');
const gameStatusDuelRef = doc(gameStatusRef, 'Duel');

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');

const user = ref<IUser>({} as IUser);
const router = useRouter();

// --- Computed --- //
const isMyTurn = computed((): boolean => {
    return turn.value === user.value.uid;
});

const isSecondPick = computed((): boolean => {
    // TODO - fixed animation + pending with 'taken' key
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
    if (!isMyTurn.value || !selectedCard.value.id) return false;

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

// --- Watchers --- //
watch([() => selectedWonder.value, () => selectedCard.value], () => {
    if (!selectedWonder.value?.id || !selectedCard.value?.id) selectWonderCard.value = false;
});
watch([() => player2.value.wonderCards], async () => {
    isLoading.value = true;
    player2.value.wonderCards.length === 4 &&
        move.value === 0 &&
        (await updateDoc(tableGameDuelRef, {
            tier: 'I'
        }),
        (actionForCards.value = true));
    isLoading.value = false;
});
watch([() => selectWondersForPlayersMove.value], async ([newVal]) => {
    // Pick auto for 4th and 8th card
    if ((newVal === 3 || newVal === 7) && isMyTurn.value) {
        const LastCard = wonderCards.value.find((card) => card.taken === false);
        LastCard && (await chooseWonderForPlayer(LastCard.id));
    }
});

// --- Flow game
watch(move, async () => {
    actionForCards.value = true;

    isMyTurn.value && audioBell.value.play();

    if (move.value >= 20 && move.value < 40) {
        isLoading.value = true;

        if (wonBySurr.value === '') {
            await updateDoc(tableGameDuelRef, { tier: 'II' });
        }
        if (chooseWhoWillStart.value && isMyTurn.value) actionForCards.value = false;

        isLoading.value = false;
    }

    if (move.value >= 40 && move.value < 60) {
        isLoading.value = true;

        if (wonByAggressive.value === '' && wonByArt.value === '' && wonBySurr.value === '') {
            await updateDoc(tableGameDuelRef, { tier: 'III' });
        }
        if (chooseWhoWillStart.value && isMyTurn.value) actionForCards.value = false;

        isLoading.value = false;
    }

    if (move.value === 60) {
        isLoading.value = true;

        actionForCards.value = false;
        if (wonByAggressive.value === '' && wonByArt.value === '' && wonBySurr.value === '') {
            await updateDoc(tableGameDuelRef, { tier: 'end' });
        }
        isLoading.value = false;
    }
});
watch(
    [
        () => wonByArt.value,
        () => wonByAggressive.value,
        () => wonBySurr.value,
        () => wonByPoints.value
    ],
    async ([artNewVal, aggrNewVal, surNewVal, ptNewVal]) => {
        if (surNewVal !== '' || artNewVal !== '' || aggrNewVal !== '' || ptNewVal !== '') {
            if (surNewVal !== '') {
                surNewVal === user.value.uid ? audioWin.value.play() : audioLost.value.play();
            }

            if (artNewVal !== '') {
                artNewVal === user.value.uid ? audioWin.value.play() : audioLost.value.play();
            }

            if (aggrNewVal !== '') {
                aggrNewVal === user.value.uid ? audioWin.value.play() : audioLost.value.play();
            }

            // --- Remove Game from DB
            await storeGame.deleteGameDuel();

            // --- Redirect to game
            debounceEndGame.value();
        }
    }
);
watch([() => endGameAnimationEnd.value], ([newVal]) => {
    if (newVal) {
        if (wonByPoints.value === 'draw') audioWin.value.play();
        else if (wonByPoints.value !== '') {
            wonByPoints.value === user.value.uid ? audioWin.value.play() : audioLost.value.play();
        }
    }
});

// --- Component Life Cycle --- //
onBeforeMount(async () => {
    isLoading.value = true;
    let stopCode = false;

    await storeGame.subFirebaseConnect();
    const docGameStatusSnap = await getDoc(gameStatusDuelRef);

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

    // Firebase - set and check game cards
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
                wonBySurr: '',
                wonByPoints: ''
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

    // --- Check state after refresh or leave
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
    else if (
        wonByArt.value !== '' ||
        wonByAggressive.value !== '' ||
        wonBySurr.value !== '' ||
        wonByPoints.value !== ''
    ) {
        actionForCards.value = false;
        selectedCard.value = {} as IGameDuelCard;
    }

    isLoading.value = false;
});

onBeforeUnmount(async () => {
    debounceEndGame.value.cancel();
    storeDuelGame.unSubFirebaseConnect();
    storeGame.unSubFirebaseConnect();
});

// --- Functions --- //
const chooseWonderForPlayer = async (id: number) => {
    if (!isMyTurn.value || wonBySurr.value !== '') return null;

    isLoading.value = true;
    const timer = setTimeout(() => {
        clearTimeout(timer);
        setWonderCardTaken(id);
        isLoading.value = true;
    }, 500);
};

async function setWonderCardTaken(id: number): Promise<void> {
    if (wonderCards.value.find((card) => card.id === id)?.taken) return;

    let newCard = {} as IGameDuelWonderCard;
    const newArrWonders: IGameDuelWonderCard[] = wonderCards.value.map((data) => {
        return data.id === id ? ((newCard = { ...data, taken: true }), newCard) : data;
    });

    if (turn.value === player1.value.user.uid) {
        await updateDoc(tableGameDuelRef, {
            player1: {
                ...player1.value,
                wonderCards: [...player1.value.wonderCards, { ...newCard }]
            },
            wonderCards: newArrWonders,
            selectWondersForPlayersMove: increment(1),
            turn: `${selectWondersForPlayers.value[selectWondersForPlayersMove.value + 1]}`
        });
    } else {
        await updateDoc(tableGameDuelRef, {
            player2: {
                ...player2.value,
                wonderCards: [...player2.value.wonderCards, { ...newCard }]
            },
            wonderCards: newArrWonders,
            selectWondersForPlayersMove: increment(1),
            turn: `${selectWondersForPlayers.value[selectWondersForPlayersMove.value + 1]}`
        });
    }
}

async function chooseWhoStarts(id: string): Promise<void> {
    isLoading.value = true;

    await storeDuelGame.upgradeTurnAndMove(`${id}`, true);
    await updateDoc(tableGameDuelRef, { chooseWhoWillStart: false });

    actionForCards.value = true;
    isLoading.value = false;
}

const tierCardClick = (gameCard: IGameDuelCard) => {
    if (!isMyTurn.value || chooseWhoWillStart.value || wonByArt.value || wonByAggressive.value)
        return null;

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
            if (coin === 'repeatWonder') {
                storeDuelGame.upgradeTurnAndMove(`${player2.value.user.uid}`);
            } else if (
                player1.value.resources.coins.find((coin) => coin === 'repeatWonder') &&
                (move.value + 1 !== 20 || move.value + 1 !== 40)
            ) {
                storeDuelGame.upgradeTurnAndMove(`${player1.value.user.uid}`);
            } else {
                storeDuelGame.upgradeTurnAndMove(`${player2.value.user.uid}`);
            }
        } else {
            if (coin === 'repeatWonder') {
                storeDuelGame.upgradeTurnAndMove(`${player1.value.user.uid}`);
            } else if (
                player2.value.resources.coins.find((coin) => coin === 'repeatWonder') &&
                (move.value + 1 !== 20 || move.value + 1 !== 40)
            ) {
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

async function prepareGameToRemoveFromDB(user: IUser): Promise<void> {
    const pl = duel.value.players.find((player) => player.uid !== user.uid)?.uid;
    await updateDoc(tableGameDuelRef, { wonBySurr: pl });
    actionForCards.value = false;
}
</script>

<template>
    <main>
        <section class="wrapper">
            <div v-if="isLoading" class="loading">
                <LoadingSpinner />
            </div>

            <DuelGameBoardDuelComponent
                :user="user"
                :isMyTurn="isMyTurn"
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
                :isMyTurn="isMyTurn"
                :selectWonderCard="selectWonderCard"
                @destrooy-enemy-card-selected="destrooyEnemyCardSelected"
            />

            <!-- MAIN WINDOW FOR CARDS -->
            <section class="cards cardsWonderPrepre" v-if="tier === 'prepare'">
                <div v-if="!isSecondPick" class="pickWonders">
                    <DuelGameWonderComponent
                        v-if="wonderCards[0] && !wonderCards[0].taken"
                        :card="wonderCards[0]"
                        @click="
                            () =>
                                wonderCards[0].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[0].id)
                        "
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[1] && !wonderCards[1].taken"
                        :card="wonderCards[1]"
                        @click="
                            () =>
                                wonderCards[1].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[1].id)
                        "
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[2] && !wonderCards[2].taken"
                        :card="wonderCards[2]"
                        @click="
                            () =>
                                wonderCards[2].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[2].id)
                        "
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[3] && !wonderCards[3].taken"
                        :card="wonderCards[3]"
                        @click="
                            () =>
                                wonderCards[3].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[3].id)
                        "
                    />
                </div>
                <div v-if="isSecondPick" class="pickWonders">
                    <DuelGameWonderComponent
                        v-if="wonderCards[4] && !wonderCards[4].taken"
                        :card="wonderCards[4]"
                        @click="
                            () =>
                                wonderCards[4].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[4].id)
                        "
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[5] && !wonderCards[5].taken"
                        :card="wonderCards[5]"
                        @click="
                            () =>
                                wonderCards[5].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[5].id)
                        "
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[6] && !wonderCards[6].taken"
                        :card="wonderCards[6]"
                        @click="
                            () =>
                                wonderCards[6].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[6].id)
                        "
                    />
                    <DuelGameWonderComponent
                        v-if="wonderCards[7] && !wonderCards[7].taken"
                        :card="wonderCards[7]"
                        @click="
                            () =>
                                wonderCards[7].taken ||
                                selectWondersForPlayersMove === 3 ||
                                selectWondersForPlayersMove === 7
                                    ? null
                                    : chooseWonderForPlayer(wonderCards[7].id)
                        "
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
                    :cash1P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player1.user.uid}`) : -1
                    "
                    :cash2P="
                        card.coversBy?.length === 0 ? showPrice(card, `${player2.user.uid}`) : -1
                    "
                    @click="tierCardClick(card)"
                />
            </section>

            <!-- MAIN CONTAINER FOR END GAME -->
            <DuelGameEndGameComponent class="cards" v-if="tier === 'end'" :user="user" />

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
                    {{
                        buttonSell +
                        ` ${
                            turn === player1.user.uid
                                ? player1.cards.yellow.length + 2
                                : player2.cards.yellow.length + 2
                        }`
                    }}
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
                <button
                    class="customButton"
                    @click="() => (debounceEndGame.cancel(), router.push('/feed'))"
                >
                    {{ buttonBackToFeed }}
                </button>
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
                <button
                    class="customButton"
                    @click="() => (debounceEndGame.cancel(), router.push('/feed'))"
                >
                    {{ buttonBackToFeed }}
                </button>
            </section>
            <section v-else-if="wonBySurr !== ''" class="playerAction">
                <p :style="'font-weight: bold;'">
                    {{
                        labelWonBySurr +
                        `${
                            wonBySurr === player1.user.uid
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
            <section v-else-if="wonByPoints !== '' && endGameAnimationEnd" class="playerAction">
                <p :style="'font-weight: bold;'">
                    {{
                        labelWonByPoints +
                        `${
                            wonByPoints === 'draw'
                                ? 'DRAW'
                                : wonByPoints === player1.user.uid
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
                    :class="'selectCardOfThreeBorder'"
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
            <section v-else-if="!isMyTurn && tier === 'prepare' && !isLoading" class="playerAction">
                <p>{{ labelOpponentPickWonder }}</p>
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
/* --- Main Wrapper --- */
section.wrapper {
    position: relative;
    width: calc(
        calc(var(--width-wonder) * 2 + 40px) + calc(var(--width-tier) * 7 + 24px) +
            var(--width-board) + 180px + 20px
    );
    height: calc(
        calc(1 / 4 * var(--height-tier) * 7 - 44px) + calc(var(--height-board) * 1 / 10) +
            calc(var(--height-board) * 7 / 10) + calc(var(--height-board) * 1 / 10) + 50px +
            calc(1 / 4 * var(--height-tier) * 7 - 44px) + 20px
    );
    padding: 10px;
    margin: 20px auto;
    /* gap: 10px; */
    color: #444;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    display: grid;
    grid-template-areas:
        'w2   p2   c2   pi  '
        'w2   p2   duel pi  '
        '.    card duel pi  '
        '.    act  duel grv '
        'w1   p1   duel grv '
        'w1   p1   c1   grv ';
    grid-template-columns:
        calc(var(--width-wonder) * 2 + 40px) calc(var(--width-tier) * 7 + 24px) var(--width-board)
        180px;

    grid-template-rows:
        calc(1 / 4 * var(--height-tier) * 7 - 44px) calc(var(--height-board) * 1 / 10)
        calc(var(--height-board) * 7 / 10)
        calc(var(--height-board) * 1 / 10)
        50px calc(1 / 4 * var(--height-tier) * 7 - 44px);
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

/* --- Actions Player --- */
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

/* --- Cards Container --- */
.cards {
    position: relative;
    grid-area: card;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.cardsWonderPrepre {
    transform: scale(1.3);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.33));
}
.pickWonders {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 200px;
    width: calc(var(--width-wonder) * 2 + 60px);
    margin-left: 15px;
    animation: showElement 0.5s linear;
    filter: drop-shadow(0 0px 5px rgba(0, 0, 0, 0.33));
}
.animateHand {
    margin-left: 5px;
    animation: animateHand 1.5s infinite ease-in-out;
}

/* === === */
.selectCardOfThreeBorder::after {
    content: '';
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px dotted tomato;
    animation: pulseBorder 1.5s ease-in-out infinite;
}

@media (max-width: 1200px) {
    /* section.wrapper {
        --width-tier: 50px;
        --height-tier: 77px;
        --width-wonder: 100px;
        --height-wonder: 69px;
        --width-board: 150px;
        --height-board: 350px;
    } */
}
@media (max-width: 720px) {
}
@media (max-width: 560px) {
}
@media (max-width: 360px) {
}
</style>
