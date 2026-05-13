import type {
    IGameDuelCard,
    IGameDuelCoin,
    IGameDuelPlayer,
    IGameDuelWonderCard,
    Materials,
    Tier
} from '@/interfaces/GameDuel';

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
    if (tier === 'I') {
        return arr.map((data, i) => {
            const j = i + 1;
            let k = 0;
            if (i < 2) k = 2;
            else if (i < 5) k = 3;
            else if (i < 9) k = 4;
            else if (i < 14) k = 5;
            return {
                ...data,
                id: j,
                coversBy: k ? [j + k, j + k + 1] : [],
                hide: [3, 4, 5, 10, 11, 12, 13, 14].includes(j)
            };
        });
    }

    if (tier === 'II') {
        const cards: IGameDuelCard[] = [];
        cards[0] = { ...arr[0], id: 1, coversBy: [7] };
        cards[1] = { ...arr[1], id: 2, coversBy: [7, 8] };
        cards[2] = { ...arr[2], id: 3, coversBy: [8, 9] };
        cards[3] = { ...arr[3], id: 4, coversBy: [9, 10] };
        cards[4] = { ...arr[4], id: 5, coversBy: [10, 11] };
        cards[5] = { ...arr[5], id: 6, coversBy: [11] };
        cards[6] = { ...arr[6], id: 7, coversBy: [12], hide: true };
        cards[7] = { ...arr[7], id: 8, coversBy: [12, 13], hide: true };
        cards[8] = { ...arr[8], id: 9, coversBy: [13, 14], hide: true };
        cards[9] = { ...arr[9], id: 10, coversBy: [14, 15], hide: true };
        cards[10] = { ...arr[10], id: 11, coversBy: [15], hide: true };
        cards[11] = { ...arr[11], id: 12, coversBy: [16] };
        cards[12] = { ...arr[12], id: 13, coversBy: [16, 17] };
        cards[13] = { ...arr[13], id: 14, coversBy: [17, 18] };
        cards[14] = { ...arr[14], id: 15, coversBy: [18] };
        cards[15] = { ...arr[15], id: 16, coversBy: [19], hide: true };
        cards[16] = { ...arr[16], id: 17, coversBy: [19, 20], hide: true };
        cards[17] = { ...arr[17], id: 18, coversBy: [20], hide: true };
        cards[18] = { ...arr[18], id: 19, coversBy: [] };
        cards[19] = { ...arr[19], id: 20, coversBy: [] };
        return cards;
    }

    const cards: IGameDuelCard[] = [];
    cards[0] = { ...arr[0], id: 1, coversBy: [3, 4] };
    cards[1] = { ...arr[1], id: 2, coversBy: [4, 5] };
    cards[2] = { ...arr[2], id: 3, coversBy: [6, 7], hide: true };
    cards[3] = { ...arr[3], id: 4, coversBy: [7, 8], hide: true };
    cards[4] = { ...arr[4], id: 5, coversBy: [8, 9], hide: true };
    cards[5] = { ...arr[5], id: 6, coversBy: [10] };
    cards[6] = { ...arr[6], id: 7, coversBy: [10] };
    cards[7] = { ...arr[7], id: 8, coversBy: [11] };
    cards[8] = { ...arr[8], id: 9, coversBy: [11] };
    cards[9] = { ...arr[9], id: 10, coversBy: [12, 13], hide: true };
    cards[10] = { ...arr[10], id: 11, coversBy: [14, 15], hide: true };
    cards[11] = { ...arr[11], id: 12, coversBy: [16] };
    cards[12] = { ...arr[12], id: 13, coversBy: [16, 17] };
    cards[13] = { ...arr[13], id: 14, coversBy: [17, 18] };
    cards[14] = { ...arr[14], id: 15, coversBy: [18] };
    cards[15] = { ...arr[15], id: 16, coversBy: [19], hide: true };
    cards[16] = { ...arr[16], id: 17, coversBy: [19, 20], hide: true };
    cards[17] = { ...arr[17], id: 18, coversBy: [20], hide: true };
    cards[18] = { ...arr[18], id: 19, coversBy: [] };
    cards[19] = { ...arr[19], id: 20, coversBy: [] };
    return cards;
}

export function countPlayerResources(card: IGameDuelCard, player: IGameDuelPlayer) {
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
        });
    }

    if (card.color === 'green') {
        card.power.forEach((power, i) => {
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
            if (power === 'artefact') res.artefacts.push(card.valuePower[i]);
            if (power === 'points') player.points += card.valuePower[i];
        });
    }

    if (card.color === 'blue') {
        card.power.forEach((power, i) => {
            if (power === 'points') player.points += card.valuePower[i];
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
        });
    }

    if (card.color === 'red') {
        card.power.forEach((power, i) => {
            if (power === 'specialChar') res.specialChars.push(card.valuePower[i]);
        });
    }

    return res;
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

