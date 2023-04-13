<script>
import { useUserStore } from '@/stores/UserStore.js'
import InputUI from '@/components/ui-kit/Input-ui.vue'
import InputRadio from '@/components/ui-kit/Input-radio.vue'
import InputDate from '@/components/ui-kit/Input-date.vue'
import InputName from '@/components/ui-kit/Input-name.vue'
import InputEmail from '@/components/ui-kit/Input-email.vue'
import InputPassword from '@/components/ui-kit/Input-password.vue'
import ButtonUI from '@/components/ui-kit/Button-ui.vue'

export default {
    data() {
        return {

        }
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    components: {
        InputUI,
        InputRadio,
        InputDate,
        InputName,
        InputEmail,
        InputPassword,
        ButtonUI
    },
    methods: {
        saveChanges() {
            this.$emit('saveChanges')
        }
    },
    emits: ['saveChanges']
}
</script>

<template>
    <div class="profile-change">
        <h2 class="h-2">Личные данные</h2>
        <InputRadio class="profile-change__sex" />
        <div class="profile-change__inputs">
            <InputName class="profile-change__inputs_width"/>
            <InputDate class="profile-change__inputs_width"/>
            <InputEmail class="profile-change__inputs_width"/>
            <InputPassword class="profile-change__inputs_width"/>
        </div>
        <ButtonUI class="profile-change__btn" text="Сохранить" @click="saveChanges" />
    </div>
</template>

<style lang='scss' scoped>
.profile-change {
    padding: 31px 5px;
    border: 3px solid #ECECEC;
    border-radius: 30px;
    width: calc(100% - 265px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70vh;

    &__sex {
        justify-content: center;
        margin-top: 66px;
    }

    &__inputs {
        margin-top: 27px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        &_width{
            width: 334px;
        }
    }

    &__btn {
        margin-top: 24px;
    }
}
</style>