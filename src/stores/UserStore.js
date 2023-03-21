import {defineStore} from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        userInLocalStorage: localStorage.getItem('user'),
        userOrders: []
    }),
    actions: {
        async changeUser(user) {
            this.user = await user
        },
        async loadOrders(orders) {
            this.userOrders = orders
        }
    }
})

// {
//     "firstName": "qwerty",
//     "email": "d@mail.ru",
//     "password": "qwerty",
//     "sex": "male",
//     "age": 21,
//     "creationDate": 1677688801,
//     "id": "1"
// }