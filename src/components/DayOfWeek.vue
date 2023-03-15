<script>
import Meal from '@/components/Meal.vue';

export default {
    data() {
        return {
            meals: [
                {
                    'name': 'Завтрак',
                    'availability': true,
                    'recipe': 'Яичница',
                    'amount': '100 г',
                    'calorific': '1000 ккал',
                    'id': 1
                },
                {
                    'name': 'Перекус',
                    'availability': false,
                    'recipe': '',
                    'amount': '',
                    'calorific': '',
                    'id': null
                },
                {
                    'name': 'Обед',
                    'availability': true,
                    'recipe': 'Борщ',
                    'amount': '100 г',
                    'calorific': '700 ккал',
                    'id': 3
                },
                {
                    'name': 'Полдник',
                    'availability': false,
                    'recipe': '',
                    'amount': '',
                    'calorific': '',
                    'id': null
                },
                {
                    'name': 'Ужин',
                    'availability': true,
                    'recipe': 'Пюре с котлетой',
                    'amount': '100 г',
                    'calorific': '984 ккал',
                    'id': 25
                }
            ]
        }
    },
    components: {
        Meal
    },
    props: {
        day: {
            type: Date,
            required: true
        }
    },
    methods: {
        capitalizeFirstLetter(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }
}
</script>

<template>
    <div class="day">
        <h2 class="h-2 day-h2">{{ capitalizeFirstLetter(new Intl.DateTimeFormat("ru", { weekday: "long" }).format(day)) }}
        </h2>
        <p>{{ new Intl.DateTimeFormat("ru", { day: "numeric", month: "long" }).format(day) }}</p>
        <Meal v-for="meal in meals" :meal="meal" />
    </div>
</template>

<style lang="scss" scoped>
.day {
    border: 3px solid var(--Gray);
    border-radius: 50px;
    padding: 24px 32px;
    width: 480px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-h2 {
        text-align: center;
    }
}
</style>