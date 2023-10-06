import { defineStore } from 'pinia';
import {
    PlayerDuel,
    BoardDuel,
    type IGameDuelPlayer,
    type IGameDuelBoard,
    type IGameDuelCard,
    type IGameDuelCoin,
    type IGameDuelWonderCard,
    type Tier
} from '@/interfaces/GameDuel';
import db from '@/firebase/index';
import {
    collection,
    doc,
    updateDoc,
    onSnapshot,
    increment,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { countPlayerResources, countPlayerResourcesFromWonders } from '@/helpers/GameDuelInit';
import { debounce } from 'lodash-es';

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');
let unSubFirebase: any;

export interface IDuelGameStore {
    turn: string;
    tier: Tier;
    move: number;
    pickCoin: string;
    pickCoinOfThree: string;
    pickCardFromGraveyard: string;
    destroyBrown: string;
    destroyGrey: string;
    tierOneCards: IGameDuelCard[];
    tierTwoCards: IGameDuelCard[];
    tierThreeCards: IGameDuelCard[];
    theRestOfCoins: IGameDuelCoin['effect'][];
    wonderCards: IGameDuelWonderCard[];
    graveyard: IGameDuelCard[];
    board: IGameDuelBoard;
    player1: IGameDuelPlayer;
    player2: IGameDuelPlayer;
    selectWondersForPlayers: string[];
    selectWondersForPlayersMove: number;
    chooseWhoWillStart: boolean;
    wonByArt: string;
    wonByAggressive: string;
    selectedCard: IGameDuelCard;
    selectedWonder: IGameDuelWonderCard;
    isLoading: boolean;
}

export const duelGameStore = defineStore('duelGameStore', {
    state: (): IDuelGameStore => {
        return {
            turn: '',
            tier: 'prepare',
            move: 0,
            pickCoin: '',
            pickCoinOfThree: '',
            pickCardFromGraveyard: '',
            destroyBrown: '',
            destroyGrey: '',
            tierOneCards: [],
            tierTwoCards: [],
            tierThreeCards: [],
            theRestOfCoins: [],
            wonderCards: [],
            graveyard: [],
            board: new BoardDuel(),
            player1: new PlayerDuel(),
            player2: new PlayerDuel(),
            selectWondersForPlayers: [],
            selectWondersForPlayersMove: 0,
            chooseWhoWillStart: false,
            wonByArt: '',
            wonByAggressive: '',
            selectedCard: {} as IGameDuelCard,
            selectedWonder: {} as IGameDuelWonderCard,
            isLoading: false
        };
    },
    getters: {
        //
    },
    actions: {
        async subFirebaseConnect(uid: string) {
            // firebase - set game
            unSubFirebase = await onSnapshot(tableGameDuelRef, (doc) => {
                if (doc.exists()) {
                    const {
                        turn,
                        tier,
                        move,
                        tierICards,
                        tierIICards,
                        tierIIICards,
                        player1,
                        player2,
                        gameBoard,
                        wonderCards,
                        graveyard,
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
                        wonByAggressive
                    } = doc.data();
                    this.turn = turn;
                    this.tier = tier;
                    this.move = move;
                    this.tierOneCards = tierICards;
                    this.tierTwoCards = tierIICards;
                    this.tierThreeCards = tierIIICards;
                    this.player1 = player1;
                    this.player2 = player2;
                    this.board = gameBoard;
                    this.wonderCards = wonderCards;
                    this.graveyard = graveyard;
                    this.theRestOfCoins = theRestOfCoins;
                    this.pickCoin = pickCoin;
                    this.pickCoinOfThree = pickCoinOfThree;
                    this.pickCardFromGraveyard = pickCardFromGraveyard;
                    this.destroyBrown = destroyBrown;
                    this.destroyGrey = destroyGrey;
                    this.selectWondersForPlayers = selectWondersForPlayers;
                    this.selectWondersForPlayersMove = selectWondersForPlayersMove;
                    this.chooseWhoWillStart = chooseWhoWillStart;
                    this.wonByArt = wonByArt;
                    this.wonByAggressive = wonByAggressive;
                }
            });
        },
        unSubFirebaseConnect() {
            unSubFirebase();
        },
        unselectCard() {
            this.selectedCard = {} as IGameDuelCard;
            this.selectedWonder = {} as IGameDuelWonderCard;
        },
        async upgradeTurnAndMove(uid: string, withOutMove?: boolean): Promise<void> {
            if (withOutMove) {
                await updateDoc(tableGameDuelRef, {
                    turn: uid
                });
            } else if ((this.move + 1 === 20 || this.move + 1 === 40) && !this.chooseWhoWillStart) {
                let checkTurn: string = uid;
                checkTurn =
                    checkTurn === this.player1.user.uid
                        ? `${this.player2.user.uid}`
                        : `${this.player1.user.uid}`;

                if (this.board.pawn > 0) checkTurn = `${this.player1.user.uid}`;
                else if (this.board.pawn < 0) checkTurn = `${this.player2.user.uid}`;

                await updateDoc(tableGameDuelRef, {
                    chooseWhoWillStart: true,
                    turn: checkTurn,
                    move: increment(1)
                });
            } else {
                await updateDoc(tableGameDuelRef, {
                    turn: uid,
                    move: increment(1)
                });
            }
        },
        async setPickCoin(id: string): Promise<void> {
            await updateDoc(tableGameDuelRef, {
                pickCoin: id
            });
        },
        async setPickCoinOfThree(id: string): Promise<void> {
            await updateDoc(tableGameDuelRef, {
                pickCoinOfThree: id
            });
        },
        async setPickCardFromGraveyard(id: string): Promise<void> {
            await updateDoc(tableGameDuelRef, {
                pickCardFromGraveyard: id
            });
        },
        async setDestroyBrown(id: string): Promise<void> {
            await updateDoc(tableGameDuelRef, {
                destroyBrown: id
            });
        },
        async setDestroyGrey(id: string): Promise<void> {
            await updateDoc(tableGameDuelRef, {
                destroyGrey: id
            });
        },
        async setMovePawn(howManyMovePawn: number, uid: string): Promise<void> {
            if (uid === this.player1.user.uid) {
                for (let index = 0; index < howManyMovePawn; index++) {
                    if (this.board.pawn <= -8) {
                        await updateDoc(tableGameDuelRef, {
                            'gameBoard.pawn': increment(-1),
                            wonByAggressive: uid
                        });
                        // TODO - end game!
                        console.log('%c END GAME - ATTACK -> ', 'background: #222; color: #bada55');
                        return;
                    }
                    await updateDoc(tableGameDuelRef, {
                        'gameBoard.pawn': increment(-1)
                    });
                    if (this.board.pawn <= -6 && this.board.punishment1) {
                        await updateDoc(tableGameDuelRef, {
                            'gameBoard.punishment1': false,
                            'player2.resources.cash':
                                this.player2.resources.cash <= 5
                                    ? 0
                                    : (this.player2.resources.cash -= 5)
                        });
                    } else if (this.board.pawn <= -3 && this.board.punishment2) {
                        await updateDoc(tableGameDuelRef, {
                            'gameBoard.punishment2': false,
                            'player2.resources.cash':
                                this.player2.resources.cash <= 2
                                    ? 0
                                    : (this.player2.resources.cash -= 2)
                        });
                    }
                }
            } else {
                for (let index = 0; index < howManyMovePawn; index++) {
                    if (this.board.pawn >= 8) {
                        await updateDoc(tableGameDuelRef, {
                            'gameBoard.pawn': increment(1),
                            wonByAggressive: uid
                        });
                        // TODO - end game!
                        console.log('%c END GAME - ATTACK -> ', 'background: #222; color: #bada55');
                        return;
                    }
                    await updateDoc(tableGameDuelRef, {
                        'gameBoard.pawn': increment(1)
                    });
                    if (this.board.pawn >= 3 && this.board.punishment3) {
                        await updateDoc(tableGameDuelRef, {
                            'gameBoard.punishment3': false,
                            'player1.resources.cash':
                                this.player1.resources.cash <= 2
                                    ? 0
                                    : (this.player1.resources.cash -= 2)
                        });
                    } else if (this.board.pawn >= 6 && this.board.punishment4) {
                        await updateDoc(tableGameDuelRef, {
                            'gameBoard.punishment4': false,
                            'player1.resources.cash':
                                this.player1.resources.cash <= 5
                                    ? 0
                                    : (this.player1.resources.cash -= 5)
                        });
                    }
                }
            }
        },
        async countArtefacts(uid: string): Promise<void> {
            let art = 0;

            if (uid === this.player1.user.uid) {
                if (this.player1.resources.coins.find((coin) => coin === 'artefact7')) {
                    art += 1;
                }
                const arrOfArt = this.player1.cards.green.map((green) => green.valuePower[0]);
                art += [...new Set(arrOfArt)].length;
            } else {
                if (this.player2.resources.coins.find((coin) => coin === 'artefact7')) {
                    art += 1;
                }
                const arrOfArt = this.player2.cards.green.map((green) => green.valuePower[0]);
                art += [...new Set(arrOfArt)].length;
            }

            if (art >= 6) {
                await updateDoc(tableGameDuelRef, {
                    wonByArt: uid
                });
                // TODO - end game!
                console.log('%c END GAME - ARTEFACT -> ', 'background: #222; color: #bada55');
                return;
            }
        },
        async setCardTaken(cash: number, tierFromGraveyard?: string): Promise<void> {
            let cardToTake: IGameDuelCard = {} as IGameDuelCard;
            let takeCoin: boolean = false;
            let checkArtefacts: boolean = false;
            let movePawn: boolean = false;
            let howManyMovePawn: number = 0;
            let extraCashFromCoin: number = 0;

            if (this.tier === 'I' || tierFromGraveyard === 'I') {
                this.tierOneCards = this.$state.tierOneCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToTake = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'inPlayerBoard' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierICards: this.tierOneCards
                });
            } else if (this.tier === 'II' || tierFromGraveyard === 'II') {
                this.tierTwoCards = this.$state.tierTwoCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToTake = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'inPlayerBoard' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierIICards: this.tierTwoCards
                });
            } else if (
                this.tier === 'III' ||
                tierFromGraveyard === 'III' ||
                tierFromGraveyard === 'guild'
            ) {
                this.tierThreeCards = this.$state.tierThreeCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToTake = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'inPlayerBoard' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierIIICards: this.tierThreeCards
                });
            }

            this.isLoading = true;

            if (this.turn === this.player1.user.uid) {
                // --- coin: cash back from sp
                if (this.player1.resources.coins.find((coin) => coin === 'cash6n4special')) {
                    if (cash === 0) {
                        cardToTake.cost[0] === 'specialChar' &&
                            this.player1.resources.specialChars.find(
                                (sp) => sp === cardToTake.valueCost[0]
                            ) &&
                            (extraCashFromCoin = 4);
                    }
                }

                const res = countPlayerResources(cardToTake, this.player1);
                this.player1.cards[cardToTake.color].push({
                    ...cardToTake,
                    taken: 'inPlayerBoard'
                });
                if (cardToTake.color === 'red') {
                    cardToTake.power.forEach((redPow, i) => {
                        if (redPow === 'attack') {
                            if (this.player1.resources.coins.find((eff) => eff === 'attack1')) {
                                howManyMovePawn = ++cardToTake.valuePower[i];
                            } else {
                                howManyMovePawn = cardToTake.valuePower[i];
                            }

                            movePawn = true;
                        }
                    });
                }
                if (cardToTake.color === 'green') {
                    checkArtefacts = true;
                    cardToTake.power.forEach((greenPow, i) => {
                        if (greenPow === 'artefact') {
                            if (this.player1.resources.artefacts.length !== 0) {
                                let pair = 0;
                                this.player1.resources.artefacts.forEach((art) => {
                                    art === cardToTake.valuePower[i] ? pair++ : null;
                                });
                                pair === 2 && (takeCoin = true);
                            }
                        }
                    });
                }
                if (cardToTake.color === 'purple') {
                    switch (cardToTake.valuePower[0]) {
                        case 1: {
                            const a = this.player1.cards.yellow.length;
                            const b = this.player2.cards.yellow.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 2: {
                            const a =
                                this.player1.cards.brown.length + this.player1.cards.grey.length;
                            const b =
                                this.player2.cards.brown.length + this.player2.cards.grey.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 4: {
                            const a = this.player1.cards.blue.length;
                            const b = this.player2.cards.blue.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 5: {
                            const a = this.player1.cards.green.length;
                            const b = this.player2.cards.green.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 7: {
                            const a = this.player1.cards.red.length;
                            const b = this.player2.cards.red.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        default:
                            break;
                    }
                }

                await updateDoc(tableGameDuelRef, {
                    'player1.points': this.player1.points,
                    'player1.cards': this.player1.cards,
                    'player1.resources': { ...res, cash: res.cash + extraCashFromCoin - cash }
                });

                // --- coin: cash back
                if (cash > 0 && this.player2.resources.coins.find((coin) => coin === 'cashBack')) {
                    let cashBack = cash;
                    cardToTake.cost.find((cost, i) => {
                        if (cost === 'cash') {
                            cashBack -= cardToTake.valueCost[i];
                            updateDoc(tableGameDuelRef, {
                                'player2.resources.cash': increment(cashBack)
                            });
                            return true;
                        } else return false;
                    });
                }

                if (checkArtefacts) {
                    await this.countArtefacts(`${this.player1.user.uid}`);
                }
                if (movePawn) {
                    await this.setMovePawn(howManyMovePawn, `${this.player1.user.uid}`);
                }
                if (takeCoin) {
                    await this.setPickCoin(`${this.player1.user.uid}`);
                }

                if (this.wonByArt === '' && this.wonByAggressive === '' && this.pickCoin === '') {
                    this.upgradeTurnAndMove(`${this.player2.user.uid}`);
                }
            } else {
                // --- coin: cash back from sp
                if (this.player2.resources.coins.find((coin) => coin === 'cash6n4special')) {
                    if (cash === 0) {
                        cardToTake.cost[0] === 'specialChar' &&
                            this.player2.resources.specialChars.find(
                                (sp) => sp === cardToTake.valueCost[0]
                            ) &&
                            (extraCashFromCoin = 4);
                    }
                }

                const res = countPlayerResources(cardToTake, this.player2);
                this.player2.cards[cardToTake.color].push({
                    ...cardToTake,
                    taken: 'inPlayerBoard'
                });
                if (cardToTake.color === 'red') {
                    cardToTake.power.forEach((redPow, i) => {
                        if (redPow === 'attack') {
                            if (this.player2.resources.coins.find((eff) => eff === 'attack1')) {
                                howManyMovePawn = cardToTake.valuePower[i] + 1;
                            } else {
                                howManyMovePawn = cardToTake.valuePower[i];
                            }

                            movePawn = true;
                        }
                    });
                }
                if (cardToTake.color === 'green') {
                    checkArtefacts = true;
                    cardToTake.power.forEach((greenPow, i) => {
                        if (greenPow === 'artefact') {
                            if (this.player2.resources.artefacts.length !== 0) {
                                let pair = 0;
                                this.player2.resources.artefacts.forEach((art) => {
                                    art === cardToTake.valuePower[i] ? pair++ : null;
                                });

                                pair === 2 && (takeCoin = true);
                            }
                        }
                    });
                }
                if (cardToTake.color === 'purple') {
                    switch (cardToTake.valuePower[0]) {
                        case 1: {
                            const a = this.player1.cards.yellow.length;
                            const b = this.player2.cards.yellow.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 2: {
                            const a =
                                this.player1.cards.brown.length + this.player1.cards.grey.length;
                            const b =
                                this.player2.cards.brown.length + this.player1.cards.grey.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 4: {
                            const a = this.player1.cards.blue.length;
                            const b = this.player2.cards.blue.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 5: {
                            const a = this.player1.cards.green.length;
                            const b = this.player2.cards.green.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        case 7: {
                            const a = this.player1.cards.red.length;
                            const b = this.player2.cards.red.length;
                            const number = a > b ? a : b;
                            res.cash += number;
                            break;
                        }
                        default:
                            break;
                    }
                }

                await updateDoc(tableGameDuelRef, {
                    'player2.points': this.player2.points,
                    'player2.cards': this.player2.cards,
                    'player2.resources': { ...res, cash: res.cash + extraCashFromCoin - cash }
                });

                // --- coin: cash back
                if (cash > 0 && this.player1.resources.coins.find((coin) => coin === 'cashBack')) {
                    let cashBack = cash;
                    cardToTake.cost.find((cost, i) => {
                        if (cost === 'cash') {
                            cashBack -= cardToTake.valueCost[i];
                            updateDoc(tableGameDuelRef, {
                                'player1.resources.cash': increment(cashBack)
                            });
                            return true;
                        } else return false;
                    });
                }

                if (checkArtefacts) {
                    await this.countArtefacts(`${this.player2.user.uid}`);
                }
                if (movePawn) {
                    await this.setMovePawn(howManyMovePawn, `${this.player2.user.uid}`);
                }
                if (takeCoin) {
                    await this.setPickCoin(`${this.player2.user.uid}`);
                }

                if (this.wonByArt === '' && this.wonByAggressive === '' && this.pickCoin === '') {
                    await this.upgradeTurnAndMove(`${this.player1.user.uid}`);
                }
            }

            this.unselectCard();
            this.isLoading = false;
        },
        async setCardGraveyard(tierFromDestroyedCard?: string): Promise<void> {
            let cardToGraveyard: IGameDuelCard = {} as IGameDuelCard;

            if (this.tier === 'I' || tierFromDestroyedCard === 'I') {
                this.tierOneCards = this.$state.tierOneCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToGraveyard = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'graveyard' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierICards: this.tierOneCards
                });
            } else if (this.tier === 'II' || tierFromDestroyedCard === 'II') {
                this.tierTwoCards = this.$state.tierTwoCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToGraveyard = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'graveyard' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierIICards: this.tierTwoCards
                });
            } else if (
                this.tier === 'III' ||
                tierFromDestroyedCard === 'III' ||
                tierFromDestroyedCard === 'guild'
            ) {
                this.tierThreeCards = this.$state.tierThreeCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToGraveyard = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'graveyard' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierIIICards: this.tierThreeCards
                });
            }

            this.isLoading = true;
            this.graveyard.push({ ...cardToGraveyard, taken: 'graveyard' });

            if (tierFromDestroyedCard) {
                // --- Action destroy enemy card + remove enemy resources
                if (this.turn === this.player1.user.uid) {
                    const res = { ...this.player2.resources };
                    if (cardToGraveyard.color === 'brown') {
                        switch (cardToGraveyard.power[0]) {
                            case 'clay':
                                res.clayValue -= cardToGraveyard.valuePower[0];
                                break;
                            case 'brick':
                                res.brickValue -= cardToGraveyard.valuePower[0];
                                break;
                            case 'wood':
                                res.woodValue -= cardToGraveyard.valuePower[0];
                                break;
                            default:
                                break;
                        }

                        await updateDoc(tableGameDuelRef, {
                            'player2.resources': res,
                            graveyard: this.graveyard,
                            'player2.cards.brown': arrayRemove({
                                ...cardToGraveyard,
                                taken: 'inPlayerBoard'
                            })
                        });
                    } else if (cardToGraveyard.color === 'grey') {
                        switch (cardToGraveyard.power[0]) {
                            case 'paper':
                                res.paperValue -= cardToGraveyard.valuePower[0];
                                break;
                            case 'glass':
                                res.glassValue -= cardToGraveyard.valuePower[0];
                                break;
                            default:
                                break;
                        }

                        await updateDoc(tableGameDuelRef, {
                            'player2.resources': res,
                            graveyard: this.graveyard,
                            'player2.cards.grey': arrayRemove({
                                ...cardToGraveyard,
                                taken: 'inPlayerBoard'
                            })
                        });
                    }
                    this.upgradeTurnAndMove(`${this.player2.user.uid}`);
                } else {
                    const res = { ...this.player1.resources };
                    if (cardToGraveyard.color === 'brown') {
                        switch (cardToGraveyard.power[0]) {
                            case 'clay':
                                res.clayValue -= cardToGraveyard.valuePower[0];
                                break;
                            case 'brick':
                                res.brickValue -= cardToGraveyard.valuePower[0];
                                break;
                            case 'wood':
                                res.woodValue -= cardToGraveyard.valuePower[0];
                                break;
                            default:
                                break;
                        }

                        await updateDoc(tableGameDuelRef, {
                            'player1.resources': res,
                            graveyard: this.graveyard,
                            'player1.cards.brown': arrayRemove({
                                ...cardToGraveyard,
                                taken: 'inPlayerBoard'
                            })
                        });
                    } else if (cardToGraveyard.color === 'grey') {
                        switch (cardToGraveyard.power[0]) {
                            case 'paper':
                                res.paperValue -= cardToGraveyard.valuePower[0];
                                break;
                            case 'glass':
                                res.glassValue -= cardToGraveyard.valuePower[0];
                                break;
                            default:
                                break;
                        }

                        await updateDoc(tableGameDuelRef, {
                            'player1.resources': res,
                            graveyard: this.graveyard,
                            'player1.cards.grey': arrayRemove({
                                ...cardToGraveyard,
                                taken: 'inPlayerBoard'
                            })
                        });
                    }
                    this.upgradeTurnAndMove(`${this.player1.user.uid}`);
                }
            } else {
                // --- Action sell card for cash
                if (this.turn === this.player1.user.uid) {
                    const addCash = 2 + this.player1.cards.yellow.length;

                    await updateDoc(tableGameDuelRef, {
                        'player1.resources.cash': increment(addCash),
                        graveyard: this.graveyard
                    });
                    this.upgradeTurnAndMove(`${this.player2.user?.uid}`);
                } else {
                    const addCash = 2 + this.player2.cards.yellow.length;

                    await updateDoc(tableGameDuelRef, {
                        'player2.resources.cash': increment(addCash),
                        graveyard: this.graveyard
                    });
                    this.upgradeTurnAndMove(`${this.player1.user.uid}`);
                }
            }

            this.unselectCard();
            this.isLoading = false;
        },
        async setCardToWonder(cash: number): Promise<void> {
            let cardToWonder: IGameDuelCard = {} as IGameDuelCard;
            let wonderCardToActive: IGameDuelWonderCard = {} as IGameDuelWonderCard;
            let movePawn: boolean = false;
            let howManyMovePawn: number = 0;
            let repeat: boolean = false;
            let destBrown: boolean = false;
            let destGrey: boolean = false;
            let takeFromGraveyard: boolean = false;
            let takeOneFromThreeCoin: boolean = false;

            if (this.tier === 'I') {
                this.tierOneCards = this.$state.tierOneCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToWonder = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'inWonder' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierICards: this.tierOneCards
                });
            } else if (this.tier === 'II') {
                this.tierTwoCards = this.$state.tierTwoCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToWonder = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'inWonder' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierIICards: this.tierTwoCards
                });
            } else if (this.tier === 'III') {
                this.tierThreeCards = this.$state.tierThreeCards.map((card) => {
                    card.id === this.selectedCard.id && (cardToWonder = card);
                    return {
                        ...card,
                        taken: card.id === this.selectedCard.id ? 'inWonder' : card.taken,
                        coversBy: card?.coversBy
                            ? card.coversBy.filter((id) => {
                                  return id !== this.selectedCard.id;
                              })
                            : []
                    };
                });
                await updateDoc(tableGameDuelRef, {
                    tierIIICards: this.tierThreeCards
                });
            }
            wonderCardToActive = this.selectedWonder;
            wonderCardToActive.activated = cardToWonder.tier;

            this.isLoading = true;
            if (this.turn === this.player1.user.uid) {
                const newResPlayer = countPlayerResourcesFromWonders(
                    wonderCardToActive,
                    this.player1
                );

                newResPlayer.resources.cash -= cash;

                // --- coin: repeat
                if (newResPlayer.resources.coins.find((coin) => coin === 'repeatWonder')) {
                    repeat = true;
                }
                // --- coin: cash back
                if (cash > 0 && this.player2.resources.coins.find((coin) => coin === 'cashBack')) {
                    updateDoc(tableGameDuelRef, {
                        'player2.resources.cash': increment(cash)
                    });
                }
                wonderCardToActive.power.forEach(async (wc, i) => {
                    if (wc === 'attack') {
                        movePawn = true;
                        howManyMovePawn = wonderCardToActive.valuePower[i];
                    } else if (wc === 'break') {
                        if (wonderCardToActive.valuePower[i] === 1) {
                            this.player2.cards.brown.length > 0 && (destBrown = true);
                        } else if (wonderCardToActive.valuePower[i] === 2) {
                            this.player2.cards.grey.length > 0 && (destGrey = true);
                        } else if (wonderCardToActive.valuePower[i] === 3) {
                            await updateDoc(tableGameDuelRef, {
                                'player2.resources.cash':
                                    this.player2.resources.cash <= 3 ? 0 : increment(-3)
                            });
                        }
                    } else if (wc === 'effect') {
                        if (wonderCardToActive.valuePower[i] === 1) {
                            repeat = true;
                        } else if (wonderCardToActive.valuePower[i] === 2) {
                            takeFromGraveyard = true;
                        } else if (wonderCardToActive.valuePower[i] === 3) {
                            takeOneFromThreeCoin = true;
                        }
                    }
                });

                if (movePawn) {
                    this.setMovePawn(howManyMovePawn, `${this.player1.user.uid}`);
                }
                if (takeOneFromThreeCoin) {
                    await this.setPickCoinOfThree(`${this.player1.user.uid}`);
                }
                if (takeFromGraveyard) {
                    await this.setPickCardFromGraveyard(`${this.player1.user.uid}`);
                }
                if (destBrown) {
                    await this.setDestroyBrown(`${this.player1.user.uid}`);
                }
                if (destGrey) {
                    await this.setDestroyGrey(`${this.player1.user.uid}`);
                }

                const lastWonderP1 = newResPlayer.wonderCards.filter(
                    (wc) => wc.activated !== 'none'
                );
                const lastWonderP2 = this.player2.wonderCards.filter(
                    (wc) => wc.activated !== 'none'
                );
                if (lastWonderP1.length === 3 && lastWonderP2.length === 4) {
                    await updateDoc(tableGameDuelRef, {
                        player1: {
                            ...newResPlayer,
                            wonderCards: lastWonderP1
                        }
                    });
                } else if (lastWonderP1.length === 4 && lastWonderP2.length === 3) {
                    await updateDoc(tableGameDuelRef, {
                        player1: newResPlayer,
                        'player2.wonderCards': lastWonderP2
                    });
                } else {
                    await updateDoc(tableGameDuelRef, {
                        player1: newResPlayer
                    });
                }

                if (
                    this.wonByArt === '' &&
                    this.wonByAggressive === '' &&
                    this.pickCardFromGraveyard === '' &&
                    this.pickCoinOfThree === '' &&
                    this.destroyBrown === '' &&
                    this.destroyGrey === ''
                ) {
                    repeat && this.move !== 19 && this.move !== 39
                        ? this.upgradeTurnAndMove(`${this.player1.user.uid}`)
                        : this.upgradeTurnAndMove(`${this.player2.user.uid}`);
                }
            } else {
                const newResPlayer = countPlayerResourcesFromWonders(
                    wonderCardToActive,
                    this.player2
                );

                newResPlayer.resources.cash -= cash;

                // --- coin: repeat
                if (newResPlayer.resources.coins.find((coin) => coin === 'repeatWonder')) {
                    repeat = true;
                }
                // --- coin: cash back
                if (cash > 0 && this.player1.resources.coins.find((coin) => coin === 'cashBack')) {
                    updateDoc(tableGameDuelRef, {
                        'player1.resources.cash': increment(cash)
                    });
                }
                wonderCardToActive.power.forEach(async (wc, i) => {
                    if (wc === 'attack') {
                        movePawn = true;
                        howManyMovePawn = wonderCardToActive.valuePower[i];
                    } else if (wc === 'break') {
                        if (wonderCardToActive.valuePower[i] === 1) {
                            this.player1.cards.brown.length > 0 && (destBrown = true);
                        } else if (wonderCardToActive.valuePower[i] === 2) {
                            this.player1.cards.grey.length > 0 && (destGrey = true);
                        } else if (wonderCardToActive.valuePower[i] === 3) {
                            await updateDoc(tableGameDuelRef, {
                                'player1.resources.cash':
                                    this.player1.resources.cash <= 3 ? 0 : increment(-3)
                            });
                        }
                    } else if (wc === 'effect') {
                        if (wonderCardToActive.valuePower[i] === 1) {
                            repeat = true;
                        } else if (wonderCardToActive.valuePower[i] === 2) {
                            takeFromGraveyard = true;
                        } else if (wonderCardToActive.valuePower[i] === 3) {
                            takeOneFromThreeCoin = true;
                        }
                    }
                });

                if (movePawn) {
                    this.setMovePawn(howManyMovePawn, `${this.player2.user.uid}`);
                }
                if (takeOneFromThreeCoin) {
                    await this.setPickCoinOfThree(`${this.player2.user.uid}`);
                }
                if (takeFromGraveyard) {
                    await this.setPickCardFromGraveyard(`${this.player2.user.uid}`);
                }
                if (destBrown) {
                    await this.setDestroyBrown(`${this.player2.user.uid}`);
                }
                if (destGrey) {
                    await this.setDestroyGrey(`${this.player2.user.uid}`);
                }

                const lastWonderP1 = this.player1.wonderCards.filter(
                    (wc) => wc.activated !== 'none'
                );
                const lastWonderP2 = newResPlayer.wonderCards.filter(
                    (wc) => wc.activated !== 'none'
                );

                if (lastWonderP1.length === 3 && lastWonderP2.length === 4) {
                    await updateDoc(tableGameDuelRef, {
                        'player1.wonderCards': lastWonderP1,
                        player2: newResPlayer
                    });
                } else if (lastWonderP1.length === 4 && lastWonderP2.length === 3) {
                    await updateDoc(tableGameDuelRef, {
                        player2: {
                            ...newResPlayer,
                            wonderCards: lastWonderP2
                        }
                    });
                } else {
                    await updateDoc(tableGameDuelRef, {
                        player2: newResPlayer
                    });
                }

                if (
                    this.wonByArt === '' &&
                    this.wonByAggressive === '' &&
                    this.pickCardFromGraveyard === '' &&
                    this.pickCoinOfThree === '' &&
                    this.destroyBrown === '' &&
                    this.destroyGrey === ''
                ) {
                    repeat && this.move !== 19 && this.move !== 39
                        ? this.upgradeTurnAndMove(`${this.player2.user.uid}`)
                        : this.upgradeTurnAndMove(`${this.player1.user.uid}`);
                }
            }

            this.unselectCard();
            this.isLoading = false;
        }
    }
});
