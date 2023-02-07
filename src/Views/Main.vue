<script setup>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue'
  import Button from '@/components/ui-kit/Button-ui.vue'
  import Link from '@/components/ui-kit/Link-ui.vue'
</script>

<template>
<Navbar></Navbar>
<main class="main">
  <h1>Типа главная страница</h1>
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