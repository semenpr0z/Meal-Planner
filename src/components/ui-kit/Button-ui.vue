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
  color: #FFFFFF;
  font-size: 18px;
  line-height: 21px;
  padding: 16px 28px;
  border-radius: 30px;
  border: none;
  background: radial-gradient(110.53% 110.53% at -5.92% 50%, #FF6B00 8.89%, #FF813A 44.82%, #FFAC2F 95.75%);
  transition: 0.5s;
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