<script setup>
import {ref} from 'vue';
import RecipeCardProperties from "@/components/Recipe-cardProperties.vue"

const properties = ref([
        {
            text: '500Ккал',
            src: '/svg/icon-apple.svg',
            alt: 'картинка яблока'
        },
        {
            text: '15 мин',
            src: '/svg/icon-time.svg',
            alt: 'картинка часов'
        },
        {
            text: 'Сложность низкая',
            src: '/svg/icon-dish.svg',
            alt: 'картинка миски'
        }
    ]);
</script>

<template>
    <div class="wrapper-recipe">
        <div class="wrapper-recipe__information">
            <h3 class="wrapper-recipe__information_h3">Название блюда</h3>
            <p class="wrapper-recipe__information_p">Ингридиент1, ингридиент2 и т.д.</p>
            <div class="wrapper-recipe__information_wrapper-properties">
                <RecipeCardProperties
                v-for="item of properties"
                :text="item.text"
                :src="item.src"
                :alt="item.alt"></RecipeCardProperties>
            </div>
        </div>
        <div class="wrapper-recipe__img">
            <img class="wrapper-recipe__img_img-background" src="/img/img-recipe-card.png" alt="фотография блюда">
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
        &_h3{
            margin: 0;
            font-weight: 400;
            font-size: 27px;
            line-height: 32px;
            color: #000000;
        }
        &_p{
            margin: 38px 0 0;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #000000;
        }
        &_wrapper-properties{
            display: flex;
            margin-top: 68px;
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
        }
        &_img-button{
            position: absolute;
            padding: 8px;
            cursor: pointer;

        }
    }
}
</style>