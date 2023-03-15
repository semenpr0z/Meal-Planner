<script>
import { useUserStore } from '@/stores/UserStore.js'
import { useRecipesStore } from '@/stores/RecipesStore.js'
import RecipesDataService from '@/services/RecipesDataService'

export default {
  data() {
    return {
    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },
  methods: {
    userLoaded() {
      console.log('ok')
      if (JSON.parse(localStorage.getItem('user'))) {
        this.userStore.changeUser(JSON.parse(localStorage.getItem('user')))
      }
    }
  },
  beforeMount(){
    this.userLoaded()
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
