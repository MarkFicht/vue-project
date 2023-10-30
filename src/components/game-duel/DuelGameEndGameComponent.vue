<script setup lang="ts">
import type { IGameDuelCoin, IGameDuelPlayer } from '@/interfaces/GameDuel';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, toRefs, watch } from 'vue';
import soundWin from '@/assets/win.mp3';
import soundLost from '@/assets/lost.mp3';
import type IUser from '@/interfaces/User';

const storeDuelGame = duelGameStore();
const { player1, player2, tier, board } = storeToRefs(storeDuelGame);

const props = defineProps<{
    user: IUser;
}>();
const { user } = toRefs(props);

// ---
const allPointsP1 = ref<number>(0);
const allPointsP2 = ref<number>(0);
const startAnimation = ref<boolean>(false);
const focusOn = ref<number>(0);

const audioWin = ref<HTMLAudioElement>(new Audio(soundWin));
const audioLost = ref<HTMLAudioElement>(new Audio(soundLost));
audioWin.value.volume = 0.66;
audioLost.value.volume = 0.66;

const p1Wonder = ref<number>(0);
const p1Blue = ref<number>(0);
const p1Yellow = ref<number>(0);
const p1Green = ref<number>(0);
const p1Cash = ref<number>(0);
const p1CashDisplay = ref<number>(0);
const p1Purple = ref<number>(0);
const p1PurpleDisplay = ref<number>(0);
const p1Coin = ref<number>(0);
const p1CoinDisplay = ref<number>(0);
const p1Attack = ref<number>(0);
const p1AttackDisplay = ref<number>(0);

const p2Wonder = ref<number>(0);
const p2Blue = ref<number>(0);
const p2Yellow = ref<number>(0);
const p2Green = ref<number>(0);
const p2Cash = ref<number>(0);
const p2CashDisplay = ref<number>(0);
const p2Purple = ref<number>(0);
const p2PurpleDisplay = ref<number>(0);
const p2Coin = ref<number>(0);
const p2CoinDisplay = ref<number>(0);
const p2Attack = ref<number>(0);
const p2AttackDisplay = ref<number>(0);

watch(
    () => tier.value,
    () => {
        if (tier.value === 'end') {
            initPoints();
        }
    }
);

watch([() => startAnimation.value], () => {
    startCountingPointsCash();
});

const startCountingPointsCash = () => {
    if (p1Cash.value === 0 && p2Cash.value === 0) {
        startCountingPointsPurple();
    } else {
        const mainTimer = setInterval(() => {
            clearInterval(mainTimer);
            const timer = setInterval(() => {
                if (p1CashDisplay.value < p1Cash.value) {
                    focusOn.value = 1;
                    p1CashDisplay.value++;
                    allPointsP1.value++;
                } else if (p2CashDisplay.value < p2Cash.value) {
                    focusOn.value = 2;
                    p2CashDisplay.value++;
                    allPointsP2.value++;
                } else (focusOn.value = 0), startCountingPointsPurple(), clearInterval(timer);
            }, 50);
        }, 1300);
    }
};

const startCountingPointsPurple = () => {
    if (p1Purple.value === 0 && p2Purple.value === 0) {
        startCountingPointsCoins();
    } else {
        const mainTimer = setInterval(() => {
            clearInterval(mainTimer);
            const timer = setInterval(() => {
                if (p1PurpleDisplay.value < p1Purple.value) {
                    focusOn.value = 3;
                    p1PurpleDisplay.value++;
                    allPointsP1.value++;
                } else if (p2PurpleDisplay.value < p2Purple.value) {
                    focusOn.value = 4;
                    p2PurpleDisplay.value++;
                    allPointsP2.value++;
                } else (focusOn.value = 0), startCountingPointsCoins(), clearInterval(timer);
            }, 50);
        }, 555);
    }
};

const startCountingPointsCoins = () => {
    if (p1Coin.value === 0 && p2Coin.value === 0) {
        startCountingPointsAttack();
    } else {
        const mainTimer = setInterval(() => {
            clearInterval(mainTimer);
            const timer = setInterval(() => {
                if (p1CoinDisplay.value < p1Coin.value) {
                    focusOn.value = 5;
                    p1CoinDisplay.value++;
                    allPointsP1.value++;
                } else if (p2CoinDisplay.value < p2Coin.value) {
                    focusOn.value = 6;
                    p2CoinDisplay.value++;
                    allPointsP2.value++;
                } else (focusOn.value = 0), startCountingPointsAttack(), clearInterval(timer);
            }, 50);
        }, 555);
    }
};

