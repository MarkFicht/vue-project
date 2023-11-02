import type {
    IGameDuelCard,
    IGameDuelWonderCard,
    Tier,
    IGameDuelPlayer,
    Materials
} from '@/interfaces/GameDuel';
import { tierOneHideCards } from '@/helpers/GameDuelInit';

import { storeToRefs } from 'pinia';
import { duelGameStore } from '@/store/duelGameStore';

const storeDuelGame = duelGameStore();
const { player1, player2 } = storeToRefs(storeDuelGame);

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
        prepareCards[9] = { ...arr[9], id: 10, coversBy: [12, 13], hide: true };
        prepareCards[10] = { ...arr[10], id: 11, coversBy: [14, 15], hide: true };
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

// --- Helpers with store: Show price of selecetd card
export function showPrice(selectedCard: IGameDuelWonderCard | IGameDuelCard, uid: string): number {
    if (!selectedCard?.id) return -1;
    let buyForCash = 0;
    let arrCBW: { type: Materials; val: number }[] = [];
    let arrPG: { type: Materials; val: number }[] = [];
    let missingMaterials: string[] = [];
    let buyForFree = false;
    const p1Res = player1.value.resources;
    const p2Res = player2.value.resources;

    if (player1.value.user.uid === uid) {
        arrCBW = [
            {
                type: 'clay',
                val: p1Res.clayOne ? 1 : 2 + p2Res.clayValue
            },
            {
                type: 'brick',
                val: p1Res.brickOne ? 1 : 2 + p2Res.brickValue
            },
            {
                type: 'wood',
                val: p1Res.woodOne ? 1 : 2 + p2Res.woodValue
            }
        ];
        arrCBW = arrCBW.sort((a, b) => b.val - a.val);
        arrPG = [
            {
                type: 'paper',
                val: p1Res.paperGlassOne ? 1 : 2 + p2Res.paperValue
            },
            {
                type: 'glass',
                val: p1Res.paperGlassOne ? 1 : 2 + p2Res.glassValue
            }
        ];
        arrPG = arrPG.sort((a, b) => b.val - a.val);

        selectedCard.cost.forEach((cost, i) => {
            if (cost === 'specialChar') {
                p1Res.specialChars.find((sc) => {
                    if (sc === selectedCard.valueCost[i]) {
                        buyForFree = true;
                        return true;
                    }
                });
            } else if (cost === 'cash') {
                buyForCash += selectedCard.valueCost[i];
            } else if (cost === 'clay') {
                const numberOfClay = selectedCard.valueCost[i] - p1Res.clayValue;
                if (numberOfClay <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfClay; index++) {
                        missingMaterials.push('clay');
                    }
                }
            } else if (cost === 'brick') {
                const numberOfBrick = selectedCard.valueCost[i] - p1Res.brickValue;
                if (numberOfBrick <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfBrick; index++) {
                        missingMaterials.push('brick');
                    }
                }
            } else if (cost === 'wood') {
                const numberOfWood = selectedCard.valueCost[i] - p1Res.woodValue;
                if (numberOfWood <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfWood; index++) {
                        missingMaterials.push('wood');
                    }
                }
            } else if (cost === 'paper') {
                const numberOfPaper = selectedCard.valueCost[i] - p1Res.paperValue;
                if (numberOfPaper <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfPaper; index++) {
                        missingMaterials.push('paper');
                    }
                }
            } else if (cost === 'glass') {
                const numberOfGlass = selectedCard.valueCost[i] - p1Res.glassValue;
                if (numberOfGlass <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfGlass; index++) {
                        missingMaterials.push('glass');
                    }
                }
            }
        });
    } else {
        arrCBW = [
            {
                type: 'clay',
                val: p2Res.clayOne ? 1 : 2 + p1Res.clayValue
            },
            {
                type: 'brick',
                val: p2Res.brickOne ? 1 : 2 + p1Res.brickValue
            },
            {
                type: 'wood',
                val: p2Res.woodOne ? 1 : 2 + p1Res.woodValue
            }
        ];
        arrCBW = arrCBW.sort((a, b) => b.val - a.val);
        arrPG = [
            {
                type: 'paper',
                val: p2Res.paperGlassOne ? 1 : 2 + p1Res.paperValue
            },
            {
                type: 'glass',
                val: p2Res.paperGlassOne ? 1 : 2 + p1Res.glassValue
            }
        ];
        arrPG = arrPG.sort((a, b) => b.val - a.val);

        selectedCard.cost.forEach((cost, i) => {
            if (cost === 'specialChar') {
                p2Res.specialChars.find((sc) => {
                    if (sc === selectedCard.valueCost[i]) {
                        buyForFree = true;
                        return true;
                    }
                });
            } else if (cost === 'cash') {
                buyForCash += selectedCard.valueCost[i];
            } else if (cost === 'clay') {
                const numberOfClay = selectedCard.valueCost[i] - p2Res.clayValue;
                if (numberOfClay <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfClay; index++) {
                        missingMaterials.push('clay');
                    }
                }
            } else if (cost === 'brick') {
                const numberOfBrick = selectedCard.valueCost[i] - p2Res.brickValue;
                if (numberOfBrick <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfBrick; index++) {
                        missingMaterials.push('brick');
                    }
                }
            } else if (cost === 'wood') {
                const numberOfWood = selectedCard.valueCost[i] - p2Res.woodValue;
                if (numberOfWood <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfWood; index++) {
                        missingMaterials.push('wood');
                    }
                }
            } else if (cost === 'paper') {
                const numberOfPaper = selectedCard.valueCost[i] - p2Res.paperValue;
                if (numberOfPaper <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfPaper; index++) {
                        missingMaterials.push('paper');
                    }
                }
            } else if (cost === 'glass') {
                const numberOfGlass = selectedCard.valueCost[i] - p2Res.glassValue;
                if (numberOfGlass <= 0) {
                    return null;
                } else {
                    for (let index = 0; index < numberOfGlass; index++) {
                        missingMaterials.push('glass');
                    }
                }
            }
        });
    }

    missingMaterials = removeOptionalMaterials(missingMaterials, arrCBW, arrPG, uid);
    if ((selectedCard as IGameDuelCard)?.color === 'blue') {
        if (player1.value.user.uid === uid) {
            if (player1.value.resources.coins.find((coin) => coin === 'lowCostBlue')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        } else {
            if (player2.value.resources.coins.find((coin) => coin === 'lowCostBlue')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        }
    }

    if ((selectedCard as IGameDuelWonderCard)?.activated) {
        if (player1.value.user.uid === uid) {
            if (player1.value.resources.coins.find((coin) => coin === 'lowCostWonder')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        } else {
            if (player2.value.resources.coins.find((coin) => coin === 'lowCostWonder')) {
                missingMaterials.shift();
                missingMaterials.shift();
            }
        }
    }

    missingMaterials.forEach((mat) => {
        buyForCash +=
            arrCBW.find(({ type }) => type === mat)?.val ||
            arrPG.find(({ type }) => type === mat)?.val ||
            0;
    });

    if (buyForFree) return 0;
    else return buyForCash;
}

// --- Helpers with store: Remove materials if player has discount
export function removeOptionalMaterials(
    missingMaterials: string[],
    arrCBW: { type: Materials; val: number }[],
    arrPG: { type: Materials; val: number }[],
    uid: string
): string[] {
    const arr = missingMaterials;
    const p1Res = player1.value.resources;
    const p2Res = player2.value.resources;

    if (player1.value.user.uid === uid) {
        for (let index = 0; index < p1Res.materialsCBW; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrCBW[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrCBW[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else {
                    arr.find((str, i) => {
                        if (str === arrCBW[2].type) {
                            found = true;
                            j = i;
                            return true;
                        } else return false;
                    });
                    if (found) {
                        arr.splice(j, 1);
                    } else null;
                }
            }
        }
        for (let index = 0; index < p1Res.materialsPG; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrPG[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrPG[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else null;
            }
        }
    } else {
        for (let index = 0; index < p2Res.materialsCBW; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrCBW[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrCBW[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else {
                    arr.find((str, i) => {
                        if (str === arrCBW[2].type) {
                            found = true;
                            j = i;
                            return true;
                        } else return false;
                    });
                    if (found) {
                        arr.splice(j, 1);
                    } else null;
                }
            }
        }
        for (let index = 0; index < p2Res.materialsPG; index++) {
            let found = false;
            let j: number = 0;
            arr.find((str, i) => {
                if (str === arrPG[0].type) {
                    found = true;
                    j = i;
                    return true;
                } else return false;
            });
            if (found) {
                arr.splice(j, 1);
            } else {
                arr.find((str, i) => {
                    if (str === arrPG[1].type) {
                        found = true;
                        j = i;
                        return true;
                    } else return false;
                });
                if (found) {
                    arr.splice(j, 1);
                } else null;
            }
        }
    }

    return arr;
}
