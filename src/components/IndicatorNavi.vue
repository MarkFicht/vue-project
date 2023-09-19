<script setup lang="ts">
import { ref, inject } from 'vue';
import { RouterLink } from 'vue-router';

const colors = ref<string[]>([
    '--clr:#f3218b;',
    `--clr:#2196f3;`,
    '--clr:#008a1b;',
    '--clr:#dc1dff;',
    '--clr:#d56f1d;'
]);

const { activeLink, routes, updateActiveLink } = inject<any>('indicatorNavi');
</script>

<template>
    <section class="nav show-nav" :style="`--widthSection:${70 * routes.length + 50}px;`">
        <nav :style="`--widthNavTag:${70 * routes.length}px;`">
            <RouterLink
                v-for="(route, index) in routes"
                :key="route.name"
                :to="route.to"
                :style="`${colors[index]}`"
                :class="[activeLink === route.name && 'active']"
                @click="() => updateActiveLink(route.name)"
            >
                <span class="icon"><ion-icon :name="`${route.ionIconClass}`"></ion-icon></span>
                <span class="text">{{ route.name }}</span>
            </RouterLink>
            <div class="indicator"></div>
        </nav>
    </section>
</template>

<style scoped>
section.nav {
    /* position: fixed; */
    /* z-index: 10000; */
    /* bottom: 50px; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 15px;
    width: var(--widthSection);
    height: 60px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.5));
    animation: showElement 2s linear;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
section.nav nav {
    display: flex;
    width: var(--widthNavTag);
}
section.nav nav a {
    position: relative;
    list-style: none;
    width: 70px;
    height: 60px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    font-weight: 500;
}
section.nav nav a .icon {
    position: relative;
    display: block;
    line-height: 65px;
    font-size: 1.5em;
    text-align: center;
    transition: 0.5s;
    color: #666;
}
section.nav nav a.active .icon {
    transform: translateY(-32px);
    color: var(--clr);
}
section.nav nav a .text {
    position: absolute;
    color: #fff;
    padding: 2px 7px;
    border-radius: 12px;
    font-weight: 400;
    font-size: 0.75em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    transform: translateY(15px);
    opacity: 0;
}
section.nav nav a.active .text {
    transform: translateY(-4px);
    background: var(--clr);
    opacity: 1;
}
.indicator {
    position: absolute;
    top: -35px;
    width: 70px;
    height: 70px;
    background: #eee;
    border-radius: 50%;
    transition: 0.5s;
    z-index: 1;
}
.indicator::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: 5px;
    left: -28px;
    background: transparent;
    box-shadow: 15px 18px #eee;
}
.indicator::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: 5px;
    right: -28px;
    background: transparent;
    box-shadow: -15px 18px #eee;
}
section.nav nav a:nth-child(1).active ~ .indicator {
    transform: translateX(calc(70px * 0));
}
section.nav nav a:nth-child(2).active ~ .indicator {
    transform: translateX(calc(70px * 1));
}
section.nav nav a:nth-child(3).active ~ .indicator {
    transform: translateX(calc(70px * 2));
}
section.nav nav a:nth-child(4).active ~ .indicator {
    transform: translateX(calc(70px * 3));
}
section.nav nav a:nth-child(5).active ~ .indicator {
    transform: translateX(calc(70px * 4));
}
@keyframes showElement {
    0%,
    30% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@media (max-width: 720px) {
    section.nav {
        transform: scale(0.9);
        margin-top: 50px;
    }
}
</style>
