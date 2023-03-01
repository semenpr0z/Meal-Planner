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
          },
          {
              id: 4,
              text: 'Список покупок',
              Link: '/shopping-list',
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
.ui-kit{
  width: 250px;
  height: 170px;
  border: 2px dashed #9747FF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>