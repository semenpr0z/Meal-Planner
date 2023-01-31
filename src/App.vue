<script setup>
  import Navbar from './components/navbar.vue';
  import Button from './components/ui-kit/Button-ui.vue'
  import Link from './components/ui-kit/Link-ui.vue'
  import NavbarFooterMobile from './components/navbar-footer-mobile.vue'
  import searchIngredients from './components/search-ingredients.vue'
  import {ref} from 'vue';


  const elements = ref([
        {
            id: 1,
            text: 'рецепты',
            Size: '18px'
        }
    ]);
</script>

<template>
<Navbar></Navbar>
<main class="main">
  <searchIngredients></searchIngredients>
  <div class="ui-kit">
    <Button></Button>
    <Link
    v-for="item of elements"
                :key="item.id"
                :text="item.text"
                Size="item.Size"></Link>
  </div>
</main>
<NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

*{
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  }
body{
  margin: 0;
}
.main{
  height: calc(100vh - 60px);
}
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
