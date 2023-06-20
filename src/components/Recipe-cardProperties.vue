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
        type: Number,
        required: true
    },
    complexity:{
        type: String,
        required: true
    },
    wideProperties: {
        type: Boolean
    }
  }
};

</script>

<template>
    <div class="properties-item">
        <span class="span-1">Калорийность</span>
        <span class="properties-item__span span-3">{{ calorific }}</span>
    </div>
    <div class="properties-item">
        <span class="span-1">{{!wideProperties ? 'Время' : 'Время приготовления'}}</span>
        <span class="properties-item__span span-3">{{ time + ' мин' }}</span>
    </div>
    <div class="properties-item">
        <span class="span-1">Сложность</span>
        <span class="properties-item__span span-3">{{ complexity }}</span>
    </div>
</template>

<style lang="scss" scoped>
.properties-item{
 display: flex;
 flex-direction: column;
 align-items: center;
 &__span{
    color: var(--Black);
 }
}
</style>