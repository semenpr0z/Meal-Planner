<script>

export default {
  data() {
    return {

    };
  },
  components: {
  },
  props: {
    item: {
        type: Object,
        required: true
    }
  },
  methods: {
    closeModalRecipeCard() {
      this.$emit('closeModalRecipeCard')
    }
  }
};
</script>

<template>
  <div class="background-modal">
    <div class="modal-recipe-card">
      <div class="modal-recipe-card-top">
        <h3 class="modal-recipe-card-top__h3">{{ item.name }}</h3>
        <button class="modal-recipe-card-top__btn-close-modal" @click="closeModalRecipeCard"><img src="svg/icon-close.svg" alt="Закрыть"></button>
      </div>
      <div class="modal-recipe-card-middle">
        <div class="modal-recipe-card-middle__information">
          <img class="modal-recipe-card-middle__information__image" :src="item.image" alt="Изображение блюда">
          <div class="modal-recipe-card-middle__information__text">
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-time.svg" alt="картинка яблока" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span">{{ item.properties.time }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-dish.svg" alt="картинка яблока" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span">Сложность {{ item.properties.complexity }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-apple.svg" alt="картинка яблока" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span">{{ item.properties.calorific }} (100г)</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <span class="modal-recipe-card-middle__information__text__item__span">{{ item.properties.protein }}</span>
              <span class="modal-recipe-card-middle__information__text__item__span">Белки (100г)</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <span class="modal-recipe-card-middle__information__text__item__span">{{ item.properties.fats }}</span>
              <span class="modal-recipe-card-middle__information__text__item__span">Жиры (100г)</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <span class="modal-recipe-card-middle__information__text__item__span">{{ item.properties.carbohydrates }}</span>
              <span class="modal-recipe-card-middle__information__text__item__span">Углеводы (100г)</span>
            </div>
          </div>
        </div>
        <div class="modal-recipe-card-middle__information modal-recipe-card-middle__information_right">
              <span class="modal-recipe-card-middle__information__text__item__span">Ингридиенты (на 4 порции)</span>
              <ol class="modal-recipe-card-middle__information__text__ingredients-wrapper">
                <li class="modal-recipe-card-middle__information__text__item__span modal-recipe-card-middle__information__text__item__span_ingredient" v-for="item in item.ingridients">- {{ item.name }} - {{ item.amount }}</li>
              </ol>
        </div>
      </div>
      <div class="modal-recipe-card-bottom">
        <span class="modal-recipe-card-middle__information__text__item__span">Рецепт</span>
        <ol class="modal-recipe-card-bottom__to-do-list">
          <li class="modal-recipe-card-bottom__to-do-list__li" v-for="item in item.recipe">{{ item.id }} {{ item.text }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(148, 148, 148, 0.50);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

body .background-modal{
    overflow-y: hidden;
    height: 100vh;
}

.modal-recipe-card{
  width: 764px;
  height: auto;
  background-color: #FFFFFF;
  border-radius: 6px;
  padding: 23px 32px;
}

.modal-recipe-card-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__h3{
    font-weight: 400;
    font-size: 27px;
    line-height: 32px;
    margin: 0;
  }
  &__btn-close-modal{
    background-color: transparent;
    border: 0;
    padding: 0;
    height: 24px;
    width: 24px;
    &:hover{
      cursor: pointer;
    }
  }
}
.modal-recipe-card-middle{
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  &__information{
    width: 369px;
    height: 202px;
    background-color: #D9D9D9;
    display: flex;
    border-radius: 6px;
    &_right{
      flex-direction: column;
      padding: 15px;
      width: 339px;
      height: 172px;
      gap: 12px;
    }
    &__image{
      width: 194px;
      object-fit: cover;
      object-position: 30% 50%;
      border-radius: 6px 0 0 6px;
    }
    &__text{
      display: flex;
      flex-direction: column;
      padding: 15px;
      width: 100%;
      justify-content: space-between;
      &__item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        &-wrapper{
          display: flex;
          justify-content: space-between;
        }
        &__span{
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          &_ingredient{
            height: max-content;
          }
        }
      }
      &__btn{
        background-color: transparent;
        border: none;
        padding: 0;
      }
      &__ingredients{
        display: flex;
        flex-direction: column;
        gap: 10px;
        &-wrapper{
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow:auto;
          padding: 0;
          list-style: none;
          margin: 0;
        &::-webkit-scrollbar {
          width: 10px;
          background-color: #D9D9D9;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #D1D1D1;
        }

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
          border-radius: 10px;
          background-color: #EEEEEE;
        }
        }
      }
    }
  }
}

.modal-recipe-card-bottom{
  margin-top: 15px;
  background-color: #D9D9D9;
  padding: 15px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 6px;
  &__to-do-list{
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow:auto;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #D9D9D9;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #D1D1D1;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
      border-radius: 10px;
      background-color: #EEEEEE;
    }
    &__li{
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
    }
  }
}
</style>