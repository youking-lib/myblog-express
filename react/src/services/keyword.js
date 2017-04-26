import request from '../utils/request'
import LocalStorage from './LocalStorage'


export const fetch = (url, options) => {
    var TOKEN = LocalStorage.getItem('token')    
    
    return request('/api/v1/keyword', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        })
    })
}

export const create = (payload) => {
    var TOKEN = LocalStorage.getItem('token')    
    
    return request('/api/v1/keyword', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }),
        body: JSON.stringify(payload)
    })

}

export const del = (_id) => {
    var TOKEN = LocalStorage.getItem('token')

    return request(`/api/v1/keyword/${_id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        })
    })
}