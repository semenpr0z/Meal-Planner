<script>
import Link from './ui-kit/Link-ui.vue'
import IconMenuUi from './ui-kit/Icon-menu-ui.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Link,
    IconMenuUi
  },
  methods: {
    
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
        ]
    }
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
                <Link class="menu-items-desktop"
                    v-for="item of menu"
                        :key="item.id"
                        :text="item.text"
                        :Link="item.Link"
                        :active="item.active"/>
            </div>
            <router-link to="/profile">
                <img src="/svg/logo-profile.svg" alt="Профиль" class="navbar-profile">
            </router-link>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: center;
}
.navbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1132px;
    padding: 16px 64px;
    gap: 20px;
    &-logo{
        width: 166px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        &__link{
            text-decoration: none;
        }
        &__span{
            color: var(--Black);
            &_orange{
                color: radial-gradient(110.53% 110.53% at -5.92% 50%, #FF6B00 8.89%, #FF813A 44.82%, #FFAC2F 95.75%);
            }
        }
    }
    &-links{
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 442px;
        height: 24px;
    }
    &-profile{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 24px;
        height: 24px;
    }
}
@media screen and (max-width: 960px){
    .navbar{
    gap: 110px;
    }
}


@media screen and (max-width: 650px) {
    .menu-items-desktop{
        display: none;
    }
    .navbar-profile-desktop{
        display: none;
    }
}
</style>