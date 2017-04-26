import request from '../utils/request'
import LocalStorage from '../services/LocalStorage'

export const auth = (payload) => {
    return request('/api/v1/token')
}

export const login = (payload) => {
    
    return request('/api/v1/login', {
        method: 'post',
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(payload)
    })
}

export const getUserByToken = () => {
    const token = LocalStorage.getItem('token')

    return request('/api/v1/user', {
        method: 'get',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}