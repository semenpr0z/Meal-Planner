<script>
export default {
    data() {
        return {

        }
    },
    props: {
        meal: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div class="meal" v-if="!meal.availability">
        <button class="meal__btn">
            <img src="/svg/icon-add.svg" alt="Добавить">
        </button>
        <p class="p-1">{{ meal.name }}</p>
    </div>
    <div class="wrapper-meal-and-recipe" v-if="meal.availability">
        <div class="meal">
            <button class="meal__btn">
                <img src="/svg/icon-remove.svg" alt="Удалить">
            </button>
            <p class="p-1">{{ meal.name }}</p>
        </div>
        <div class="recipe">
            <p class="p-1 recipe__name">{{ meal.recipe }}</p>
            <span class="span-1">{{ meal.amount }}</span>
            <span class="span-2">{{ meal.calorific }}</span>
            <button class="meal__btn"><img src="/svg/icon-delete.svg" alt="Удалить"></button>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.meal {
    display: flex;
    align-items: center;
    gap: 12px;

    &__btn {
        background-color: transparent;
        border: none;
        width: 24px;
        height: 24px;

        &:hover {
            cursor: pointer;
        }
    }
}

.recipe{
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: var(--Light_orange_2);
    border-radius: 30px;
    gap: 12px;
    justify-content: space-between;
    &__name{
        width: 256px;
    }
}
.wrapper-meal-and-recipe{
    display: flex;
    flex-direction: column;
    gap: 16px;
}


</style>