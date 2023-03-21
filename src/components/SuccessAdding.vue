<script>
export default {
    data() {
        return{

        }
    },
    methods: {
        closeSuccess(){
            this.$emit('closeSuccess')
        }
    },
    emits: ['closeSuccess']
}
</script>

<template>
    <div class="success-adding">
        <button class="success-adding__btn" @click="closeSuccess" title="Вернуться к календарю"><img src="/svg/icon-close.svg" alt="Вернуться к календарю"></button>
        <div class="success-adding__img-and-text">
            <img src="/svg/icon-success-adding.svg" alt="Блюдо добавлено" class="success-adding__img-and-text__img">
            <p class="p-1">Блюдо добавлено в меню!</p>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.success-adding{
    display: grid;
    padding: 16px;
    gap: 18px;
    &__btn{
        justify-self: flex-end;
        width: 24px;
        height: 24px;
        border: none;
        background-color: transparent;
        &:hover{
            cursor: pointer;
        }
    }
    &__img-and-text{
        justify-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        &__img{
            width: 148px;
            height: 148px;
        }
    }
}
</style>