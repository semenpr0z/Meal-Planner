<script>
import Link from './ui-kit/Link-ui.vue'
import IconMenuUi from './ui-kit/Icon-menu-ui.vue';

import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router.js'

export default {
    data() {
        return {
            modalProfileVisible: false,
            colorProfile: false
        };
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    components: {
        Link,
        IconMenuUi
    },
    methods: {
        showModalProfile() {
            if (this.userStore.user) {
                if (!this.modalProfileVisible) {
                    this.modalProfileVisible = true
                } else {
                    this.modalProfileVisible = false
                }
            } else {
                alert('Вы не авторизованы! Авторизуйтесь на главной странице.')
            }
        },
        moveToProfile() {
            router.push('/profile')
        },
        logOut() {
            localStorage.removeItem("user");
            this.userStore.user = null
            router.push('/main')
            this.modalProfileVisible = false
        },
        handleKeydown(event) {
            if (event.keyCode === 27) {
                this.modalProfileVisible = false
            }
        },
        profileColor(){
            if(this.$route.path === '/profile'){
                this.colorProfile = true
            }
        }
    },
    props: {
        menu: {
            type: Array,
            default: [
                {
                    id: 1,
                    text: 'Главная',
                    Link: '/main',
                    active: false
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
            ]
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeydown)
        this.profileColor()
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeydown)
    }
};
</script>

<template>
    <header class="header">
        <nav class="navbar navbar-desktop">
            <router-link to="/main" class="navbar-logo__link">
                <div class="navbar-logo">
                    <img src="/svg/icon-logo.svg" alt="">
                    <span class="navbar-logo__span logotype">PlanMenu</span>
                </div>
            </router-link>
            <div class="navbar-links">
                <Link class="menu-items-desktop" v-for="item of menu" :key="item.id" :text="item.text" :Link="item.Link"
                    :active="item.active" />
            </div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" @click="showModalProfile" alt="Профиль"
                class="navbar-profile">
                <path v-if="!colorProfile"
                    d="M8 2.4C8.27578 2.4 8.54885 2.45432 8.80364 2.55985C9.05842 2.66539 9.28992 2.82007 9.48492 3.01508C9.67993 3.21008 9.83461 3.44158 9.94015 3.69636C10.0457 3.95115 10.1 4.22422 10.1 4.5C10.1 4.77578 10.0457 5.04885 9.94015 5.30364C9.83461 5.55842 9.67993 5.78992 9.48492 5.98492C9.28992 6.17993 9.05842 6.33461 8.80364 6.44015C8.54885 6.54568 8.27578 6.6 8 6.6C7.44305 6.6 6.9089 6.37875 6.51508 5.98492C6.12125 5.5911 5.9 5.05695 5.9 4.5C5.9 3.94305 6.12125 3.4089 6.51508 3.01508C6.9089 2.62125 7.44305 2.4 8 2.4ZM8 11.4C10.97 11.4 14.1 12.86 14.1 13.5V14.6H1.9V13.5C1.9 12.86 5.03 11.4 8 11.4ZM8 0.5C5.79 0.5 4 2.29 4 4.5C4 6.71 5.79 8.5 8 8.5C10.21 8.5 12 6.71 12 4.5C12 2.29 10.21 0.5 8 0.5ZM8 9.5C5.33 9.5 0 10.84 0 13.5V16.5H16V13.5C16 10.84 10.67 9.5 8 9.5Z"
                    fill="black" />
                <path v-else
                    d="M8 2.4C8.27578 2.4 8.54885 2.45432 8.80364 2.55985C9.05842 2.66539 9.28992 2.82007 9.48492 3.01508C9.67993 3.21008 9.83461 3.44158 9.94015 3.69636C10.0457 3.95115 10.1 4.22422 10.1 4.5C10.1 4.77578 10.0457 5.04885 9.94015 5.30364C9.83461 5.55842 9.67993 5.78992 9.48492 5.98492C9.28992 6.17993 9.05842 6.33461 8.80364 6.44015C8.54885 6.54568 8.27578 6.6 8 6.6C7.44305 6.6 6.9089 6.37875 6.51508 5.98492C6.12125 5.5911 5.9 5.05695 5.9 4.5C5.9 3.94305 6.12125 3.4089 6.51508 3.01508C6.9089 2.62125 7.44305 2.4 8 2.4ZM8 11.4C10.97 11.4 14.1 12.86 14.1 13.5V14.6H1.9V13.5C1.9 12.86 5.03 11.4 8 11.4ZM8 0.5C5.79 0.5 4 2.29 4 4.5C4 6.71 5.79 8.5 8 8.5C10.21 8.5 12 6.71 12 4.5C12 2.29 10.21 0.5 8 0.5ZM8 9.5C5.33 9.5 0 10.84 0 13.5V16.5H16V13.5C16 10.84 10.67 9.5 8 9.5Z"
                    fill="#FF8A00" />
            </svg>
            <div class="modal-profile" v-if="modalProfileVisible">
                <p class="p-1 modal-profile__p modal-profile__p_top" @click="moveToProfile">Личный кабинет</p>
                <div class="modal-profile__border"></div>
                <p class="p-1 modal-profile__p" @click="logOut"><img src="/svg/icon-logout.svg">Выйти из аккаунта</p>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: center;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1132px;
    padding: 16px 64px;
    gap: 20px;
    position: relative;

    &-logo {
        width: 166px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;

        &__link {
            text-decoration: none;
        }

        &__span {
            color: var(--Black);

            &_orange {
                color: radial-gradient(110.53% 110.53% at -5.92% 50%, #FF6B00 8.89%, #FF813A 44.82%, #FFAC2F 95.75%);
            }
        }
    }

    &-links {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 442px;
        height: 24px;
    }

    &-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        min-width: 24px;
        min-height: 24px;
    }
}

.modal-profile {
    position: absolute;
    width: 259px;
    height: 148px;
    background-color: var(--White);
    border: 3px solid #ECECEC;
    border-radius: 30px;
    right: 64px;
    top: 64px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__p {
        display: flex;
        align-items: center;

        &_top {
            padding: 31px 0 0;
        }

        &:hover {
            cursor: pointer;
        }
    }

    &__border {
        width: 180px;
        border-top: 3px solid #ECECEC;
        margin: 22px;
    }
}

@media screen and (max-width: 960px) {
    .navbar {
        gap: 110px;
    }
}


@media screen and (max-width: 650px) {
    .menu-items-desktop {
        display: none;
    }

    .navbar-profile-desktop {
        display: none;
    }
}</style>