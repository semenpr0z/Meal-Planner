<script>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';

  export default {
  data() {
    return {
        Navigation: [
          {
              id: 1,
              text: 'Главная',
              Link: '/main',
              active: false
          },
          {
              id: 2,
              text: 'Меню',
              Link: '/menu',
              active: true
          },
          {
              id: 3,
              text: 'Рецепты',
              Link: '/recipes',
              active: false
          }
      ]
    };
  },
  components: {
    Navbar,
    NavbarFooterMobile
  },
  methods: {
    
  }
};
</script>

<template>
<Navbar :menu="Navigation"></Navbar>
<main class="main">
  <h1>Типа страница меню</h1>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>