import axios from 'axios'



axios.interceptors.request.use((config) => {
    return config
})

axios.interceptors.response.use((res) => {
    if (res.status !== 200) {
        return Promise.reject(res.data)
    }
    return res.data;
}, (error) => {
    return Promise.reject(error.response.data)
})

export default axios