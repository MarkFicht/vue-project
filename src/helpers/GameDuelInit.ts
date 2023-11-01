import type { IGameDuelCard, IGameDuelWonderCard, IGameDuelCoin } from '@/interfaces/GameDuel';

export let cardsTierOne: IGameDuelCard[] = [];
export let cardsTierTwo: IGameDuelCard[] = [];
export let cardsTierThree: IGameDuelCard[] = [];
export let cardsTierGuild: IGameDuelCard[] = [];
export let coins: IGameDuelCoin['effect'][] = [];
export let cardsWonder: IGameDuelWonderCard[] = [];

// --- Create Wonders
cardsWonder = [
    {
        id: 1,
        taken: false,
        activated: 'none',
        cost: ['brick', 'wood', 'clay', 'paper'],
        valueCost: [1, 1, 1, 2],
        power: ['attack', 'points', 'break'],
        valuePower: [1, 3, 1]
    },
    {
        id: 2,
        taken: false,
        activated: 'none',
        cost: ['brick', 'wood', 'glass'],
        valueCost: [2, 1, 1],
        power: ['attack', 'points', 'break'],
        valuePower: [1, 3, 2]
    },
    {
        id: 3,
        taken: false,
        activated: 'none',
        cost: ['brick', 'clay', 'paper'],
        valueCost: [2, 2, 1],
        power: ['effect', 'points', 'break', 'cash'],
        valuePower: [1, 3, 3, 3]
    },
    {
        id: 4,
        taken: false,
        activated: 'none',
        cost: ['brick', 'clay', 'glass'],
        valueCost: [1, 1, 2],
        power: ['effect', 'points'],
        valuePower: [1, 6]
    },
    {
        id: 5,
        taken: false,
        activated: 'none',
        cost: ['wood', 'glass', 'paper'],
        valueCost: [2, 1, 1],
        power: ['effect', 'points', 'cash'],
        valuePower: [1, 3, 6]
    },
    {
        id: 6,
        taken: false,
        activated: 'none',
        cost: ['clay', 'glass', 'paper'],
        valueCost: [2, 2, 1],
        power: ['effect', 'points'],
        valuePower: [2, 2]
    },
    {
        id: 7,
        taken: false,
        activated: 'none',
        cost: ['wood', 'brick', 'clay'],
        valueCost: [2, 1, 1],
        power: ['effect', 'points', 'materials'],
        valuePower: [1, 2, 2]
    },
    {
        id: 8,
        taken: false,
        activated: 'none',
        cost: ['wood', 'glass', 'paper'],
        valueCost: [3, 1, 1],
        power: ['effect', 'points'],
        valuePower: [3, 4]
    },
    {
        id: 9,
        taken: false,
        activated: 'none',
        cost: ['brick', 'paper'],
        valueCost: [3, 1],
        power: ['points'],
        valuePower: [9]
    },
    {
        id: 10,
        taken: false,
        activated: 'none',
        cost: ['wood', 'brick', 'paper'],
        valueCost: [1, 1, 2],
        power: ['materials', 'points'],
        valuePower: [1, 4]
    },
    {
        id: 11,
        taken: false,
        activated: 'none',
        cost: ['wood', 'brick', 'glass', 'paper'],
        valueCost: [1, 1, 1, 1],
        power: ['effect', 'cash'],
        valuePower: [1, 12]
    },
    {
        id: 12,
        taken: false,
        activated: 'none',
        cost: ['clay', 'glass'],
        valueCost: [3, 1],
        power: ['attack', 'points'],
        valuePower: [2, 3]
    }
];

