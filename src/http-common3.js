import axios from 'axios'

export default axios.create({
    baseURL: "https://cicd-repo-dev.naglfar.mgla.dev/",
    headers: {
        'Content-Type': 'application/json'
    }
})