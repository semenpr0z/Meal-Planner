<script>
import {useUserStore} from '@/stores/UserStore.js'

export default {
    data() {
        return {
        };
    },
    setup(){
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
      userLoaded() {
        if(JSON.parse(localStorage.getItem('user'))){
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

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
</style>
