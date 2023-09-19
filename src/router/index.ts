import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginPanel from '../views/LoginPanel.vue';
import FeedPanel from '../views/FeedPanel.vue';

// -------------------
// WARINING - lazy loading doesnt work correctly on github pages from dist build
// -------------------

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
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedPanel,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

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
