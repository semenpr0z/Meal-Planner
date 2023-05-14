<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import addToMenu from '@/components/addToMenu.vue'
import { useRecipesStore } from '@/stores/RecipesStore.js'
import { useUserStore } from '@/stores/UserStore.js'
import OrderDataService from '@/services/OrderDataService.js'
import router from '@/router.js'

export default {
    data() {
        return {
            item: {
                "name": "",
                "image": "",
                "ingredients": [],
                "properties": {
                    "calorific": "",
                    "time": "",
                    "complexity": "",
                    "protein": "",
                    "fats": "",
                    "carbohydrates": ""
                },
                "recipe": [],
                "id": ""
            },
            isAddToMenuVisible: false,
        };
    },
    setup() {
        const recipesStore = useRecipesStore();
        const userStore = useUserStore();
        return {
            recipesStore,
            userStore
        }
    },
    components: {
        Navbar,
        NavbarFooterMobile,
        addToMenu
    },
    methods: {
        returnPreviousPage() {
            router.push('/recipes')
        },
        findItem(id) {
            this.item = this.recipesStore.recipes.find(item => item.id === id)
        },
        showAddToMenu(id) {
            this.isAddToMenuVisible = true
            document.body.style.overflowY = 'hidden';
        },
        async closeAddToMenu() {
            if (this.userStore.user) {
                let orders = await OrderDataService.getAll()
                this.userStore.userOrders = orders.data.filter(order => { if (order.userId === this.userStore.user.id) { return true; } else { return false; } })
            }
            this.isAddToMenuVisible = false;
            document.body.style.removeProperty("overflow-y")
        },
    },
    created() {
        if (this.recipesStore.recipes.length) {
            this.findItem(this.$route.params.id)
        };
        this.recipesStore.$subscribe(store => {
            this.findItem(this.$route.params.id)
        })
    }
};
</script>

