<script>
import ButtonUI from '@/components/ui-kit/Button-ui.vue'
import Filter from '@/components/ui-kit/Filter.vue';

import { useRecipesStore } from '@/stores/RecipesStore.js'

export default {
    data() {
        return {
            time: '',
            complexity: ''
        }
    },
    setup() {
        const recipesStore = useRecipesStore();
        return {
            recipesStore
        }
    },
    methods: {
        closeFilters() {
            this.$emit('closeFilters')
        },
        toggleFilter(value, type) {
            switch (type) {
                case 'time':
                    if (this.time === value) {
                        this.time = '';
                    } else {
                        this.time = value;
                    }
                    break;
                case 'complexity':
                    if (this.complexity === value) {
                        this.complexity = '';
                    } else {
                        this.complexity = value;
                    }
                    break;
                default:
                    break;
            }
        },
        applyFilters() {
            this.recipesStore.timeFilter = this.time,
                this.recipesStore.complexityFilter = this.complexity
            this.closeFilters()
        }
    },
    emits: ['closeFilters'],
    components: {
        ButtonUI, Filter
    }
}
</script>

<template>
    <div class="filters">
        <div class="filters_wrapper_row">
            <div class="filters__item">
                <p class="p-1">Время приготовления</p>
                <div class="filters__item__btn_wrapper">
                    <Filter text="До 15 минут" :checked="time === '15 минут'" @click="toggleFilter(15, 'time')" />
                    <Filter text="До 30 минут" :checked="time === '30 минут'" @click="toggleFilter(30, 'time')" />
                    <Filter text="До 1 часа" :checked="time === '1 час'" @click="toggleFilter(60, 'time')" />
                    <Filter text="От 1 часа" :checked="time === 'более 1 часа'" @click="toggleFilter('более 1 часа', 'time')" />
                </div>
            </div>
            <button @click="closeFilters" class="btn-close"><img src="/svg/icon-close.svg" alt="Закрыть"></button>
        </div>
        <div class="filters_wrapper_row">
            <div class="filters__item">
                <p class="p-1">Сложность</p>
                <div class="filters__item__btn_wrapper">
                    <Filter text="Легкая" :checked="complexity === 'легкая'" @click="toggleFilter('легкая', 'complexity')" />
                    <Filter text="Средняя" :checked="complexity === 'средняя'" @click="toggleFilter('средняя', 'complexity')" />
                    <Filter text="Сложная" :checked="complexity === 'сложная'" @click="toggleFilter('сложная', 'complexity')" />
                </div>
            </div>
        </div>
        <ButtonUI text="Найти рецепты" class="btn-accept" @click="applyFilters" />
    </div>
</template>

<style lang='scss' scoped>
.filters {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &_wrapper_row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 40px;
        width: 100%;

        .btn-close {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 16px;

        &__btn {
            padding: 8px 16px;
            border-radius: 15px;
            background-color: var(--Gray);
            border: none;
            cursor: pointer;

            &_wrapper {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;

                .checked {
                    background-color: var(--Light_orange_2);
                }
            }
        }
    }

    .btn-accept {
        margin-top: 50px;
    }
}

@media (max-width: 750px) {
    .filters {
        &__item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
    }
}

@media (max-width: 650px) {
    .filters {
        height: calc(100vh - 170px);

        .btn-accept {
            width: 100%;
        }
    }
}
</style>