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
    components: {
        Button,
        InputUi
    },
    methods: {
        showLogin() {
            this.$emit('showLogin');
        },
        showNextStep() {
            this.nextStep = false
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
                    router.push('/profile')
                } else {
                    console.log('Ошибка регистрации')
                }
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
        <div class="text">
            <h1 class="text__h1">PlanMenu</h1>
            <h3 class="text__h3">планировщик меню на неделю,<br>где собраны твои любимые рецепты</h3>
        </div>
        <div class="registration-form">
            <h2 class="registration-form__h2">Регистрация</h2>
            <div class=" registration-form wrapper-first-step" v-if="nextStep">
                <InputUi @valueGet="valueGet" @auth="showNextStep" type="email" method="showNextStep" />
                <InputUi @valueGet="valueGet" @auth="showNextStep" type="password" method="showNextStep" />
                <Button class="registration-form__button" text="Продолжить" type="submit" value="Save" @click="showNextStep"
                    method="showNextStep" />
            </div>
            <div class="registration-form wrapper-second-step" v-else>
                <InputUi @valueGet="valueGet" @auth="saveUser" type="text" method="saveUser" />
                <InputUi @valueGet="valueGet" @auth="saveUser" type="age" method="saveUser" />
                <InputUi @valueGet="valueGet" @auth="saveUser" type="sex" method="saveUser" />
                <Button class="registration-form__button" text="Личный кабинет" type="submit" value="Save"
                    @click="saveUser" />
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

    &__h1 {
        font-weight: 500;
        font-size: 60px;
        line-height: 90px;
        color: var(--Orange);
    }

    &__h3 {
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: var(--Black);
    }
}

.registration-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &__h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: var(--Orange);
    }
}</style>