const startCountingPointsAttack = () => {
    if (p1Attack.value === 0 && p2Attack.value === 0) {
        checkWhoWin();
    } else {
        const mainTimer = setInterval(() => {
            clearInterval(mainTimer);
            const timer = setInterval(() => {
                if (p1AttackDisplay.value < p1Attack.value) {
                    focusOn.value = 7;
                    p1AttackDisplay.value++;
                    allPointsP1.value++;
                } else if (p2AttackDisplay.value < p2Attack.value) {
                    focusOn.value = 8;
                    p2CoinDisplay.value++;
                    allPointsP2.value++;
                } else (focusOn.value = 0), checkWhoWin(), clearInterval(timer);
            }, 50);
        }, 555);
    }
};

const checkWhoWin = () => {
    const mainTimer = setInterval(() => {
        clearInterval(mainTimer);
        if (allPointsP1.value > allPointsP2.value) {
            focusOn.value = 9;
            user.value.uid === player1.value.user.uid
                ? audioWin.value.play()
                : audioLost.value.play();
        } else if (allPointsP1.value < allPointsP2.value) {
            focusOn.value = 10;
            user.value.uid === player2.value.user.uid
                ? audioWin.value.play()
                : audioLost.value.play();
        } else if (allPointsP1.value === allPointsP2.value) {
            focusOn.value = 11;

            const timer = setInterval(() => {
                clearInterval(timer);

                if (p1Blue.value > p2Blue.value) {
                    focusOn.value = 12;
                    user.value.uid === player1.value.user.uid
                        ? audioWin.value.play()
                        : audioLost.value.play();
                } else if (p2Blue.value > p1Blue.value) {
                    focusOn.value = 13;
                    user.value.uid === player2.value.user.uid
                        ? audioWin.value.play()
                        : audioLost.value.play();
                }
            }, 777);
        }
    }, 777);
};

// ---
onBeforeMount(() => {
    initPoints();
});

const initPoints = () => {
    p1Wonder.value = countPointsWonders(player1.value.wonderCards);
    p1Blue.value = countPointsCards(player1.value.cards.blue);
    p1Yellow.value = countPointsCards(player1.value.cards.yellow);
    p1Green.value = countPointsCards(player1.value.cards.green);
    allPointsP1.value = p1Wonder.value + p1Blue.value + p1Yellow.value + p1Green.value;
    p1Cash.value = Math.floor(player1.value.resources.cash / 3);
    p1Purple.value = countPointsFromPurple(
        player1.value.cards.purple.map((pur) => pur.valuePower[0])
    );
    p1Coin.value = countPointsFromCoins(player1.value.resources.coins);
    p1Attack.value =
        (board.value.pawn <= -6 && 10) ||
        (board.value.pawn <= -3 && 5) ||
        (board.value.pawn <= -1 && 2) ||
        0;

    p2Wonder.value = countPointsWonders(player2.value.wonderCards);
    p2Blue.value = countPointsCards(player2.value.cards.blue);
    p2Yellow.value = countPointsCards(player2.value.cards.yellow);
    p2Green.value = countPointsCards(player2.value.cards.green);
    allPointsP2.value = p2Wonder.value + p2Blue.value + p2Yellow.value + p2Green.value;
    p2Cash.value = Math.floor(player2.value.resources.cash / 3);
    p2Purple.value = countPointsFromPurple(
        player2.value.cards.purple.map((pur) => pur.valuePower[0])
    );
    p2Coin.value = countPointsFromCoins(player2.value.resources.coins);
    p2Attack.value =
        (board.value.pawn >= 6 && 10) ||
        (board.value.pawn >= 3 && 5) ||
        (board.value.pawn >= 1 && 2) ||
        0;

    startAnimation.value = true;

    // TODO - ADD who win to fb - here - before all animation
    // TODO - add redirection + button redirect
    // TODO - add imgs for mini icons
};

const countPointsWonders = (res: IGameDuelPlayer['wonderCards']): number => {
    let points = 0;
    res.forEach((card) => {
        card.power.find((pow, i) => {
            return pow === 'points'
                ? (card.activated !== 'none' ? (points += card.valuePower[i]) : null, true)
                : null;
        });
    });
    return points;
};

const countPointsCards = (res: IGameDuelPlayer['cards']['yellow' | 'green' | 'blue']): number => {
    let points = 0;
    res.forEach((card) => {
        card.power.find((pow, i) => {
            return pow === 'points' ? ((points += card.valuePower[i]), true) : null;
        });
    });
    return points;
};

