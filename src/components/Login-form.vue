<script>
  import Button from '@/components/ui-kit/Button-ui.vue'

  export default {
    data() {
    return {
    };
  },
  components: {
    Button
  },
  methods: {
    showRegistration() {
        this.$emit('showRegistration');
    }
  }
}


</script>

<template>

<div class="login-form">
  <h2 class="login-form__h2">Войти в аккаунт</h2>
  <input class="login-form__input login-form__input_email" type="email" placeholder="Электронная почта" name="email">
  <input class="login-form__input login-form__input_password" type="password" placeholder="Пароль" name="password">
  <Button class="login-form__button" text="Войти" type="submit"></Button>
</div>
<div class="registration-offer">
    <h3 class="registration-offer__h3">Еще не зарегистрированы?</h3>
    <Button class="registration-offer__button" @click="showRegistration" text="Зарегистрироваться"></Button>
</div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.login-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 153px;
    &__h2{
        font-weight: 400;
        font-size: 40px;
        line-height: 47px;
        color: #000000CC;
    }
    &__input{
        width: 385px;
        height: 35px;
        background-color: #E2E2E2;
        border: 1px solid transparent;
        border-radius: 10px; 
        font-weight: 400;
        font-size: 27px;
        line-height: 34px;
        padding: 18px 28px 16px;
        transition: 0.3s;
        &::placeholder{
            color: #00000026;
        }
        &:focus{
            outline: none;
            border: 1px solid #000000;
            background-color: transparent;
            color: #000000D9;
        }
        &_email{
            margin-top: 102px;
        }
        &_password{
            margin-top: 26px;
        }
    }
    &__button{
        margin-top: 59px;
        width: max-content;
    }
}
.registration-offer{
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__h3{
        font-weight: 400;
        font-size: 30px;
        line-height: 40px;
        color: #000000CC;
    }
    &__button{
        margin-top: 50px;
    }
}
</style>