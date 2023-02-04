import {createRouter, createWebHistory} from 'vue-router';
import Registration from '@/Views/Registration.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name: 'Registration',
            component: Registration
        }
    ]
})

export default router;