import request from '../utils/request'
import LocalStorage from '../services/LocalStorage'
import { stringify } from 'querystring'

export const query = (queryObject) => {
    const params = stringify(queryObject)

    return request(`/api/v1/media?${params}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
}

export const create = (payload) => {
    const TOKEN = LocalStorage.getItem('token')

    return request('/api/v1/media', {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }),
        body: JSON.stringify(payload)
    })
}

export const del = (_id) => {
    const TOKEN = LocalStorage.getItem('token')

    return request(`/api/v1/media/${_id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
    })
}