<script>
export default {
    data(){
        return{

        }
    },
    props: {
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        }
    }
}
</script>

<template>
    <button class="btn-mini">
        <img :src="src" alt="">
    </button>
</template>

<style lang='scss' scoped>
.btn-mini{
    background-color: var(--Orange);
    width: 50px;
    height: 50px;
    cursor: pointer;
    
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
}
</style>