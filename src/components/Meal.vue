<script>
import router from '@/router.js'

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
    },
    methods: {
        showModalRecipeCard(id) {
            router.push({ name: 'Recipe', params: { id: id } });
        },
        deleteMeal(id) {
            this.$emit('deleteMeal', id)
        }
    },
    emits: ['deleteMeal']
}
</script>

<template>
    <div key="meal" class="meal" v-if="!meal.availability">
        <p class="p-1 meal__name">{{ meal.name }}</p>
    </div>

    <div key="meal-2" class="wrapper-meal-and-recipe" v-if="meal.availability">
        <div class="meal">
            <p class="p-1 meal__name">{{ meal.name }}</p>
        </div>
        <div class="recipe" v-for="recipe in meal.meals">
            <p class="p-1 recipe__name" @click="() => { showModalRecipeCard(recipe.dishesId) }">{{ recipe.recipe }}</p>
            <span class="span-1">100 г</span>
            <span class="span-2">{{ recipe.calorific }}</span>
            <button class="meal__btn" @click="() => deleteMeal(recipe.id)"><img src="/svg/icon-delete.svg"
                    alt="Удалить"></button>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.meal {
    display: flex;
    align-items: center;
    gap: 12px;

    &__name {
        padding-left: 16px;
    }

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

.recipe {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: var(--Light_orange_2);
    border-radius: 30px;
    gap: 12px;
    justify-content: space-between;

    &__name {
        width: 256px;

        &:hover {
            cursor: pointer;
        }
    }
}

@media (max-width: 1263px) {
    .recipe {
        &__name{
            width: 190px;
        }
    }
}

@media (max-width: 330px) {
    .recipe{
        gap: 4px;
    }
}

.wrapper-meal-and-recipe {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}</style>