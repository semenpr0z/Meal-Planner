import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl)

export default axios.create({
    baseURL: `https://${apiUrl}/`,
    headers: {
        'Content-Type': 'application/json'
    }
})