<script setup>
    import ButtonUi from '@/components/ui-kit/Button-ui.vue';
</script>

<template>
    <div class="search-ingridients-wrapper">
        <input type="text" class="search-ingridients-wrapper__input" placeholder="Введите название рецепта">
        <ButtonUi class="search-ingridients-wrapper__margin-button"></ButtonUi>
        <div class="search-ingridients-wrapper__icon-wrapper">
            <img class="search-ingridients-wrapper__icon-wrapper_item" src="/svg/icon-filters.svg" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-ingridients-wrapper{
    display: flex;
    align-items: center;
    &__input{
        width: 665px;
        border: 1px solid #EEEEEE;
        background-color: #EEEEEE;
        border-radius: 6px;
        line-height: 21px;
        font-size: 18px;
        padding: 17px 32px;
        &::placeholder{
            color: #00000026;
        }
        &:focus{
            outline: none;
            border: 1px solid #000000;
            background-color: transparent;
            color: #000000D9;
        }
    }
    &__margin-button{
        margin-left: -10px;
    }
    &__icon-wrapper{
        margin-left: 13px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
}
</style>