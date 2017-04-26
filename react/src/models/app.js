import { login, getUserByToken } from '../services/app'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import LocalStorage from '../services/LocalStorage'

export default {
    namespace: 'app',
    state: {
        isLogin: false,
        account: {
            username: '',
            level: 0,
            id: null,
        }
    },
    subscriptions: {
    },
    effects: {
        *login({payload}, {call, put}){

            const { callback } = payload

            try {
                const data = yield call(login, payload)
                const { token } = data
                
                if(token){

                    LocalStorage.setItem('token', token)

                    yield put({type: 'loginSuccess'})
                    yield put(routerRedux.push('/admin'))
                }
            } catch (err) {
                yield put({type: 'loginError', payload: {}, err})
            }
        },
        *requireAdmin({next}, {call, put, take}){
            yield [put({type: 'checkToken'}), put({type: 'getUserByToken'})]
            yield [take('app/hasToken'), take('app/getUserSuccess')]
            typeof next === 'function' && next()
        },

        *autoLogin({next}, {call, put, take}) {
            const Token = LocalStorage.getItem('token')
            next()

            if(Token) {
                yield put({type: 'requireAdmin'})  
            }else {
            }
        },

        *checkToken({}, {call, put}){
            const Token = LocalStorage.getItem('token')

            if(Token){
                yield put({type: 'hasToken'})
            }else{
                yield put({type: 'loginError', err: {message: '还没有登录'}})
                yield put(routerRedux.goBack())
            }
        },

        *getUserByToken({}, {call, put}){
            
            try {
                var data = yield getUserByToken()
                if(data) {
                    yield put({type: 'getUserSuccess', payload: data})
                }
            } catch (err) {
                yield put({type: 'loginError', err: {message: '登录失效了！'}})
                yield put(routerRedux.replace('/'))
            }
        },

        *logout({next}, {call, put}) {
            yield put({type: 'loginError', err: {message: '已注销'}})
            LocalStorage.removeItem('token')
            yield put(routerRedux.replace('/'))
            next()
        },

        *loginError({err}, {put}){
            message.error(err.message, 4)
            yield put({type: 'authAbort'})
        }

    },
    reducers: {
        loginSuccess(state, {payload}){
            typeof payload !== 'undefined' && typeof payload.callback === 'function' && callback()
            
            message.success('success and welcome')
            return {
                ...state, 
                isLogin: true
            }
        },
        
        hasToken(state){
            return {
                ...state, isLogin: true
            }
        },

        getUserSuccess(state, {payload}) {
            return {
                ...state, account: {...payload}
            }
        },

        authAbort(state) {
            return {
                ...state, isLogin: false, account: {
                    username: '',
                    level: 0,
                    id: null,
                }
            }
        }
    }
}