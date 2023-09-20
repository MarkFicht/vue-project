import type {
    GameDuelCard,
    GameDuelWonderCard,
    GameDuelCoin,
    GameDuelBoard
} from '@/interfaces/GameDuel';

export let cardsTierOne: GameDuelCard[] = [];
export let cardsTierTwo: GameDuelCard[] = [];
export let cardsTierThree: GameDuelCard[] = [];
export let cardsTierGuild: GameDuelCard[] = [];
export const cardsWonder: GameDuelWonderCard[] = [];
export const coins: GameDuelCoin[] = [];
export const rejectedCoins: GameDuelCoin[] = [];
export const border: GameDuelBoard = {
    pawn: 0,
    player1: [],
    player2: [],
    coins: []
};

// --- Create Tier I
cardsTierOne = [
    {
        tier: '1',
        taken: false,
        color: 'red',
        valueCost: [1],
        cost: ['wood'],
        valuePower: [1, 1],
        power: ['attack', 'specialChar']
    },
    {
        tier: '1',
        taken: false,
        color: 'red',
        valueCost: [1],
        cost: ['clay'],
        valuePower: [1, 2],
        power: ['attack', 'specialChar']
    },
    {
        tier: '1',
        taken: false,
        color: 'red',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [1, 3],
        power: ['attack', 'specialChar']
    },
    {
        tier: '1',
        taken: false,
        color: 'red',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: '1',
        taken: false,
        color: 'green',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [1, 4],
        power: ['artefact', 'specialChar']
    },
    {
        tier: '1',
        taken: false,
        color: 'green',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2, 5],
        power: ['artefact', 'specialChar']
    },
    {
        tier: '1',
        taken: false,
        color: 'green',
        valueCost: [1],
        cost: ['paper'],
        valuePower: [3, 1],
        power: ['artefact', 'points']
    },
    {
        tier: '1',
        taken: false,
        color: 'green',
        valueCost: [1],
        cost: ['glass'],
        valuePower: [4, 1],
        power: ['artefact', 'points']
    },
    {
        tier: '1',
        taken: false,
        color: 'blue',
        valueCost: [],
        cost: [],
        valuePower: [6, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: '1',
        taken: false,
        color: 'blue',
        valueCost: [],
        cost: [],
        valuePower: [7, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: '1',
        taken: false,
        color: 'blue',
        valueCost: [1],
        cost: ['brick'],
        valuePower: [8, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: '1',
        taken: false,
        color: 'yellow',
        valueCost: [],
        cost: [],
        valuePower: [4, 9],
        power: ['cash', 'specialChar']
    },
    {
        tier: '1',
        taken: false,
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [1],
        power: ['discount']
    },
    {
        tier: '1',
        taken: false,
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [2],
        power: ['discount']
    },
    {
        tier: '1',
        taken: false,
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [3],
        power: ['discount']
    },
    {
        tier: '1',
        taken: false,
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['clay']
    },
    {
        tier: '1',
        taken: false,
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['brick']
    },
    {
        tier: '1',
        taken: false,
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['wood']
    },
    {
        tier: '1',
        taken: false,
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['clay']
    },
    {
        tier: '1',
        taken: false,
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['brick']
    },
    {
        tier: '1',
        taken: false,
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['wood']
    },
    {
        tier: '1',
        taken: false,
        color: 'grey',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['paper']
    },
    {
        tier: '1',
        taken: false,
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
        tier: '2',
        taken: false,
        color: 'red',
        valueCost: [1, 1, 1],
        cost: ['specialChar', 'wood', 'clay'],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: '2',
        taken: false,
        color: 'red',
        valueCost: [2, 3],
        cost: ['specialChar', 'cash'],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: '2',
        taken: false,
        color: 'red',
        valueCost: [1, 1, 1],
        cost: ['brick', 'wood', 'paper'],
        valuePower: [2, 10],
        power: ['attack', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'red',
        valueCost: [2, 1],
        cost: ['clay', 'glass'],
        valuePower: [2, 11],
        power: ['attack', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'red',
        valueCost: [2],
        cost: ['brick'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '2',
        taken: false,
        color: 'green',
        valueCost: [4, 1, 1, 1],
        cost: ['specialChar', 'brick', 'wood', 'glass'],
        valuePower: [1, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '2',
        taken: false,
        color: 'green',
        valueCost: [5, 2, 1],
        cost: ['specialChar', 'clay', 'brick'],
        valuePower: [2, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '2',
        taken: false,
        color: 'green',
        valueCost: [2, 1],
        cost: ['wood', 'paper'],
        valuePower: [3, 1, 12],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'green',
        valueCost: [2, 1],
        cost: ['wood', 'glass'],
        valuePower: [4, 1, 13],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'blue',
        valueCost: [6, 2],
        cost: ['specialChar', 'clay'],
        valuePower: [4, 14],
        power: ['points', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'blue',
        valueCost: [7, 1, 1],
        cost: ['specialChar', 'wood', 'paper'],
        valuePower: [4, 15],
        power: ['points', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'blue',
        valueCost: [8, 3],
        cost: ['specialChar', 'brick'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '2',
        taken: false,
        color: 'blue',
        valueCost: [1, 1],
        cost: ['brick', 'wood'],
        valuePower: [4, 16],
        power: ['points', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'blue',
        valueCost: [2, 1],
        cost: ['wood', 'glass'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '2',
        taken: false,
        color: 'yellow',
        valueCost: [],
        cost: [],
        valuePower: [6, 17],
        power: ['cash', 'specialChar']
    },
    {
        tier: '2',
        taken: false,
        color: 'yellow',
        valueCost: [3, 1],
        cost: ['cash', 'clay'],
        valuePower: [2],
        power: ['materials']
    },
    {
        tier: '2',
        taken: false,
        color: 'yellow',
        valueCost: [2, 1, 1],
        cost: ['cash', 'paper', 'glass'],
        valuePower: [1],
        power: ['materials']
    },
    {
        tier: '2',
        taken: false,
        color: 'yellow',
        valueCost: [4],
        cost: ['cash'],
        valuePower: [4],
        power: ['discount']
    },
    {
        tier: '2',
        taken: false,
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['clay']
    },
    {
        tier: '2',
        taken: false,
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['brick']
    },
    {
        tier: '2',
        taken: false,
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['wood']
    },
    {
        tier: '2',
        taken: false,
        color: 'grey',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['paper']
    },
    {
        tier: '2',
        taken: false,
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
        tier: '3',
        taken: false,
        color: 'red',
        valueCost: [3, 2, 1, 1],
        cost: ['specialChar', 'brick', 'clay', 'paper'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '3',
        taken: false,
        color: 'red',
        valueCost: [10, 3, 1],
        cost: ['specialChar', 'wood', 'glass'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '3',
        taken: false,
        color: 'red',
        valueCost: [11, 2, 2],
        cost: ['specialChar', 'clay', 'brick'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '3',
        taken: false,
        color: 'red',
        valueCost: [3, 2],
        cost: ['clay', 'wood'],
        valuePower: [3],
        power: ['attack']
    },
    {
        tier: '3',
        taken: false,
        color: 'red',
        valueCost: [8],
        cost: ['cash'],
        valuePower: [3],
        power: ['attack']
    },
    {
        tier: '3',
        taken: false,
        color: 'green',
        valueCost: [12, 1, 1, 1],
        cost: ['specialChar', 'clay', 'paper', 'glass'],
        valuePower: [5, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: false,
        color: 'green',
        valueCost: [13, 1, 2],
        cost: ['specialChar', 'brick', 'paper'],
        valuePower: [5, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: false,
        color: 'green',
        valueCost: [1, 1, 2],
        cost: ['brick', 'wood', 'glass'],
        valuePower: [6, 3],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: false,
        color: 'green',
        valueCost: [2, 1, 1],
        cost: ['wood', 'paper', 'glass'],
        valuePower: [6, 3],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: false,
        color: 'blue',
        valueCost: [14, 2, 2],
        cost: ['specialChar', 'clay', 'wood'],
        valuePower: [6],
        power: ['points']
    },
    {
        tier: '3',
        taken: false,
        color: 'blue',
        valueCost: [15, 1, 1, 2],
        cost: ['specialChar', 'clay', 'wood', 'paper'],
        valuePower: [6],
        power: ['points']
    },
    {
        tier: '3',
        taken: false,
        color: 'blue',
        valueCost: [16, 2, 1, 1],
        cost: ['specialChar', 'clay', 'brick', 'paper'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '3',
        taken: false,
        color: 'blue',
        valueCost: [1, 1, 1, 2],
        cost: ['clay', 'brick', 'wood', 'glass'],
        valuePower: [7],
        power: ['points']
    },
    {
        tier: '3',
        taken: false,
        color: 'blue',
        valueCost: [3, 2],
        cost: ['brick', 'wood'],
        valuePower: [7],
        power: ['points']
    },
    {
        tier: '3',
        taken: false,
        color: 'blue',
        valueCost: [2, 1],
        cost: ['brick', 'glass'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '3',
        taken: false,
        color: 'yellow',
        valueCost: [18, 1, 1, 1],
        cost: ['specialChar', 'clay', 'brick', 'wood'],
        valuePower: [3, 1],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: false,
        color: 'yellow',
        valueCost: [17, 2, 1],
        cost: ['specialChar', 'clay', 'glass'],
        valuePower: [3, 2],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: false,
        color: 'yellow',
        valueCost: [2],
        cost: ['paper'],
        valuePower: [3, 3],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: false,
        color: 'yellow',
        valueCost: [1, 1, 1],
        cost: ['wood', 'glass', 'paper'],
        valuePower: [3, 4],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: false,
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
        taken: false,
        color: 'purple',
        valueCost: [1, 1, 1, 1],
        cost: ['clay', 'wood', 'paper', 'glass'],
        valuePower: [1],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: false,
        color: 'purple',
        valueCost: [1, 1, 1, 1],
        cost: ['clay', 'brick', 'paper', 'glass'],
        valuePower: [2],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: false,
        color: 'purple',
        valueCost: [2, 1, 1, 1],
        cost: ['brick', 'clay', 'wood', 'glass'],
        valuePower: [3],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: false,
        color: 'purple',
        valueCost: [2, 1, 1],
        cost: ['wood', 'clay', 'paper'],
        valuePower: [4],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: false,
        color: 'purple',
        valueCost: [2, 2],
        cost: ['clay', 'wood'],
        valuePower: [5],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: false,
        color: 'purple',
        valueCost: [2, 2],
        cost: ['brick', 'wood'],
        valuePower: [6],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: false,
        color: 'purple',
        valueCost: [2, 1, 1],
        cost: ['brick', 'clay', 'paper'],
        valuePower: [7],
        power: ['guild']
    }
];
