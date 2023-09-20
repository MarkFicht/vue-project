export interface GameDuelCard {
    id?: number;
    coversBy?: number[];
    taken: boolean;
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

export interface GameDuelCoin {
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

export interface GameDuelWonderCard {
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

export interface GameDuelBoard {
    pawn: number; // from -9 to 9
    player1: number[];
    player2: number[];
    coins: GameDuelCoin['effect'][];
}

export interface GameDuelPlayer {
    points: number;
    cash: number;
    wonderCards: GameDuelWonderCard[];
    cards: {
        red: GameDuelCard[];
        green: GameDuelCard[];
        blue: GameDuelCard[];
        yellow: GameDuelCard[];
        brown: GameDuelCard[];
        grey: GameDuelCard[];
    };
    coins: GameDuelCoin[];
    effects: {
        fromWonderCards: [];
        fromCards: [];
    };
}
