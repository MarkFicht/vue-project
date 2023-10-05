import type IUser from './User';

export interface IGameDuelCard {
    id?: number;
    coversBy?: number[];
    hide: boolean;
    taken: 'inGame' | 'graveyard' | 'inPlayerBoard' | 'inWonder';
    tier: 'I' | 'II' | 'III' | 'guild';
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
    id: number;
    taken: boolean;
    activated: 'none' | 'I' | 'II' | 'III' | 'guild';
    valueCost: number[];
    cost: Array<Materials>;
    valuePower: number[];
    power: Array<
        | 'effect' // 1 - repeat, 2 - take from grav, 3 - take 1 of 3 coins
        | 'cash'
        | 'attack'
        | 'points'
        | 'materials' // 1 - c/b/w, 2 - p/g
        | 'break' // 1 - brown, 2 - grey, 3 - cash
    >;
}

export type Tier = 'prepare' | 'I' | 'II' | 'III' | 'end';
export type Materials = 'clay' | 'brick' | 'wood' | 'paper' | 'glass';

export interface IGameDuelBoard {
    pawn: number; // from -9 to 9
    coins: IGameDuelCoin['effect'][];
    punishment1: boolean;
    punishment2: boolean;
    punishment3: boolean;
    punishment4: boolean;
}

export class BoardDuel implements IGameDuelBoard {
    public pawn: number = 0;
    public coins: IGameDuelCoin['effect'][] = [];
    public punishment1: boolean = true;
    public punishment2: boolean = true;
    public punishment3: boolean = true;
    public punishment4: boolean = true;

    constructor(params?: IGameDuelBoard) {
        Object.assign(this, params);
    }
}

export interface IGameDuelPlayer {
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
        coins: IGameDuelCoin['effect'][];
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
}

export class PlayerDuel implements IGameDuelPlayer {
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
        specialEffects: [],
        coins: []
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

    constructor(params?: IGameDuelPlayer) {
        Object.assign(this, params);
    }
}
