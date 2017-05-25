import request from '../utils/request'
import LocalStorage from './LocalStorage'
import { stringify } from 'querystring'

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
    const query = stringify(payload)

    return request('/api/v1/article?' + query, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        })
    })
}

export const del = (_id) => {
    const TOKEN = LocalStorage.getItem('token')

    return request(`/api/v1/article/${_id}`, {
        method: 'delete',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }),
    })
}

export const update = (payload) => {
    const TOKEN = LocalStorage.getItem('token')

    return request(`/api/v1/article`, {
        method: 'put',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }),
        body: JSON.stringify(payload)
    })
}