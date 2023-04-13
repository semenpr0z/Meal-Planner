<script>
import Navbar from '@/components/navbar.vue';
import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';

import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'
import ProfileName from '@/components/ProfileName.vue';
import ProfileChange from '@/components/ProfileChange.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
    data() {
        return {
            action: '',
            confirmationVisible: false
        };
    },
    components: {
    Navbar,
    NavbarFooterMobile,
    ProfileName,
    ProfileChange,
    ConfirmationModal
},
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
        Start(){
            if(!this.userStore.user){
                alert('Вы не авторизованы! Авторизуйтесь на главной странице.')
                router.push('/main')
            }
        },
        deleteProfile(){
            this.showConfirmation('delete')
        },
        saveChanges(){
            this.showConfirmation('save')
        },
        showConfirmation(action){
            this.action = action
            this.confirmationVisible = true
        },
        closeConfirmation(){
            this.confirmationVisible = false
        }
    },
    beforeMount() {
        this.Start()
    }
}
</script>

<template>
    <Navbar></Navbar>
    <main class="main" v-if="userStore.user">
        <!-- <h1>Типа страница профиля</h1>
        <p>Имя: {{ userStore.user.firstName }}</p>
        <p>Электронная почта: {{ userStore.user.email }}</p>
        <p>Пол: {{ userStore.user.sex == 'male' ? 'Мужской' : 'Женский' }}</p>
        <p>Возраст: {{ userStore.user.age }}</p>
        <p>Дата регистрации: {{ new Date(userStore.user.creationDate).toLocaleDateString() }}</p> -->
        <ProfileName @deleteProfile="deleteProfile"/>
        <ProfileChange @saveChanges="saveChanges"/>
    </main>
    <ConfirmationModal v-if="confirmationVisible" @closeConfirmation="closeConfirmation"/>
    <NavbarFooterMobile></NavbarFooterMobile>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.main{
    margin-top: 65px;
    display: flex;
    flex-direction: row;
    gap: 29px;
}
</style>