<template>
    <addToMenu v-if="isAddToMenuVisible" :item="item" @closeAddToMenu="closeAddToMenu" />
    <Navbar></Navbar>
    <main class="main">
        <div class="modal-recipe-card-history">
            <span class="span-2 span_inactive" @click="returnPreviousPage">Рецепты</span>
            <img src="/svg/icon-arrow-history.svg" alt="">
            <span class="span-2 span_active">{{ item.name }}</span>
        </div>
        <div class="modal-recipe-card-top">
            <h3 class="modal-recipe-card-top__h3 h-1">{{ item.name }}</h3>
            <button class="modal-recipe-card-top__btn" @click="showAddToMenu">Добавить в меню</button>
        </div>
        <div class="modal-recipe-card-middle">
            <div class="modal-recipe-card-middle__information">
                <img class="modal-recipe-card-middle__information__image" :src="item.image" alt="Изображение блюда">
                <div class="modal-recipe-card-middle__information__text">
                    <div class="modal-recipe-card-middle__information__text_wrapper">
                        <div class="modal-recipe-card-middle__information__text__item modal-recipe-card-middle__information__text__item_top">
                            <img src="/svg/icon-time.svg" alt="Время приготовления" class="properties-item__img">
                            <span class="modal-recipe-card-middle__information__text__item__span p-1">{{
                                item.properties.time
                            }}</span>
                        </div>
                        <div class="modal-recipe-card-middle__information__text__item modal-recipe-card-middle__information__text__item_top">
                            <img src="/svg/icon-dish.svg" alt="Сложность приготовления" class="properties-item__img">
                            <span class="modal-recipe-card-middle__information__text__item__span p-1">Сложность {{
                                item.properties.complexity }}</span>
                        </div>
                    </div>
                    <div class="modal-recipe-card-middle__information__text__line"></div>
                    <div class="modal-recipe-card-middle__information__text_wrapper">
                        <p class="p-1">В расчете на 100 г</p>
                        <div class="modal-recipe-card-middle__information__text__item">
                            <span class="p-1 name">Ккал</span>
                            <span class="modal-recipe-card-middle__information__text__item__span p-1">{{
                                item.properties.calorific.split(' ')[0]
                            }}</span>
                        </div>
                        <div class="modal-recipe-card-middle__information__text__item">
                            <span class="p-1 name">Белки</span>
                            <span class="modal-recipe-card-middle__information__text__item__span p-1">{{
                                item.properties.protein
                            }}</span>
                        </div>
                        <div class="modal-recipe-card-middle__information__text__item">
                            <span class="p-1 name">Жиры</span>
                            <span class="modal-recipe-card-middle__information__text__item__span p-1">{{
                                item.properties.fats
                            }}</span>
                        </div>
                        <div class="modal-recipe-card-middle__information__text__item">
                            <span class="p-1 name">Углеводы</span>
                            <span class="modal-recipe-card-middle__information__text__item__span p-1">{{
                                item.properties.carbohydrates
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-recipe-card-middle__information modal-recipe-card-middle__information_right">
                <span class="modal-recipe-card-middle__information__text__item__span h-2">Ингридиенты на 4 порции:</span>
                <ol class="modal-recipe-card-middle__information__text__ingredients-wrapper">
                    <li class="modal-recipe-card-middle__information__text__item__span p-1"
                        v-for="item in item.ingredients">-
                        {{ item.name }} - {{ item.amount }}</li>
                </ol>
            </div>
        </div>
        <div class="modal-recipe-card-bottom">
            <span class="modal-recipe-card-middle__information__text__item__span h-2">Рецепт:</span>
            <ol class="modal-recipe-card-bottom__to-do-list">
                <li class="modal-recipe-card-bottom__to-do-list__li" v-for="item in item.recipe">
                    <span class="modal-recipe-card-bottom__to-do-list__li_weight-text p-1">Шаг {{ item.id }}:</span>
                    <span class="modal-recipe-card-bottom__to-do-list__li_text p-2"> {{ item.text }}</span>
                </li>
            </ol>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.background-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(148, 148, 148, 0.50);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

body .background-modal {
    overflow-y: hidden;
    height: 100vh;
}

.modal-recipe-card-history {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 17px;

    .span_inactive {
        color: var(--Text_gray);
        cursor: pointer;
    }

    .span_active {
        color: var(--Orange);
    }
}


.modal-recipe-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 24px;

    &__h3 {
        margin: 0;
    }

    &__btn {
        color: var(--Orange);
        padding: 13px 39px;
        background-color: var(--Light_orange_2);
        outline: none;
        border: 2px solid var(--Orange);
        border-radius: 30px;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        transition: 0.5s;

        &:hover {
            cursor: pointer;
            background-color: transparent;
        }
    }
}

.modal-recipe-card-middle {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    gap: 10px;
    width: 100%;

    &__information {
        width: 544px;
        height: 294px;
        background-color: transparent;
        display: flex;
        gap: 32px;
        border-radius: 40px;
        border: 3px solid var(--Gray);

        &_right {
            flex-direction: column;
            justify-content: flex-start;
            width: 480px;
            height: 226px;
            max-height: 300px;
            gap: 16px;
            padding: 24px 32px 44px;
        }

        &__image {
            width: 259px;
            height: 300px;
            object-fit: cover;
            object-position: 30% 50%;
            border-radius: 40px;
            margin-top: -3px;
            margin-left: -3px;
            z-index: 2;
        }

        &__text {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 0 24px;
            width: 243px;
            gap: 13px;

            &_wrapper {
                display: flex;
                flex-direction: column;
                gap: 12px;
                width: 201px;
                p{
                    text-align: center;
                }
            }

            &__line {
                height: 3px;
                width: 100%;
                background-color: var(--Gray);
            }

            &__item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
                &_top{
                    justify-content: flex-start;
                }
                &-wrapper {
                    display: flex;
                    justify-content: space-between;
                }

                &__span {
                    color: var(--Black);
                }

                .name{
                    color: var(--Orange);
                }
            }

            &__btn {
                background-color: transparent;
                border: none;
                padding: 0;
            }

            &__ingredients {
                display: flex;
                flex-direction: column;
                gap: 10px;

                &-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    overflow: auto;
                    padding: 0;
                    list-style: none;
                    margin: 0;
                    height: 192px;
                }
            }
        }
    }
}

.properties-item__img {
    width: 24px;
    height: 24px;
}

.modal-recipe-card-bottom {
    margin: 16px 0;
    background-color: transparent;
    padding: 24px 32px;
    height: auto;
    width: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 40px;
    border: 3px solid var(--Gray);

    &__to-do-list {
        display: flex;
        flex-direction: column;
        gap: 9px;
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: auto;

        &__li {
            display: flex;

            &_weight-text {
                width: 75px;
                color: var(--Black);
            }

            &_text {
                font-weight: 400;
                font-size: 18px;
                line-height: 22px;
                color: var(--Black);
                width: 966px;
            }
        }
    }
}
</style>