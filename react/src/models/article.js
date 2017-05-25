import { message } from 'antd'
import { handleArrWidthKey } from '../utils/reactSyntax'
import { post, fetch, del, update } from '../services/article'
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { routerRedux } from 'dva/router'

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
            _id: null,
            title: null,
            content: null,
            editorState: null,
            keywords: []
        },
        preview: {
            _id: null,
            title: null,
            content: null,
            editorState: null,
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
            const { editorState } = payload
            // const content = draft2Md(convertToRaw(editorState.getCurrentContent()))
            const content = convertToRaw(editorState.getCurrentContent())
            try {
                var { data } = yield call(post, {
                    ...payload, content
                })
                if(data) {
                    yield put({type: 'postSuccess', payload: data})
                    message.success(payload._id ? '更新成功！' : '创建成功！')
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
        },
        *update({payload}, {call, put}){
            try {
                var { data } = yield call(update, payload)
                if (data) {
                    yield put({type: 'updateArticle', data})
                    message.success('更新成功！')
                }
            } catch (err) {
                message.error(err.message)
            }
        },
        *requirePreviewPrepared({next, payload}, {call, put}){
            try {
                var { data } = yield call(fetch, payload)
                if (data[0]){
                    yield put({type: 'previewPrepared', payload: data[0]})
                    typeof next === 'function' && next()
                }
            } catch (err) {
                message.error(err.message)
            }
        },
        *requireDraftPrepared({next, payload}, {call, put}){
            try {
                var { data } = yield call(fetch, payload)
                if (data[0]){
                    yield put({type: 'draftPrepared', payload: data[0]})
                    typeof next === 'function' && next()
                }
            } catch (err) {
                message.error(err.message)
            }
        },
        *editDraft({payload}, {call, put}){
            yield put({type: 'updateDraft', payload})
        },
        *resetDraft({}, {put}){
            yield put({type: 'resetDraftToNull'})
            yield put(routerRedux.replace('/admin/add'))
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
        },
        previewPrepared(state, {payload}){
            const { preview } = state
            const contentState = payload.content
            contentState.entityMap = contentState.entityMap || {}
            const rawContent = convertFromRaw(contentState)
            const editorState = EditorState.createWithContent(rawContent)

            return {
                ...state, preview: {...payload, editorState}
            }            
        },
        resetDraftToNull (state, {payload}) {
            return {
                ...state, draft: {
                    _id: null,
                    title: null,
                    content: null,
                    editorState: null,
                    keywords: []
                },
            }
        },
        draftPrepared(state, {payload}) {
            const { draft } = state
            // const contentState = md2Draft(payload.content)
            const contentState = payload.content
            contentState.entityMap = contentState.entityMap || {}
            const rawContent = convertFromRaw(contentState)
            const editorState = EditorState.createWithContent(rawContent)
            
            return {
                ...state, draft: {...payload, editorState}
            }
        },
        updateArticle(state, {payload}){
            const { articles } = state
            var target = articles.find(item => item._id === payload._id)
            target = {
                ...target, payload
            }
            console.log(articles)
            return {
                ...state, articles
            }
        },
        updateDraft(state, {payload}){
            return {
                ...state, draft: payload
            }
        }
    }
}