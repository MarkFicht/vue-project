<template>
    <div class="loader-wrapper">
        <div class="loader">
            <span style="--i: 1"></span>
            <span style="--i: 2"></span>
            <span style="--i: 3"></span>
            <span style="--i: 4"></span>
            <span style="--i: 5"></span>
            <span style="--i: 6"></span>
            <span style="--i: 7"></span>
            <span style="--i: 8"></span>
            <span style="--i: 9"></span>
            <span style="--i: 10"></span>
            <span style="--i: 11"></span>
            <span style="--i: 12"></span>
            <span style="--i: 13"></span>
            <span style="--i: 14"></span>
            <span style="--i: 15"></span>
            <span style="--i: 16"></span>
            <span style="--i: 17"></span>
            <span style="--i: 18"></span>
            <span style="--i: 19"></span>
            <span style="--i: 20"></span>
        </div>
    </div>
</template>

<style scoped>
.loader-wrapper {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
    position: relative;
    width: 31px;
    height: 31px;
}

.loader span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: rotate(calc(18deg * var(--i)));
}

.loader span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    transform: scale(0);
    background: hsla(160, 100%, 37%, 1);
    border-radius: 50%;
    animation: animate 2s linear infinite;
    animation-delay: calc(0.1s * var(--i));
}
@keyframes animate {
    0% {
        transform: scale(0);
    }
    10% {
        transform: scale(1.2);
    }
    80%,
    100% {
        transform: scale(0);
    }
}
</style>
