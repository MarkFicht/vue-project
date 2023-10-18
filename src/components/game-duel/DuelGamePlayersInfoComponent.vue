<script setup lang="ts">
import type IUser from '@/interfaces/User';
import { duelGameStore } from '@/store/duelGameStore';
import { storeToRefs } from 'pinia';
import { ref, toRefs } from 'vue';

const storeDuelGame = duelGameStore();
const { player1, player2, turn } = storeToRefs(storeDuelGame);

const emit = defineEmits(['prepare-game-to-remove-from-db']);

const props = defineProps<{
    user: IUser;
}>();
const { user } = toRefs(props);

const kickBtn = ref<string>('Kick player');
const surrenderBtn = ref<string>('Surrender');
const labelSurrender = ref<string>('Do you really want to give up?!');

const player1Time = ref<number>(90);
const player2Time = ref<number>(90);

const surrenderPrepare = ref<boolean>(false);
</script>

<template>
    <section class="playerInfo">
        <!-- ACTION: Surrender -->
        <div v-if="surrenderPrepare" class="surrenderPopUp">
            <p>{{ labelSurrender }}</p>
            <div>
                <button
                    :class="['customInput']"
                    @click="
                        async () => (
                            await emit('prepare-game-to-remove-from-db', user),
                            (surrenderPrepare = false)
                        )
                    "
                >
                    {{ 'Yes' }}
                </button>
                <button :class="['customInput']" @click="() => (surrenderPrepare = false)">
                    {{ 'NO!' }}
                </button>
            </div>
        </div>

        <!-- PLAYERS INFO -->
        <div :class="['player1info', 'customInput', turn === player1.user.uid && 'boldParagraf']">
            <p>
                {{ `Nick: ${player1.user.displayName || player1.user.email}` }}
            </p>
            <p>
                {{ `Timer: ${player1Time}` }}
            </p>
            <button
                :disabled="player2.user.uid === user.uid && player2Time > 0"
                :class="['customButton']"
                @click="() => (player1.user.uid === user.uid ? (surrenderPrepare = true) : null)"
            >
                {{ player1.user.uid === user.uid ? surrenderBtn : kickBtn }}
            </button>
        </div>
        <div :class="['player2info', 'customInput', turn === player2.user.uid && 'boldParagraf']">
            <p>
                {{ `Nick: ${player2.user.displayName || player2.user.email}` }}
            </p>
            <p>
                {{ `Timer: ${player2Time}` }}
            </p>
            <button
                :disabled="player1.user.uid === user.uid && player1Time > 0"
                :class="['customButton']"
                @click="() => (player2.user.uid === user.uid ? (surrenderPrepare = true) : null)"
            >
                {{ player2.user.uid === user.uid ? surrenderBtn : kickBtn }}
            </button>
        </div>
    </section>
</template>

<style scoped>
.playerInfo {
    grid-area: pi;
    margin: 0 auto;
    width: 100%;
}
.surrenderPopUp {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 360px !important;
    height: 200px !important;
    z-index: 10;
    border-radius: 20px;
    background-color: rgba(100, 50, 150, 0.9);
    color: #eee;
    animation: showElement 0.7s linear;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
.surrenderPopUp p {
    font-size: 1.3em;
    text-align: center;
}
.surrenderPopUp > div {
    display: flex;
}
.surrenderPopUp button {
    margin: 15px;
    cursor: pointer;
    color: #efefef;
    box-shadow:
        inset 3px 3px 10px rgba(0, 0, 0, 0.4),
        inset -2px -2px 10px rgba(255, 255, 255, 0.45);
}
.surrenderPopUp button:first-child {
    color: silver;
}
.playerInfo > div {
    height: 120px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 15px 25px !important;
    font-size: 0.9em;
    letter-spacing: 0.02em;
}
.playerInfo button {
    font-size: 1em;
    line-height: 30px;
    height: 30px;
    padding: 0 15px !important;
    font-weight: 600;
    letter-spacing: 1px;
}
.boldParagraf > p {
    font-weight: bold;
}
</style>
