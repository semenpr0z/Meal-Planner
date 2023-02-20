<script>
import RecipeCardProperties from "@/components/Recipe-cardProperties.vue"

export default {
  data() {
    return {

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
    }
  },
  methods: {
    showModalRecipeCard() {
        this.$emit('showModalRecipeCard', this.item.id)
    }
  }
};
</script>

<template>
    <div class="wrapper-recipe">
        <div class="wrapper-recipe__information" @click="showModalRecipeCard">
            <h3 class="wrapper-recipe__information_h3">{{ item.name }}</h3>
            <p class="wrapper-recipe__information_p">{{ item.ingridients[0].name }}, {{ item.ingridients[1].name.toLowerCase() }} и т.д.</p>
            <div class="wrapper-recipe__information_wrapper-properties">
                <RecipeCardProperties
                :calorific="item.properties.calorific"
                :time="item.properties.time"
                :complexity="item.properties.complexity"
                ></RecipeCardProperties>
            </div>
        </div>
        <div class="wrapper-recipe__img">
            <img class="wrapper-recipe__img_img-background" :src="item.image" alt="фотография блюда">
            <img class="wrapper-recipe__img_img-button" src="/svg/icon-add-recipe-button.svg" alt="добавить">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper-recipe{
    display: flex;
    justify-content: space-between;
    width: 548px;
    height: 226px;
    background-color: #D9D9D9;
    border-radius: 6px;
    &__information{
        padding: 21px 14px;
        width: 346px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:hover{
                cursor: pointer;
            }
        &_h3{
            margin: 0;
            font-weight: 400;
            font-size: 27px;
            line-height: 32px;
            color: #000000;
            height: 64px;
        }
        &_p{
            margin: 0;
            height: 42px;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #000000;
        }
        &_wrapper-properties{
            display: flex;
            margin: 0;
            gap: 28px;
        }
    }
    &__img{
        position: relative;
        display: flex;
        justify-content: flex-end;
        width: 174px;
        &_img-background{
            position: absolute;
            width: 174px;
            height: 100%;
            object-fit: cover;
            object-position: 30% 50%;
            border-radius: 0 6px 6px 0;
        }
        &_img-button{
            position: absolute;
            padding: 8px;
            cursor: pointer;

        }
    }
}
</style>