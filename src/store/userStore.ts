import { defineStore } from 'pinia';
import type User from '@/interfaces/User';

export const userStore = defineStore('userStore', {
    state: (): User => {
        return {
            password: '',
            keepLogIn: false,
            auth: '',
            accessToken: '',
            uid: '',
            refreshToken: '',
            displayName: '',
            email: ''
        };
    },
    getters: {
        // getUserById: (state) => {
        //     //
        // }
    },
    actions: {
        async fetchAllUsers() {
            // try {
            //     this.userList = (await getAllUsers()).data;
            // } catch (error) {
            //     console.log(error);
            //     return error;
            // }
        }
    }
});
