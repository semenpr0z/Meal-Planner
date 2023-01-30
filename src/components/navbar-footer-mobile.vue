<script setup>

import {ref} from 'vue';

const menu = ref([
        {
            id: 1,
            src: '/svg/logo-main.svg'
        },
        {
            id: 2,
            src: '/svg/logo-burger.svg'
        },
        {
            id: 3,
            src: '/svg/logo-calendar.svg'
        },
        {
            id: 4,
            src: '/svg/logo-menu.svg'
        },
        {
            id: 5,
            src: '/svg/logo-profile.svg'
        }
    ]);

</script>

<template>
    <footer class="footer-mobile">
        <nav class="footer-mobile__navbar">
            <img class="footer-mobile__navbar-icon"
                v-for="item of menu"
                    :key="item.id"
                    :src="item.src">
        </nav>
    </footer>
</template>

<style lang="scss" scoped>
.footer-mobile{
    display: none;
    width: 100%;
    position: sticky;
    bottom: 0;
    background: #D9D9D9;
    height: 58px;
    border-top: 2px solid #00000026;
    align-items: center;
        &__navbar{
        height: 24px;
        width: 650px;
        padding: 0 39px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-icon{
            cursor: pointer;
        }
        }
}


@media screen and (max-width: 650px) {
    .footer-mobile{
        display: flex;
    }
}
</style>