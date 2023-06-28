<script>
import Button from '@/components/ui-kit/Button-ui.vue'
import InputEmail from '@/components/ui-kit/Input-email.vue';
import InputPassword from '@/components/ui-kit/Input-password.vue'
import UserDataService from '@/services/UserDataService'
import { isValidPassword } from '@/services/validators/passwordValidator.js'
import InputUi from '@/components/ui-kit/Input-ui.vue';
import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'
import InputName from '@/components/ui-kit/Input-name.vue';
import InputDate from '@/components/ui-kit/Input-date.vue';
import InputRadio from '@/components/ui-kit/Input-radio.vue';
import PasswordValidator from '@/components/PasswordValidation.vue';

export default {
    data() {
        return {
            id: null,
            email: '',
            password: '',
            first_name: '',
            date_of_birth: '',
            sex: '',
            validation: false,
            nextStep: true,
            user: null,
            format: 'yyyy-MM-dd',
            validPassword: false
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
        InputUi,
        InputEmail,
        InputPassword,
        InputName,
        InputDate,
        InputRadio,
        PasswordValidator
    },
    methods: {
        previousStep() {
            if (!this.nextStep) {
                this.nextStep = !this.nextStep
            } else {
                this.$emit('showLogin');
            }
        },
        updateEmail(email) {
            this.email = email
        },
        updatePassword(password) {
            this.password = password
        },
        updateName(name) {
            this.first_name = name
        },
        updateDateOfBirth(date) {
            this.date_of_birth = date
        },
        updateSex(sex) {
            this.sex = sex
        },
        showNextStep() {
            if (this.nextStep == true) {
                if (this.email.length == 0 || !this.validPassword ) {
                    this.validation = true
                } else {
                    this.nextStep = false
                }
            }
        },
        async saveUser() {
            if (this.email.length != 0 && this.password.length != 0 && this.first_name.length != 0 && this.date_of_birth.length != 0) {
                this.user = {
                    email: this.email,
                    password: this.password,
                    first_name: this.first_name,
                    date_of_birth: this.date_of_birth,
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
            } else {
                this.validation = true
            }
        },
        handleKeydown(event) {
            if (event.keyCode === 13) {
                if (this.nextStep == true) {
                    this.showNextStep()
                } else {
                    this.saveUser()
                }
            }
        }
    },
    watch: {
        email(newValue, prevValue) {
            if (newValue.length == 0) {
                this.validation = true
            } else {
                this.validation = false
            }
        },
        password(newValue, prevValue) {
            if (newValue.length == 0) {
                this.validation = true
            } else {
                this.validation = false
            }
        },
        first_name(newValue, prevValue) {
            if (newValue.length == 0) {
                this.validation = true
            } else {
                this.validation = false
            }
        },
    },
    emits: ['showLogin'],
    computed: {
        validationOptionsPassword() {
            if (isValidPassword(this.password).find(option => option.status == true)) {
                this.validPassword = false
            } else {
                this.validPassword = true
            }
            return isValidPassword(this.password)
        }
    }
}

</script>

<template>
    <div :class="['wrapper-text-and-registration-form', { 'wrapper-text-and-registration-form_margin': !nextStep }]">
        <div :class="['text', { 'text-margin': !nextStep }]">
            <h1 class="text__h1 h-main">PlanMenu</h1>
            <h3 class="text__h3 h-1">планировщик меню на неделю,<br>где собраны твои любимые рецепты</h3>
        </div>
        <div class="registration-form">
            <button class="btn-back" @click="previousStep"><img src="/svg/icon-arrow-back.svg" alt="Назад"></button>
            <h2 class="registration-form__h2 h-1">Регистрация</h2>
            <div class=" registration-form wrapper-first-step" v-if="nextStep">
                <InputEmail :value="email" @updateEmail="updateEmail" :invalid="validation" class="wrapper" />
                <InputPassword :value="password" @updatePassword="updatePassword" :invalid="validation && validPassword"
                    class="wrapper" />
                <PasswordValidator :passwordOptions="validationOptionsPassword"/>
                <Button class="registration-form__button" text="Продолжить" type="submit" value="Save" @click="showNextStep"
                    method="showNextStep" />
                <span
                    :class="['span-3', 'registration-form__text-invalid', { 'registration-form__text-invalid_show': validation }]">Данные
                    введены неверно, попробуйте снова</span>
            </div>
            <div class="registration-form wrapper-second-step" v-else>

                <InputName :value="first_name" @updateName="updateName" :invalid="validation" class="wrapper" />
                <InputDate :value="date_of_birth" @updateDateOfBirth="updateDateOfBirth" class="wrapper" />
                <InputRadio :value="sex" @updateSex="updateSex" class="wrapper" />

                <Button class="registration-form__button" text="Войти" type="submit" value="Save" @click="saveUser" />
                <span
                    :class="['span-3', 'registration-form__text-invalid', { 'registration-form__text-invalid_show': validation }]">Данные
                    введены неверно, попробуйте снова</span>
            </div>
        </div>
    </div>
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
    position: relative;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 334px;

    .btn-back {
        position: absolute;
        left: 0;
        top: 5px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    &__h2 {
        color: var(--Orange);
    }

    .wrapper {
        width: 100%;
    }

    &__text-invalid {
        display: none;
        color: #D02500;

        &_show {
            display: block;
        }
    }
}


@media screen and (max-width: 750px) {
    .wrapper-text-and-registration-form {
        margin-top: 17px;
        justify-content: center;

        .text {
            display: none;
        }

        .registration-form {
            width: 100%;
            max-width: 500px;

            .wrapper {
                justify-content: center;
            }
        }
    }
}
</style>