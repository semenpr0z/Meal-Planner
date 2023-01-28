<script setup>
  import Button from './components/ui-kit/Button-ui.vue'
  import Link from './components/ui-kit/Link-ui.vue'
</script>

<template>
<div class="ui-kit">
    <Button></Button>
    <Link></Link>
</div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
*{
  font-family: 'Roboto', sans-serif;
  }
body{
  display: flex;
  justify-content: center;
  align-items: center;
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
