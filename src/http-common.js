import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

console.log(apiUrl)

export default axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})