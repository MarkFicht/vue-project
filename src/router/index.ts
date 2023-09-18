import { createRouter, createWebHistory } from 'vue-router';
import LoginPanel from '../views/LoginPanel.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LoginPanel
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: LoginPanel
        }
        // {
        //     path: '/add-user',
        //     name: 'add-user',
        //     component: () => import('../views/UserView.vue')
        // },
        // {
        //     path: '/edit-user',
        //     name: 'edit-user',
        //     component: () => import('../views/UserView.vue')
        // }
    ]
});

export default router;
