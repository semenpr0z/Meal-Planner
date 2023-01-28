<script setup>

import {ref} from 'vue';
import Link from './ui-kit/Link-ui.vue'

const menu = ref([
        {
            id: 1,
            text: 'главная',
            Size: '18px'
        },
        {
            id: 2,
            text: 'меню',
            Size: '18px'
        },
        {
            id: 3,
            text: 'рецепты',
            Size: '18px'
        },
        {
            id: 4,
            text: 'список покупок',
            Size: '18px'
        }
    ]);

</script>

<template>
    <header>
        <nav class="navbar navbar-desktop">
            <a href="#" class="navbar-logo__link"><div class="navbar-logo">
                <span class="navbar-logo__span">Логотип</span>
            </div></a>
            <Link
                v-for="item of menu"
                    :key="item.id"
                    :text="item.text"
                    :Size="item.Size"></Link>
            <div class="navbar-profile">
                <img src="/svg/logo-profile.svg" alt="profile-logo" srcset="">
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.navbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 39px;
    width: calc(100vw - 62px);
    padding: 16px 31px;
    background: #D9D9D9;
    &-logo{
        width: 155px;
        height: 39px;
        background: #EEEEEE;
        display: flex;
        justify-content: center;
        align-items: center;
        &__link{
            text-decoration: none;
        }
        &__span{
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            line-height: 15px;
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
</style>