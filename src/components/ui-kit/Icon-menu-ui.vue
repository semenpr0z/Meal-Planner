<script setup>

const props = defineProps({
    src : {
        type: String,
        required: true
    },
    alt : {
        type: String,
        default: "icon"
    },
    Link : {
        type: String,
        default: "/main"
    }
})

</script>

<template>
    <router-link :to="Link" class="link-icon">
        <img :src="src" :alt="alt">
    </router-link>
</template>

<style lang="scss" scoped>
.link-icon {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>