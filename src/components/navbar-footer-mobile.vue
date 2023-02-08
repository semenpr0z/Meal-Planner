<script setup>

import {ref} from 'vue';
import IconMenuUi from './ui-kit/Icon-menu-ui.vue';

    const menu = ref([
        {
            id: 1,
            alt: 'главная',
            Link: '/main',
            src: '/svg/logo-main.svg'
        },
        {
            id: 2,
            alt: 'меню',
            Link: '/menu',
            src: '/svg/logo-burger.svg'
        },
        {
            id: 3,
            alt: 'рецепты',
            Link: '/recipes',
            src: '/svg/logo-calendar.svg'
        },
        {
            id: 4,
            alt: 'список покупок',
            Link: '/shopping-list',
            src: '/svg/logo-menu.svg'
        },
        {
            id: 5,
            alt: 'профиль',
            Link: '/profile',
            src: '/svg/logo-profile.svg'
        }
    ]);

</script>

<template>
    <footer class="footer-mobile">
        <nav class="footer-mobile__navbar">
            <IconMenuUi v-for="item of menu"
            :key="item.id"
            :Link="item.Link" 
            :src="item.src" 
            :alt="item.alt"></IconMenuUi>
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