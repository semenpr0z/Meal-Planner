<script>

export default {
    data() {
        return {
            email: this.value
        }
    },
    props: {
        invalid: {
            required: false
        },
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateEmail() {
            this.$emit('updateEmail', this.email);
        }
    },
}
</script>

<template>
    <div class="input-form">
        <span class="span-2 input-name">E-mail</span>
        <input :class="['input', 'span-3', { 'input-invalid': invalid }]" @input="updateEmail" type="email"
            placeholder="example@example.com" name="email" v-model="email">
        <span class="input-span span-3">Поле заполнено неверно, попробуйте снова</span>
    </div>
</template>

<style lang='scss' scoped>
.input {
    background-color: var(--White);
    border: 2px solid var(--Text_gray);
    border-radius: 30px;
    padding: 16px 24px;
    transition: 0.3s;
    width: calc(100% - 52px);

    &-form {
        display: flex;
        flex-direction: column;
    }

    &:placeholder-shown {
        color: var(--Gray);
    }

    &-span {
        color: #D02500;
        display: none;
        margin-top: 8px;
        padding-left: 24px;
    }

    &-name {
        padding: 0 0 8px 32px;
        height: 24px;
        display: flex;
        align-items: center;
        color: var(--Text_gray);
    }

    &-invalid {
        border: 2px solid #D02500;
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
</style>