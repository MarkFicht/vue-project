import { defineStore } from 'pinia';
import {
    PlayerDuel,
    BoardDuel,
    type GameDuelPlayer,
    type IGameDuelBoard,
    type IGameDuelCard,
    type IGameDuelCoin,
    type IGameDuelWonderCard,
    type State
} from '@/interfaces/GameDuel';
import type IUser from '@/interfaces/User';
import db from '@/firebase/index';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot,
    increment
} from 'firebase/firestore';

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');
let unSubFirebase: any;

export interface IDuelGameStore {
    turn: string;
    tier: State;
    selectedCard: IGameDuelCard;
    tierOneCards: IGameDuelCard[];
    tierTwoCards: IGameDuelCard[];
    tierThreeCards: IGameDuelCard[];
    theRestOfCoins: IGameDuelCoin[];
    wonderCards: IGameDuelWonderCard[];
    graveyard: IGameDuelCard[];
    board: IGameDuelBoard;
    player1: GameDuelPlayer;
    player2: GameDuelPlayer;
}

export const duelGameStore = defineStore('duelGameStore', {
    state: (): IDuelGameStore => {
        return {
            turn: '',
            tier: 'prepare',
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
        async fetchAllUsers() {
            // try {
            //     this.userList = (await getAllUsers()).data;
            // } catch (error) {
            //     console.log(error);
            //     return error;
            // }
        },
        async subFirebaseConnect() {
            // firebase - set game
            unSubFirebase = await onSnapshot(tableGameDuelRef, (doc) => {
                if (doc.exists()) {
                    const {
                        turn,
                        tier,
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
        async setCardTaken(tier: State): Promise<void> {
            let cardToTake: IGameDuelCard = {} as IGameDuelCard;

            if (tier === 'I') {
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
            } else if (tier === 'II') {
                this.tierTwoCards = this.$state.tierOneCards.map((card) => {
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
            } else if (tier === 'III') {
                this.tierThreeCards = this.$state.tierOneCards.map((card) => {
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
                this.player1.cards[cardToTake.color].push(cardToTake);
                //TODO - start it after 2 users online
                await updateDoc(tableGameDuelRef, {
                    'player1.cards': this.player1.cards,
                    turn: this.player2.user?.uid || 0
                });
            } else {
                this.player2.cards[cardToTake.color].push(cardToTake);
                await updateDoc(tableGameDuelRef, {
                    'player2.cards': this.player2.cards,
                    turn: this.player1.user?.uid
                });
            }

            this.unselectCard();
        },
        async setCardGraveyard(tier: State): Promise<void> {
            let cardToGraveyard: IGameDuelCard = {} as IGameDuelCard;

            if (tier === 'I') {
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
            } else if (tier === 'II') {
                this.tierTwoCards = this.$state.tierOneCards.map((card) => {
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
            } else if (tier === 'III') {
                this.tierThreeCards = this.$state.tierOneCards.map((card) => {
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

            if (this.turn === this.player1.user.uid) {
                const addCash = 2 + this.player1.cards.yellow.length;

                //TODO - start it after 2 users online
                await updateDoc(tableGameDuelRef, {
                    'player1.resources.cash': increment(addCash),
                    turn: this.player2.user?.uid || 0
                });
            } else {
                const addCash = 2 + this.player2.cards.yellow.length;

                await updateDoc(tableGameDuelRef, {
                    'player2.resources.cash': increment(addCash),
                    turn: this.player1.user?.uid
                });
            }

            this.unselectCard();
        },
        async setCardToWonder(tier: State): Promise<void> {
            let cardToWonder: IGameDuelCard = {} as IGameDuelCard;

            if (tier === 'I') {
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
            } else if (tier === 'II') {
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
            } else if (tier === 'III') {
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
