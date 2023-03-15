import http from '../http-common'

class UserDataService {
    getAll() {
        return http.get('/orders')
    }

    getOne(id, time) {
        return http.get(`/orders/${id}`)
    }

    create(order) {
        return http.post('/orders', order)
    }

    update(id, data) {
        return http.put(`/orders/${id}`, data)
    }

    delete(id) {
        return http.delete(`/ordes/${id}`)
    }
}

export default new UserDataService()