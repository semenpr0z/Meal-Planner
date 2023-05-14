<script>
import { useUserStore } from '@/stores/UserStore.js'
import { useRecipesStore } from '@/stores/RecipesStore.js'
import RecipesDataService from '@/services/RecipesDataService'
import OrderDataService from '@/services/OrderDataService'
import UserDataService from './services/UserDataService'

export default {
  data() {
    return {
    };
  },
  setup() {
    const userStore = useUserStore();
    const recipesStore = useRecipesStore();
    return {
      userStore,
      recipesStore
    }
  },
  methods: {
    async userLoaded() {
      if (JSON.parse(localStorage.getItem('user'))) {
        this.userStore.changeUser(JSON.parse(localStorage.getItem('user')))
      }
      const users = (await UserDataService.getAll()).data;
    },
    async updateRecipes() {
      if (this.recipesStore.recipes.length === 0) {
        await this.recipesStore.updateRecipes()
        this.localRecipes = this.recipesStore.recipes

      } else {
        this.localRecipes = this.recipesStore.recipes
      }
    }
  },
  beforeMount() {
    this.userLoaded()
    this.updateRecipes()
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
