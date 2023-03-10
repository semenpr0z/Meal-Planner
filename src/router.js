import {createRouter, createWebHistory} from 'vue-router';
import Start from '@/Views/Start.vue';
import Main from '@/Views/Main.vue';
import Menu from '@/Views/Menu.vue';
import Recipes from '@/Views/Recipes.vue';
import Profile from '@/Views/Profile.vue'
import Page404 from '@/Views/Page404.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            alias: '/users',
            name: 'Start',
            component: Start
        },
        {
            path: '/main',
            name: 'Main',
            component: Main
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu
        },
        {
            path: '/recipes',
            name: 'Recipes',
            component: Recipes
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: Page404
        }
    ]
})

export default router;