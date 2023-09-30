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
import { collection, doc, updateDoc, onSnapshot, increment } from 'firebase/firestore';
import { countPlayerResources } from '@/helpers/GameDuelInit';

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');
let unSubFirebase: any;

export interface IDuelGameStore {
    turn: string;
    tier: Tier;
    move: number;
    selectedCard: IGameDuelCard;
    tierOneCards: IGameDuelCard[];
    tierTwoCards: IGameDuelCard[];
    tierThreeCards: IGameDuelCard[];
    theRestOfCoins: IGameDuelCoin[];
    wonderCards: IGameDuelWonderCard[];
    graveyard: IGameDuelCard[];
    board: IGameDuelBoard;
    player1: IGameDuelPlayer;
    player2: IGameDuelPlayer;
}

export const duelGameStore = defineStore('duelGameStore', {
    state: (): IDuelGameStore => {
        return {
            turn: '',
            tier: 'prepare',
            move: 0,
            selectedCard: {} as IGameDuelCard,
            tierOneCards: [],
            tierTwoCards: [],
            tierThreeCards: [],
            theRestOfCoins: [],
            wonderCards: [],
            graveyard: [],
            board: new BoardDuel(),
            player1: new PlayerDuel(),
            player2: new PlayerDuel()
        };
    },
    getters: {
        // getUserById: (state) => {
        //     //
        // }
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
                        theRestOfCoins
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
                }
            });
        },
        unSubFirebaseConnect() {
            unSubFirebase();
        },
        unselectCard() {
            this.selectedCard = {} as IGameDuelCard;
        },
        async checkTurnAndConditions(id: string, takeCoin: boolean): Promise<void> {
            // let cardToWonder: IGameDuelCard = {} as IGameDuelCard;
            // if (this.tier === 'I') {
            //     this.tierOneCards = this.$state.tierOneCards.map((card) => {
            //         card.id === this.selectedCard.id && (cardToWonder = card);
            //         return {
            //             ...card,
            //             taken: card.id === this.selectedCard.id ? 'inWonder' : card.taken,
            //             coversBy: card?.coversBy
            //                 ? card.coversBy.filter((id) => {
            //                       return id !== this.selectedCard.id;
            //                   })
            //                 : []
            //         };
            //     });
            //     await updateDoc(tableGameDuelRef, {
            //         tierICards: this.tierOneCards
            //     });
            // } else if (this.tier === 'II') {
            //     this.tierTwoCards = this.$state.tierOneCards.map((card) => {
            //         card.id === this.selectedCard.id && (cardToWonder = card);
            //         return {
            //             ...card,
            //             taken: card.id === this.selectedCard.id ? 'inWonder' : card.taken,
            //             coversBy: card?.coversBy
            //                 ? card.coversBy.filter((id) => {
            //                       return id !== this.selectedCard.id;
            //                   })
            //                 : []
            //         };
            //     });
            //     await updateDoc(tableGameDuelRef, {
            //         tierIICards: this.tierTwoCards
            //     });
            // } else if (this.tier === 'III') {
            //     this.tierThreeCards = this.$state.tierOneCards.map((card) => {
            //         card.id === this.selectedCard.id && (cardToWonder = card);
            //         return {
            //             ...card,
            //             taken: card.id === this.selectedCard.id ? 'inWonder' : card.taken,
            //             coversBy: card?.coversBy
            //                 ? card.coversBy.filter((id) => {
            //                       return id !== this.selectedCard.id;
            //                   })
            //                 : []
            //         };
            //     });
            //     await updateDoc(tableGameDuelRef, {
            //         tierIIICards: this.tierThreeCards
            //     });
            // }
            // console.log('%c cardToWonder -> ', 'background: #222; color: #bada55', cardToWonder);
            // this.unselectCard();
        },
        async setCardTaken(cash: number): Promise<void> {
            let cardToTake: IGameDuelCard = {} as IGameDuelCard;
            let takeCoin: boolean = false;

            if (this.tier === 'I') {
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
            } else if (this.tier === 'II') {
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
            } else if (this.tier === 'III') {
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

            if (this.turn === this.player1.user.uid) {
                const res = countPlayerResources(cardToTake, this.player1);
                this.player1.cards[cardToTake.color].push({
                    ...cardToTake,
                    taken: 'inPlayerBoard'
                });
                if (cardToTake.color === 'red') {
                    cardToTake.power.forEach((redPow, i) => {
                        if (redPow === 'attack') {
                            if (this.player1.resources.coins.find((eff) => eff === 'attack1')) {
                                this.board.pawn -= ++cardToTake.valuePower[i];
                            } else this.board.pawn -= cardToTake.valuePower[i];
                            // TODO mistake
                            if (
                                this.board.player2.length === 2 &&
                                this.board.pawn >= this.board.player2[1]
                            ) {
                                res.cash += -2;
                                this.board.player2.pop();
                            } else if (
                                this.board.player2.length === 1 &&
                                this.board.pawn >= this.board.player2[0]
                            ) {
                                res.cash += -5;
                                this.board.player2.pop();
                            }
                        }
                    });
                }
                if (cardToTake.color === 'green') {
                    cardToTake.power.forEach((greenPow, i) => {
                        if (greenPow === 'artefact') {
                            if (
                                this.player1.resources.artefacts.length !== 0 &&
                                this.player1.resources.artefacts.find(
                                    (art) => art === cardToTake.valuePower[i]
                                )
                            ) {
                                //TODO - take coin
                                console.log('%c takee -> ', 'background: #222; color: #bada55');
                                takeCoin = true;
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
                if (takeCoin) {
                    //TODO - start it after 2 users online
                    await updateDoc(tableGameDuelRef, {
                        'player1.points': this.player1.points,
                        'player1.cards': this.player1.cards,
                        'player1.resources': { ...res, cash: res.cash - cash }
                    });
                    this.checkTurnAndConditions(this.player1.user.uid, takeCoin);
                } else {
                    //TODO - start it after 2 users online
                    await updateDoc(tableGameDuelRef, {
                        'player1.points': this.player1.points,
                        'player1.cards': this.player1.cards,
                        'player1.resources': { ...res, cash: res.cash - cash },
                        gameBoard: this.board,
                        turn: this.player2.user?.uid || 0,
                        move: increment(1)
                    });
                }
            } else {
                const res = countPlayerResources(cardToTake, this.player2);
                this.player2.cards[cardToTake.color].push({
                    ...cardToTake,
                    taken: 'inPlayerBoard'
                });
                if (cardToTake.color === 'red') {
                    cardToTake.power.forEach((redPow, i) => {
                        if (redPow === 'attack') {
                            if (this.player2.resources.coins.find((eff) => eff === 'attack1')) {
                                this.board.pawn += cardToTake.valuePower[i] + 1;
                            } else this.board.pawn += cardToTake.valuePower[i];
                            // TODO mistake

                            if (
                                this.board.player1.length === 2 &&
                                this.board.pawn >= this.board.player1[1]
                            ) {
                                res.cash += -2;
                                this.board.player1.pop();
                            } else if (
                                this.board.player1.length === 1 &&
                                this.board.pawn >= this.board.player1[0]
                            ) {
                                res.cash += -5;
                                this.board.player1.pop();
                            }
                        }
                    });
                }
                if (cardToTake.color === 'green') {
                    cardToTake.power.forEach((greenPow, i) => {
                        if (greenPow === 'artefact') {
                            if (
                                this.player2.resources.artefacts.length !== 0 &&
                                this.player2.resources.artefacts.find(
                                    (art) => art === cardToTake.valuePower[i]
                                )
                            ) {
                                //TODO - take coin
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
                //TODO - start it after 2 users online
                await updateDoc(tableGameDuelRef, {
                    'player2.points': this.player2.points,
                    'player2.cards': this.player2.cards,
                    'player2.resources': { ...res, cash: res.cash - cash },
                    gameBoard: this.board,
                    turn: this.player1.user?.uid,
                    move: increment(1)
                });
            }

            this.unselectCard();
        },
        async setCardGraveyard(): Promise<void> {
            let cardToGraveyard: IGameDuelCard = {} as IGameDuelCard;

            if (this.tier === 'I') {
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
            } else if (this.tier === 'II') {
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
            } else if (this.tier === 'III') {
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

            this.graveyard.push({ ...cardToGraveyard, taken: 'graveyard' });
            if (this.turn === this.player1.user.uid) {
                const addCash = 2 + this.player1.cards.yellow.length;

                //TODO - start it after 2 users online
                await updateDoc(tableGameDuelRef, {
                    'player1.resources.cash': increment(addCash),
                    graveyard: this.graveyard,
                    turn: this.player2.user?.uid || 0,
                    move: increment(1)
                });
            } else {
                const addCash = 2 + this.player2.cards.yellow.length;

                await updateDoc(tableGameDuelRef, {
                    'player2.resources.cash': increment(addCash),
                    graveyard: this.graveyard,
                    turn: this.player1.user?.uid,
                    move: increment(1)
                });
            }

            this.unselectCard();
        },
        async setCardToWonder(): Promise<void> {
            let cardToWonder: IGameDuelCard = {} as IGameDuelCard;

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
                this.tierTwoCards = this.$state.tierOneCards.map((card) => {
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
                this.tierThreeCards = this.$state.tierOneCards.map((card) => {
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
            console.log('%c cardToWonder -> ', 'background: #222; color: #bada55', cardToWonder);
            this.unselectCard();
        }
    }
});
