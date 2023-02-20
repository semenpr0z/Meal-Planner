<script>
export default {
  data() {
    return {
        
    };
  },
  props: {
    calorific: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    complexity:{
        type: String,
        required: true
    }
  }
};

</script>

<template>
    <div class="properties-item">
        <img src="/svg/icon-apple.svg" alt="картинка яблока" class="properties-item__img">
        <span class="properties-item__span">{{ calorific }}</span>
    </div>
    <div class="properties-item">
        <img src="/svg/icon-time.svg" alt="картинка часов" class="properties-item__img">
        <span class="properties-item__span">{{ time }}</span>
    </div>
    <div class="properties-item">
        <img src="/svg/icon-dish.svg" alt="картинка миски" class="properties-item__img">
        <span class="properties-item__span">Сложность {{ complexity }}</span>
    </div>
</template>

<style lang="scss" scoped>
.properties-item{
 display: flex;
 align-items: center;
 height: 16px;
 &__img{
    
 }
 &__span{
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    padding-left: 8px;
 }
}
</style>