import axios from 'axios'

export default axios.create({
    baseURL: "https://64131aa93b710647375f9037.mockapi.io/api/", 
    headers: {
        'Content-Type': 'application/json'
    }
})