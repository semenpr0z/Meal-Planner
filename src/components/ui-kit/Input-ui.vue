<script>

export default {
    data() {
        return {
        };
    },
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            required: false
        },
        model: {
            type: String,
            required: true
        }
    }
}

</script>

<template>
    <input class="registration-form__input registration-form__input_email"  :type="type" :placeholder="placeholder" name="email" :v-model="model">
</template>

<style lang="scss" scoped>
.registration-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 153px;

    &__h2 {
        font-weight: 400;
        font-size: 40px;
        line-height: 47px;
        color: #000000CC;
    }

    &__input {
        width: 385px;
        height: 35px;
        background-color: #E2E2E2;
        border: 1px solid transparent;
        border-radius: 10px;
        font-weight: 400;
        font-size: 27px;
        line-height: 34px;
        padding: 18px 28px 16px;
        transition: 0.3s;

        &::placeholder {
            color: #00000026;
        }

        &:focus {
            outline: none;
            border: 1px solid #000000;
            background-color: transparent;
            color: #000000D9;
        }
    }
}
</style>