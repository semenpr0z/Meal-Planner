<script setup>
  import Button from '@/components/ui-kit/Button-ui.vue'
</script>

<template>

<div class="registration-form">
  <h2 class="registration-form__h2">Регистрация</h2>
  <input class="registration-form__input registration-form__input_email" type="email" placeholder="Электронная почта" name="email">
  <input class="registration-form__input registration-form__input_password" type="password" placeholder="Пароль" name="password">
  <Button class="registration-form__button" text="Зарегистрироваться" type="submit"></Button>
</div>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.registration-form{
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
</style>