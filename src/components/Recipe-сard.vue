<script>
import RecipeCardProperties from "@/components/Recipe-cardProperties.vue"
import ButtonUI from "@/components/ui-kit/Button-ui.vue"
import router from '@/router.js'
import ButtonMiniUi from "./ui-kit/ButtonMini-ui.vue";

export default {
    data() {
        return {
            ingredients: `${this.item.ingredients[0].name}, ${this.item.ingredients[1].name.toLowerCase()}`
        };
    },
    components: {
    RecipeCardProperties,
    ButtonUI,
    ButtonMiniUi
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
        },
        wideCard: {
            type: Boolean,
            default: false
        },
        ultraWideCard: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showModalRecipeCard() {
            router.push({ name: 'Recipe', params: { id: this.item.id } });
        },
        showAddToMenu() {
            this.$emit('showAddToMenu', this.item.id)
        }
    },
    emits: ['showModalRecipeCard', 'showAddToMenu']
};
</script>

<template>
    <div :class="['recipe-card', {'recipe-card_wide' : wideCard}, {'recipe-card_ultra-wide' : ultraWideCard}]">
        <ButtonMiniUi src="svg/icon-add-to-menu-btn.svg" @click="showAddToMenu"/>
        <header class="recipe-card__header" @click="showModalRecipeCard">
            <img :src="item.image" alt="Фотография блюда" class="recipe-card__header__image">
        </header>
        <main class="recipe-card__main" @click="showModalRecipeCard">
            <h3 class="p-1">{{ item.name }}</h3>
            <p class="p-2">{{ ingredients.length > 100 ? ingredients.slice(0, 100) + "..." : ingredients }}</p>
            <div class="recipe-card__main__recipe-properties">
                <RecipeCardProperties :wideProperties="wideCard" :calorific="item.properties.calorific" :time="item.properties.time"
                    :complexity="item.properties.complexity"/>
            </div>
        </main>
        <footer class="recipe-card__footer">
            <ButtonUI text="Добавить в меню" :wideButton="true" @click="showAddToMenu"></ButtonUI>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.recipe-card {
    position: relative;
    width: 356px;
    background-color: var(--Light_orange_3);
    border-radius: 40px;
    
    .btn-mini{
        position: absolute;
        top: 16px;
        right: 16px;
        display: none;
    }

    &_wide{
        width: calc(100% - 32px);
    }

    &_ultra-wide{
        width: 100%;
    }

    &__header {
        height: 195px;
        cursor: pointer;
        &__image {
            border-radius: 40px 40px 0 0;
            width: 100%;
            height: 195px;
            object-fit: cover;
            object-position: 30% 50%;
        }
    }

    &__main {
        border-radius: 0 0 40px 40px;
        padding: 24px 24px 16px;
        

        h3 {
            color: var(--Black);
            height: 42px;
            cursor: pointer;
        }

        p {
            padding-top: 4px;
            height: 44px;
            color: var(--Black);
            cursor: pointer;
        }

        &__recipe-properties {
            cursor: pointer;
            padding-top: 16px;
            display: flex;
            justify-content: space-between;
        }
    }

    &__footer{
        padding: 0px 24px 24px;
    }
}

@media (max-width: 351px) {

    .recipe-card {
        .btn-mini{
            display: block;
        }

        &__footer{
            display: none;
        }
    }
}
</style>