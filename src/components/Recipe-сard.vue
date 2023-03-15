<script>
import RecipeCardProperties from "@/components/Recipe-cardProperties.vue"

export default {
  data() {
    return {
        ingredients: `${this.item.ingredients[0].name}, ${this.item.ingredients[1].name.toLowerCase()}`
    };
  },
  components: {
    RecipeCardProperties
  },
  props: {
    item: {
        type: Object,
        required: true,
        default: {}
    },
    short: {
        type: Boolean,
        default: false
    }
  },
  methods: {
    showModalRecipeCard() {
        this.$emit('showModalRecipeCard', this.item.id)
    },
    showAddToMenu(){
        this.$emit('showAddToMenu', this.item.id)
    }
  },
  emits: ['showModalRecipeCard', 'showAddToMenu']
};
</script>

<template>
    <div class="wrapper-recipe-wrapper">
        <div :class="['wrapper-recipe', {'short-recipe' : short == true} ]">
            <div class="wrapper-recipe__information" @click="showModalRecipeCard">
                <h3 class="wrapper-recipe__information_h3 p-1">{{ item.name }}</h3>
                <p class="wrapper-recipe__information_p p-2">{{ ingredients.length > 21 ? ingredients.slice(0, 21) + "..." :  ingredients}}</p>
                <div class="wrapper-recipe__information_wrapper-properties">
                    <RecipeCardProperties
                    :calorific="item.properties.calorific"
                    :time="item.properties.time"
                    :complexity="item.properties.complexity"
                    ></RecipeCardProperties>
                </div>
            </div>
        </div>
        <img class="wrapper-recipe__img" :src="item.image" alt="фотография блюда">
        <button class="wrapper-recipe__add-to-menu" @click="showAddToMenu"><img src="/svg/icon-add-to-menu-btn.svg" alt="Добавить"></button>
    </div>
</template>

<style lang="scss" scoped>
.wrapper-recipe{
    display: flex;
    justify-content: space-between;
    width: 465px;
    height: 175px;
    background-color: transparent;
    border: 3px solid var(--Gray);
    border-radius: 40px;
    &-wrapper{
        display: flex;
    }
    &__information{
        padding: 16px 24px;
        width: 346px;
        display: flex;
        flex-direction: column;
        &:hover{
                cursor: pointer;
            }
        &_h3{
            margin: 0;
            color: var(--Black);
            width: 252px;
            padding-right: 18px;
        }
        &_p{
            margin: 0;
            margin-top: 4px;
            color: var(--Black);
        }
        &_wrapper-properties{
            display: flex;
            flex-direction: column;
            margin: 0;
            gap: 8px;
            margin-top: 12px;
        }
    }
    &__img{
        width: 175px;
        height: 181px;
        object-fit: cover;
        object-position: 30% 50%;
        border-radius: 40px;
        margin-left: -175px;
    }
    &__add-to-menu{
        background-color: var(--Light_orange_2);
        border: 2px solid var(--Orange);
        border-radius: 40px;
        padding: 71px 16px;
        margin-left: 12px;
        transition: 0.5s;
        &:hover{
            cursor: pointer;
            background-color: transparent;
        }
        &:active{
            background: var(--Light_orange);
            border: 2px solid transparent;
        }
    }
}

.short-recipe{
    width: 445px;
}
</style>