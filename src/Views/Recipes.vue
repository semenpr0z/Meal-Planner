<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
  import searchIngredients from '@/components/Search-ingredients.vue';
  import RecipeСardVue from '@/components/Recipe-сard.vue';
  import ButtonUi from '@/components/ui-kit/Button-ui.vue';

</script>

<template>
<Navbar></Navbar>
<main class="main">
    <searchIngredients></searchIngredients>
    <div class="wrapper-recipes-list">
      <RecipeСardVue/>
      <RecipeСardVue/>
      <RecipeСardVue/>
      <RecipeСardVue/>
    </div>
    <ButtonUi class="button-more-recipes" text="Посмотреть еще"></ButtonUi>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.wrapper-recipes-list{
  margin-top: 58px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.button-more-recipes{
  margin-top: 46px;
}
</style>