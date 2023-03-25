<script>
import Button from '@/components/ui-kit/Button-ui.vue'
import InputUi from '@/components/ui-kit/Input-ui.vue';


import UserDataService from '../services/UserDataService'
import router from '@/router.js'
import { useUserStore } from '@/stores/UserStore.js'


export default {
    data() {
        return {
            user: null,
            email: '',
            password: '',
            validation: false
        };
    },
    mounted(){
        document.addEventListener('keydown', this.handleKeydown)
    },
    beforeUnmount(){
        document.removeEventListener('keydown', this.handleKeydown)
    },
    components: {
        Button,
        InputUi
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
        showRegistration() {
            this.$emit('showRegistration');
        },
        async auth() {
            let tempUser = await (await UserDataService.getAll()).data.find(currentUser => (currentUser.email == this.email && currentUser.password == this.password))
            this.user = tempUser
            if (this.user) {
                this.userStore.changeUser(this.user)
                localStorage.setItem('user', JSON.stringify(this.user))
                router.push('/profile')

            } else {
                this.validation = true
            }
        },
        valueGet(value, type) {
            if (type === 'email') {
                this.email = value
            }
            if (type === 'password') {
                this.password = value
            }
        },
        handleKeydown(event) {
            if (event.keyCode === 13) {
                this.auth()
            }
        }
    },
    emits: ['showRegistration'],
    watch: {
        email() {
            this.validation = false
        },
        password() {
            this.validation = false
        }
    }
}

</script>

<template>
    <div class="wrapper-text-and-login-form">
        <div class="text">
            <h1 class="text__h1 h-main">PlanMenu</h1>
            <h3 class="text__h3 h-1">планировщик меню на неделю, <br>где собраны твои любимые рецепты</h3>
        </div>
        <div class="login-form">
            <h2 class="login-form__h2 h-1">Вход</h2>
            <InputUi @valueGet="valueGet" @auth="auth" type="email" method="auth" :valid="validation" />
            <InputUi @valueGet="valueGet" @auth="auth" type="password" method="auth" :valid="validation" />
            <Button class="login-form__button" text="Продолжить" type="submit" @click="auth" method="auth"
                @auth="auth"></Button>
            <div class="login-form__text-invalid_text-area">
                <span :class="['span-3', 'login-form__text-invalid', { 'login-form__text-invalid_show': validation }]">Данные
                    введены неверно, попробуйте снова</span>
            </div>
            <h2 class="text_h2 h-1">Нет аккаунта? <span class="login-form__h2 login-form__h2_btn"
                    @click="showRegistration">Регистрация</span></h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.wrapper-text-and-login-form {
    display: flex;
    gap: 47px;
    margin-top: 199px;
}

.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    width: 517px;

    &__h1 {
        color: var(--Orange);
    }

    &__h3 {
        color: var(--Black);
    }
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 421px;

    &__h2 {
        color: var(--Orange);

        &_btn {
            cursor: pointer;
        }
    }

    &__button {
        width: max-content;
    }

    &__text-invalid {
        color: #D02500;
        display: none;

        &_text-area {
            height: 17px;
        }

        &_show {
            display: block;
        }
    }
}


@media screen and (max-width: 960px) {

    .wrapper-text-and-login-form {
        justify-content: space-between;
        gap: 0;
        width: 100%;
    }

    .text {
        width: 407px;

        &__h1 {}

        &__h3 {}
    }

    .login-form {
        padding: 0;
        width: auto;

        &__h2 {}
    }

}</style>