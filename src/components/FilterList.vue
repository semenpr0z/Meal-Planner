<script>
import Filter from '@/components/ui-kit/Filter.vue';

import { useRecipesStore } from '@/stores/RecipesStore.js'

export default {
    data() {
        return {

        }
    },
    setup() {
        const recipesStore = useRecipesStore();
        return {
            recipesStore
        }
    },
    components: { Filter },
    computed: {
        timeFilter() {
            if (this.recipesStore.timeFilter[0] === 0 && this.recipesStore.timeFilter[1] === 180) {
                return false
            } else if (this.recipesStore.timeFilter[0] === 0 && this.recipesStore.timeFilter[1] !== 180) {
                return 'Время приготовления: до ' + this.recipesStore.timeFilter[1] + ' минут'
            } else if (this.recipesStore.timeFilter[0] !== 0 && this.recipesStore.timeFilter[1] === 180) { 
                return 'Время приготовления: от ' + this.recipesStore.timeFilter[0] + ' минут' 
            } else {
                return 'Время приготовления: от ' + this.recipesStore.timeFilter[0] + ' до ' + this.recipesStore.timeFilter[1] + ' минут'
            }   
        },
        complexityFilter() {
            if (this.recipesStore.complexityFilter) {
                return 'Сложность приготовления: ' + this.recipesStore.complexityFilter
            } else {
                false
            }
        },
    },
    methods: {
        deleteFilter(type) {
            switch (type) {
                case 'time':
                    this.recipesStore.timeFilter = [0, 180];
                    break;
                case 'complexity':
                    this.recipesStore.complexityFilter = '';
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<template>
    <ul class="filter-list">
        <li v-if="timeFilter">
            <Filter :text="timeFilter" :checked="true" :deletability="true" @click="deleteFilter('time')" />
        </li>
        <li v-if="complexityFilter">
            <Filter :text="complexityFilter" :checked="true" :deletability="true" @click="deleteFilter('complexity')" />
        </li>

    </ul>
</template>

<style lang='scss' scoped>
.filter-list {
    width: 100%;
    list-style: none;
    margin-top: 16px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
</style>