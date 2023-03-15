<script>

export default {
    data() {
        return {
            firstName: '',
            email: '',
            password: '',
            age: '',
            sex: ''
        };
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
            required: true
        }
    },
    methods: {
        valueGet(value, type) {
            this.$emit('valueGet', value, type);
        },
        auth() {
            this.$emit('auth');
        },
        saveUser(){
            this.$emit('saveUser');
        },
        showNextStep(){
            this.$emit('showNextStep');
        },
        determinate(){
            if(this.method === 'auth'){
                this.auth()
            }else if(this.method === 'saveUser'){
                this.saveUser()
            }else if(this.method === 'showNextStep'){
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
        <input class="input h-2" type="text" placeholder="Имя" name="text" v-model="firstName" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>

    <div class="input-form" v-else-if="type == 'email'">
        <input class="input h-2" type="email" placeholder="Электронная почта" name="email" v-model="email" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>

    <div class="input-form" v-else-if="type == 'password'">
        <input class="input h-2" type="password" placeholder="Пароль" name="password" v-model="password" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>

    <div class="input-form" v-else-if="type == 'age'">
        <input class="input h-2" type="number" min="1" max="100" placeholder="Возраст" name="age" v-model="age" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>
    <div class="input-form" v-else-if="type == 'sex'">
        <select class="input h-2 input-select" v-model="sex" @keydown.enter="determinate">
            <option value="" disabled selected>Пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.input{
    background-color: var(--Light_orange);
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 18px 32px;
    transition: 0.3s;
    width: 357px;
    -webkit-appearance: none;
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {                //для браузеров поддерживающих webkit
            -webkit-appearance: none;
        }
        &[type='number'] {                                                          // для Firefox
            -moz-appearance: textfield;
        }
        &-form{
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        &-span{
            color: #D02500;
            display: none;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
        }
        &-select{
            width: 423px;
            &:selected{
                color: var(--Text_gray);
            }
            option{
                background-color: var(--Light_orange);
                transition: 0.3s;
            }
        }
        &::placeholder {
            color: var(--Text_gray);
        }
        &:focus {
            outline: none;
            border: 1px solid var(--Light_orange);
            background-color: transparent;
            color: #000000D9;
        }
        &:invalid{
            border: 1px solid #D02500;
        }
        &:invalid:not(:placeholder-shown) + &-span {
            display: block;
        }
}
</style>