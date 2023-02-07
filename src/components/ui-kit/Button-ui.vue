<script setup>

const props = defineProps({
    text : {
        type: String,
        default: 'Найти рецепт'
    }
})

</script>

<template>
  <button class="button-ui">{{ text }}</button>
</template>

<style lang="scss" scoped>
.button-ui{
  color: #000000;
  font-size: 18px;
  line-height: 21px;
  padding: 18px 32px;
  border-radius: 6px;
  border: none;
  background: #D9D9D9;
  transition: 0.5s;
  height: 57px;
  &:hover{
    background: #C1C1C1;
    cursor: pointer;
  }
  &:focus{
    background: #C1C1C1;
    outline: none;
  }
  &:active{
    background: #8E8E8E;
  }
}
</style>