export function cashBonusWhenAcquiringEconomyCoin(coin: IGameDuelCoin['effect']): number {
    return coin === 'cash6n4special' ? ECONOMY_COIN_ACQUIRE_ONE_TIME_CASH : 0;
}

export function extraCashWhenChainPurchaseWithEconomyCoin(card: IGameDuelCard, player: IGameDuelPlayer): number {
    if (!player.resources.coins.includes('cash6n4special')) return 0;
    if (!constructsBuildingFreeViaChain(card, player)) return 0;
    return ECONOMY_COIN_CHAIN_PURCHASE_BONUS;
}

function removeOptionalMaterials(
    missingMaterials: string[],
    arrCBW: { type: Materials; val: number }[],
    arrPG: { type: Materials; val: number }[],
    player: IGameDuelPlayer
) {
    const arr = [...missingMaterials];

    for (let i = 0; i < player.resources.materialsCBW; i++) {
        const index = arr.findIndex((material) => material === arrCBW[0].type);
        if (index >= 0) arr.splice(index, 1);
    }
    for (let i = 0; i < player.resources.materialsPG; i++) {
        const index = arr.findIndex((material) => material === arrPG[0].type);
        if (index >= 0) arr.splice(index, 1);
    }

    return arr;
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

    const arrCBW = [
        { type: 'clay' as Materials, val: player.resources.clayOne ? 1 : 2 + enemy.resources.clayValue },
        { type: 'brick' as Materials, val: player.resources.brickOne ? 1 : 2 + enemy.resources.brickValue },
        { type: 'wood' as Materials, val: player.resources.woodOne ? 1 : 2 + enemy.resources.woodValue }
    ].sort((a, b) => b.val - a.val);

    const arrPG = [
        {
            type: 'paper' as Materials,
            val: player.resources.paperGlassOne ? 1 : 2 + enemy.resources.paperValue
        },
        {
            type: 'glass' as Materials,
            val: player.resources.paperGlassOne ? 1 : 2 + enemy.resources.glassValue
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
            missingMaterials.push(...new Array(Math.max(0, value - player.resources.clayValue)).fill('clay'));
        } else if (cost === 'brick') {
            missingMaterials.push(...new Array(Math.max(0, value - player.resources.brickValue)).fill('brick'));
        } else if (cost === 'wood') {
            missingMaterials.push(...new Array(Math.max(0, value - player.resources.woodValue)).fill('wood'));
        } else if (cost === 'paper') {
            missingMaterials.push(...new Array(Math.max(0, value - player.resources.paperValue)).fill('paper'));
        } else if (cost === 'glass') {
            missingMaterials.push(...new Array(Math.max(0, value - player.resources.glassValue)).fill('glass'));
        }
    });

    missingMaterials = removeOptionalMaterials(missingMaterials, arrCBW, arrPG, player);
    missingMaterials.forEach((mat) => {
        buyForCash += arrCBW.find(({ type }) => type === mat)?.val ?? arrPG.find(({ type }) => type === mat)?.val ?? 0;
    });

    return buyForFree ? 0 : buyForCash;
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

export function countPointsFromCoins(player: IGameDuelPlayer) {
    let points = 0;
    player.resources.coins.forEach((coin) => {
        if (coin === 'point4n6cash') points += 4;
        if (coin === 'point7') points += 7;
        if (coin === 'pointX3') points += 3 * player.resources.coins.length;
    });
    return points + Math.floor(player.resources.cash / 3);
}

export function countPointsFromGuild(player: IGameDuelPlayer, enemy: IGameDuelPlayer) {
    let points = 0;
    player.cards.purple.forEach((card) => {
        const guildType = card.valuePower[0];
        if (guildType === 1) points += Math.max(player.cards.yellow.length, enemy.cards.yellow.length);
        if (guildType === 2)
            points += Math.max(
                player.cards.brown.length + player.cards.grey.length,
                enemy.cards.brown.length + enemy.cards.grey.length
            );
        if (guildType === 3) points += Math.max(player.wonderCards.length, enemy.wonderCards.length) * 2;
        if (guildType === 4) points += Math.max(player.cards.blue.length, enemy.cards.blue.length);
        if (guildType === 5) points += Math.max(player.cards.green.length, enemy.cards.green.length);
        if (guildType === 6)
            points += Math.max(Math.floor(player.resources.cash / 3), Math.floor(enemy.resources.cash / 3));
        if (guildType === 7) points += Math.max(player.cards.red.length, enemy.cards.red.length);
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

export function countTotalPoints(player: IGameDuelPlayer, enemy: IGameDuelPlayer, boardPawn: number, isPlayerOne: boolean) {
    return (
        countPointsFromCards(player) +
        countPointsFromCoins(player) +
        countPointsFromGuild(player, enemy) +
        countMilitaryPoints(boardPawn, isPlayerOne)
    );
}
