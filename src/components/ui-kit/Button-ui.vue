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
      }
    },
    methods: {
        showNextStep(){
            this.$emit('showNextStep');
        },
        determinate(){
          alert('ok')
          if(this.method === 'showNextStep'){
                this.showNextStep()
          }
        }
    }
}

</script>

<template>
  <button class="button-ui" @keydown.enter="determinate">{{ text }}</button>
</template>

<style lang="scss" scoped>
.button-ui{
  color: #FFFFFF;
  font-size: 18px;
  padding: 14px 58px;
  border-radius: 30px;
  border: 3px solid transparent;
  background: #FF8A00;
  transition: 0.5s;
  font-weight: 600;
  line-height: 22px;
  &:hover{
    background: transparent;
    cursor: pointer;
    color: #FF8A00;
    border: 3px solid #FF8A00;
  }
  
  &:active{
    background: #FFDCB3;
    border: 3px solid transparent;
  }
}
</style>