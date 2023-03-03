<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';

  import {useUserStore} from '@/stores/UserStore.js'


  const userStore = useUserStore()
</script>

<template>
<Navbar></Navbar>
<main class="main" v-for="user of userStore.user">
  <h1>Типа страница профиля</h1>
  <p>Имя: {{ user.firstName }}</p>
  <p>Электронная почта: {{ user.email }}</p>
  <p>Пол: {{ user.sex == 'male' ? 'Мужской' : 'Женский'}}</p>
  <p>Возраст: {{ user.age }}</p>
  <p>Дата регистрации: {{ new Date(user.creationDate).toLocaleDateString() }}</p>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>