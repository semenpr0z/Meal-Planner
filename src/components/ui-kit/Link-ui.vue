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
    },
    active : {
      type: Boolean,
      required: false
    }
})

</script>

<template>
  <div :class="['wrapper-link', {'active-wrapper' : active === true}]">
    <router-link :to="Link"
    :class="['wrapper-link__link-ui', {'active' : active === true}]"
    :style="{fontSize: Size}">{{ text }}</router-link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-link{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid transparent;
  border-radius: 2px;
  transition: 0.5s;
  height: 24px;
  &__link-ui{
      color: var(--Black);
      text-decoration: none;
      font-weight: 500;
      line-height: 22px;
      transition: 0.5s;
      &:hover{
        color: var(--Orange);
      }
  }
  &:hover{
          border-bottom: 2px solid var(--Orange);
      }
  &:active{
    border-bottom: 2px solid #000000;
  }
}

.active{
  color: var(--Orange);
  &-wrapper{
    border-bottom: 2px solid var(--Orange);
  }
}
</style>