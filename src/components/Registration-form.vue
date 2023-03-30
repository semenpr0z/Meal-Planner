<script>
import Button from '@/components/ui-kit/Button-ui.vue'
import UserDataService from '../services/UserDataService'
import InputUi from '@/components/ui-kit/Input-ui.vue';
import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'

export default {
    data() {
        return {
            id: null,
            email: '',
            password: '',
            firstName: '',
            age: '',
            sex: '',
            validState: false,
            nextStep: true,
            user: null
        };
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeydown)
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeydown)
    },
    components: {
        Button,
        InputUi
    },
    methods: {
        showLogin() {
            this.$emit('showLogin');
        },
        showNextStep() {
            if (this.nextStep == true) {
                if (this.email.length == 0 || this.password.length == 0) {
                    this.validState = true
                } else {
                    this.nextStep = false
                }
            }
        },
        async saveUser() {
            if (this.email.length != 0 && this.password.length != 0 && this.firstName.length != 0 && this.age.length != 0 && this.sex.length != 0) {
                this.user = {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    age: this.age,
                    sex: this.sex
                };
                UserDataService.create(this.user)
                this.userStore.changeUser(this.user)
                if ((await UserDataService.getAll()).status == 200) {
                    let tempUser = await (await UserDataService.getAll()).data.find(currentUser => (currentUser.email == this.userStore.user.email && currentUser.password == this.userStore.user.password))
                    this.user = tempUser
                    this.userStore.changeUser(this.user)
                    localStorage.setItem('user', JSON.stringify(this.user))
                    router.push('/menu')
                } else {
                    console.log('Ошибка регистрации')
                }
            }else{
                this.validState = true
            }
        },
        valueGet(value, type) {
            if (type === 'email') {
                this.email = value
            }
            else if (type === 'password') {
                this.password = value
            }
            else if (type === 'firstName') {
                this.firstName = value
            }
            else if (type === 'age') {
                this.age = value
            }
            else if (type === 'sex') {
                this.sex = value
            }
        },
        handleKeydown(event) {
            if (event.keyCode === 13) {
                if (this.nextStep == true) {
                    this.showNextStep()
                }else{
                    this.saveUser()
                }
            }
        }
    },
    watch: {
        email(newValue, prevValue) {
            if (newValue.length == 0) {
                this.validState = true
            } else {
                this.validState = false
            }
        },
        password(newValue, prevValue) {
            if (newValue.length == 0) {
                this.validState = true
            } else {
                this.validState = false
            }
        },
        firstName(newValue, prevValue) {
            if (newValue.length == 0) {
                this.validState = true
            } else {
                this.validState = false
            }
        }
    },
    emits: ['showLogin']
}

</script>

<template>
    <div :class="['wrapper-text-and-registration-form', { 'wrapper-text-and-registration-form_margin': !nextStep }]">
        <div :class="['text', { 'text-margin': !nextStep }]">
            <h1 class="text__h1 h-main">PlanMenu</h1>
            <h3 class="text__h3 h-1">планировщик меню на неделю,<br>где собраны твои любимые рецепты</h3>
        </div>
        <div class="registration-form">
            <h2 class="registration-form__h2 h-1">Регистрация</h2>
            <div class=" registration-form wrapper-first-step" v-if="nextStep">
                <InputUi @valueGet="valueGet" @auth="showNextStep" type="email" method="showNextStep" :valid="validState"/>
                <InputUi @valueGet="valueGet" @auth="showNextStep" type="password" method="showNextStep" :valid="validState"/>
                <Button class="registration-form__button" text="Продолжить" type="submit" value="Save" @click="showNextStep"
                    method="showNextStep"/>
                <span
                    :class="['span-3', 'registration-form__text-invalid', { 'registration-form__text-invalid_show': validState }]">Данные
                    введены неверно, попробуйте снова</span>
            </div>
            <div class="registration-form wrapper-second-step" v-else>
                <InputUi @valueGet="valueGet" @auth="saveUser" type="text" method="saveUser" :valid="validState"/>
                <InputUi @valueGet="valueGet" @auth="saveUser" type="age" method="saveUser" :valid="validState"/>
                <InputUi @valueGet="valueGet" @auth="saveUser" type="sex" method="saveUser" :valid="validState"/>
                <Button class="registration-form__button" text="Войти" type="submit" value="Save" @click="saveUser" />
                <span
                    :class="['span-3', 'registration-form__text-invalid', { 'registration-form__text-invalid_show': validState }]">Данные
                    введены неверно, попробуйте снова</span>
            </div>
        </div>
    </div>
    <!-- <div class="login-offer">
                        <h3 class="login-offer__h3">Вернуться к авторизации</h3>
                        <Button class="login-offer__button" @click="showLogin" text="Авторизация"></Button>
                    </div> -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;

}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    position: absolute;
}

.wrapper-text-and-registration-form {
    display: flex;
    gap: 47px;
    margin-top: 199px;
    height: 334px;

    &_margin {
        margin-top: 149px;
    }
}

.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    width: 517px;

    &-margin {
        margin-top: 50px;
    }

    &__h1 {
        color: var(--Orange);
    }

    &__h3 {
        color: var(--Black);
    }
}

.registration-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &__h2 {
        color: var(--Orange);
    }

    &__text-invalid {
        display: none;
        color: #D02500;
        &_show{
            display: block;
        }
    }
}
</style>