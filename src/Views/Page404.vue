<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
  import ButtonUI from '@/components/ui-kit/Button-ui.vue';
</script>

<template>
<Navbar></Navbar>
<main class="main">
    <h1 class="main__h1">4<img src="/svg/icon-404.svg" class="main__h1__img">4</h1>
    <p class="main__p">
        К сожалению, страница не найдена<br>
        Такой страницы не существует или она была удалена
    </p>
    <router-link to="/main">
        <ButtonUI text="Перейти на главную" class="main__button"></ButtonUI>
    </router-link>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.main{
    &__h1{
        font-size: 136px;
        line-height: 159px;
        color: #414C52;
        font-weight: 400;
        margin-top: 212px;
        display: flex;
        align-items: center;
        &__img{
            width: 116px;
            height: 116px;
        }
    }
    &__p{
        text-align: center;
        margin-top: 36px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: #000000;
    }
    &__button{
        margin-top: 37px;
    }
}
</style>