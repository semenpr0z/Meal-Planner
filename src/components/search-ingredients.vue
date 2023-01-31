<script setup>

</script>

<template>
    <div class="search-ingridients-wrapper">
        <div></div>
        <div class="search-ingridients-wrapper__input">
            <label for="input">Введите названия ингридиентов по одному</label>
            <input type="text">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-ingridients-wrapper{
    width: 834px;
    height: 208px;
    border: 2px dashed #9747FF;
    border-radius: 5px;
    &__input{
        display: flex;
        flex-direction: column  ;
    }
}
</style>