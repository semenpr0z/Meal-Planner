<script setup>

const props = defineProps({
    text : {
        type: String,
        required: true
    },
    Size : {
        type: String,
        default: "18px"
    },
    Link : {
        type: String,
        default: "/main"
    }
})

</script>

<template>
  <div class="wrapper-link">
    <router-link :to="Link"
    class="wrapper-link__link-ui"
    :style="{fontSize: Size}">{{ text }}</router-link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-link{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid transparent;
  transition: 0.5s;
  &__link-ui{
      color: #000000;
      text-decoration: none;
      line-height: 22px;
  }
  &:hover{
          border-bottom: 2px solid #00000080;
      }
  &:active{
    border-bottom: 2px solid #000000;
  }
}
</style>