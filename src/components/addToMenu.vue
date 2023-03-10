<script>

export default {
  data() {
    return {

    };
  },
  components: {
  },
  props: {
    item: {
        type: Object,
        required: true
    }
  },
  methods: {
    closeAddToMenu() {
      this.$emit('closeAddToMenu')
    }
  },
  emits: ['closeAddToMenu']
};
</script>

<template>
  <div class="absolute-wrapper">
    <div class="background-modal" @click="closeAddToMenu" @keydown.esc="closeAddToMenu">
    </div>
    <div class="addToMenu_wrapper">
      <div class="addToMenu">
        <span class="wrapper-calendar">тут будет календарь к блюду <b>{{ item.name }}</b></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(27, 27, 26, 0.2);
    z-index: 2;
    cursor: pointer;
    padding-right: 5px;
}

.addToMenu{
  position: fixed;
  top: calc(50% - 143.5px);
  left: calc(50% - 150px);
  width: 294px;
  height: 281px;
  background-color: var(--White);
  z-index: 3;
  display: flex;
  flex-direction: column;
  border: 3px solid var(--Gray);
  border-radius: 30px;
}

.wrapper-calendar{
  padding: 24px 0;
}
</style>