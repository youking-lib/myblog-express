import request from '../utils/request'

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