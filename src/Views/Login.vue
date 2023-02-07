<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue'
  import Registration from '@/components/Registration.vue';
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
  <Registration></Registration>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>