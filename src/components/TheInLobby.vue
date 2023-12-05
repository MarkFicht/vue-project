<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ref } from 'vue';
import { userStore } from '@/store/userStore';
import { gameStore } from '@/store/gameStore';
import { storeToRefs } from 'pinia';
import {
    usersRef,
    gameStatusDuelRef,
    gameStatusGemsRef,
    gameStatusReflexRef
} from '@/helpers/HelpersFirebaseConst';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const acceptBtn = ref<string>('Accept');
const cancelBtn = ref<string>('Cancel');
const labelRedirect = ref<string>('Redirect for a few sec...');
const labelWaiting = ref<string>('Approval game: ');

const storeUser = userStore();
const { fbUser } = storeToRefs(storeUser);

const storeGame = gameStore();
const { duel, gems, reflex } = storeToRefs(storeGame);

// TODO timers with timestamp + remove away/offline players from lobby + set 30s from timestamp
// TODO remove players and game if all players Disconnected/away

// TODO - foo for other games in lobby
async function acceptDuelGame(): Promise<any> {
    if (duel.value.players.length === 2) {
        if (duel.value.players.find((user) => user.uid === fbUser.value.uid)) {
            await updateDoc(doc(usersRef, fbUser.value.uid), {
                readyToGame: true
            });
            const newPlayers = duel.value.players.map((user) => {
                return user.uid === fbUser.value.uid ? { ...user, readyToGame: true } : { ...user };
            });
            await updateDoc(gameStatusDuelRef, {
                players: newPlayers
            });
        }
    }
}

async function cancelDuelGame(): Promise<any> {
    if (duel.value.players.length === 2) {
        if (duel.value.players.find((user) => user.uid === fbUser.value.uid)) {
            duel.value.players.forEach(async ({ uid }) => {
                if (uid === fbUser.value.uid) {
                    await updateDoc(doc(usersRef, uid), {
                        game: '',
                        readyToGame: false
                    });
                } else {
                    await updateDoc(doc(usersRef, uid), {
                        readyToGame: false
                    });
                }
            });

            const newPlayers = duel.value.players
                .filter((user) => {
                    return user.uid !== fbUser.value.uid ? user : null;
                })
                .map((user) => {
                    return { ...user, readyToGame: false };
                });

            await updateDoc(gameStatusDuelRef, {
                players: newPlayers
            });
        }
    }
}
</script>

<template>
    <section class="inLobbyPlayersContainer">
        <h3>
            {{ duel.isStarted ? labelRedirect : labelWaiting + 'Duel' }}
        </h3>

        <div>
            <p>{{ duel.players[0].displayName || duel.players[0].email }}{{ ': ' }}</p>
            <LoadingSpinner
                v-if="!duel.players[0].readyToGame"
                small
                :style="'margin-left: 10px;'"
            />
            <ion-icon
                v-else
                class="animateHand"
                name="thumbs-up-sharp"
                :style="'margin-left: 10px;'"
            ></ion-icon>
        </div>

        <div>
            <p>{{ duel.players[1].displayName || duel.players[1].email }}{{ ': ' }}</p>
            <LoadingSpinner
                v-if="!duel.players[1].readyToGame"
                small
                :style="'margin-left: 10px;'"
            />
            <ion-icon
                v-else
                class="animateHand"
                name="thumbs-up-sharp"
                :style="'margin-left: 10px;'"
            ></ion-icon>
        </div>

        <div
            v-if="!duel.players.find((user) => user.uid === fbUser.uid)?.readyToGame"
            class="ApproveButtonsContainer"
        >
            <button @click="acceptDuelGame">
                {{ acceptBtn }}
            </button>
            <button @click="cancelDuelGame">
                {{ cancelBtn }}
            </button>
        </div>
    </section>
</template>

<style scoped>
/* --- Lobby with full party --- */
.inLobbyPlayersContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(100, 50, 150, 0.93);
    color: #eee;
    border-radius: 19px;
    transition: all 0.5s;
    animation: showElement 0.7s linear;
}
.inLobbyPlayersContainer > h3 {
    font-size: 20px;
    min-height: 20px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    padding: 0 10px;
    text-align: center;
}
.inLobbyPlayersContainer > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    letter-spacing: 1px;
}
.inLobbyPlayersContainer > div > p {
    font-size: 14px;
}
/* --- Buttons --- */
.ApproveButtonsContainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
}
.ApproveButtonsContainer > button {
    border: none;
    height: 40px;
    padding: 6px 10px;
    margin: 0 20px;
    border: none;
    outline: none;
    border-radius: 30px;
    color: #fff;
    background-color: var(--clr);
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.5s;
    cursor: pointer;
    box-shadow:
        12px 12px 16px 0 rgba(255, 255, 255, 0.22) inset,
        -8px -8px 12px 0 rgba(0, 0, 0, 0.18) inset;
}
.ApproveButtonsContainer > button:last-child {
    color: #ccc;
}
.ApproveButtonsContainer > button:hover {
    transform: scale(1.1);
    opacity: 0.9;
}
.animateHand {
    animation: animateHand 1.5s infinite ease-in-out;
}

@media (min-width: 400px) {
    .inLobbyPlayersContainer > h3 {
        font-size: 24px;
        min-height: 24px;
        line-height: 24px;
        padding: 0 20px;
    }

    .inLobbyPlayersContainer > div {
        margin-top: 30px;
    }

    .inLobbyPlayersContainer > div > p {
        font-size: 16px;
    }
    .ApproveButtonsContainer > button {
        padding: 8px 16px;
    }
}

@media (min-width: 720px) {
    .inLobbyPlayersContainer > h3 {
        font-size: 28px;
        min-height: 28px;
        line-height: 28px;
    }

    .inLobbyPlayersContainer > div > p {
        font-size: 18px;
    }
    .ApproveButtonsContainer > button {
        font-size: 16px;
        line-height: 16px;
    }
}

@media (min-width: 1024px) {
    .inLobbyPlayersContainer > h3 {
        font-size: 30px;
        min-height: 30px;
        line-height: 30px;
    }

    .inLobbyPlayersContainer > div > p {
        font-size: 20px;
    }
    .ApproveButtonsContainer > button {
        font-size: 18px;
        line-height: 18px;
    }
}
</style>
