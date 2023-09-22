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
        unselectCard() {
            this.selectedCard = {} as IGameDuelCard;
        },
        setCardTaken(tier: State): void {
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
            }
            //TODO - which player, etc.
            this.player1.cards.red.push(cardToTake);
            this.unselectCard();
        },
        setCardGraveyard(tier: State): void {
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
            }
            this.graveyard.push(cardToGraveyard);
            this.unselectCard();
        },
        setCardToWonder(tier: State): void {
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
            }
            // this.player1.wonderCards.push(cardToWonder);
            this.unselectCard();
        }
    }
});
