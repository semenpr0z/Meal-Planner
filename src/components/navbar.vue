<script setup>

import {ref} from 'vue';
import Link from './ui-kit/Link-ui.vue'
import IconMenuUi from './ui-kit/Icon-menu-ui.vue';

const menu = ref([
        {
            id: 1,
            text: 'главная',
            Link: '/main'
        },
        {
            id: 2,
            text: 'меню',
            Link: '/menu'
        },
        {
            id: 3,
            text: 'рецепты',
            Link: '/recipes'
        },
        {
            id: 4,
            text: 'список покупок',
            Link: '/shopping-list'
        }
    ]);

</script>

<template>
    <header class="header">
        <nav class="navbar navbar-desktop">
            <router-link to="/main" class="navbar-logo__link"><div class="navbar-logo">
                <img src="/logo.svg" alt="">
                <span class="navbar-logo__span">планировщик<br> меню</span>
            </div></router-link>
            <Link class="menu-items-desktop"
                v-for="item of menu"
                    :key="item.id"
                    :text="item.text"
                    :Link="item.Link"
                    ></Link>
            <IconMenuUi Link="/profile" src="/svg/logo-profile.svg" alt="Профиль"></IconMenuUi>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: center;
}
.navbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 39px;
    width: 1160px;
    padding: 16px 30px;
    &-logo{
        width: 155px;
        height: 39px;
        display: flex;
        justify-content: center;
        align-items: center;
        &__link{
            text-decoration: none;
        }
        &__span{
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #000000;
        }
    }
    &-links{
        display: flex;
        justify-content: space-between;
        width: 392px;
        height: 15px;
    }
    &-profile{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
}

@media screen and (max-width: 650px) {
    .menu-items-desktop{
        display: none;
    }
    .navbar-profile-desktop{
        display: none;
    }
}
</style>