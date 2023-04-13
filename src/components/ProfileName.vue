<script>
import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'

export default {
    data() {
        return {
            defaultId: '00000000'
        }
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    computed: {
        userId() {
            return 'ID:' + this.defaultId.slice(0, this.defaultId.length - this.userStore.user.id.length) + this.userStore.user.id
        }
    },
    methods: {
        logOut(){
            console.log('logOut')
            localStorage.removeItem("user");
            this.userStore.user = null
            router.push('/main')
        },
        deleteProfile(){
            this.$emit('deleteProfile')
        }
    },
    emits: ['deleteProfile']
}
</script>

<template>
    <div class="profile-name">
        <div class="profile-name-wrapper">
            <h2 class="h-2 profile-name__text profile-name-h2">{{ userStore.user.firstName }}</h2>
            <span class="span-3 profile-name__text profile-name-span-3">{{ userId }}</span>
            <img src="/img/img-profile.png" alt="Фоновая картинка">
        </div>
        <div class="profile-name-wrapper">
            <button class="button-logout" @click="logOut"><p class="p-1">Выйти из аккаунта</p></button>
            <button class="button-delete" @click="deleteProfile"><span class="span-2">Удалить аккаунт</span></button>
            <span class="span-3 profile-name__text">{{ 'Вы с нами с ' + new Date(userStore.user.creationDate).toLocaleDateString() }}</span>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.profile-name {
    display: flex;
    flex-direction: column;
    padding: 31px 5px;
    border: 3px solid #ECECEC;
    border-radius: 30px;
    justify-content: space-between;
    height: 70vh;
    &-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;

        button{
            border: none;
            background-color: transparent;
            cursor: pointer;
        }

        .button-logout{
            margin-bottom: 14px;
        }
        .button-delete{
            margin-bottom: 10px;

            .span-2{
                color: #D02500;
            }
        }
    }

    &__text {
        color: var(--Text_gray);
    }

    &-h2 {
        padding-bottom: 4px;
    }

    &-span-3 {
        padding-bottom: 9px;
    }
}</style>