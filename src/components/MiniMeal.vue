<script>
import { useUserStore } from '@/stores/UserStore.js';
import OrderDataService from '@/services/OrderDataService.js'

export default {
    data() {
        return {
            inaccessibility: false
        }
    },
    props: {
        meal: {
            type: Object,
            required: true
        }
    },
    methods: {
        addToMenu() {
            if (this.userStore.user) {
                let newOrder = {
                    'dishesDate': this.meal.date,
                    'userId': this.userStore.user.id,
                    'dishesId': this.meal.dishesId,
                    'mealsId': this.meal.mealsId.toString(),
                }
                console.log(newOrder)
                OrderDataService.create(newOrder)
                this.userStore.userOrders.push(newOrder)
            }
            else {
                alert('Вы не авторизованы! Авторизуйтесь на главной странице.')
            }
        },
        inaccessibilityChange() {
            this.inaccessibility = !this.inaccessibility
        }
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    emits: ['moveToSuccess']
}
</script>

<template>
    <li class="meal">
        <button v-if="meal.mealsNames.length" :class="['inaccessibility', { 'inaccessibility_opened': inaccessibility }]"
            @click="inaccessibilityChange" :title="!inaccessibility ? 'Развернуть' : 'Свернуть'"><img
                src="/svg/icon-openClose.svg" :alt="!inaccessibility ? 'Развернуть' : 'Свернуть'"></button>
        <div class="meal__wrapper">
            <p class="p-1 meal__wrapper-text">{{ meal.name + (meal.amount ? ' (' + meal.amount + ')' : '') }}</p>
            <button class="meal__wrapper-btn" @click="addToMenu"
                :title="'Добавить блюдо на ' + `${meal.name.toLowerCase()}`"><img src="/svg/icon-add.svg"
                    alt="Добавить"></button>
        </div>
        <div :class="['meal__recipes_wrapper', {'meal__recipes_wrapper_opened': inaccessibility}]">
            <div :class="['meal__recipes', {'opened': inaccessibility}]" v-if="meal.mealsNames.length" >
                <p v-for="name in meal.mealsNames" :key="name" class="span-2">{{ name }}</p>
            </div>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.meal {
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 252px;
    position: relative;

    .inaccessibility {
        position: absolute;
        background-color: transparent;
        border: none;
        cursor: pointer;
        

        img {
            transition: transform 0.3s ease-in-out;
        }

        &_opened {
            img {
                transform: rotate(180deg);
            }
        }
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;

        &-text {
            padding-left: 24px;
        }

        &-btn {
            width: 24px;
            height: 24px;
            background-color: transparent;
            border: none;

            &:hover {
                cursor: pointer;
            }
        }
    }

    &__recipes {
        padding-left: 24px;
        margin-top: 0;
        transform: translateY(-100%);
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: transform 0.3s ease-in-out;

        &_wrapper{
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.3s ease-in-out;
            &_opened{
                max-height: 1000px;
            }
        }
    }
    .opened{
        margin-top: 16px;
        transform: translateY(0%);
    }
}
</style>