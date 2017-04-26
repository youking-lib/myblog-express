import request from '../utils/request'
import LocalStorage from './LocalStorage'

export const post = (payload) => {

    const TOKEN = LocalStorage.getItem('token')
    
    return request('/api/v1/article', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }),
        body: JSON.stringify(payload)
    })
}

export const fetch = (payload) => {
    const TOKEN = LocalStorage.getItem('token')

    return request('/api/v1/article', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        })
    })
}

export const del = (_id) => {
    const TOKEN = LocalStorage.getItem('token')

    return request(`/api/v1/article/${_id}`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }),
    })
}