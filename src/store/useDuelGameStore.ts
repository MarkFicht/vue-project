import { create } from 'zustand';
import { onSnapshot } from 'firebase/firestore';
import {
    type IGameDuelBoard,
    type IGameDuelCard,
    type IGameDuelCoin,
    type IGameDuelPlayer,
    type IGameDuelWonderCard,
    BoardDuel,
    PlayerDuel,
    type Tier
} from '@/interfaces/GameDuel';
import { tableGameDuelRef } from '@/firebase/refs';

export type DuelGameState = {
    turn: string;
    turnStartedAtMs: number | null;
    player1ClockMs?: number;
    player2ClockMs?: number;
    tier: Tier;
    move: number;
    pickCoin: string;
    pickCoinOfThree: string;
    pickCardFromGraveyard: string;
    destroyBrown: string;
    destroyGrey: string;
    actionUid: string;
    actionType: string;
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
    wonBySurr: string;
    wonByPoints: string;
    selectedCard: IGameDuelCard | null;
    selectedWonder: IGameDuelWonderCard | null;
    isLoading: boolean;
    endGameAnimationEnd: boolean;
    unsubscribe?: () => void;
    subFirebaseConnect: () => void;
    unSubFirebaseConnect: () => void;
    setSelectedCard: (card: IGameDuelCard | null) => void;
    setSelectedWonder: (wonder: IGameDuelWonderCard | null) => void;
    setLoading: (loading: boolean) => void;
    resetState: () => void;
};

const initialState = {
    turn: '',
    turnStartedAtMs: null as number | null,
    player1ClockMs: 30000,
    tier: 'prepare' as Tier,
    move: 0,
    pickCoin: '',
    pickCoinOfThree: '',
    pickCardFromGraveyard: '',
    destroyBrown: '',
    destroyGrey: '',
    actionUid: '',
    actionType: '',
    tierOneCards: [] as IGameDuelCard[],
    tierTwoCards: [] as IGameDuelCard[],
    tierThreeCards: [] as IGameDuelCard[],
    theRestOfCoins: [] as IGameDuelCoin['effect'][],
    wonderCards: [] as IGameDuelWonderCard[],
    graveyard: [] as IGameDuelCard[],
    board: new BoardDuel(),
    player1: new PlayerDuel(),
    player2: new PlayerDuel(),
    selectWondersForPlayers: [] as string[],
    selectWondersForPlayersMove: 0,
    chooseWhoWillStart: false,
    wonByArt: '',
    wonByAggressive: '',
    wonBySurr: '',
    wonByPoints: '',
    selectedCard: null,
    selectedWonder: null,
    isLoading: false,
    endGameAnimationEnd: false
};

export const useDuelGameStore = create<DuelGameState>((set, get) => ({
    ...initialState,
    unsubscribe: undefined,
    subFirebaseConnect: () => {
        get().unsubscribe?.();
        const toMillis = (value: unknown): number | null => {
            if (typeof value === 'number') return value;
            if (typeof value === 'object' && value !== null) {
                if ('toDate' in value && typeof (value as { toDate?: () => Date }).toDate === 'function') {
                    return (value as { toDate: () => Date }).toDate().getTime();
                }
                if ('seconds' in value && typeof (value as { seconds?: unknown }).seconds === 'number') {
                    return (value as { seconds: number }).seconds * 1000;
                }
            }
            return null;
        };
        const unsubscribe = onSnapshot(tableGameDuelRef, (doc) => {
            if (!doc.exists()) return;
            const data = doc.data();
            set({
                turn: data.turn,
                turnStartedAtMs: toMillis(data.turnStartedAt),
                player1ClockMs: typeof data.player1ClockMs === 'number' ? data.player1ClockMs : undefined,
                player2ClockMs: typeof data.player2ClockMs === 'number' ? data.player2ClockMs : undefined,
                tier: data.tier,
                move: data.move,
                tierOneCards: data.tierICards,
                tierTwoCards: data.tierIICards,
                tierThreeCards: data.tierIIICards,
                player1: data.player1,
                player2: data.player2,
                board: data.gameBoard,
                wonderCards: data.wonderCards,
                graveyard: data.graveyard,
                theRestOfCoins: data.theRestOfCoins,
                pickCoin: data.pickCoin,
                pickCoinOfThree: data.pickCoinOfThree,
                pickCardFromGraveyard: data.pickCardFromGraveyard,
                destroyBrown: data.destroyBrown,
                destroyGrey: data.destroyGrey,
                actionUid: data.actionUid ?? '',
                actionType: data.actionType ?? '',
                selectWondersForPlayers: data.selectWondersForPlayers,
                selectWondersForPlayersMove: data.selectWondersForPlayersMove,
                chooseWhoWillStart: data.chooseWhoWillStart,
                wonByArt: data.wonByArt,
                wonByAggressive: data.wonByAggressive,
                wonBySurr: data.wonBySurr,
                wonByPoints: data.wonByPoints
            });
        });
        set({ unsubscribe });
    },
    unSubFirebaseConnect: () => {
        get().unsubscribe?.();
        set({ ...initialState, unsubscribe: undefined });
    },
    setSelectedCard: (card) => set({ selectedCard: card }),
    setSelectedWonder: (wonder) => set({ selectedWonder: wonder }),
    setLoading: (isLoading) => set({ isLoading }),
    resetState: () => set({ ...initialState, unsubscribe: undefined })
}));
