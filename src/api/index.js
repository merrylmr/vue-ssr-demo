import axios from './http.js'

export function fetchItem(id) {
    console.log('fetchItem', id)
    return axios.get('https://getman.cn/mock/api/detail')
}