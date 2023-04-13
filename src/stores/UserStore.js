import {defineStore} from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        userOrders: [],
        userDataOnChange: null,
        passwordOnCheck: ''
    }),
    actions: {
        async changeUser(user) {
            this.user = await user
            this.userDataOnChange = Object.assign({}, this.user)
        },
        async loadOrders(orders) {
            this.userOrders = orders
        },
        logOut(){
            this.user = null,
            this.userDataOnChange = null
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