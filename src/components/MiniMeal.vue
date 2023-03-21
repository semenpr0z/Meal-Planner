<script>
import { useUserStore } from '@/stores/UserStore.js';
import OrderDataService from '@/services/OrderDataService.js'

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
        addToMenu() {
            if(this.userStore.user){
            let newOrder = {
                'dishesDate': this.meal.date,
                'userId': this.userStore.user.id,
                'dishesId': this.meal.dishesId,
                'mealsId': this.meal.mealsId.toString(),
            }
            OrderDataService.create(newOrder)
            this.moveToSuccess()}
            else{
                alert('Вы не авторизованы! Авторизуйтесь на главной странице.')
            }
        },
        moveToSuccess(){
            this.$emit('moveToSuccess')
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
        <p class="p-1">{{ meal.name + (meal.amount ? ' (' + meal.amount + ')' : '') }}</p>
        <button class="meal-btn" @click="addToMenu" :title="'Добавить блюдо на ' + `${meal.name.toLowerCase()}`"><img src="svg/icon-add.svg" alt="Добавить"></button>
    </li>
</template>

<style lang="scss" scoped>
.meal {
    display: flex;
    list-style: none;
    width: 252px;
    align-items: center;
    justify-content: space-between;

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
</style>