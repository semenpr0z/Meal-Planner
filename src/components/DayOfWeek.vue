<script>
import Meal from '@/components/Meal.vue';


import { useUserStore } from '@/stores/UserStore';
import { useRecipesStore } from '@/stores/RecipesStore.js'

export default {
    data() {

        return {
            meals: [
                {
                    'name': 'Завтрак',
                    'availability': false,
                    'mealsId': 1
                },
                {
                    'name': 'Перекус',
                    'availability': false,
                    'mealsId': 2
                },
                {
                    'name': 'Обед',
                    'availability': false,
                    'mealsId': 3
                },
                {
                    'name': 'Полдник',
                    'availability': false,
                    'mealsId': 4
                },
                {
                    'name': 'Ужин',
                    'availability': false,
                    'mealsId': 5
                }
            ],
            mappedMeals: [],
            hiddenDay: false
        }
    },
    setup() {
        const userStore = useUserStore();
        const recipesStore = useRecipesStore();
        return {
            userStore,
            recipesStore
        }
    },
    components: {
        Meal
    },
    props: {
        day: {
            type: Object,
            default: {
                "day": new Date(),
                "meals": []
            }
        }
    },
    methods: {
        capitalizeFirstLetter(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        showOrders() {
        },
        updateMeals() {
            this.mappedMeals = this.meals.map(meal => {
                let exportMeal = null
                const currentMeals = this.day.meals
                if (currentMeals.length) {
                    let mealsArr = []
                    for (let i = 0; i < currentMeals.length; i++) {
                        let meals = currentMeals.filter(currentMeal => currentMeal.mealsId == meal.mealsId)
                        if (currentMeals[i].mealsId == meal.mealsId) {
                            let recipe = this.recipesStore.recipes.find(recipe => recipe.id === currentMeals[i].dishesId)
                            mealsArr.push(
                                {
                                    'dishesId': currentMeals[i].dishesId,
                                    'id': currentMeals[i].id,
                                    'recipe': recipe.name,
                                    'calorific': recipe.properties.calorific
                                }
                            )
                            exportMeal = {
                                'name': meal.name,
                                'availability': true,
                                'mealsId': meal.mealsId,
                                'meals': mealsArr
                            }
                            if (meals.length == mealsArr.length) {
                                break
                            }
                        } else {
                            exportMeal = meal
                        }
                    }
                } else {
                    exportMeal = meal
                }
                return exportMeal
            }
            )
        },
        showModalRecipeCard(id) {
            this.$emit('showModalRecipeCard', id)
        },
        deleteMeal(mealId) {
            this.$emit('deleteMeal', mealId)
        }
    },
    beforeUpdate() {
        this.updateMeals()
    },
    emits: ['showModalRecipeCard', 'deleteMeal']
}
</script>

<template>
    <div class="day">
        <div class="day__text">

            <h2 class="h-2 day-h2 day__text__h2">{{ capitalizeFirstLetter(new Intl.DateTimeFormat("ru", {
                weekday: "long"
            }).format(day.day)) }}</h2>
        </div>
        <Meal v-for="meal in mappedMeals" :meal="meal" @deleteMeal="deleteMeal" />
    </div>
</template>

<style lang="scss" scoped>
.day {
    border: 3px solid var(--Gray);
    border-radius: 50px;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;

    &-h2 {
        text-align: center;
    }


    &__text {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            cursor: pointer;
        }

        &__btn {
            width: 24px;
            height: 24px;
            position: absolute;
            left: 0%;
            border: none;
            background-color: transparent;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>