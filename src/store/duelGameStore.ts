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
import { collection, doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');
let unSubFirebase: any;

export interface IDuelGameStore {
    turn: IUser;
    tier: State;
    selectedCard: IGameDuelCard;
    tierOneCards: IGameDuelCard[];
    tierTwoCards: IGameDuelCard[];
    tierThreeCards: IGameDuelCard[];
    allCoins: IGameDuelCoin[];
    wonderCards: IGameDuelWonderCard[];
    graveyard: IGameDuelCard[];
    board: IGameDuelBoard;
    player1: GameDuelPlayer;
    player2: GameDuelPlayer;
}

export const duelGameStore = defineStore('duelGameStore', {
    state: (): IDuelGameStore => {
        return {
            turn: {} as IUser,
            tier: 'prepare',
            selectedCard: {} as IGameDuelCard,
            tierOneCards: [],
            tierTwoCards: [],
            tierThreeCards: [],
            allCoins: [],
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
                    const { tierICards, tierIICards, tierIIICards } = doc.data();
                    this.tierOneCards = tierICards;
                    this.tierTwoCards = tierIICards;
                    this.tierThreeCards = tierIIICards;
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
            console.log('%c cardToTake -> ', 'background: #222; color: #bada55', cardToTake);
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
            console.log(
                '%c cardToGraveyard -> ',
                'background: #222; color: #bada55',
                cardToGraveyard
            );
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
