<script>
import InputPassword from '@/components/ui-kit/Input-password.vue'
import ButtonUi from '@/components/ui-kit/Button-ui.vue'

import UserDataService from '../services/UserDataService'
import { useUserStore } from '@/stores/UserStore.js'

export default {
  data() {
    return {
      data: true
    }
  },
  methods: {
    closeConfirmation() {
      this.userStore.passwordOnCheck = ''
      this.$emit('closeConfirmation')
    },
    forgotPassword(){
      alert('Ничего страшного, обязательно вспомните')
    },
    async changeData(){
      let tempUser = await (await UserDataService.getAll()).data.find(currentUser => (currentUser.email == this.userStore.user.email && currentUser.password == this.userStore.user.password))
      if(tempUser.password === this.userStore.passwordOnCheck){
        UserDataService.update(this.userStore.user.id, this.userStore.userDataOnChange)
      }
    }
  },
  emits: ['closeConfirmation'],
  components: {
    InputPassword,
    ButtonUi
},
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  }
}
</script>

<template>
  <div class="absolute-wrapper">
    <div class="background-modal" @click="closeConfirmation">
    </div>
    <div class="confirmation">
      <div class="confirmation__header">
        <p class="p-1">Подтвердите изменения</p>
        <button title="Вернуться к изменениям" class="confirmation__header__btn" @click="closeConfirmation"><img
            src="/svg/icon-close.svg" alt="Закрыть"></button>
      </div>
      <div class="confirmation__main">
        <span class="span-2">Для изменения данных необходимо подтвердить, что вы являетесь владельцем аккаунта</span>
        <InputPassword :data="data" class="confirmation__main__input"/>
        <p class="p-2" @click="forgotPassword">Забыли пароль?</p>
        <div class="confirmation__main__btns">
          <ButtonUi text="Отменить" color="red" :shortButton="true" @click="closeConfirmation"/>
          <ButtonUi text="Подтвердить" color="green" :shortButton="true" @click="changeData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.background-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(27, 27, 26, 0.2);
  z-index: 2;
  cursor: pointer;
  padding-right: 5px;
}

.confirmation {
  position: fixed;
  top: calc(50% - 182px);
  left: calc(50% - 251.5px);
  width: 503px;
  height: 364px;
  background-color: var(--White);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid var(--Gray);
  border-radius: 30px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    width: calc(100% - 48px);
    border-bottom: 3px solid var(--Gray);

    &__btn {
      background-color: transparent;
      border: none;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    width: calc(100% - 48px);

    .span-2 {
      padding-top: 24px;
      color: var(--Text_gray);
    }

    &__input{
      margin-top: 16px;
      width: 100%;
    }

    .p-2{
      cursor: pointer;
      padding: 8px 0 0 32px;
      width: max-content;
    }

    &__btns{
      display: flex;
      justify-content: flex-end;
      gap: 11px;
      margin-top: 29px;
    }
  }
}</style>