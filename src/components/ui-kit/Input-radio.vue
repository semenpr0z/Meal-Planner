<script>

export default {
    data() {
        return {
            sex: this.value
        }
    },
    props: {
        invalid: {
            required: false
        },
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateSex(value) {
            this.$emit('updateSex', value);

        }
    },
    watch: {
        sex(newValue) {
            this.updateSex(newValue)
        }
    },
}
</script>

<template>
    <div class="input-form">
        <p class="p-2 input-name input-name-radio">Пол</p>
        <label class="input-label">
            <input class="input-label-radio" type="radio" name="sex" value="male" v-model="sex" :checked="sex === 'male'">
            <p class="p-2">Мужской</p>
        </label>
        <label class="input-label">
            <input class="input-label-radio" type="radio" name="sex" value="female" v-model="sex"
                :checked="sex === 'female'">
            <p class="p-2">Женский</p>
        </label>
    </div>
</template>

<style lang='scss' scoped>
.input {
    &-form {
        width: 334px;
        display: flex;
        flex-direction: row;
        gap: 23px;
    }

    &-label {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;

        &-radio {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            position: relative;
            width: 21px;
            height: 21px;
            outline: none;
            transition: 0.3s ease-in-out;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--Gray);
            box-shadow: inset 0 0 0 4px var(--White);
            background-color: var(--White);

            &:hover {
                background-color: var(--Gray);
                border: 2px solid var(--Gray);

            }

            &:checked {
                background-color: var(--Orange);
                border: 2px solid var(--Orange);
            }

        }
    }

    &-name {
        height: 21px;
        display: flex;
        align-items: center;
        color: var(--Text_gray);

        &-radio {
            padding-right: 30px;
        }
    }
}

@media (max-width: 750px) {
    .input {
        &-form {
            gap: 16px;
        }
    }
}
</style>