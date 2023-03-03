import {defineStore} from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: [
            {
                "firstName": "qwerty",
                "email": "d@mail.ru",
                "password": "qwerty",
                "sex": "male",
                "age": 21,
                "creationDate": 1677688801,
                "id": "1"
            }
        ]
    })
})