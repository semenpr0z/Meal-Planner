<script>
import ButtonUI from '@/components/ui-kit/Button-ui.vue'
import Filter from '@/components/ui-kit/Filter.vue';


import { useRecipesStore } from '@/stores/RecipesStore.js'

export default {
    data() {
        return {
            time: [0, 180],
            complexity: '',
            step: 5
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
                    if (this.time[0] === value[0] && this.time[1] === value[1]) {
                        this.time = [0, 180];
                    } else {
                        this.time = value;
                    }
                    console.log(this.time)
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
        },
        handleRangeInput(index) {
            if (index === 0) {
                if (this.time[0] >= this.time[1]) {
                    this.time[0] = this.time[1] - 5;
                }
            } else if (index === 1) {
                if (this.time[1] <= this.time[0]) {
                    this.time[1] = this.time[0] + 5;
                }
            }
        },
        updateValue(index, event) {
            this.time[index] = Number(event.target.value)
        }
    },
    computed: {
        progressStyle() {
            const min = this.time[0];
            const max = this.time[1];
            const width = ((max - min) / 180) * 100 + '%';
            const left = (min / 180) * 100 + '%';
            const right = ((180 - max) / 180) * 100 + '%';

            return {
                width,
                left,
                right
            };
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
        <!-- <div class="filters_wrapper_row">
            <div class="filters__item">
                <p class="p-1">Время приготовления</p>
                <div class="filters__item__btn_wrapper">
                    <Filter text="До 15 минут" :checked="time[0] == 0 && time[1] == 15"
                        @click="toggleFilter([0, 15], 'time')" />
                    <Filter text="До 30 минут" :checked="time[0] == 16 && time[1] == 30"
                        @click="toggleFilter([16, 30], 'time')" />
                    <Filter text="До 1 часа" :checked="time[0] == 31 && time[1] == 60"
                        @click="toggleFilter([31, 60], 'time')" />
                    <Filter text="От 1 часа" :checked="time[0] == 61 && time[1] == 1000"
                        @click="toggleFilter([61, 1000], 'time')" />
                </div>
            </div>
            <button @click="closeFilters" class="btn-close"><img src="/svg/icon-close.svg" alt="Закрыть"></button>
        </div> -->
        <div class="filters_wrapper_row">
            <div class="filters__item">
                <p class="p-1">Сложность</p>
                <div class="filters__item__btn_wrapper">
                    <Filter text="Легкая" :checked="complexity === 'легкая'"
                        @click="toggleFilter('легкая', 'complexity')" />
                    <Filter text="Средняя" :checked="complexity === 'средняя'"
                        @click="toggleFilter('средняя', 'complexity')" />
                    <Filter text="Сложная" :checked="complexity === 'сложная'"
                        @click="toggleFilter('сложная', 'complexity')" />
                </div>
            </div>
        </div>

        <div class="filters_wrapper_row">
            <p class="p-1">Время приготовления(минут)</p>
            <div class="info-text">
                <p class="p-2">от {{ time[0] }}</p>
                <p class="p-2">до {{ time[1] }}</p>
            </div>
            <div class="wrapper-slider-progress">
                <div class="slider">
                    <div class="progress" :style="progressStyle"></div>
                </div>
                <div class="range-input">
                    <input type="range" class="range-min" min="0" max="180" step="5" v-model.number="time[0]"
                        @input="handleRangeInput(0)">
                    <input type="range" class="range-max" min="0" max="180" step="5" v-model.number="time[1]"
                        @input="handleRangeInput(1)">
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
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .info-text{
            display: flex;  
            gap: 10px;
        }

        .wrapper-slider-progress {
            width: 100%;
            max-width: 400px;
        }

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

    .slider {
        height: 5px;
        position: relative;
        background: var(--Gray);
        border-radius: 5px;
        &::before{
            height: 17px;
            width: 17px;
            background-color: var(--Gray);
        }
    }

    .slider .progress {
        height: 100%;
        position: absolute;
        border-radius: 5px;
        background: var(--Orange);
    }

    .range-input {
        position: relative;
    }

    .range-input input {
        position: absolute;
        width: 100%;
        height: 5px;
        top: -5px;
        background: none;
        pointer-events: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    input[type="range"]::-webkit-slider-thumb {
        height: 17px;
        width: 17px;
        border-radius: 50%;
        background: var(--Orange);
        pointer-events: auto;
        -webkit-appearance: none;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
    }

    input[type="range"]::-moz-range-thumb {
        height: 17px;
        width: 17px;
        border: none;
        border-radius: 50%;
        background: #17A2B8;
        pointer-events: auto;
        -moz-appearance: none;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
    }



    .btn-accept {
        margin-top: 50px;
    }
}

@media (max-width: 850px) {
    .filters{
        &_wrapper_row {
            flex-direction: column;
            gap: 10px;
        }
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