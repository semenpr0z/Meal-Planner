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
    <div class="login-form">
        <h2 class="login-form__h2">Войти в аккаунт</h2>
        <input class="login-form__input login-form__input_email" type="email" placeholder="Электронная почта" name="email"
            v-model="email" @keydown.enter="auth">
        <input class="login-form__input login-form__input_password" type="password" placeholder="Пароль" name="password"
            v-model="password" @keydown.enter="auth">
        <Button class="login-form__button" text="Войти" type="submit" @click="auth"></Button>
        <!-- <p v-if="user">{{ user }}</p>
        <p v-else>Пользователь не найден</p> -->
    </div>

    <div class="registration-offer">
        <h3 class="registration-offer__h3">Еще не зарегистрированы?</h3>
        <Button class="registration-offer__button" @click="showRegistration" text="Зарегистрироваться"></Button>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 153px;

    &__h2 {
        font-weight: 400;
        font-size: 40px;
        line-height: 47px;
        color: #000000CC;
    }

    &__input {
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

        &::placeholder {
            color: #00000026;
        }

        &:focus {
            outline: none;
            border: 1px solid #000000;
            background-color: transparent;
            color: #000000D9;
        }

        &_email {
            margin-top: 102px;
        }

        &_password {
            margin-top: 26px;
        }
    }

    &__button {
        margin-top: 59px;
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