<script>
import { useUserStore } from '@/stores/UserStore.js'

export default {
    data() {
        return {
            firstName: '',
            email: '',
            password: '',
            age: 'Дата рождения',
            sex: ''
        };
    },
    setup(){
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    props: {
        type: {
            type: String,
            default: 'text'
        },
        valid: {
            type: Boolean,
            default: false
        },
        method: {
            type: String,
            required: false
        }
    },
    methods: {
        valueGet(value, type) {
            this.$emit('valueGet', value, type);
        },
        auth() {
            this.$emit('auth');
        },
        saveUser() {
            this.$emit('saveUser');
        },
        showNextStep() {
            this.$emit('showNextStep');
        },
        determinate() {
            if (this.method === 'auth') {
                this.auth()
            } else if (this.method === 'saveUser') {
                this.saveUser()
            } else if (this.method === 'showNextStep') {
                this.showNextStep()
            }
        }
    },
    watch: {
        firstName() {
            this.valueGet(this.firstName, 'firstName')
        },
        email() {
            this.valueGet(this.email, 'email')
        },
        password() {
            this.valueGet(this.password, 'password')
        },
        age() {
            this.valueGet(this.age, 'age')
        },
        sex() {
            this.valueGet(this.sex, 'sex')
        }
    }
}

</script>

<template>
    <div class="input-form" v-if="type == 'text'">
        <span class="span-3 input-name">Имя</span>
        <input :class="['input', 'h-2', { 'invalid': valid }]" type="text" placeholder="Например: Аркадий" name="text" v-model="firstName"
            @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>

    <div class="input-form" v-else-if="type == 'email'">
        <span class="span-3 input-name">E-mail</span>
        <input :class="['input', 'h-2', { 'invalid': valid }]" type="email" placeholder="example@example.com" name="email"
            v-model="email" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>

    <div class="input-form" v-else-if="type == 'password'">
        <span class="span-3 input-name">Пароль</span>
        <input :class="['input', 'h-2', { 'invalid': valid }]" type="password" placeholder="Введите пароль" name="password"
            v-model="password" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>

    <div class="input-form" v-else-if="type == 'age'">
        <span class="span-3 input-name">Дата рождения</span>
        <input :class="['input', 'h-2', { 'invalid': valid }, 'input-date']" type="date" name="age"
            v-model="age" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>
    <div class="input-form input-form-radio" v-else-if="type == 'sex'">
        <p class="p-2 input-name input-name-radio">Пол</p>
        <!-- <label class="input-label">
            <input class="input-label-radio" type="radio" name="sex" value="" v-model="sex">
            <p class="p-2">Не выбрано</p>
        </label> -->
        <label class="input-label">
            <input class="input-label-radio" type="radio" name="sex" value="male" v-model="sex">
            <p class="p-2">Мужской</p>
        </label>
        <label class="input-label">
            <input class="input-label-radio" type="radio" name="sex" value="female" v-model="sex">
            <p class="p-2">Женский</p>
        </label>
    </div>
</template>

<style lang="scss" scoped>
.input {
    background-color: var(--White);
    border: 2px solid var(--Gray);
    border-radius: 30px;
    padding: 18px 32px;
    transition: 0.3s;
    width: 357px;
    -webkit-appearance: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        //для браузеров поддерживающих webkit
        -webkit-appearance: none;
    }

    &[type='number'] {
        // для Firefox
        -moz-appearance: textfield;
    }

    &-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        &-radio{
            flex-direction: row;
            gap: 23px;
        }
    }
    
    &-date{
        color: var(--Text_gray);
    }

    &-span {
        color: #D02500;
        display: none;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
    }

    &-name{
        padding-left: 32px;
        height: 21px;
        display: flex;
        align-items: center;
        color: var(--Text_gray);
        &-radio{
            padding-right: 30px;
        }
    }

    &-select {
        width: 423px;

        &:selected {
            color: var(--Text_gray);
        }

        option {
            background-color: var(--Light_orange);
            transition: 0.3s;
        }
    }

    &-label {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;

        &-radio {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            position: relative;
            width: 21px;
            height: 21px;
            outline: none;
            transition: 0.3s ease-in-out;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--Gray);
            box-shadow: inset 0 0 0 4px var(--White);
            background-color: var(--White);
            &:hover {
                background-color: var(--Gray);
                border: 2px solid var(--Gray);

            }

            &:checked{
                background-color: var(--Orange);
                border: 2px solid var(--Orange);
            }

        }
    }

    &::placeholder {
        color: var(--Text_gray);
    }

    &:focus {
        outline: none;
        border: 2px solid var(--Light_orange);
        color: #000000D9;
    }

    &:invalid {
        border: 2px solid #D02500;
    }

    &:invalid:not(:placeholder-shown)+&-span {
        display: block;
    }
}

.invalid {
    border: 2px solid #D02500;
}
</style>