const countPointsFromPurple = (valPowPurple: number[]): number => {
    let points = 0;
    valPowPurple.forEach((purplePow) => {
        if (purplePow === 1) {
            const a = player1.value.cards.yellow.length;
            const b = player2.value.cards.yellow.length;
            points += a > b ? a : b;
        }
        if (purplePow === 2) {
            const a = player1.value.cards.brown.length + player1.value.cards.grey.length;
            const b = player2.value.cards.brown.length + player2.value.cards.grey.length;
            points += a > b ? a : b;
        }
        if (purplePow === 3) {
            const a = player1.value.wonderCards.length;
            const b = player2.value.wonderCards.length;
            points += a > b ? a * 2 : b * 2;
        }
        if (purplePow === 4) {
            const a = player1.value.cards.blue.length;
            const b = player2.value.cards.blue.length;
            points += a > b ? a : b;
        }
        if (purplePow === 5) {
            const a = player1.value.cards.green.length;
            const b = player2.value.cards.green.length;
            points += a > b ? a : b;
        }
        if (purplePow === 6) {
            const a = Math.floor(player1.value.resources.cash / 3);
            const b = Math.floor(player2.value.resources.cash / 3);
            points += a > b ? a : b;
        }
        if (purplePow === 7) {
            const a = player1.value.cards.red.length;
            const b = player2.value.cards.red.length;
            points += a > b ? a : b;
        }
    });
    return points;
};

const countPointsFromCoins = (coins: IGameDuelCoin['effect'][]): number => {
    let points = 0;
    coins.forEach((coin) => {
        coin === 'point4n6cash' && (points += 4);
        coin === 'point7' && (points += 7);
        coin === 'pointX3' && (points += 3 * coins.length);
    });
    return points;
};
</script>

