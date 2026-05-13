import type {
    IGameDuelCard,
    IGameDuelCoin,
    IGameDuelPlayer,
    IGameDuelWonderCard,
    Materials,
    Tier
} from '@/interfaces/GameDuel';
import { tierOneHideCards } from '@/helpers/GameDuelInit';
import { useDuelGameStore } from '@/store/useDuelGameStore';

export function sampleArray<T>(arr: T[], n: number): T[] {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) throw new RangeError('sampleArray: more elements taken than available');
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

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
                hide: tierOneHideCards.includes(j)
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

/** Guild card `valuePower` category (1–7): same comparison used for end-game VP and immediate coins when taking the guild. */
export function guildCategoryValue(guildType: number, player: IGameDuelPlayer, enemy: IGameDuelPlayer): number {
    switch (guildType) {
        case 1:
            return Math.max(player.cards.yellow.length, enemy.cards.yellow.length);
        case 2:
            return Math.max(
                player.cards.brown.length + player.cards.grey.length,
                enemy.cards.brown.length + enemy.cards.grey.length
            );
        case 3:
            return Math.max(player.wonderCards.length, enemy.wonderCards.length) * 2;
        case 4:
            return Math.max(player.cards.blue.length, enemy.cards.blue.length);
        case 5:
            return Math.max(player.cards.green.length, enemy.cards.green.length);
        case 6:
            return Math.max(Math.floor(player.resources.cash / 3), Math.floor(enemy.resources.cash / 3));
        case 7:
            return Math.max(player.cards.red.length, enemy.cards.red.length);
        default:
            return 0;
    }
}

/**
 * Applies immediate income / discounts when a card enters `player`'s city.
 * Pass `enemy` so purple guild cards (Age III) pay coins immediately using the same “max of both cities” rule as end-game guild VP.
 */
