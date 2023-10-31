import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from '@/helpers/HelpersFoo';
import LoginPanel from '../views/LoginPanel.vue';
// import FeedPanel from '../views/FeedPanel.vue';

const router = createRouter({
    history: createWebHistory(),
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
        },
        {
            path: '/feed',
            name: 'feed',
            component: () => import('../views/FeedPanel.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/duel-game',
            name: 'duel',
            component: () => import('../views/TheDuelGameBoard.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/gems-game',
            name: 'gems',
            component: () => import('../views/FeedPanel.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reflex-game',
            name: 'reflex',
            component: () => import('../views/FeedPanel.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/feed/settings',
            name: 'settings',
            component: () => import('../views/FeedPanel.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/feed/logout',
            name: 'logout',
            component: () => import('../views/FeedPanel.vue'),
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.name === 'home' || to.name === 'not-found') {
        if (await getCurrentUser()) {
            next('/feed');
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("You don't have access!");
            next('/');
        }
    } else {
        next();
    }
});

export default router;
