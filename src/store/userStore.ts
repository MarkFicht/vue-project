import { defineStore } from 'pinia';
import type User from '@/interfaces/User';

export const userStore = defineStore('userStore', {
    state: (): User => {
        return {
            id: 0,
            token: '',
            username: '',
            password: '',
            email: '',
            keepLogIn: false
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
