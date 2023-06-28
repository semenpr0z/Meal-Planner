<script>
import ButtonUI from '@/components/ui-kit/Button-ui.vue'
import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'    

export default {
    props: {
        user: {
            type: Object,
            default: {
                date_of_birth: "2001-08-08",
                email: "1234@1234",
                first_name: "Семен",
                id: "1",
                password: "1234",
                sex: "male"
            }
        },
    },
    methods: {
        formatDate(date) {
            const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formattedDate = formatter.format(new Date(date));
            return formattedDate.replace(/-/g, '.');
        },
        logOut() {
            localStorage.removeItem("user");
            this.userStore.user = null
            router.push('/main')
        }
    },
    components: {
        ButtonUI
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
}
</script>

<template>
    <div class="profile-info">
        <h2 class="h-1 title">Личные данные</h2>
        <div class="info-group">
            <div class="info-item">
                <span class="h-2">Имя:</span>
                <span class="p-1">{{ user.first_name }}</span>
            </div>
            <div class="info-item">
                <span class="h-2">Пол:</span>
                <span class="p-1">{{ user.sex === 'male' ? 'Мужской' : 'Женский' }}</span>
            </div>
            <div class="info-item">
                <span class="h-2">E-mail:</span>
                <span class="p-1">{{ user.email }}</span>
            </div>
            <div class="info-item">
                <span class="h-2">Дата рождения:</span>
                <span class="p-1">{{ formatDate(user.date_of_birth) }}</span>
            </div>
        </div>
        <img src="/img/img-profile.png" class="img">
        <ButtonUI text="Выйти из аккаунта" class="btn" color="gray" @click="logOut" />
    </div>
</template>

<style lang='scss' scoped>
.profile-info {
    padding: 40px 33px;
    border: 3px solid #ECECEC;
    border-radius: 30px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    .title {
        margin-bottom: 32px;
    }

    .info-group {
        display: flex;
        flex-direction: column;
        width: 350px;
        align-items: flex-start;
        gap: 24px;

        .info-item {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    }

    .img {
        height: 290px;
    }

    .btn {
        margin-top: 40px;
        padding: 15px 24px;
    }
}

@media (max-width: 440px) {
    .profile-info {
        padding: 40px 20px;

        .info-group {
            width: 100%;
        }
    }
}
</style>