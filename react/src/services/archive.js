import request from '../utils/request'
import { stringify } from 'querystring'
import LocalStorage from '../services/LocalStorage'

export const query = (_query) => {
    const params = stringify(_query)
    const TOKEN = LocalStorage.getItem('token')

    return request(`/api/v1/timeline?${params}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        })
    })
}