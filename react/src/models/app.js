import { login } from '../services/account'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import localStorage from '../services/localStorage'

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
    subscriptions: {},
    effects: {
        *login({payload}, {call, put}){

            const { callback } = payload

            try {
                const { data } = yield call(login, payload)

                if(data){

                    yield put({
                        type: 'loginSuccess',
                        payload: { callback, account: data }
                    })

                    localStorage.setItem('token', 'admin12312313123')

                    yield put(routerRedux.push('/admin'))
                }else{
                    throw new Error('login error')
                }
            } catch (err) {
                
                put({type: 'loginError', payload: {}, err})
            }
        },
        *requireAdmin({payload}, {call, put}){
            yield [put('checkToken'), put('getUserByToken')]
        },

        *checkToken({}, {call, put}){
            const Token = localStorage.getItem('token')

            if(Token){
                yield put({type: 'hasToken'})
            }else{
                throw new Error('unlogin...')
            }
        },

        *getUserByToken({}, {call, put}){

        }


    },
    reducers: {
        loginSuccess(state, {payload}){
            
            const { account, callback } = payload
            typeof callback === 'function' && callback()
            
            message.success('success and welcome')

            return {
                ...state, 
                account,
                isLogin: true
            }
        },
        loginError(state, { payload, err }){

            message.error(err.message, 4)

            return {
                ...state, isLogin: false
            }
        },

        requireAdmin(state, {payload}){
            
            if (state.isLogin) {
                
                if(state.account.level >= 11) {
                    payload.next()
                }else{
                    message.error('你不是管理员哦！')
                }
            } else {
                message.warning('你还没有登录', 4)
            }

            return {
                ...state
            }
        },
        hasToken(state){
            return {
                ...state, isLogin: true
            }
        }
    }
}