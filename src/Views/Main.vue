<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue'
import Button from '@/components/ui-kit/Button-ui.vue'
import LoginForm from '@/components/Login-form.vue';
import RegistrationForm from '@/components/Registration-form.vue';
import FooterPromo from '@/components/FooterPromo.vue';

import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'

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
          text: 'Планировщик',
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
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    Button,
    LoginForm,
    RegistrationForm,
    FooterPromo
  },
  methods: {
    loggedIn() {
      if (this.userStore.user) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        router.push('/menu')
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        this.showLogin()
      }
    },
    showLogin() {
      this.startFormVisible = false;
      this.loginFormVisible = true;
    },
    showRegistration() {
      this.loginFormVisible = false;
      this.registrationFormVisible = true
    }
  },
  computed: {
    textBtn() {
      if (this.userStore.user) {
        return 'Спланировать меню'
      } else {
        return 'Зарегистрироваться'
      }
    }
  }
};
</script>

<template>
  <Navbar :menu="Navigation"></Navbar>
  <main class="main main-relative">
    <div class="wrapper">
      <TransitionGroup appear name="fade">
        <section class="start" v-if="startFormVisible">
          <div class="start__text-button">
            <h1 class="start__text-button__h1 h-main">PlanMenu</h1>
            <h3 class="start__text-button__h3 h-1">Планировщик меню на неделю, <br>где собраны твои любимые рецепты</h3>
            <p class="start__text-button__p h-2">Cпланируем твое меню на неделю? </p>
            <Button class="start__text-button__btn" :text="textBtn" @click="loggedIn" />
          </div>
          <img src="/img/img-iPhone-main.png" class="start__img">
        </section>
        <LoginForm v-if="loginFormVisible" key="login" @show-registration="showRegistration" class="LoginForm"
          id="authtorization" />

        <RegistrationForm v-if="registrationFormVisible" key="registration" @show-login="showLogin" />
      </TransitionGroup>
    </div>
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
    <TransitionGroup appear name="fade">
      <section class="benefits" key="benefits">
        <div class="benefits__benefit">
          <img class="benefits__benefit__img-convenience" src="/img/img-convenience.png" alt="Удобство">
          <div class="benefits__benefit-text">
            <p class="benefits__benefit-text-p h-1">Удобный календарь на неделю</p>
            <p class="p-2">Собирайте план сразу из готовых блюд.<br>Календарь нагляден и всегда под
              рукой!</p>
          </div>
        </div>
        <div class="benefits__benefit">
          <div class="benefits__benefit-text">
            <p class="benefits__benefit-text-p h-1">Сбалансированные рецепты</p>
            <p class="p-2">Рецепты подобраны с учетом принципов<br> здорового питания и
              отображением КБЖУ.<br> Готовые блюда позволят питаться правильно легко!</p>
          </div>
          <img class="benefits__benefit__img-balance" src="/img/img-balance.png">
        </div>
        <div class="benefits__benefit">
          <img class="benefits__benefit__img-optimize" src="/img/img-optimize.png">
          <div class="benefits__benefit-text">
            <p class="benefits__benefit-text-p h-1">Оптимизируем расходы</p>
            <p class="p-2">Уменьшаем еженедельные стихийные траты<br> на продукты за счет
              грамотного планирования</p>
          </div>
        </div>
      </section>
      <section class="suggestion" key="suggestion">
        <p class="h-1">Спланируем твое меню на неделю?</p>
        <Button :text="textBtn" @click="loggedIn" />
      </section>
    </TransitionGroup>
  </main>
  <FooterPromo> </FooterPromo>
  <NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.wrapper {
  width: 100%;
  position: relative;
}

.start {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 86px;
  z-index: 1;

  &__text-button {
    margin-top: 87px;

    &__h1 {
      color: var(--Orange);
    }

    &__h3 {
      color: var(--Black);
      margin-top: 32px;
    }

    &__p {
      display: flex;
      align-items: center;
      color: var(--Black);
      margin-top: 32px;
    }

    &__btn {
      margin-top: 20px;
    }
  }
}

.main-relative {
  position: relative;
}

.LoginForm {
  z-index: 1;
}


.background-images {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: -2;

  &__img {
    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 60px;

      &-wrapper {
        width: 649px;
        display: flex;

        &-right {
          justify-content: flex-end;
          padding-right: 66px;
        }
      }
    }
  }
}

.benefits {
  margin: 151px 0 100px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  &__benefit {
    display: flex;
    gap: 32px;
    justify-content: center;

    &:nth-child(odd) {
      justify-content: flex-start;
    }

    &-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12.5px;

      &-p {
        color: var(--Black);
      }
    }
  }
}

.suggestion {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  padding: 35px 0;
  margin-bottom: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;

}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
}

@media screen and (max-width: 960px) {
  .start {
    margin-top: 48px;
    align-items: center;

    &__text-button {
      margin: 0;
      height: max-content;

      &__btn {
        margin-top: 24px;
      }
    }
  }

  .benefits {
    margin-top: 127px;

    &__benefit {
      gap: 19px;


      &__img-convenience {
        width: 307px;
        height: 204.67px;
      }

      &__img-balance {
        width: 348px;
        height: 232.51px;
      }

      &__img-optimize {
        width: 348px;
        height: 228.93px;
      }
    }
  }
}

@media (max-width: 750px) {
  .benefits{
    margin: 30px 0 24px;
    gap: 39px;

  }
  .suggestion{
    margin-bottom: 24px;
    width: 100%;
    align-items: normal;
    p{
      text-align: center;
    }
  }
  .start {
    &__img {
      display: none;
    }

    &__text-button {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}

@media (max-width: 575px) {
  .benefits {
    
    &__benefit {
      align-items: center;
      gap: 8px;

      &__img-convenience {
        width: 140px;
        height: 93.33px;
      }

      &__img-balance {
        width: 140px;
        height: 93.33px;
      }

      &__img-optimize {
        width: 140px;
        height: 93.33px;
      }
    }
  }
}

@media (max-width: 360px) {
  .benefits{
    &__benefit{
      align-items: flex-start;
      flex-direction: column;
      &:nth-child(even){
        flex-direction: column-reverse;
      }
    }
  }
}
</style>