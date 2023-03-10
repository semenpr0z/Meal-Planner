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
    closeRecipeCard() {
      this.$emit('closeRecipeCard')
    }
  },
  emits: ['closeRecipeCard']
};
</script>

<template>
      <div class="modal-recipe-card-top">
        <h3 class="modal-recipe-card-top__h3">{{ item.name }}</h3>
        <button class="modal-recipe-card-top__btn-close-modal" @click="closeRecipeCard"><img src="/svg/icon-close.svg" alt="Закрыть"></button>
      </div>
      <div class="modal-recipe-card-middle">
        <div class="modal-recipe-card-middle__information">
          <img class="modal-recipe-card-middle__information__image" :src="item.image" alt="Изображение блюда">
          <div class="modal-recipe-card-middle__information__text">
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-apple.svg" alt="Калорийность" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span_parametr">{{ item.properties.calorific }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-time.svg" alt="Время приготовления" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span_parametr">{{ item.properties.time }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-dish.svg" alt="Сложность приготовления" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span_parametr">Сложность {{ item.properties.complexity }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-protein.svg" alt="Белки" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span_parametr">{{ item.properties.protein }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-fat.svg" alt="Жиры" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span_parametr">{{ item.properties.fats }}</span>
            </div>
            <div class="modal-recipe-card-middle__information__text__item">
              <img src="/svg/icon-carbohydrates.svg" alt="Жиры" class="properties-item__img">
              <span class="modal-recipe-card-middle__information__text__item__span_parametr">{{ item.properties.carbohydrates }}</span>
            </div>
          </div>
        </div>
        <div class="modal-recipe-card-middle__information modal-recipe-card-middle__information_right">
              <span class="modal-recipe-card-middle__information__text__item__span">Ингридиенты на 4 порции:</span>
              <ol class="modal-recipe-card-middle__information__text__ingredients-wrapper">
                <li class="modal-recipe-card-middle__information__text__item__span_parametr" v-for="item in item.ingredients">- {{ item.name }} - {{ item.amount }}</li>
              </ol>
        </div>
      </div>
      <div class="modal-recipe-card-bottom">
          <span class="modal-recipe-card-middle__information__text__item__span">Рецепт:</span>
          <ol class="modal-recipe-card-bottom__to-do-list">
            <li class="modal-recipe-card-bottom__to-do-list__li" v-for="item in item.recipe"><span class="modal-recipe-card-bottom__to-do-list__li_weight-text">Шаг {{ item.id }}:</span><span class="modal-recipe-card-bottom__to-do-list__li_text"> {{ item.text }}</span></li>
          </ol>
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



.modal-recipe-card-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &__h3{
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
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
  margin-top: 16px;
  gap: 32px;
  &__information{
    width: 544px;
    height: 294px;
    background-color: transparent;
    display: flex;
    gap: 32px;
    border-radius: 40px;
    border: 3px solid var(--Gray);
    &_right{
      flex-direction: column;
      justify-content: flex-start;
      width: 480px;
      height: 226px;
      max-height: 300px;
      gap: 16px;
      padding: 24px 32px 44px;
    }
    &__image{
      width: 259px;
      height: 300px;
      object-fit: cover;
      object-position: 30% 50%;
      border-radius: 40px;
      margin-top: -3px;
      margin-left: -3px;
      z-index: 2;
    }
    &__text{
      display: flex;
      flex-direction: column;
      padding: 24px 0 24px;
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
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          &_parametr{
            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            color: var(--Black);
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
          height: 192px;
        }
      }
    }
  }
}

.properties-item__img{
  width: 32px;
  height: 32px;
}

.modal-recipe-card-bottom{
  margin-top: 16px;
  background-color: transparent;
  padding: 24px 32px;
  height: 432px;
  width: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 40px;
  border: 3px solid var(--Gray);
  &__to-do-list{
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow:auto;
    
    &__li{
      display: flex;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      &_weight-text{
        font-weight: 500;
        width: 75px;
        font-size: 18px;
        line-height: 22px;
        color: var(--Black);
      }
      &_text{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: var(--Black);
        width: 966px;
      }
    }
  }
}
</style>