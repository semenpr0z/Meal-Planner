<script>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';

  import {useUserStore} from '@/stores/UserStore.js'

  export default {
    data() {
        return {
        };
    },
    components: {
        Navbar,
        NavbarFooterMobile
    },
    setup(){
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
    }
}
</script>

<template>
<Navbar></Navbar>
<main class="main" v-if="userStore.user">
  <h1>Типа страница профиля</h1>
  <p>Имя: {{ userStore.user.firstName }}</p>
  <p>Электронная почта: {{ userStore.user.email }}</p>
  <p>Пол: {{ userStore.user.sex == 'male' ? 'Мужской' : 'Женский'}}</p>
  <p>Возраст: {{ userStore.user.age }}</p>
  <p>Дата регистрации: {{ new Date(userStore.user.creationDate).toLocaleDateString() }}</p>
</main>
<main class="main" v-else>
  <h1>Типа страница профиля</h1>
  <h3>Вы не авторизованы</h3>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>