<script>
import Button from '@/components/ui-kit/Button-ui.vue'
import InputUi from '@/components/ui-kit/Input-ui.vue';


import UserDataService from '../services/UserDataService'
import router from '@/router.js'
import {useUserStore} from '@/stores/UserStore.js'


export default {
    data() {
        return {
            user: null,
            email: '',
            password: ''
        };
    },
    components: {
        Button,
        InputUi
    },
    setup(){
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
            if(this.user){
                this.userStore.changeUser(this.user)
                localStorage.setItem('user', JSON.stringify(this.user))
                router.push('/profile')
                
            }else{
                alert('пошел нахуй')
            }
        },
        valueGet(value, type) {
            if(type === 'email') {
                this.email = value
            }
            if(type === 'password') {
                this.password = value
            }
        }
    },
    emits: ['showRegistration']
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
            <InputUi @valueGet="valueGet" @auth="auth" type="email" method="auth"/>
            <InputUi @valueGet="valueGet" @auth="auth" type="password" method="auth"/>
            <Button class="login-form__button" text="Продолжить" type="submit" @click="auth"></Button>
            <h2 class="text_h2">Нет аккаунта? <span class="login-form__h2 login-form__h2_btn" @click="showRegistration">Регистрация</span></h2>
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
        color: var(--Orange);
    }
    &__h3{
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: var(--Black);
    }
}
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 0 16.5px;
    width: 421px;
    &__h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: var(--Orange);
        &_btn{
            cursor: pointer;
        }
    }
    &__button {
        width: max-content;
    }
}


@media screen and (max-width: 960px){

    .wrapper-text-and-login-form{
        justify-content: space-between;
        gap: 0;
        width: 100%;
    }
  .text{
    width: 407px;
    &__h1{
        font-size: 45px;
        line-height: 68px;
    }
    &__h3{
        font-size: 22px;
        line-height: 33px;
    }
  }

  .login-form {
    padding: 0;
    width: auto;
    &__h2 {
        font-size: 22px;
        line-height: 33px;
    }
}

}
</style>