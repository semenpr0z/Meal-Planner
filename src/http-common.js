import axios from 'axios'

// export default axios.create({
//     baseURL: "http://localhost:9090/",
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

export default axios.create({
    baseURL: "https://63f0ad9c5703e063fa4a4a59.mockapi.io/api/",
    headers: {
        'Content-Type': 'application/json'
    }
})