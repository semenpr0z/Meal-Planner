<script>
import ButtonUi from '@/components/ui-kit/Button-ui.vue';
import ButtonMiniUi from '@/components/ui-kit/ButtonMini-ui.vue'

export default {
    data() {
        return {
            search: "",
            validSearch: true,
            prevSearch: ""
        };
    },
    components: {
        ButtonUi,
        ButtonMiniUi
    },
    methods: {
        searchGet() {
            this.$emit('searchGet', this.search)
        },
        validatingSearch() {
            if (this.search == '' && this.prevSearch == '') {
                this.validSearch = false
            } else {
                this.searchGet()
            }
        },
        openFilters() {
            this.$emit('openFilters')
        }
    },
    emits: ['searchGet', 'openFilters'],
    watch: {
        search(newValue, prevValue) {
            if (newValue.length != 0) {
                this.validSearch = true
            }
            if (prevValue.length != 0) {
                this.prevSearch = prevValue
            }
        }
    },
    props: {
        button: {
            type: Boolean,
            default: false
        },
        searchValidation: {
            type: Boolean,
            default: true
        }
    }
};

</script>

<template>
    <div>
        <div class="search-ingridients-wrapper">
            <input type="text"
                :class="['search-ingridients-wrapper__input', { 'invalid': validSearch == false || searchValidation == false }, 'span-1']"
                placeholder="Введите название блюда" v-model="search">
            <ButtonMiniUi src="/svg/icon-loop.svg/" alt="Найти" @click="validatingSearch" />
            <ButtonUi
                :class="[{ 'search-ingridients-wrapper__margin-button': button == false || searchValidation == false }, { 'search-ingridients-wrapper__margin-button-short': button == true }, 'btn']"
                @click="validatingSearch" :short-button="button"></ButtonUi>
            <button class="search-ingridients-wrapper__icon-wrapper" @click="openFilters">
                <img class="search-ingridients-wrapper__icon-wrapper_item" src="/svg/icon-filters.svg" alt="">
            </button>
        </div>
        <span v-if="validSearch == false || searchValidation == false" class="input-span span-3">Поле заполнено неверно,
            попробуйте снова</span>
    </div>
</template>

<style lang="scss" scoped>
.search-ingridients-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &__input {
        width: 70%;
        background-color: transparent;
        border: 2px solid var(--Gray);
        border-right: 2px solid transparent;
        border-radius: 30px 0 0 30px;
        padding: 16px 24px;
        transition: 0.5s;
        color: var(--Black);

        &::placeholder {
            color: var(--Text_gray);
        }

        &:hover {
            border: 2px solid var(--Light_orange);
            border-right: 2px solid transparent;
        }

        &:focus {
            outline: none;
            border: 2px solid var(--Light_orange);
            border-right: 2px solid transparent;
            background-color: transparent;
            color: var(--Black);
        }
    }

    &__margin-button {
        margin-left: -30px;

        &-short {
            margin-left: -100px;
        }
    }

    &__icon-wrapper {
        margin-left: 13px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        border: none;
        background-color: transparent;
    }

    .btn-mini {
        display: none
    }
}

.opened{
    height: auto;
}

.invalid {
    border: 2px solid #D02500;
    border-right: 2px solid transparent;
}

.input-span {
    color: #D02500;
    text-align: left;
}



@media (max-width: 786px) {
    .search-ingridients-wrapper {
        &__input {
            width: 100%;
            padding: 12px 24px;
            box-sizing: border-box;
        }

        .btn {
            display: none;
        }

        .btn-mini {
            display: flex;
            margin-left: -25px;
            min-width: 50px;
        }

    }
}
</style>