// --- Create Tier I
cardsTierOne = [
    {
        tier: 'I',
        idImg: 1,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['wood']
    },
    {
        tier: 'I',
        idImg: 2,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['brick']
    },
    {
        tier: 'I',
        idImg: 3,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['clay']
    },
    {
        tier: 'I',
        idImg: 4,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['wood']
    },
    {
        tier: 'I',
        idImg: 5,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['brick']
    },
    {
        tier: 'I',
        idImg: 6,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['clay']
    },
    {
        tier: 'I',
        idImg: 7,
        taken: 'inGame',
        hide: false,
        color: 'grey',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['glass']
    },
    {
        tier: 'I',
        idImg: 8,
        taken: 'inGame',
        hide: false,
        color: 'grey',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['paper']
    },
    {
        tier: 'I',
        idImg: 9,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [1],
        cost: ['wood'],
        valuePower: [1, 1],
        power: ['attack', 'specialChar']
    },
    {
        tier: 'I',
        idImg: 10,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [1],
        cost: ['clay'],
        valuePower: [1, 2],
        power: ['attack', 'specialChar']
    },
    {
        tier: 'I',
        idImg: 11,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [1, 3],
        power: ['attack', 'specialChar']
    },
    {
        tier: 'I',
        idImg: 12,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: 'I',
        idImg: 13,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [1, 4],
        power: ['artefact', 'specialChar']
    },
    {
        tier: 'I',
        idImg: 14,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [1],
        cost: ['paper'],
        valuePower: [3, 1],
        power: ['artefact', 'points']
    },
    {
        tier: 'I',
        idImg: 15,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2, 5],
        power: ['artefact', 'specialChar']
    },
    {
        tier: 'I',
        idImg: 16,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [1],
        cost: ['glass'],
        valuePower: [4, 1],
        power: ['artefact', 'points']
    },
    {
        tier: 'I',
        idImg: 17,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [],
        cost: [],
        valuePower: [4, 9],
        power: ['cash', 'specialChar']
    },
    {
        tier: 'I',
        idImg: 18,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [2],
        power: ['discount']
    },
    {
        tier: 'I',
        idImg: 19,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [1],
        power: ['discount']
    },
    {
        tier: 'I',
        idImg: 20,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [3],
        power: ['discount']
    },

    {
        tier: 'I',
        idImg: 21,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [],
        cost: [],
        valuePower: [6, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: 'I',
        idImg: 22,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [],
        cost: [],
        valuePower: [7, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: 'I',
        idImg: 23,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [1],
        cost: ['brick'],
        valuePower: [8, 3],
        power: ['specialChar', 'points']
    }
];

// --- Create Tier II
cardsTierTwo = [
    {
        tier: 'II',
        idImg: 24,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['wood']
    },
    {
        tier: 'II',
        idImg: 25,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['brick']
    },
    {
        tier: 'II',
        idImg: 26,
        taken: 'inGame',
        hide: false,
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['clay']
    },
    {
        tier: 'II',
        idImg: 27,
        taken: 'inGame',
        hide: false,
        color: 'grey',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['glass']
    },
    {
        tier: 'II',
        idImg: 28,
        taken: 'inGame',
        hide: false,
        color: 'grey',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['paper']
    },
    {
        tier: 'II',
        idImg: 29,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [1, 1, 1],
        cost: ['specialChar', 'wood', 'clay'],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: 'II',
        idImg: 30,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [2, 3],
        cost: ['specialChar', 'cash'],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: 'II',
        idImg: 31,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [2],
        cost: ['brick'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: 'II',
        idImg: 32,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [1, 1, 1],
        cost: ['brick', 'wood', 'paper'],
        valuePower: [2, 10],
        power: ['attack', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 33,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [2, 1],
        cost: ['clay', 'glass'],
        valuePower: [2, 11],
        power: ['attack', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 34,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [1, 2],
        cost: ['wood', 'paper'],
        valuePower: [3, 1, 12],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 35,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [1, 2],
        cost: ['wood', 'glass'],
        valuePower: [4, 1, 13],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 36,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [5, 2, 1],
        cost: ['specialChar', 'clay', 'brick'],
        valuePower: [2, 2],
        power: ['artefact', 'points']
    },
    {
        tier: 'II',
        idImg: 37,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [4, 1, 1, 1],
        cost: ['specialChar', 'brick', 'wood', 'glass'],
        valuePower: [1, 2],
        power: ['artefact', 'points']
    },
    {
        tier: 'II',
        idImg: 38,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [],
        cost: [],
        valuePower: [6, 17],
        power: ['cash', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 39,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [3, 1],
        cost: ['cash', 'clay'],
        valuePower: [2],
        power: ['materials']
    },
    {
        tier: 'II',
        idImg: 40,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [2, 1, 1],
        cost: ['cash', 'paper', 'glass'],
        valuePower: [1],
        power: ['materials']
    },
    {
        tier: 'II',
        idImg: 41,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [4],
        cost: ['cash'],
        valuePower: [4],
        power: ['discount']
    },
    {
        tier: 'II',
        idImg: 42,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [7, 1, 1],
        cost: ['specialChar', 'wood', 'paper'],
        valuePower: [4, 15],
        power: ['points', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 43,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [6, 2],
        cost: ['specialChar', 'clay'],
        valuePower: [4, 14],
        power: ['points', 'specialChar']
    },
    {
        tier: 'II',
        idImg: 44,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [2, 1],
        cost: ['wood', 'glass'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: 'II',
        idImg: 45,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [8, 3],
        cost: ['specialChar', 'brick'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: 'II',
        idImg: 46,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [1, 1],
        cost: ['brick', 'wood'],
        valuePower: [4, 16],
        power: ['points', 'specialChar']
    }
];

// --- Create Tier III
cardsTierThree = [
    {
        tier: 'III',
        idImg: 47,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [11, 2, 2],
        cost: ['specialChar', 'clay', 'brick'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: 'III',
        idImg: 48,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [3, 2],
        cost: ['clay', 'wood'],
        valuePower: [3],
        power: ['attack']
    },
    {
        tier: 'III',
        idImg: 49,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [10, 3, 1],
        cost: ['specialChar', 'wood', 'glass'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: 'III',
        idImg: 50,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [3, 2, 1, 1],
        cost: ['specialChar', 'brick', 'clay', 'paper'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: 'III',
        idImg: 51,
        taken: 'inGame',
        hide: false,
        color: 'red',
        valueCost: [8],
        cost: ['cash'],
        valuePower: [3],
        power: ['attack']
    },
    {
        tier: 'III',
        idImg: 52,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [1, 1, 2],
        cost: ['brick', 'wood', 'glass'],
        valuePower: [6, 3],
        power: ['artefact', 'points']
    },
    {
        tier: 'III',
        idImg: 53,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [12, 1, 1, 1],
        cost: ['specialChar', 'clay', 'paper', 'glass'],
        valuePower: [5, 2],
        power: ['artefact', 'points']
    },
    {
        tier: 'III',
        idImg: 54,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [2, 1, 1],
        cost: ['wood', 'paper', 'glass'],
        valuePower: [6, 3],
        power: ['artefact', 'points']
    },
    {
        tier: 'III',
        idImg: 55,
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [13, 1, 2],
        cost: ['specialChar', 'brick', 'paper'],
        valuePower: [5, 2],
        power: ['artefact', 'points']
    },
    {
        tier: 'III',
        idImg: 56,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [18, 1, 1, 1],
        cost: ['specialChar', 'clay', 'brick', 'wood'],
        valuePower: [3, 1],
        power: ['points', 'cashBack']
    },
    {
        tier: 'III',
        idImg: 57,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [2],
        cost: ['paper'],
        valuePower: [3, 3],
        power: ['points', 'cashBack']
    },
    {
        tier: 'III',
        idImg: 58,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [1, 1, 1],
        cost: ['wood', 'glass', 'paper'],
        valuePower: [3, 4],
        power: ['points', 'cashBack']
    },
    {
        tier: 'III',
        idImg: 59,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [17, 2, 1],
        cost: ['specialChar', 'clay', 'glass'],
        valuePower: [3, 2],
        power: ['points', 'cashBack']
    },
    {
        tier: 'III',
        idImg: 60,
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [2, 1],
        cost: ['brick', 'glass'],
        valuePower: [3, 5],
        power: ['points', 'cashBack']
    },
    {
        tier: 'III',
        idImg: 61,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [1, 1, 1, 2],
        cost: ['clay', 'brick', 'wood', 'glass'],
        valuePower: [7],
        power: ['points']
    },
    {
        tier: 'III',
        idImg: 62,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [14, 2, 2],
        cost: ['specialChar', 'clay', 'wood'],
        valuePower: [6],
        power: ['points']
    },
    {
        tier: 'III',
        idImg: 63,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [15, 1, 1, 2],
        cost: ['specialChar', 'clay', 'wood', 'paper'],
        valuePower: [6],
        power: ['points']
    },
    {
        tier: 'III',
        idImg: 64,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [3, 2],
        cost: ['brick', 'wood'],
        valuePower: [7],
        power: ['points']
    },
    {
        tier: 'III',
        idImg: 65,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [16, 2, 1, 1],
        cost: ['specialChar', 'clay', 'brick', 'paper'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: 'III',
        idImg: 66,
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [2, 1],
        cost: ['brick', 'glass'],
        valuePower: [5],
        power: ['points']
    }
];

// --- Create Tier Guild
cardsTierGuild = [
    {
        tier: 'guild',
        idImg: 67,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [1, 1, 1, 1],
        cost: ['clay', 'wood', 'paper', 'glass'],
        valuePower: [1],
        power: ['guild']
    },
    {
        tier: 'guild',
        idImg: 68,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [1, 1, 1, 1],
        cost: ['clay', 'brick', 'paper', 'glass'],
        valuePower: [2],
        power: ['guild']
    },
    {
        tier: 'guild',
        idImg: 69,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [2, 1, 1, 1],
        cost: ['brick', 'clay', 'wood', 'glass'],
        valuePower: [3],
        power: ['guild']
    },
    {
        tier: 'guild',
        idImg: 70,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [2, 1, 1],
        cost: ['wood', 'clay', 'paper'],
        valuePower: [4],
        power: ['guild']
    },
    {
        tier: 'guild',
        idImg: 71,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [2, 2],
        cost: ['clay', 'wood'],
        valuePower: [5],
        power: ['guild']
    },
    {
        tier: 'guild',
        idImg: 72,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [2, 2],
        cost: ['brick', 'wood'],
        valuePower: [6],
        power: ['guild']
    },
    {
        tier: 'guild',
        idImg: 73,
        taken: 'inGame',
        hide: false,
        color: 'purple',
        valueCost: [2, 1, 1],
        cost: ['brick', 'clay', 'paper'],
        valuePower: [7],
        power: ['guild']
    }
];

// --- Create coins
coins = [
    'artefact7',
    'attack1',
    'cash6n4special',
    'cashBack',
    'lowCostBlue',
    'lowCostWonder',
    'point4n6cash',
    'point7',
    'pointX3',
    'repeatWonder'
];

// --- Helpers: Cards position in current tier
export const tierOneY = [
    -140, -140, -100, -100, -100, -60, -60, -60, -60, -20, -20, -20, -20, -20, 20, 20, 20, 20, 20,
    20
];
export const tierOneX = [
    -105, 5, -160, -50, 60, -215, -105, 5, 115, -270, -160, -50, 60, 170, -325, -215, -105, 5, 115,
    225
];
export const tierTwoY = [
    -140, -140, -140, -140, -140, -140, -100, -100, -100, -100, -100, -60, -60, -60, -60, -20, -20,
    -20, 20, 20
];
export const tierTwoX = [...tierOneX].reverse();
export const tierThreeY = [
    -180, -180, -140, -140, -140, -100, -100, -100, -100, -60, -60, -20, -20, -20, -20, 20, 20, 20,
    60, 60
];
export const tierThreeX = [
    -105, 5, -160, -50, 60, -215, -105, 5, 115, -160, 60, -215, -105, 5, 115, -160, -50, 60, -105, 5
];
export const tierOneHideCards = [3, 4, 5, 10, 11, 12, 13, 14];
