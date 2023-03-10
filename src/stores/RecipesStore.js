import { defineStore } from "pinia"

export const useRecipesStore = defineStore("RecipesStore", {
  state: () => ({
    recipes: []
  }),
  getters: {},
  actions: {
    loadRecipes(data) {
      this.recipes = data
    }
  },
})