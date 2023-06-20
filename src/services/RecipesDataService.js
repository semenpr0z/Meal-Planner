import http from '../http-common'

class RecipesDataService {
    getAll() {
        return http.get('/recipes')
    }

    getOne(id) {
        return http.get(`/recipes/${id}`)
    }

    createOne(recipe) {
        return http.post('/recipes', recipe)
    }
}

export default new RecipesDataService()
