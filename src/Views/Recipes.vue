<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
  import searchIngredients from '../components/Search-ingredients.vue';
</script>

<template>
<Navbar></Navbar>
<main class="main">
    <searchIngredients></searchIngredients>
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