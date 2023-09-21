import type {
    IGameDuelCard,
    IGameDuelWonderCard,
    IGameDuelCoin,
    IGameDuelBoard,
    State
} from '@/interfaces/GameDuel';

export let cardsTierOne: IGameDuelCard[] = [];
export let cardsTierTwo: IGameDuelCard[] = [];
export let cardsTierThree: IGameDuelCard[] = [];
export let cardsTierGuild: IGameDuelCard[] = [];
export const cardsWonder: IGameDuelWonderCard[] = [];
export const coins: IGameDuelCoin[] = [];
export const rejectedCoins: IGameDuelCoin[] = [];
export const border: IGameDuelBoard = {
    pawn: 0,
    player1: [],
    player2: [],
    coins: []
};

// --- Create Tier I
cardsTierOne = [
    {
        tier: '1',
        taken: 'inGame',
        color: 'red',
        valueCost: [1],
        cost: ['wood'],
        valuePower: [1, 1],
        power: ['attack', 'specialChar']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'red',
        valueCost: [1],
        cost: ['clay'],
        valuePower: [1, 2],
        power: ['attack', 'specialChar']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'red',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [1, 3],
        power: ['attack', 'specialChar']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'red',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'green',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [1, 4],
        power: ['artefact', 'specialChar']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'green',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2, 5],
        power: ['artefact', 'specialChar']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'green',
        valueCost: [1],
        cost: ['paper'],
        valuePower: [3, 1],
        power: ['artefact', 'points']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'green',
        valueCost: [1],
        cost: ['glass'],
        valuePower: [4, 1],
        power: ['artefact', 'points']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'blue',
        valueCost: [],
        cost: [],
        valuePower: [6, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'blue',
        valueCost: [],
        cost: [],
        valuePower: [7, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'blue',
        valueCost: [1],
        cost: ['brick'],
        valuePower: [8, 3],
        power: ['specialChar', 'points']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [],
        cost: [],
        valuePower: [4, 9],
        power: ['cash', 'specialChar']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [1],
        power: ['discount']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [2],
        power: ['discount']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [3],
        cost: ['cash'],
        valuePower: [3],
        power: ['discount']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['clay']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['brick']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'brown',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['wood']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['clay']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['brick']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'brown',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['wood']
    },
    {
        tier: '1',
        taken: 'inGame',
        color: 'grey',
        valueCost: [1],
        cost: ['cash'],
        valuePower: [1],
        power: ['paper']
    },
    {
        tier: '1',
        taken: 'inGame',
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
        taken: 'inGame',
        color: 'red',
        valueCost: [1, 1, 1],
        cost: ['specialChar', 'wood', 'clay'],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'red',
        valueCost: [2, 3],
        cost: ['specialChar', 'cash'],
        valuePower: [1],
        power: ['attack']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'red',
        valueCost: [1, 1, 1],
        cost: ['brick', 'wood', 'paper'],
        valuePower: [2, 10],
        power: ['attack', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'red',
        valueCost: [2, 1],
        cost: ['clay', 'glass'],
        valuePower: [2, 11],
        power: ['attack', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'red',
        valueCost: [2],
        cost: ['brick'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'green',
        valueCost: [4, 1, 1, 1],
        cost: ['specialChar', 'brick', 'wood', 'glass'],
        valuePower: [1, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'green',
        valueCost: [5, 2, 1],
        cost: ['specialChar', 'clay', 'brick'],
        valuePower: [2, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'green',
        valueCost: [2, 1],
        cost: ['wood', 'paper'],
        valuePower: [3, 1, 12],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'green',
        valueCost: [2, 1],
        cost: ['wood', 'glass'],
        valuePower: [4, 1, 13],
        power: ['artefact', 'points', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'blue',
        valueCost: [6, 2],
        cost: ['specialChar', 'clay'],
        valuePower: [4, 14],
        power: ['points', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'blue',
        valueCost: [7, 1, 1],
        cost: ['specialChar', 'wood', 'paper'],
        valuePower: [4, 15],
        power: ['points', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'blue',
        valueCost: [8, 3],
        cost: ['specialChar', 'brick'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'blue',
        valueCost: [1, 1],
        cost: ['brick', 'wood'],
        valuePower: [4, 16],
        power: ['points', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'blue',
        valueCost: [2, 1],
        cost: ['wood', 'glass'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [],
        cost: [],
        valuePower: [6, 17],
        power: ['cash', 'specialChar']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [3, 1],
        cost: ['cash', 'clay'],
        valuePower: [2],
        power: ['materials']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [2, 1, 1],
        cost: ['cash', 'paper', 'glass'],
        valuePower: [1],
        power: ['materials']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [4],
        cost: ['cash'],
        valuePower: [4],
        power: ['discount']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['clay']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['brick']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'brown',
        valueCost: [2],
        cost: ['cash'],
        valuePower: [2],
        power: ['wood']
    },
    {
        tier: '2',
        taken: 'inGame',
        color: 'grey',
        valueCost: [],
        cost: [],
        valuePower: [1],
        power: ['paper']
    },
    {
        tier: '2',
        taken: 'inGame',
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
        taken: 'inGame',
        color: 'red',
        valueCost: [3, 2, 1, 1],
        cost: ['specialChar', 'brick', 'clay', 'paper'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'red',
        valueCost: [10, 3, 1],
        cost: ['specialChar', 'wood', 'glass'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'red',
        valueCost: [11, 2, 2],
        cost: ['specialChar', 'clay', 'brick'],
        valuePower: [2],
        power: ['attack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'red',
        valueCost: [3, 2],
        cost: ['clay', 'wood'],
        valuePower: [3],
        power: ['attack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'red',
        valueCost: [8],
        cost: ['cash'],
        valuePower: [3],
        power: ['attack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'green',
        valueCost: [12, 1, 1, 1],
        cost: ['specialChar', 'clay', 'paper', 'glass'],
        valuePower: [5, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'green',
        valueCost: [13, 1, 2],
        cost: ['specialChar', 'brick', 'paper'],
        valuePower: [5, 2],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'green',
        valueCost: [1, 1, 2],
        cost: ['brick', 'wood', 'glass'],
        valuePower: [6, 3],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'green',
        valueCost: [2, 1, 1],
        cost: ['wood', 'paper', 'glass'],
        valuePower: [6, 3],
        power: ['artefact', 'points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'blue',
        valueCost: [14, 2, 2],
        cost: ['specialChar', 'clay', 'wood'],
        valuePower: [6],
        power: ['points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'blue',
        valueCost: [15, 1, 1, 2],
        cost: ['specialChar', 'clay', 'wood', 'paper'],
        valuePower: [6],
        power: ['points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'blue',
        valueCost: [16, 2, 1, 1],
        cost: ['specialChar', 'clay', 'brick', 'paper'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'blue',
        valueCost: [1, 1, 1, 2],
        cost: ['clay', 'brick', 'wood', 'glass'],
        valuePower: [7],
        power: ['points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'blue',
        valueCost: [3, 2],
        cost: ['brick', 'wood'],
        valuePower: [7],
        power: ['points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'blue',
        valueCost: [2, 1],
        cost: ['brick', 'glass'],
        valuePower: [5],
        power: ['points']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [18, 1, 1, 1],
        cost: ['specialChar', 'clay', 'brick', 'wood'],
        valuePower: [3, 1],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [17, 2, 1],
        cost: ['specialChar', 'clay', 'glass'],
        valuePower: [3, 2],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [2],
        cost: ['paper'],
        valuePower: [3, 3],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: 'inGame',
        color: 'yellow',
        valueCost: [1, 1, 1],
        cost: ['wood', 'glass', 'paper'],
        valuePower: [3, 4],
        power: ['points', 'cashBack']
    },
    {
        tier: '3',
        taken: 'inGame',
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
        color: 'purple',
        valueCost: [1, 1, 1, 1],
        cost: ['clay', 'wood', 'paper', 'glass'],
        valuePower: [1],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: 'inGame',
        color: 'purple',
        valueCost: [1, 1, 1, 1],
        cost: ['clay', 'brick', 'paper', 'glass'],
        valuePower: [2],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: 'inGame',
        color: 'purple',
        valueCost: [2, 1, 1, 1],
        cost: ['brick', 'clay', 'wood', 'glass'],
        valuePower: [3],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: 'inGame',
        color: 'purple',
        valueCost: [2, 1, 1],
        cost: ['wood', 'clay', 'paper'],
        valuePower: [4],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: 'inGame',
        color: 'purple',
        valueCost: [2, 2],
        cost: ['clay', 'wood'],
        valuePower: [5],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: 'inGame',
        color: 'purple',
        valueCost: [2, 2],
        cost: ['brick', 'wood'],
        valuePower: [6],
        power: ['guild']
    },
    {
        tier: 'guild',
        taken: 'inGame',
        color: 'purple',
        valueCost: [2, 1, 1],
        cost: ['brick', 'clay', 'paper'],
        valuePower: [7],
        power: ['guild']
    }
];

// --- Helpers: Cards position in current tier
export const tierOneY = [
    -170, -170, -110, -110, -110, -50, -50, -50, -50, 10, 10, 10, 10, 10, 70, 70, 70, 70, 70, 70
];
export const tierOneX = [
    -105, 5, -160, -50, 60, -215, -105, 5, 115, -270, -160, -50, 60, 170, -325, -215, -105, 5, 115,
    225
];
export const tierTwoY = [
    -170, -170, -170, -170, -170, -170, -110, -110, -110, -110, -110, -50, -50, -50, -50, 10, 10,
    10, 70, 70
];
export const tierTwoX = [...tierOneX].reverse();
export const tierThreeY = [
    -230, -230, -170, -170, -170, -110, -110, -110, -110, -50, -50, 10, 10, 10, 10, 70, 70, 70, 130,
    130
];
export const tierThreeX = [
    -105, 5, -160, -50, 60, -215, -105, 5, 115, -160, 60, 115, 5, -105, -215, 60, -50, -160, 5, -105
];

// --- Helpers: Add IDs and coversBy to cards
export function prepareIdForCards(arr: IGameDuelCard[], state: State): IGameDuelCard[] {
    let prepareCards: IGameDuelCard[] = [];

    if (state === 'I') {
        prepareCards = arr.map((data, i) => {
            const j = i + 1;
            let k = 0;
            if (i < 2) k = 2;
            else if (i < 5) k = 3;
            else if (i < 9) k = 4;
            else if (i < 14) k = 5;
            else if (i < 20) k = 0;
            return { ...data, id: j, coversBy: k !== 0 ? [j + k, j + k + 1] : [] };
        });
    } else if (state === 'II') {
        prepareCards[0] = { ...arr[0], id: 1, coversBy: [7] };
        prepareCards[1] = { ...arr[1], id: 2, coversBy: [7, 8] };
        prepareCards[2] = { ...arr[2], id: 3, coversBy: [8, 9] };
        prepareCards[3] = { ...arr[3], id: 4, coversBy: [9, 10] };
        prepareCards[4] = { ...arr[4], id: 5, coversBy: [10, 11] };
        prepareCards[5] = { ...arr[5], id: 6, coversBy: [11] };
        prepareCards[6] = { ...arr[6], id: 7, coversBy: [12] };
        prepareCards[7] = { ...arr[7], id: 8, coversBy: [12, 13] };
        prepareCards[8] = { ...arr[8], id: 9, coversBy: [13, 14] };
        prepareCards[9] = { ...arr[9], id: 10, coversBy: [14, 15] };
        prepareCards[10] = { ...arr[10], id: 11, coversBy: [15] };
        prepareCards[11] = { ...arr[11], id: 12, coversBy: [16] };
        prepareCards[12] = { ...arr[12], id: 13, coversBy: [16, 17] };
        prepareCards[13] = { ...arr[13], id: 14, coversBy: [17, 18] };
        prepareCards[14] = { ...arr[14], id: 15, coversBy: [18] };
        prepareCards[15] = { ...arr[15], id: 16, coversBy: [19] };
        prepareCards[16] = { ...arr[16], id: 17, coversBy: [19, 20] };
        prepareCards[17] = { ...arr[17], id: 18, coversBy: [20] };
        prepareCards[18] = { ...arr[18], id: 19, coversBy: [] };
        prepareCards[19] = { ...arr[19], id: 20, coversBy: [] };
    } else if (state === 'III') {
        prepareCards[0] = { ...arr[0], id: 1, coversBy: [3, 4] };
        prepareCards[1] = { ...arr[1], id: 2, coversBy: [4, 5] };
        prepareCards[2] = { ...arr[2], id: 3, coversBy: [6, 7] };
        prepareCards[3] = { ...arr[3], id: 4, coversBy: [7, 8] };
        prepareCards[4] = { ...arr[4], id: 5, coversBy: [8, 9] };
        prepareCards[5] = { ...arr[5], id: 6, coversBy: [10] };
        prepareCards[6] = { ...arr[6], id: 7, coversBy: [10] };
        prepareCards[7] = { ...arr[7], id: 8, coversBy: [11] };
        prepareCards[8] = { ...arr[8], id: 9, coversBy: [11] };
        prepareCards[9] = { ...arr[9], id: 10, coversBy: [14, 15] };
        prepareCards[10] = { ...arr[10], id: 11, coversBy: [12, 13] };
        prepareCards[11] = { ...arr[11], id: 12, coversBy: [16] };
        prepareCards[12] = { ...arr[12], id: 13, coversBy: [16, 17] };
        prepareCards[13] = { ...arr[13], id: 14, coversBy: [17, 18] };
        prepareCards[14] = { ...arr[14], id: 15, coversBy: [18] };
        prepareCards[15] = { ...arr[15], id: 16, coversBy: [19] };
        prepareCards[16] = { ...arr[16], id: 17, coversBy: [19, 20] };
        prepareCards[17] = { ...arr[17], id: 18, coversBy: [20] };
        prepareCards[18] = { ...arr[18], id: 19, coversBy: [] };
        prepareCards[19] = { ...arr[19], id: 20, coversBy: [] };
    }

    return prepareCards;
}
