import { defineStore } from "pinia"
import RecipeDataService from '@/services/RecipesDataService'

export const useRecipesStore = defineStore("RecipesStore", {
  state: () => ({
    recipes: []
  }),
  getters: {},
  actions: {
    async updateRecipes() {
      const response = await RecipeDataService.getAll()
      this.recipes = response.data
    }
  },
})