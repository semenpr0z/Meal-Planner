<script>

export default {
    data() {
        return {
            text: '',
            email: '',
            password: ''
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

        },
        determinate(){
            if(this.method === 'auth'){
                alert('ok')
                this.auth()
            }else{
                this.saveUser()
            }
        }
    },
    watch: {
        text() {
            this.valueGet(this.text, 'text')
        },
        email() {
            this.valueGet(this.email, 'email')
        },
        password() {
            this.valueGet(this.password, 'password')
        }
    }
}

</script>

<template>
    <input class="input"  type="text" :placeholder="placeholder" name="text" v-model="text"
    v-if="type == 'text'">
    <div class="input-form" v-else-if="type == 'email'">
        <input class="input" type="email" placeholder="Электронная почта" name="email" v-model="email" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>
    <div class="input-form" v-else-if="type == 'password'">
        <input class="input" type="password" placeholder="Пароль" name="password" v-model="password" @keydown.enter="determinate">
        <span class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>
</template>

<style lang="scss" scoped>
.input{
    background-color: #FFDCB3;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 18px 32px;
    transition: 0.3s;
    width: 357px;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
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
        &::placeholder {
            color: #8D8D8C;
        }
        &:focus {
            outline: none;
            border: 1px solid #FFDCB3;
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