import { fetch, create, del } from '../services/keyword'
import { message } from 'antd'

function handleArrWidthKey(arr) {
    return arr.map((item, key) => ({...item, key: String(key)}))
}

export default {
    namespace: 'keyword',
    state: {
        keywords: [],
    },
    subscriptions: {},
    effects: {
        *requireKeywords({payload, next}, {call, put, take}) {
            yield put({type: 'fetch'})
            yield take('keyword/fetchSuccess')
            typeof next === 'function' && next()
        },
        *fetch({payload, next}, {call, put}) {
            try {
                const { data } = yield call(fetch)
                yield put({type: 'fetchSuccess', payload: data})
            } catch (err) {
                console.log(err)
            }
        },
        *create({payload}, {call, put}) {
            try {
                const { data } = yield call(create, payload)
                yield put({ type: 'createKeyword', payload: data })
                message.success('创建成功！')
            } catch (err) {
                message.error(err.message)
            }
        },
        *delete({payload}, {call, put}) {
            console.log(payload)
            try {
                const { data } = yield call(del, payload._id)
                yield put({type: 'deleteKeyword', payload})
                message.success('删除成功！')
            }catch(err){
                message.error(err.message)
            }
        }
    },
    reducers: {
        fetchSuccess(state, {payload}){
            const keywords = handleArrWidthKey(payload)
            return {
                ...state, keywords
            }
        },
        createKeyword(state, {payload}){
            let { keywords } = state
            keywords.push(payload)
            keywords = handleArrWidthKey(keywords)
            return {
                ...state, keywords
            }
        },
        deleteKeyword(state, {payload}){
            let { keywords } = state
            keywords = keywords.filter(item => item._id !== payload._id)
            return {
                ...state, keywords
            }
        }
    }
}