/**
 * handle localStorage
 */

const STORE_PREFIX = 'fsblog'

exports.setItem = function(key, value){
    window.localStorage.setItem(STORE_PREFIX + '-' + key, value)
}

exports.getItem = (key) => {
    return window.localStorage.getItem(STORE_PREFIX + '-' + key, value)
}