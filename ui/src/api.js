import axios from 'axios'

const api = axios.create({
baseURL : "https://ngineer.run.place/api/",
timeout : 5000,
})


export default api;