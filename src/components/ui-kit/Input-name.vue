<script>
import { useUserStore } from '@/stores/UserStore.js'

export default {
    data() {
        return {
        }
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    }
}
</script>

<template>
    <div class="input-form">
        <span class="span-3 input-name">Имя</span>
        <input :class="['input', 'span-3']" type="text" placeholder="Например: Аркадий" name="text" v-model="userStore.userDataOnChange.first_name">
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
    &-span{
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

    &:invalid:not(:placeholder-shown) + &-span {
        display: block;
    }
}
</style>