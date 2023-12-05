import { defineStore } from 'pinia';
import { doc, onSnapshot } from 'firebase/firestore';
import { usersRef } from '@/helpers/HelpersFirebaseConst';
import type IUser from '@/interfaces/User';

let unSubFirebaseUser: any;

export const userStore = defineStore('userStore', {
    state: (): { fbUser: IUser } => {
        return {
            fbUser: {
                // password: '',
                // keepLogIn: false,
                // auth: null,
                // accessToken: '',
                // refreshToken: '',
                uid: '',
                displayName: '',
                email: '',
                game: '',
                readyToGame: false,
                timestamp: '',
                online: ''
            }
        };
    },
    getters: {
        // getUserById: (state) => {
        //     //
        // }
    },
    actions: {
        async subFirebaseConnect(uid: string) {
            unSubFirebaseUser = await onSnapshot(doc(usersRef, uid), (doc) => {
                if (doc.exists()) {
                    const { uid, displayName, email, readyToGame, game, online, timestamp } =
                        doc.data();
                    this.fbUser.uid = uid;
                    this.fbUser.displayName = displayName;
                    this.fbUser.email = email;
                    this.fbUser.readyToGame = readyToGame;
                    this.fbUser.game = game;
                    this.fbUser.online = online;
                    this.fbUser.timestamp = timestamp;
                }
            });
        },
        async unSubFirebaseConnect() {
            await unSubFirebaseUser();
        }
    }
});
