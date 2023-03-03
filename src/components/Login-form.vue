<script>
import Button from '@/components/ui-kit/Button-ui.vue'
import UserDataService from '../services/UserDataService'
import router from '@/router.js'

export default {
    data() {
        return {
            user: null,
            email: '',
            password: ''
        };
    },
    components: {
        Button
    },
    methods: {
        showRegistration() {
            this.$emit('showRegistration');
        },
        async auth() {
            let tempUser = await (await UserDataService.getAll()).data.find(currentUser => (currentUser.email == this.email && currentUser.password == this.password))
            this.user = tempUser
            if(this.user){
                router.push('/profile')
            }else{
                alert('пошел нахуй')
            }
        }
    }
}

</script>

<template>
    <div class="wrapper-text-and-login-form">
        <div class="text">
            <h1 class="text__h1">PlanMenu</h1>
            <h3 class="text__h3">планировщик меню на неделю, <br>где собраны твои любимые рецепты</h3>
        </div>
        <div class="login-form">
            <h2 class="login-form__h2">Вход</h2>
            <input class="login-form__input login-form__input_email" type="email" placeholder="Электронная почта" name="email"
                    v-model="email" @keydown.enter="auth">
            <input class="login-form__input login-form__input_password" type="password" placeholder="Пароль" name="password"
                    v-model="password" @keydown.enter="auth">
            <Button class="login-form__button" text="Продолжить" type="submit" @click="auth"></Button>
            <h2 class="text_h3">Нет аккаунта? <span class="login-form__h2 login-form__h2_btn" @click="showRegistration">Регистрация</span></h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.wrapper-text-and-login-form{
    display: flex;
    gap: 47px;
    margin-top: 199px;
}
.text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    width: 517px;
    &__h1{
        font-weight: 500;
        font-size: 60px;
        line-height: 90px;
        color: #FF8A00;
    }
    &__h3{
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: #1B1B1A;
    }
}
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 16.5px;
    &__h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: #FF8A00;
        &_btn{
            cursor: pointer;
        }
    }

    &__input {
        background-color: #FFDCB3;
        border: 1px solid transparent;
        border-radius: 6px;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        padding: 18px 32px;
        transition: 0.3s;
        width: 357px;

        &::placeholder {
            color: #00000026;
        }

        &:focus {
            outline: none;
            border: 1px solid #000000;
            background-color: transparent;
            color: #000000D9;
        }
    }

    &__button {
        width: max-content;
    }
}

.registration-offer {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__h3 {
        font-weight: 400;
        font-size: 30px;
        line-height: 40px;
        color: #000000CC;
    }

    &__button {
        margin-top: 50px;
    }
}
</style>