<template>
    <section class="countPoints">
        <!-- PLAYER 1 -->
        <p :style="focusOn === 9 || focusOn === 12 ? 'font-weight: bold;' : ''">
            {{ `${player1.user.displayName || player1.user.email}`
            }}<ion-icon
                v-if="focusOn === 9 || focusOn === 12"
                class="animateHand marginLeft"
                name="thumbs-up-sharp"
            ></ion-icon>
        </p>

        <div class="containerPoints customInput">
            <div class="wonderPoints">
                <div class="cashSum wonderCard"></div>
                <p>
                    {{ `${p1Wonder}` }}
                </p>
            </div>
            <div class="bluePoints">
                <div class="cashSum blueCard"></div>
                <p :class="[focusOn === 12 && 'animatePulse']">
                    {{ `${p1Blue}` }}
                </p>
            </div>
            <div class="yellowPoints">
                <div class="cashSum yellowCard"></div>
                <p>
                    {{ `${p1Yellow}` }}
                </p>
            </div>
            <div class="greenPoints">
                <div class="cashSum greenCard"></div>
                <p>
                    {{ `${p1Green}` }}
                </p>
            </div>
            <div class="cashPoints">
                <div class="cashSum cashCard"></div>
                <p :class="[focusOn === 1 && 'scalePlus']">
                    {{ `${p1CashDisplay}` }}
                </p>
            </div>
            <div class="purplePoints">
                <div class="cashSum purpleCard"></div>
                <p :class="[focusOn === 3 && 'scalePlus']">
                    {{ `${p1PurpleDisplay}` }}
                </p>
            </div>
            <div class="coinsPoints">
                <div class="cashSum miniCoin"></div>
                <p :class="[focusOn === 5 && 'scalePlus']">
                    {{ `${p1CoinDisplay}` }}
                </p>
            </div>
            <div class="pawnPoints">
                <div class="cashSum attackImg"></div>
                <p :class="[focusOn === 7 && 'scalePlus']">
                    {{ `${p1AttackDisplay}` }}
                </p>
            </div>
            <div class="sumPoints">
                <div class="cashSum pointsImg"></div>
                <p :class="[(focusOn === 9 || focusOn >= 11) && 'animatePulse']">
                    {{ `${allPointsP1}` }}
                </p>
            </div>
        </div>

        <!-- PLAYER 2 -->
        <p :style="focusOn === 10 || focusOn === 13 ? 'font-weight: bold;' : ''">
            {{ `${player2.user.displayName || player2.user.email}`
            }}<ion-icon
                v-if="focusOn === 10 || focusOn === 13"
                class="animateHand marginLeft"
                name="thumbs-up-sharp"
            ></ion-icon>
        </p>

        <div class="containerPoints customInput">
            <div class="wonderPoints">
                <div class="cashSum wonderCard"></div>
                <p>
                    {{ `${p2Wonder}` }}
                </p>
            </div>
            <div class="bluePoints">
                <div class="cashSum blueCard"></div>
                <p :class="[focusOn === 13 && 'animatePulse']">
                    {{ `${p2Blue}` }}
                </p>
            </div>
            <div class="yellowPoints">
                <div class="cashSum yellowCard"></div>
                <p>
                    {{ `${p2Yellow}` }}
                </p>
            </div>
            <div class="greenPoints">
                <div class="cashSum greenCard"></div>
                <p>
                    {{ `${p2Green}` }}
                </p>
            </div>
            <div class="cashPoints">
                <div class="cashSum cashCard"></div>
                <p :class="[focusOn === 2 && 'scalePlus']">
                    {{ `${p2CashDisplay}` }}
                </p>
            </div>
            <div class="purplePoints">
                <div class="cashSum purpleCard"></div>
                <p :class="[focusOn === 4 && 'scalePlus']">
                    {{ `${p2PurpleDisplay}` }}
                </p>
            </div>
            <div class="coinsPoints">
                <div class="cashSum miniCoin"></div>
                <p :class="[focusOn === 6 && 'scalePlus']">
                    {{ `${p2CoinDisplay}` }}
                </p>
            </div>
            <div class="pawnPoints">
                <div class="cashSum attackImg"></div>
                <p :class="[focusOn === 8 && 'scalePlus']">
                    {{ `${p2AttackDisplay}` }}
                </p>
            </div>
            <div class="sumPoints">
                <div class="cashSum pointsImg"></div>
                <p :class="[(focusOn === 10 || focusOn >= 11) && 'animatePulse']">
                    {{ `${allPointsP2}` }}
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* --- END GAME --- */
.countPoints {
    width: 410px;
    height: 240px;
    box-shadow:
        5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px rgba(255, 255, 255, 1);
    padding: 0;
    border-radius: 10px;
    margin: auto;
}
.countPoints > p {
    display: block;
    width: 100%;
    text-align: center;
    height: 24px;
    line-height: 24px;
    letter-spacing: 1px;
    padding: 0;
    margin: 0;
}
.containerPoints {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380px;
    margin-top: 5px;
    margin-bottom: 20px;
    text-align: center;
    height: 60px;
    line-height: 40px;
    letter-spacing: 1px;
    padding: 3px;
    font-size: 14px;
}
.containerPoints > div {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.containerPoints > div > div {
    position: absolute;
    top: 7px;
}
.containerPoints > div > p {
    position: absolute;
    bottom: 5px;
    font-size: 1em;
    line-height: 24px;
    height: 24px;
    transition: 0.3s all;
}
.containerPoints > div::before {
    content: '';
    position: absolute;
    height: 40px;
    width: 6px;
    border-radius: 10px;
    top: 5px;
    right: -2px;
    box-shadow:
        inset 5px 5px 10px rgba(0, 0, 0, 0.1),
        inset -5px -5px 10px #fff;
}
.containerPoints > div:last-child::before {
    display: none;
}

/* --- Imgs --- */
.wonderCard {
    height: 17px;
    width: 20px;
    left: 11px;
    background-size: 124px 124px;
    background-position: -86px -82px;
    border-radius: 0;
}
.blueCard {
    height: 16px;
    width: 15px;
    background-size: 124px 124px;
    left: 12px;
    background-position: -103px -3px;
    border-radius: 0;
}
.yellowCard {
    height: 16px;
    width: 15px;
    background-size: 124px 124px;
    left: 12px;
    background-position: -66px -3px;
    border-radius: 0;
}
.greenCard {
    height: 16px;
    width: 15px;
    background-size: 124px 124px;
    left: 12px;
    background-position: -88px -47px;
    border-radius: 0;
}
.cashCard {
    height: 17px;
    width: 17px;
    left: 11px;
}
.purpleCard {
    height: 16px;
    width: 15px;
    background-size: 124px 124px;
    left: 12px;
    background-position: -102px -47px;
    border-radius: 0;
}
.miniCoin {
    height: 16px;
    width: 16px;
    background-size: 91px 91px;
    left: 12px;
    background-position: 0px -60px;
    border-radius: 0;
}
.attackImg {
    height: 16px;
    width: 15px;
    background-size: 91px 91px;
    left: 12px;
    background-position: -32px -60px;
    border-radius: 0;
}
.pointsImg {
    height: 16px;
    width: 16px;
    background-size: 91px 91px;
    left: 12px;
    background-position: -47px -60px;
    border-radius: 0;
}

/* --- --- */
.marginLeft {
    margin-left: 10px;
}
.animateHand {
    animation: animateHand 1.5s infinite ease-in-out;
}
.scalePlus {
    transform: scale(1.1);
    font-weight: bold;
}
.animatePulse {
    font-weight: bold;
    animation: pulse 1.1s infinite ease-in-out;
}
</style>
