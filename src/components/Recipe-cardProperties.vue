<script setup>

const props = defineProps({
    text : {
        type: String,
        required: true
    },
    src : {
        type: String,
        default: "/main"
    },
    alt : {
        type: String,
        default: ""
    }
})

</script>

<template>
<div class="properties-item">
                    <img :src="src" :alt="alt" class="properties-item__img">
                    <span class="properties-item__span">{{ text }}</span>
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