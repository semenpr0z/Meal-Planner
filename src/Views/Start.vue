<script>
import router from '@/router.js'

export default {
    data() {
    return {
    };
  },
  beforeMount(){
    this.Start()
  },
  components: {
  },
  methods: {
    Start(){
      router.push('/main')
    }
  }
}
</script>

<template>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>