import http from '../http-common2'

class OrderDataService {
    getAll() {
        return http.get('/orders')
    }

    getOne(id) {
        return http.get(`/orders/${id}`)
    }

    create(order) {
        return http.post('/orders', order)
    }

    delete(id) {
        return http.delete(`/orders/${id}`)
    }
}

export default new OrderDataService()