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
    // public player2!: number[];
    public player2: number[] = [];
    public coins: IGameDuelCoin['effect'][] = [];

    constructor(params?: IGameDuelBoard) {
        Object.assign(this, params);
    }
}

export interface GameDuelPlayer {
    user: IUser;
    points: number;
    resources: {
        cash: number;
        clayValue: number;
        brickValue: number;
        woodValue: number;
        paperValue: number;
        glassValue: number;
        clayOne: number;
        brickOne: number;
        woodOne: number;
        paperGlassOne: number;
        materialsCBW: number;
        materialsPG: number;
        specialChars: number[];
        artefacts: number[];
        specialEffects: string[];
    };
    wonderCards: IGameDuelWonderCard[];
    cards: {
        red: IGameDuelCard[];
        green: IGameDuelCard[];
        blue: IGameDuelCard[];
        yellow: IGameDuelCard[];
        brown: IGameDuelCard[];
        grey: IGameDuelCard[];
        purple: IGameDuelCard[];
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
    public resources = {
        cash: 7,
        clayValue: 0,
        brickValue: 0,
        woodValue: 0,
        paperValue: 0,
        glassValue: 0,
        clayOne: 0,
        brickOne: 0,
        woodOne: 0,
        paperGlassOne: 0,
        materialsCBW: 0,
        materialsPG: 0,
        specialChars: [],
        artefacts: [],
        specialEffects: []
    };
    public wonderCards = [];
    public cards = {
        red: [],
        green: [],
        blue: [],
        yellow: [],
        brown: [],
        grey: [],
        purple: []
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
