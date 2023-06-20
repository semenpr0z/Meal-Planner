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
        timeFilter(){
            return 'Время приготовления: до ' + this.recipesStore.timeFilter
        },
        complexityFilter(){
            return 'Сложность приготовления: ' + this.recipesStore.complexityFilter
        },
    },
    methods: {
        deleteFilter(type) {
            switch (type) {
                case 'time':
                    this.recipesStore.timeFilter = '';
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
        <li v-if="recipesStore.timeFilter">
            <Filter :text="timeFilter" checked="true" deletability="true" @click="deleteFilter('time')" />
        </li>
        <li v-if="recipesStore.complexityFilter">
            <Filter :text="complexityFilter" checked="true" deletability="true" @click="deleteFilter('complexity')" />
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