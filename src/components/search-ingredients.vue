<script>
import ButtonUi from '@/components/ui-kit/Button-ui.vue';

export default {
    data() {
        return {
            search: "",
            validSearch: true,
            prevSearch: ""
        };
    },
    components: {
        ButtonUi
    },
    methods: {
        searchGet(){
            this.$emit('searchGet', this.search)
        },
        validatingSearch(){
            if(this.search == '' && this.prevSearch == ''){
                this.validSearch= false
            }else{
                this.searchGet()
            }
        }
    },
    emits: ['searchGet'],
    watch: {
        search(newValue, prevValue) {
            if(newValue.length != 0){
                this.validSearch = true
            }
            if(prevValue.length != 0){
                this.prevSearch = prevValue
            }
        }
    }
};

</script>

<template>
    <div>
        <div class="search-ingridients-wrapper">
            <input type="text"
            :class="['search-ingridients-wrapper__input', {'invalid' : validSearch == false}]"
                placeholder="Введите название рецепта"
                v-model="search">
            <ButtonUi class="search-ingridients-wrapper__margin-button" @click="validatingSearch"></ButtonUi>
            <div class="search-ingridients-wrapper__icon-wrapper">
                <img class="search-ingridients-wrapper__icon-wrapper_item" src="/svg/icon-filters.svg" alt="">
            </div>
        </div>
        <span v-if="validSearch == false" class="input-span">Поле заполнено неверно, попробуйте снова</span>
    </div>
</template>

<style lang="scss" scoped>
.search-ingridients-wrapper{
    display: flex;
    align-items: center;
    &__input{
        width: 665px;
        background-color: transparent;
        border: 2px solid var(--Gray);
        border-right: 2px solid transparent;
        border-radius: 30px 0 0 30px;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        padding: 16px 24px;
        transition: 0.5s;
        color: var(--Black);
        &::placeholder{
            color: var(--Text_gray);
        }
        &:hover{
            border: 2px solid var(--Light_orange);
            border-right: 2px solid transparent;
        }
        &:focus{
            outline: none;
            border: 2px solid var(--Light_orange);
            border-right: 2px solid transparent;
            background-color: transparent;
            color: var(--Black);
        }
    }
    &__margin-button{
        margin-left: -30px;
    }
    &__icon-wrapper{
        margin-left: 13px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
}

.invalid{
    border: 2px solid #D02500;
    border-right: 2px solid transparent;
}
.input-span{
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #D02500;
    text-align: left;
}
</style>