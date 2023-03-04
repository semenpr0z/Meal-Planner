<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';

  import {useUserStore} from '@/stores/UserStore.js'


  const userStore = useUserStore()
</script>

<template>
<Navbar></Navbar>
<main class="main">
  <h1>Типа страница профиля</h1>
  <p>Имя: {{ userStore.user.firstName }}</p>
  <p>Электронная почта: {{ userStore.user.email }}</p>
  <p>Пол: {{ userStore.user.sex == 'male' ? 'Мужской' : 'Женский'}}</p>
  <p>Возраст: {{ userStore.user.age }}</p>
  <p>Дата регистрации: {{ new Date(userStore.user.creationDate).toLocaleDateString() }}</p>
  
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>