export function countPlayerResources(card: IGameDuelCard, player: IGameDuelPlayer, enemy?: IGameDuelPlayer) {
    const res = { ...player.resources };

    if (card.color === 'brown') {
        if (card.power[0] === 'clay') res.clayValue += card.valuePower[0];
        if (card.power[0] === 'brick') res.brickValue += card.valuePower[0];
        if (card.power[0] === 'wood') res.woodValue += card.valuePower[0];
    }

    if (card.color === 'grey') {
        if (card.power[0] === 'paper') res.paperValue += card.valuePower[0];
        if (card.power[0] === 'glass') res.glassValue += card.valuePower[0];
    }

    if (card.color === 'yellow') {
        card.power.forEach((power, i) => {
            if (power === 'points') player.points += card.valuePower[i];
            if (power === 'discount') {
                if (card.valuePower[i] === 1) res.clayOne = 1;
                if (card.valuePower[i] === 2) res.brickOne = 1;
                if (card.valuePower[i] === 3) res.woodOne = 1;
                if (card.valuePower[i] === 4) res.paperGlassOne = 1;
            }
            if (power === 'materials') {
                if (card.valuePower[i] === 1) res.materialsCBW += 1;
                if (card.valuePower[i] === 2) res.materialsPG += 1;
            }
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
            if (power === 'cash') res.cash += card.valuePower[i];
            if (power === 'cashBack') {
                switch (card.valuePower[i]) {
                    case 1:
                        res.cash +=
                            player.wonderCards.filter((data) => data.activated !== 'none').length * 2;
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
    }

    if (card.color === 'green') {
        card.power.forEach((power, i) => {
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
            if (power === 'artefact') res.artefacts.push(card.valuePower[i]);
            if (power === 'points') player.points += card.valuePower[i];
            if (power === 'cash') res.cash += card.valuePower[i];
        });
    }

    if (card.color === 'blue') {
        card.power.forEach((power, i) => {
            if (power === 'points') player.points += card.valuePower[i];
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
            if (power === 'cash') res.cash += card.valuePower[i];
        });
    }

    if (card.color === 'red') {
        card.power.forEach((power, i) => {
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
            if (power === 'cash') res.cash += card.valuePower[i];
        });
    }

    if (card.color === 'purple' && enemy) {
        card.power.forEach((power, i) => {
            if (power === 'guild') {
                res.cash += guildCategoryValue(card.valuePower[i], player, enemy);
            }
        });
    }

    return res;
}

export function countPlayerResourcesFromWonders(
    card: IGameDuelWonderCard,
    player: IGameDuelPlayer
): IGameDuelPlayer {
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
}

/** Chain-symbol IDs visible on your built yellow / blue / green / red buildings (`specialChar` on the card powers). Matches cost-line chaining in the board game — do not rely on `resources.specialChars` alone (can drift vs Firestore). */
export function chainSymbolIdsOwnedInCity(player: IGameDuelPlayer): Set<number> {
    const ids = new Set<number>();
    const built = [player.cards.blue, player.cards.green, player.cards.yellow, player.cards.red];
    for (const row of built) {
        for (const card of row) {
            if (card.taken !== 'inPlayerBoard') continue;
            card.power.forEach((pow, idx) => {
                if (pow === 'specialChar') ids.add(card.valuePower[idx]);
            });
        }
    }
    return ids;
}

/** True if purchasing this tier card ignores all costs (free construction via chain). */
export function constructsBuildingFreeViaChain(card: IGameDuelCard, player: IGameDuelPlayer): boolean {
    const ids = chainSymbolIdsOwnedInCity(player);
    return card.cost.some((c, idx) => c === 'specialChar' && ids.has(card.valueCost[idx]));
}

/** One-time payout when acquiring progress coin `cash6n4special` (added to your coins). */
export const ECONOMY_COIN_ACQUIRE_ONE_TIME_CASH = 6;

/** Extra cash whenever you take a building using chain matching (`specialChar`) while owning that coin — pyramid buy or graveyard pick. */
export const ECONOMY_COIN_CHAIN_PURCHASE_BONUS = 4;

export function subtractCashFloorZero(balance: number, loss: number): number {
    return Math.max(0, balance - loss);
}

/** Coins taken from Bank when a wonder with `power`: `cash` is completed. */
export function goldFromTreasuryGrantedByWonder(wonder: IGameDuelWonderCard): number {
    let sum = 0;
    wonder.power.forEach((p, i) => {
        if (p === 'cash') sum += wonder.valuePower[i] ?? 0;
    });
    return sum;
}

/**
 * Coins from Bank when the opponent paid gold to the Bank for a construction (purchase > 0 excludes full chain-free takes).
 * Only counts yellow cards whose `cashBack` entry is a flat coin amount per opponent payment.
 * Skips Age III yellows with `power: ['points','cashBack']` — there `valuePower` encodes payout categories for when **you** build the card (`countPlayerResources`), not coins per opponent spend.
 */
export function bankGoldFromYellowCashBackWatchingOpponentSpend(
    watchingPlayer: IGameDuelPlayer,
    opponentPaidCoinsToBank: number
): number {
    if (opponentPaidCoinsToBank <= 0) return 0;
    let gain = 0;
    for (const y of watchingPlayer.cards.yellow) {
        if (y.taken !== 'inPlayerBoard') continue;
        if (y.power.includes('points') && y.power.includes('cashBack')) continue;
        y.power.forEach((pow, idx) => {
            if (pow === 'cashBack') gain += y.valuePower[idx] ?? 0;
        });
    }
    return gain;
}

/** One-time payout from Bank when a progress token tile is added to your collection. */
export function immediateGoldWhenTakingProgressCoin(effect: IGameDuelCoin['effect']): number {
    switch (effect) {
        case 'cash6n4special':
            return ECONOMY_COIN_ACQUIRE_ONE_TIME_CASH;
        /** Data name: 6 coins at take (VP side handled in end scoring). */
        case 'point4n6cash':
            return 6;
        default:
            return 0;
    }
}

export function extraCashWhenChainPurchaseWithEconomyCoin(card: IGameDuelCard, player: IGameDuelPlayer): number {
    if (!player.resources.coins.includes('cash6n4special')) return 0;
    if (!constructsBuildingFreeViaChain(card, player)) return 0;
    return ECONOMY_COIN_CHAIN_PURCHASE_BONUS;
}

const BROWN_MATERIALS = new Set<Materials>(['clay', 'brick', 'wood']);
const GREY_MATERIALS = new Set<Materials>(['paper', 'glass']);

function removeOptionalMaterials(
    missingMaterials: string[],
    arrCBW: { type: Materials; val: number }[],
    arrPG: { type: Materials; val: number }[],
    player: IGameDuelPlayer
) {
    const arr = [...missingMaterials];
    const priceCBW = Object.fromEntries(arrCBW.map((x) => [x.type, x.val])) as Record<Materials, number>;
    const pricePG = Object.fromEntries(arrPG.map((x) => [x.type, x.val])) as Record<Materials, number>;

    // Each universal brown slot should cover whichever missing brown costs the most to buy (saves most gold).
    // Old logic always stripped `arrCBW[0].type`, which could pick clay while brick was missing or skip when wood was “first” but absent.
    for (let i = 0; i < player.resources.materialsCBW; i++) {
        let bestIdx = -1;
        let bestVal = -1;
        arr.forEach((mat, idx) => {
            const m = mat as Materials;
            if (!BROWN_MATERIALS.has(m)) return;
            const v = priceCBW[m] ?? 0;
            if (v > bestVal) {
                bestVal = v;
                bestIdx = idx;
            }
        });
        if (bestIdx >= 0) arr.splice(bestIdx, 1);
    }

    for (let i = 0; i < player.resources.materialsPG; i++) {
        let bestIdx = -1;
        let bestVal = -1;
        arr.forEach((mat, idx) => {
            const m = mat as Materials;
            if (!GREY_MATERIALS.has(m)) return;
            const v = pricePG[m] ?? 0;
            if (v > bestVal) {
                bestVal = v;
                bestIdx = idx;
            }
        });
        if (bestIdx >= 0) arr.splice(bestIdx, 1);
    }

    return arr;
}

/**
 * Extra purchase-pricing resources from one built wonder: only `materials` per `IGameDuelWonderCard`
 * (`valuePower`: 1 = brown wildcard c/b/w, 2 = grey wildcard p/g). `break` / `effect` / etc. are not production for costs.
 */
export function wonderResourceProductionDelta(wonder: IGameDuelWonderCard): {
    materialsCBW: number;
    materialsPG: number;
} {
    let materialsCBW = 0;
    let materialsPG = 0;
    wonder.power.forEach((pow, i) => {
        if (pow !== 'materials') return;
        const v = wonder.valuePower[i] ?? 0;
        if (v === 1) materialsCBW += 1;
        else if (v === 2) materialsPG += 1;
    });
    return { materialsCBW, materialsPG };
}

/**
 * Buyer-side resources for pricing: `player.resources` (tableau / yellow discounts / persisted wildcards) plus **`materials` from built wonders** only (see `wonderResourceProductionDelta`).
 * Wonder boosts stay off persisted `resources.*` so opponent bank prices stay `2 + enemy.resources` without wonder-only supply (see `showPrice`).
 */
export function effectiveResourcesForPurchasePricing(player: IGameDuelPlayer): IGameDuelPlayer['resources'] {
    const out = { ...player.resources };
    for (const w of player.wonderCards) {
        if (w.activated === 'none') continue;
        const d = wonderResourceProductionDelta(w);
        out.materialsCBW += d.materialsCBW;
        out.materialsPG += d.materialsPG;
    }
    return out;
}

export function showPrice(
    selectedCard: IGameDuelWonderCard | IGameDuelCard,
    player: IGameDuelPlayer,
    enemy: IGameDuelPlayer
) {
    if (!(selectedCard as IGameDuelCard)?.cost) return -1;

    let buyForCash = 0;
    let missingMaterials: string[] = [];
    let buyForFree = false;

    const buyerRes = effectiveResourcesForPurchasePricing(player);
    /** Opponent contribution to bank price (`2 + their symbols`). Tableau only — never wonders, so wonder income does not inflate the other player's gold costs. */
    const enemyTradeRes = enemy.resources;

    const arrCBW = [
        { type: 'clay' as Materials, val: buyerRes.clayOne ? 1 : 2 + enemyTradeRes.clayValue },
        { type: 'brick' as Materials, val: buyerRes.brickOne ? 1 : 2 + enemyTradeRes.brickValue },
        { type: 'wood' as Materials, val: buyerRes.woodOne ? 1 : 2 + enemyTradeRes.woodValue }
    ].sort((a, b) => b.val - a.val);

    const arrPG = [
        {
            type: 'paper' as Materials,
            val: buyerRes.paperGlassOne ? 1 : 2 + enemyTradeRes.paperValue
        },
        {
            type: 'glass' as Materials,
            val: buyerRes.paperGlassOne ? 1 : 2 + enemyTradeRes.glassValue
        }
    ].sort((a, b) => b.val - a.val);

    const chainOwned = chainSymbolIdsOwnedInCity(player);

    selectedCard.cost.forEach((cost, i) => {
        const value = selectedCard.valueCost[i];
        if (cost === 'specialChar') {
            const hasChainViaCity = chainOwned.has(value);
            const hasChainViaResource = player.resources.specialChars.includes(value);
            if (hasChainViaCity || hasChainViaResource) buyForFree = true;
        } else if (cost === 'cash') {
            buyForCash += value;
        } else if (cost === 'clay') {
            missingMaterials.push(...new Array(Math.max(0, value - buyerRes.clayValue)).fill('clay'));
        } else if (cost === 'brick') {
            missingMaterials.push(...new Array(Math.max(0, value - buyerRes.brickValue)).fill('brick'));
        } else if (cost === 'wood') {
            missingMaterials.push(...new Array(Math.max(0, value - buyerRes.woodValue)).fill('wood'));
        } else if (cost === 'paper') {
            missingMaterials.push(...new Array(Math.max(0, value - buyerRes.paperValue)).fill('paper'));
        } else if (cost === 'glass') {
            missingMaterials.push(...new Array(Math.max(0, value - buyerRes.glassValue)).fill('glass'));
        }
    });

    missingMaterials = removeOptionalMaterials(missingMaterials, arrCBW, arrPG, {
        ...player,
        resources: buyerRes
    });

    if ('color' in selectedCard && selectedCard.color === 'blue' && player.resources.coins.includes('lowCostBlue')) {
        missingMaterials.shift();
        missingMaterials.shift();
    }

    if (
        !('color' in selectedCard) &&
        'activated' in selectedCard &&
        player.resources.coins.includes('lowCostWonder')
    ) {
        missingMaterials.shift();
        missingMaterials.shift();
    }

    missingMaterials.forEach((mat) => {
        buyForCash += arrCBW.find(({ type }) => type === mat)?.val ?? arrPG.find(({ type }) => type === mat)?.val ?? 0;
    });

    return buyForFree ? 0 : buyForCash;
}

/** Same as `showPrice`, but resolves buyer vs opponent from live duel store (replaces legacy Pinia `showPrice(card, uid)`). */
export function showPriceForUid(selectedCard: IGameDuelWonderCard | IGameDuelCard, uid: string): number {
    const { player1, player2 } = useDuelGameStore.getState();
    const isP1 = player1.user.uid === uid;
    const player = isP1 ? player1 : player2;
    const enemy = isP1 ? player2 : player1;
    return showPrice(selectedCard, player, enemy);
}

/** Unique artefact/science icons from green tableau cards (`power` entries `artefact` → `valuePower[i]`), plus 1 toward six if progress coin `artefact7` is owned. */
export function countArtefactsForPlayer(player: IGameDuelPlayer) {
    const coinBonus = player.resources.coins.includes('artefact7') ? 1 : 0;
    const symbolsFromGreen = new Set<number>();
    for (const green of player.cards.green) {
        green.power.forEach((p, i) => {
            if (p === 'artefact') symbolsFromGreen.add(green.valuePower[i]);
        });
    }
    return coinBonus + symbolsFromGreen.size;
}

export function countPointsFromCards(player: IGameDuelPlayer) {
    const fromBlue = player.cards.blue.reduce((sum, card) => {
        const idx = card.power.indexOf('points');
        return sum + (idx >= 0 ? card.valuePower[idx] : 0);
    }, 0);
    const fromYellow = player.cards.yellow.reduce((sum, card) => {
        const idx = card.power.indexOf('points');
        return sum + (idx >= 0 ? card.valuePower[idx] : 0);
    }, 0);
    const fromGreen = player.cards.green.reduce((sum, card) => {
        const idx = card.power.indexOf('points');
        return sum + (idx >= 0 ? card.valuePower[idx] : 0);
    }, 0);
    const fromWonders = player.wonderCards.reduce((sum, wonder) => {
        if (wonder.activated === 'none') return sum;
        const idx = wonder.power.indexOf('points');
        return sum + (idx >= 0 ? wonder.valuePower[idx] : 0);
    }, 0);
    return fromBlue + fromYellow + fromGreen + fromWonders;
}

/** Options for tallying coin-related VP (reserve gold only scores at game end in the board game). */
export type CoinPointsTallyOptions = {
    /**
     * When `false`, omit VP from every 3 coins in cash reserve (`floor(cash/3)`).
     * Use during play so income gold does not look like “building points”; keep `true` (default) for end-game totals.
     */
    includeCashReserveVp?: boolean;
};

export function countPointsFromCoins(player: IGameDuelPlayer, options?: CoinPointsTallyOptions): number {
    let points = 0;
    player.resources.coins.forEach((coin) => {
        if (coin === 'point4n6cash') points += 4;
        if (coin === 'point7') points += 7;
        if (coin === 'pointX3') points += 3 * player.resources.coins.length;
    });
    if (options?.includeCashReserveVp !== false) {
        points += Math.floor(player.resources.cash / 3);
    }
    return points;
}

export function countPointsFromGuild(player: IGameDuelPlayer, enemy: IGameDuelPlayer) {
    let points = 0;
    player.cards.purple.forEach((card) => {
        points += guildCategoryValue(card.valuePower[0], player, enemy);
    });
    return points;
}

export function countMilitaryPoints(boardPawn: number, isPlayerOne: boolean) {
    const pawn = isPlayerOne ? -boardPawn : boardPawn;
    if (pawn >= 6) return 10;
    if (pawn >= 3) return 5;
    if (pawn >= 1) return 2;
    return 0;
}

/** Next turn after a pick: alternating, except last pick of an age (moves 19/39/59) keeps the taker unless they lead militarily (`pawn`). UI “who starts” only at 19/39 — after 59 Age III ends with no further age transition. */
export function getNextTurnUidAfterPlay(
    lastTakerUid: string,
    moveBeforeIncrement: number,
    boardPawn: number,
    player1Uid: string,
    player2Uid: string
): string {
    const opp = lastTakerUid === player1Uid ? player2Uid : player1Uid;
    if (![19, 39, 59].includes(moveBeforeIncrement)) return opp;

    const takerIsP1 = lastTakerUid === player1Uid;
    const takerLeadsMilitarily = takerIsP1 ? boardPawn < 0 : boardPawn > 0;
    return takerLeadsMilitarily ? opp : lastTakerUid;
}

export function countTotalPoints(
    player: IGameDuelPlayer,
    enemy: IGameDuelPlayer,
    boardPawn: number,
    isPlayerOne: boolean,
    coinOptions?: CoinPointsTallyOptions
) {
    return (
        countPointsFromCards(player) +
        countPointsFromCoins(player, coinOptions) +
        countPointsFromGuild(player, enemy) +
        countMilitaryPoints(boardPawn, isPlayerOne)
    );
}
