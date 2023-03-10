<script>

export default {
    data() {
        return {
            firstName: '',
            email: '',
            password: '',
            age: '',
            sex: ''
        };
    },
    props: {
      text : {
        type: String,
        default: 'Найти рецепт'
      },
      method: {
        type: String,
        required: false
      },
      color: {
        type: String,
        default: 'orange'
      }
    },
    methods: {
        showNextStep(){
          this.$emit('showNextStep');
        },
        moreRecipes(){
          this.$emit('moreRecipes');
        },
        determinate(){
          if(this.method === 'showNextStep'){
            this.showNextStep()
          }
          else if(this.method === 'moreRecipes'){
            this.moreRecipes()
          }
        }
    },
    emits: ['showNextStep', 'moreRecipes']
}

</script>

<template>
  <button
    :class="['button-ui', {'button-ui_orange' : color == 'orange'},{'button-ui_gray' : color == 'gray'}]"
    @keydown.enter="determinate">{{ text }}</button>
</template>

<style lang="scss" scoped>
.button-ui{
  font-size: 18px;
  padding: 14px 58px;
  border-radius: 30px;
  transition: 0.5s;
  font-weight: 600;
  line-height: 22px;
  &_orange{
    background: var(--Orange);
    border: 3px solid var(--Orange);
    color: var(--White);
    &:hover{
      color: var(--Orange);
      border: 3px solid var(--Orange);
      background: transparent;
    }
    &:active{
      background: var(--Light_orange);
      border: 3px solid var(--Orange);
    }
  }
  &_gray{
    background: var(--Gray);
    border: 3px solid var(--Gray);
    color: var(--Black);
    &:hover{
      color: var(--Black);
      border: 3px solid var(--Black);
      background: transparent;
    }
    &:active{
      background: var(--Text_gray);
      border: 3px solid var(--Text_gray);
      color: var(--White);
    }
  }

  &:hover{
    cursor: pointer;
  }
}
</style>