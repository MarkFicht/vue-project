import type {
    IGameDuelCard,
    IGameDuelWonderCard,
    IGameDuelCoin,
    Tier,
    IGameDuelPlayer
} from '@/interfaces/GameDuel';

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
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [1],
        cost: ['brick'],
        valuePower: [8, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: 'I',
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
        taken: 'inGame',
        hide: false,
        color: 'grey',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['glass']
    }
];

// --- Create Tier II
cardsTierTwo = [
    {
        tier: 'II',
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
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [2, 1],
        cost: ['wood', 'paper'],
        valuePower: [3, 1, 12],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: 'II',
        taken: 'inGame',
        hide: false,
        color: 'green',
        valueCost: [2, 1],
        cost: ['wood', 'glass'],
        valuePower: [4, 1, 13],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: 'II',
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
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [1, 1],
        cost: ['brick', 'wood'],
        valuePower: [4, 16],
        power: ['points', 'specialChar']
    },
    {
        tier: 'II',
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
        taken: 'inGame',
        hide: false,
        color: 'grey',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['glass']
    }
];

// --- Create Tier III
cardsTierThree = [
    {
        tier: 'III',
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
        taken: 'inGame',
        hide: false,
        color: 'blue',
        valueCost: [2, 1],
        cost: ['brick', 'glass'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: 'III',
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
        taken: 'inGame',
        hide: false,
        color: 'yellow',
        valueCost: [2, 1],
        cost: ['brick', 'glass'],
        valuePower: [3, 5],
        power: ['points', 'cashBack']
    }
];

// --- Create Tier Guild
cardsTierGuild = [
    {
        tier: 'guild',
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
    -200, -200, -135, -135, -135, -70, -70, -70, -70, -5, -5, -5, -5, -5, 60, 60, 60, 60, 60, 60
];
export const tierOneX = [
    -120, 20, -190, -50, 90, -260, -120, 20, 160, -330, -190, -50, 90, 230, -400, -260, -120, 20,
    160, 300
];
export const tierTwoY = [
    -200, -200, -200, -200, -200, -200, -135, -135, -135, -135, -135, -70, -70, -70, -70, -5, -5,
    -5, 60, 60
];
export const tierTwoX = [...tierOneX].reverse();
export const tierThreeY = [
    -265, -265, -200, -200, -200, -135, -135, -135, -135, -70, -70, -5, -5, -5, -5, 60, 60, 60, 125,
    125
];
export const tierThreeX = [
    -120, 20, -190, -50, 90, -260, -120, 20, 160, -190, 90, 160, 20, -120, -260, 90, -50, -190, 20,
    -120
];
const tierOneHideCards = [3, 4, 5, 10, 11, 12, 13, 14];

// --- Helpers: Add IDs and coversBy to cards
export function prepareIdForCards(arr: IGameDuelCard[], tier: Tier): IGameDuelCard[] {
    let prepareCards: IGameDuelCard[] = [];

    if (tier === 'I') {
        prepareCards = arr.map((data, i) => {
            const j = i + 1;
            let k = 0;
            if (i < 2) k = 2;
            else if (i < 5) k = 3;
            else if (i < 9) k = 4;
            else if (i < 14) k = 5;
            else if (i < 20) k = 0;
            return {
                ...data,
                id: j,
                coversBy: k !== 0 ? [j + k, j + k + 1] : [],
                hide: tierOneHideCards.find((num) => num === j) ? true : false
            };
        });
    } else if (tier === 'II') {
        prepareCards[0] = { ...arr[0], id: 1, coversBy: [7] };
        prepareCards[1] = { ...arr[1], id: 2, coversBy: [7, 8] };
        prepareCards[2] = { ...arr[2], id: 3, coversBy: [8, 9] };
        prepareCards[3] = { ...arr[3], id: 4, coversBy: [9, 10] };
        prepareCards[4] = { ...arr[4], id: 5, coversBy: [10, 11] };
        prepareCards[5] = { ...arr[5], id: 6, coversBy: [11] };
        prepareCards[6] = { ...arr[6], id: 7, coversBy: [12], hide: true };
        prepareCards[7] = { ...arr[7], id: 8, coversBy: [12, 13], hide: true };
        prepareCards[8] = { ...arr[8], id: 9, coversBy: [13, 14], hide: true };
        prepareCards[9] = { ...arr[9], id: 10, coversBy: [14, 15], hide: true };
        prepareCards[10] = { ...arr[10], id: 11, coversBy: [15], hide: true };
        prepareCards[11] = { ...arr[11], id: 12, coversBy: [16] };
        prepareCards[12] = { ...arr[12], id: 13, coversBy: [16, 17] };
        prepareCards[13] = { ...arr[13], id: 14, coversBy: [17, 18] };
        prepareCards[14] = { ...arr[14], id: 15, coversBy: [18] };
        prepareCards[15] = { ...arr[15], id: 16, coversBy: [19], hide: true };
        prepareCards[16] = { ...arr[16], id: 17, coversBy: [19, 20], hide: true };
        prepareCards[17] = { ...arr[17], id: 18, coversBy: [20], hide: true };
        prepareCards[18] = { ...arr[18], id: 19, coversBy: [] };
        prepareCards[19] = { ...arr[19], id: 20, coversBy: [] };
    } else if (tier === 'III') {
        prepareCards[0] = { ...arr[0], id: 1, coversBy: [3, 4] };
        prepareCards[1] = { ...arr[1], id: 2, coversBy: [4, 5] };
        prepareCards[2] = { ...arr[2], id: 3, coversBy: [6, 7], hide: true };
        prepareCards[3] = { ...arr[3], id: 4, coversBy: [7, 8], hide: true };
        prepareCards[4] = { ...arr[4], id: 5, coversBy: [8, 9], hide: true };
        prepareCards[5] = { ...arr[5], id: 6, coversBy: [10] };
        prepareCards[6] = { ...arr[6], id: 7, coversBy: [10] };
        prepareCards[7] = { ...arr[7], id: 8, coversBy: [11] };
        prepareCards[8] = { ...arr[8], id: 9, coversBy: [11] };
        prepareCards[9] = { ...arr[9], id: 10, coversBy: [14, 15], hide: true };
        prepareCards[10] = { ...arr[10], id: 11, coversBy: [12, 13], hide: true };
        prepareCards[11] = { ...arr[11], id: 12, coversBy: [16] };
        prepareCards[12] = { ...arr[12], id: 13, coversBy: [16, 17] };
        prepareCards[13] = { ...arr[13], id: 14, coversBy: [17, 18] };
        prepareCards[14] = { ...arr[14], id: 15, coversBy: [18] };
        prepareCards[15] = { ...arr[15], id: 16, coversBy: [19], hide: true };
        prepareCards[16] = { ...arr[16], id: 17, coversBy: [19, 20], hide: true };
        prepareCards[17] = { ...arr[17], id: 18, coversBy: [20], hide: true };
        prepareCards[18] = { ...arr[18], id: 19, coversBy: [] };
        prepareCards[19] = { ...arr[19], id: 20, coversBy: [] };
    }

    return prepareCards;
}

// --- Helpres: Count player resources
export const countPlayerResources = (
    card: IGameDuelCard,
    player: IGameDuelPlayer
): IGameDuelPlayer['resources'] => {
    const res = { ...player.resources };

    if (card.color === 'brown') {
        switch (card.power[0]) {
            case 'clay':
                res.clayValue += card.valuePower[0];
                break;
            case 'brick':
                res.brickValue += card.valuePower[0];
                break;
            case 'wood':
                res.woodValue += card.valuePower[0];
                break;
            default:
                break;
        }
    } else if (card.color === 'grey') {
        switch (card.power[0]) {
            case 'paper':
                res.paperValue += card.valuePower[0];
                break;
            case 'glass':
                res.glassValue += card.valuePower[0];
                break;
            default:
                break;
        }
    } else if (card.color === 'yellow') {
        card.power.forEach((yellowPow, i) => {
            if (yellowPow === 'points') {
                player.points += card.valuePower[i];
            }
            if (yellowPow === 'discount') {
                switch (card.valuePower[i]) {
                    case 1:
                        res.clayOne = 1;
                        break;
                    case 2:
                        res.brickOne = 1;
                        break;
                    case 3:
                        res.woodOne = 1;
                        break;
                    case 4:
                        res.paperGlassOne = 1;
                        break;
                    default:
                        break;
                }
            }
            if (yellowPow === 'materials') {
                switch (card.valuePower[i]) {
                    case 1:
                        res.materialsCBW += 1;
                        break;
                    case 2:
                        res.materialsPG += 1;
                        break;
                    default:
                        break;
                }
            }
            if (yellowPow === 'specialChar') {
                res.specialChars.push(card.valuePower[i]);
            }
            if (yellowPow === 'cash') {
                res.cash += card.valuePower[i];
            }
            if (yellowPow === 'cashBack') {
                switch (card.valuePower[i]) {
                    case 1:
                        res.cash +=
                            player.wonderCards.filter((data) => data.activated !== 'none').length *
                            2;
                        break;
                    case 2:
                        res.cash += player.cards.yellow.length + 1;
                        break;
                    case 3:
                        res.cash += player.cards.grey.length * 3;
                        break;
                    case 4:
                        res.cash += player.cards.brown.length * 2;
                        break;
                    case 5:
                        res.cash += player.cards.red.length;
                        break;
                    default:
                        break;
                }
            }
        });
    } else if (card.color === 'red') {
        card.power.forEach((redPow, i) => {
            if (redPow === 'specialChar') {
                res.specialChars.push(card.valuePower[i]);
            }
        });
    } else if (card.color === 'green') {
        card.power.forEach((greenPow, i) => {
            if (greenPow === 'specialChar') {
                res.specialChars.push(card.valuePower[i]);
            }
            if (greenPow === 'artefact') {
                res.artefacts.push(card.valuePower[i]);
            }
            if (greenPow === 'points') {
                player.points += card.valuePower[i];
            }
        });
    } else if (card.color === 'blue') {
        card.power.forEach((bluePow, i) => {
            if (bluePow === 'points') {
                player.points += card.valuePower[i];
            }
            if (bluePow === 'specialChar') {
                res.specialChars.push(card.valuePower[i]);
            }
        });
    } else if (card.color === 'purple') {
        // card.power.forEach((purplePow, i) => {
        // });
    }

    return res;
};

// --- Helpres: Count player resources from wonders
export const countPlayerResourcesFromWonders = (
    card: IGameDuelWonderCard,
    player: IGameDuelPlayer
): IGameDuelPlayer => {
    const pr = { ...player };
    pr.wonderCards = pr.wonderCards.map((cd) => {
        return cd.id === card.id ? card : cd;
    });

    card.power.forEach((pow, i) => {
        if (pow === 'materials') {
            switch (card.valuePower[i]) {
                case 1:
                    pr.resources.materialsCBW += 1;
                    break;
                case 2:
                    pr.resources.materialsPG += 1;
                    break;
                default:
                    break;
            }
        } else if (pow === 'cash') {
            pr.resources.cash += card.valuePower[i];
        } else if (pow === 'points') {
            pr.points += card.valuePower[i];
        }
    });

    return pr;
};
