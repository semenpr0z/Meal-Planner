<script>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue'
  import Button from '@/components/ui-kit/Button-ui.vue'
  import Link from '@/components/ui-kit/Link-ui.vue'
  import InputUi from '@/components/ui-kit/Input-ui.vue';

  export default {
  data() {
    return {
        Navigation: [
          {
              id: 1,
              text: 'Главная',
              Link: '/main',
              active: true
          },
          {
              id: 2,
              text: 'Меню',
              Link: '/menu',
              active: false
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
    NavbarFooterMobile,
    Button,
    InputUi
  },
  methods: {
    
  }
};
</script>

<template>
<Navbar :menu="Navigation"></Navbar>
<main class="main">
  <h1>Типа главная страница</h1>
  <div class="ui-kit">
    <Button></Button>
    <!-- <Link
    v-for="item of elements"
                :key="item.id"
                :text="item.text"
                Size="item.Size"></Link> -->
    <!-- <Input-ui></Input-ui> -->
  </div>
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