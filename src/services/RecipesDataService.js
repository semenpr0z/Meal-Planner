import http from '../http-common'

class RecipesDataService {
    getAll() {
        return http.get('/recipes')
    }

    getOne(id) {
        return http.get(`/recipes/${id}`)
    }
}

export default new RecipesDataService()
