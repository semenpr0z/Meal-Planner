<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        },
        deletability: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>
    <button class="btn" :class="{ 'checked': checked }">
        <span class="span-3">{{ text }}</span>
        <img v-if="deletability" src="/svg/icon-close.svg" alt="Удалить">
    </button>
</template>

<style lang='scss' scoped>
.btn {
    padding: 8px 16px;
    border-radius: 15px;
    background-color: var(--Gray);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}

.checked {
    background-color: var(--Light_orange_2);
}
</style>