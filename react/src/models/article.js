import { message } from 'antd'
import { handleArrWidthKey } from '../utils/reactSyntax'
import { post, fetch, del } from '../services/article'

function sleep(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time)
    })
}

export default {
    namespace: 'article',
    state: {
        articles: [],
        draft: {
            title: null,
            content: '',
            keywords: []
        }
    },
    subscriptions: {},
    effects: {
        *requireArticles({next}, {call, put, take}){
            yield put({type: 'fetch'})
            yield take('article/fetchSuccess')
            next()
            yield true
        },
        *fetch({payload}, {call, put}){
            try {
                const { data } = yield call(fetch)
                yield put({type: 'fetchSuccess', payload: data})
            } catch(err) {
                message.error(err.message)
            }
        },
        *post({payload, next}, {call, put}){
            try {
                var { data } = yield call(post, payload)
                if(data) {
                    yield put({type: 'postSuccess', payload: data})
                    message.success('创建成功')
                    typeof next === 'function' && next()
                }
            } catch(err) {
                message.error(err.message)
            }
        },
        *del({payload}, {call, put}){
            try {
                var { data } = yield call(del, payload)
                yield put({type: 'deleteArticle', payload})
                message.success('删除成功！')
            } catch (err) {
                message.error(err.message)
            }
        }
    },
    reducers: {
        fetchSuccess(state, {payload}){
            return {
                ...state, articles: handleArrWidthKey(payload)
            }
        },
        postSuccess(state, {payload}){
            let { articles } = state
            articles.push(payload)
            articles = handleArrWidthKey(articles)

            return {
                ...state, articles
            }
        },
        deleteArticle(state, {payload}){
            const { articles } = state
            const _articles = articles.filter(item => item._id !== payload)
            return {
                ...state, articles: _articles
            }
        }
    }
}