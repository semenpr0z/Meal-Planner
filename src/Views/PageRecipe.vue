<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
import addToMenu from '@/components/addToMenu.vue'
import ButtonMiniUi from '@/components/ui-kit/ButtonMini-ui.vue';
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
        addToMenu,
        ButtonMiniUi
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

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
        <div class="recipe-card-history">
            <span class="span-2 span_inactive" @click="returnPreviousPage">Рецепты</span>
            <img src="/svg/icon-arrow-history.svg" alt="">
            <span class="span-2 span_active">{{ item.name }}</span>
        </div>
        <div class="recipe-card-header">
            <h3 class="recipe-card-header__name h-1">{{ item.name }}</h3>
            <button class="recipe-card-header__btn" @click="showAddToMenu">Добавить в меню</button>
        </div>
        <div class="recipe-card__middle-wrapper">
            <div class="properties border">
                <ButtonMiniUi class="btn-mobile mobile back" src="/svg/icon-back.svg" @click="returnPreviousPage" />
                <ButtonMiniUi class="btn-mobile mobile add" src="/svg/icon-add-to-menu-btn.svg" @click="showAddToMenu" />
                <img class="image" :src="item.image" alt="Изображение блюда">
                <h3 class="mobile mobile__name h-1">{{ item.name }}</h3>
                <div class="wrapper">
                    <div class="time-and-complexity">
                        <div class="time-and-complexity__item">
                            <img src="/svg/icon-time.svg" alt="Время приготовления" class="img">
                            <span class="p-1 black-text">{{ item.properties.time + ' мин' }}</span>
                        </div>
                        <div class="time-and-complexity__item">
                            <img src="/svg/icon-dish.svg" alt="Сложность приготовления" class="img">
                            <span class="p-1 black-text">Сложность {{ item.properties.complexity }}</span>
                        </div>
                    </div>
                    <p class="h-2 black-text mobile">В расчете на 100 г</p>
                    <div class="other-properties">
                        <p class="p-1 black-text text">В расчете на 100 г</p>
                        <div class="wrapper-items">
                            <span class="span-1 name">Ккал</span>
                            <span class="black-text p-1">{{
                                item.properties.calorific.split(' ')[0]
                            }}</span>
                        </div>
                        <div class="wrapper-items">
                            <span class="span-1 name">Белки</span>
                            <span class="black-text p-1">{{
                                item.properties.protein
                            }}</span>
                        </div>
                        <div class="wrapper-items">
                            <span class="span-1 name">Жиры</span>
                            <span class="black-text p-1">{{
                                item.properties.fats
                            }}</span>
                        </div>
                        <div class="wrapper-items">
                            <span class="span-1 name">Углеводы</span>
                            <span class="black-text p-1">{{
                                item.properties.carbohydrates
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ingredients border">
                <span class="black-text h-2 text-header">Ингредиенты на 4 порции:</span>
                <ol class="list-ingredients">
                    <li class="list-item" v-for="item in item.ingredients">
                        <p class="list-item__name p-1">— {{ item.name }}</p>
                        <p class="list-item__amount p-2">{{ item.amount }}</p>
                    </li>
                </ol>
            </div>
        </div>
        <div class="recipe-card__bottom-wrapper">
            <div class="recipe-list border">
                <span class="recipe-list__header black-text h-2">Рецепт:</span>
                <ol class="recipe-list__ol">
                    <li class="recipe-list__item" v-for="item in item.recipe">
                        <span class="step p-1 black-text">Шаг {{ item.id }}:</span>
                        <span class="text-step p-2 black-text"> {{ item.text }}</span>
                    </li>
                </ol>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.mobile {
    display: none;
}

.border {
    border: 3px solid var(--Gray);
    border-radius: 40px;
}

.black-text {
    color: var(--Black);
}

.recipe-card {
    &-history {
        width: 100%;
        height: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 17px;

        .span {
            &_inactive {
                color: var(--Text_gray);
                cursor: pointer;
            }

            &_active {
                color: var(--Orange);
            }
        }
    }

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 24px;

        &__name {
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

    &__middle-wrapper {
        display: flex;
        margin-top: 24px;
        max-height: 300px;
        width: 100%;
        justify-content: space-between;
        gap: 24px;

        .properties {
            box-sizing: border-box;
            display: flex;
            width: 550px;
            justify-content: space-between;
            position: relative;

            .btn-mobile {
                position: absolute;
                top: 23px;
            }

            .add {
                right: 16px;

            }

            .back {
                left: 16px;
                background-color: var(--Light_orange_3);
            }

            .image {
                object-fit: cover;
                object-position: 30% 50%;
                border-radius: 40px;
                margin-left: -3px;
                margin-top: -3px;
                height: calc(100% + 6px);
                width: 259px;
            }

            .wrapper {
                margin-right: 22px;

                .time-and-complexity {
                    display: flex;
                    flex-direction: column;
                    padding: 20px 0 10px 10px;
                    box-sizing: border-box;
                    width: 244px;
                    height: max-content;
                    gap: 12px;
                    border-bottom: 3px solid var(--Gray);

                    &__item {
                        display: flex;
                        align-items: center;
                        gap: 12px;

                        .img {
                            width: 24px;
                            height: 24px;
                        }

                    }
                }

                .other-properties {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 13px 0 20px 10px;

                    .text {
                        text-align: center;
                    }

                    .wrapper-items {
                        display: flex;
                        justify-content: space-between;

                        .name {
                            color: var(--Orange);
                        }
                    }
                }
            }
        }

        .ingredients {
            padding: 24px 32px;
            width: 518px;
            box-sizing: border-box;

            .text-header {
                height: 48px;
                display: block;
            }

            .list-ingredients {
                height: calc(100% - 48px);
                display: flex;
                flex-direction: column;
                gap: 8px;
                overflow: auto;
                padding: 0;
                list-style: none;
                margin: 0;
                padding-right: 22px;

                .list-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    &__name {
                        max-width: 210px;
                    }

                    &__amount {
                        text-align: right;
                    }
                }
            }
        }
    }

    &__bottom-wrapper {
        margin: 24px 0 24px;
        width: 100%;

        .recipe-list {
            padding: 24px 32px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 16px;

            &__ol {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            &__item {
                display: flex;
                gap: 12px;

                .step {
                    min-width: 70px;
                }
            }
        }
    }
}


@media (max-width: 1060px) {
    .recipe-card {

        &__middle-wrapper {
            flex-direction: column;
            max-height: 100%;

            .properties {
                width: 100%;
                height: 300px;
                gap: 24px;

                .image {
                    width: 65%;
                }
            }

            .ingredients {
                width: 100%;

                .list-ingredients {
                    padding-right: 0;
                }
            }
        }
    }
}

@media (max-width: 750px) {
    .recipe-card__middle-wrapper .properties .image {
        width: 47%;
    }
}

@media (max-width: 600px) {
    .mobile {
        display: block;

        &__name {
            padding: 0 16px;
        }
    }

    .main {
        padding: 0;
    }

    .border {
        border: none;
    }

    .recipe-card {
        &-history {
            display: none;
        }

        &-header {
            display: none;
        }

        &__middle-wrapper {
            .properties {
                flex-direction: column;
                height: 100%;

                .btn-mobile {
                    display: flex;
                }

                .image {
                    width: 100%;
                    height: 212px;
                    border-radius: 40px 40px 0 0;
                }

                .wrapper {
                    padding: 0 16px;
                    margin: 0;

                    .time-and-complexity {
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-evenly;
                        border-bottom: none;
                        padding: 0 0 10px;
                    }

                    .other-properties {
                        flex-direction: row;
                        justify-content: space-evenly;

                        .text {
                            display: none;
                        }

                        .wrapper-items {
                            flex-direction: column;
                            gap: 10px;
                            box-sizing: border-box;
                            align-items: center;
                            padding: 17px 22px 18px;
                            background-color: var(--Light_orange_3);
                            border-radius: 20px
                        }
                    }
                }
            }

            .ingredients {
                padding: 24px 16px;

                .text-header {
                    height: 28px;
                    margin-bottom: 8px;
                }

                .list-ingredients {
                    padding: 25px 16px 14px 21px;
                    border-radius: 20px;
                    background-color: var(--Light_orange_3);
                }
            }
        }

        &__bottom-wrapper {
            padding: 0 16px;
            box-sizing: border-box;

            .recipe-list {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 0;

                &__ol {
                    padding: 24px 16px;
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    border-radius: 20px;
                    background-color: var(--Light_orange_3);
                }

                &__item {
                    display: flex;
                    gap: 12px;

                    .step {
                        min-width: 70px;
                    }
                }
            }
        }
    }
}

@media (max-width: 480px) {
    .recipe-card {

        &__middle-wrapper {
            .properties {
                flex-direction: column;
                height: 100%;
                gap: 15px;

                .image {
                    width: 100%;
                    height: 212px;
                    border-radius: 40px 40px 0 0;
                }

                .wrapper {


                    .other-properties {
                        gap: 7px;
                        justify-content: space-between;
                        padding: 13px 0 0;

                        .wrapper-items {
                            padding: 10px 13px 11px;
                            max-width: 67px;
                        }
                    }
                }
            }

            .ingredients {
                .list-ingredients {
                    .list-item {
                        &__name {
                            max-width: 150px;
                        }


                    }
                }
            }
        }
    }
}
</style>