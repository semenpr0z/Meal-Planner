<script>
import { useUserStore } from '@/stores/UserStore.js'
import { useRecipesStore } from '@/stores/RecipesStore.js'
import RecipesDataService from '@/services/RecipesDataService'
import OrderDataService from '@/services/OrderDataService'

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
    async userLoaded() {
      if (JSON.parse(localStorage.getItem('user'))) {
        this.userStore.changeUser(JSON.parse(localStorage.getItem('user')))
        // this.userStore.loadOrders(filteredOrders)
      }
    }
  },
  beforeMount() {
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
