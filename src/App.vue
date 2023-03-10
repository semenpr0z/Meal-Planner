<script>
import {useUserStore} from '@/stores/UserStore.js'
import {useRecipesStore} from '@/stores/RecipesStore.js'

import RecipesDataService from '@/services/RecipesDataService'

export default {
    data() {
        return {
        };
    },
    setup(){
        const userStore = useUserStore();
        const recipesStore = useRecipesStore();
        return {
            userStore,
            recipesStore
        }
    },
    methods: {
      userLoaded() {
        if(JSON.parse(localStorage.getItem('user'))){
          this.userStore.changeUser(JSON.parse(localStorage.getItem('user')))
        }
      },
      async recipesLoad() {
        if(this.recipesStore.recipes.length === 0){
          this.recipesStore.loadRecipes(await (await RecipesDataService.getAll()).data)
        }
      }
    },
    beforeMount(){
      this.userLoaded()
      this.recipesLoad()
    }
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
