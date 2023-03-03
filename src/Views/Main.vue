<script>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue'
  import Button from '@/components/ui-kit/Button-ui.vue'
  import InputUi from '@/components/ui-kit/Input-ui.vue';
  import LoginForm from '@/components/Login-form.vue';
  import RegistrationForm from '@/components/Registration-form.vue';

  export default {
  data() {
    return {
        Navigation: [
          {
              id: 1,
              text: 'Главная',
              Link: '/main',
              active: true
          },
          {
              id: 2,
              text: 'Меню',
              Link: '/menu',
              active: false
          },
          {
              id: 3,
              text: 'Рецепты',
              Link: '/recipes',
              active: false
          }
      ],
      startFormVisible: true,
      loginFormVisible: false,
      registrationFormVisible: false
    };
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    Button,
    LoginForm,
    RegistrationForm
  },
  methods: {
    showLogin() {
      this.startFormVisible = false;
      this.loginFormVisible = true;
    },
    showRegistration() {
      this.loginFormVisible = false;
      this.registrationFormVisible = true
    }
  }
};
</script>

<template>
<Navbar :menu="Navigation"></Navbar>
<main class="main main-relative">
  <div class="start" v-if="startFormVisible">
    <div class="start__text-button">
      <h1 class="start__text-button__h1">PlanMenu</h1>
      <h3 class="start__text-button__h3">планировщик меню на неделю, <br>где собраны твои любимые рецепты</h3>
      <p class="start__text-button__p">Cпланируем твое меню на неделю? </p>
      <Button class="start__text-button__btn" text="Спланировать меню" @click="showLogin"/>
    </div>
    <img src="/img/img-iPhone-main.png" class="start__img">
  </div>
  <LoginForm 
  v-if="loginFormVisible"
  @showRegistration="showRegistration" class="LoginForm"/>

  <RegistrationForm 
  v-if="registrationFormVisible"
  @showLogin="showLogin"/>

  <div class="background-images">
    <div class="background-images__img-wrapper">
      <div class="background-images__img-wrapper-wrapper background-images__img-wrapper-wrapper-right">
        <img class="background-images__img" src="/svg/icon-donut-background.svg">
      </div>
      <div class="background-images__img-wrapper-wrapper">
        <img class="background-images__img" src="/svg/icon-salad-background.svg">
      </div>
    </div>
  </div>
  <div class="benefits">
    <div class="benefits__benefit">
      <div class="benefits__benefit-text">
      <p class="benefits__benefit-text-p">Удобный календарь на неделю</p>
      <p class="benefits__benefit-text-p-min">Собирайте план сразу из готовых блюд.<br>Календарь нагляден и всегда под рукой!</p>
      </div>
      <img class="background-images__img" src="/svg/icon-planning.svg">
    </div>
    <div class="benefits__benefit">
      <img class="background-images__img" src="/svg/icon-food.svg">
      <div class="benefits__benefit-text">
        <p class="benefits__benefit-text-p">Сбалансированные рецепты</p>
        <p class="benefits__benefit-text-p-min">Рецепты подобраны с учетом принципов здорового<br> питания и отображением КБЖУ. Готовые блюда<br> позволят питаться правильно легко!</p>
      </div>
    </div>
    <div class="benefits__benefit">
      <div class="benefits__benefit-text">
        <p class="benefits__benefit-text-p">Оптимизируем расходы</p>
        <p class="benefits__benefit-text-p-min">Уменьшаем еженедельные стихийные траты<br> на продукты за счет грамотного планирования</p>
      </div>
      <img class="background-images__img" src="/svg/icon-bags.svg">
    </div>
  </div>
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.start{
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 99px;
  z-index: 1;
  &__text-button{
    margin-top: 87px;
    &__h1{
      color: #FF8A00;
      font-weight: 500;
      font-size: 60px;
      line-height: 73px;
    }
    &__h3{
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      color: #1B1B1A;
      margin-top: 32px;
    }
    &__p{
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      display: flex;
      align-items: center;
      color: #1B1B1A;
      margin-top: 32px;
    }
    &__btn{
      margin-top: 20px;
    }
  }
}

.main-relative{
  position: relative;
}

.LoginForm{
  z-index: 1;
}


.background-images{
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: -1;
  &__img{
    &-wrapper{
      display: flex;
      flex-direction: column;
      gap: 60px;
      &-wrapper{
        width: 649px;
        display: flex;
        &-right{
          justify-content: flex-end;
          padding-right: 66px;
        }
      }
    }
    &__donut{
      
    }
  }
}

.benefits{
  margin-top: 234px;
  padding-bottom: 233px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  &__benefit{
    display: flex;
    gap: 64px;
    width: 100%;
    &:nth-child(2n){
    justify-content: flex-end;
    gap: 78px;}
    &:nth-child(3n){
      gap: 104px;
    }
    &-text{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 12px;
      &-p{
        font-weight: 500;
        font-size: 27px;
        line-height: 34px;
        color: #1B1B1A;
        &-min{
          font-weight: 400;
          font-size: 18px;
          line-height: 27px;
        }
      }
    }
  }
}
</style>