import type IUser from './User';

export interface IGameDuelCard {
    id?: number;
    coversBy?: number[];
    hide: boolean;
    taken: 'inGame' | 'graveyard' | 'inPlayerBoard' | 'inWonder';
    tier: '1' | '2' | '3' | 'guild';
    color: 'red' | 'green' | 'blue' | 'yellow' | 'brown' | 'grey' | 'purple';
    valueCost: number[];
    cost: Array<'specialChar' | 'clay' | 'brick' | 'wood' | 'paper' | 'glass' | 'cash'>;
    valuePower: number[];
    power: Array<
        | 'specialChar'
        | 'clay'
        | 'brick'
        | 'wood'
        | 'paper'
        | 'glass'
        | 'cash'
        | 'attack'
        | 'artefact'
        | 'points'
        | 'discount'
        | 'materials'
        | 'cashBack'
        | 'guild'
    >;
}

export interface IGameDuelCoin {
    effect:
        | 'cashBack'
        | 'pointX3'
        | 'point7'
        | 'point4n6cash'
        | 'attack1'
        | 'cash6n4special'
        | 'repeatWonder'
        | 'lowCostWonder'
        | 'lowCostBlue'
        | 'artefact7';
}

export interface IGameDuelWonderCard {
    valueCost: number[];
    cost: Array<'clay' | 'brick' | 'wood' | 'paper' | 'glass' | 'cash'>;
    valuePower: number[];
    power: Array<
        | 'effect'
        | 'clay'
        | 'brick'
        | 'wood'
        | 'paper'
        | 'glass'
        | 'cash'
        | 'attack'
        | 'points'
        | 'materials'
    >;
}

export type State = 'prepare' | 'I' | 'II' | 'III' | 'end';

export interface IGameDuelBoard {
    pawn: number; // from -9 to 9
    player1: number[];
    player2: number[];
    coins: IGameDuelCoin['effect'][];
}

export class BoardDuel implements IGameDuelBoard {
    public pawn: number = 0;
    public player1: number[] = [];
    public player2!: number[];
    public coins!: IGameDuelCoin['effect'][];

    constructor(params?: IGameDuelBoard) {
        Object.assign(this, params);
    }
}

export interface GameDuelPlayer {
    user: IUser;
    points: number;
    cash: number;
    wonderCards: IGameDuelWonderCard[];
    cards: {
        red: IGameDuelCard[];
        green: IGameDuelCard[];
        blue: IGameDuelCard[];
        yellow: IGameDuelCard[];
        brown: IGameDuelCard[];
        grey: IGameDuelCard[];
    };
    coins: IGameDuelCoin[];
    effects: {
        fromWonderCards: any[];
        fromCards: any[];
    };
}

export class PlayerDuel implements GameDuelPlayer {
    private _id: number = 0;

    get id(): number {
        return this._id;
    }
    set setId(newId: number) {
        this._id = newId;
    }

    user = {} as IUser;
    public points: number = 0;
    public cash: number = 7;
    public wonderCards = [];
    public cards = {
        red: [],
        green: [],
        blue: [],
        yellow: [],
        brown: [],
        grey: []
    };
    public coins = [];
    public effects = {
        fromWonderCards: [],
        fromCards: []
    };

    constructor(params?: GameDuelPlayer) {
        Object.assign(this, params);
    }
}
