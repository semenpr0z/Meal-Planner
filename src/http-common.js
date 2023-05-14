import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export default axios.create({
    baseURL: `https://63f0ad9c5703e063fa4a4a59.mockapi.io/api/`,
    headers: {
        'Content-Type': 'application/json'
    }
})