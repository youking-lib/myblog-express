import { query, create, del } from '../services/media'
import { handleArrWidthKey } from '../utils/reactSyntax'
import { message } from 'antd'

export default {
    namespace: 'media',
    state: {
        pictrueWall: []
    },
    subscriptions: {},
    effects: {
        *queryPictureWall({payload, next}, {call, put}){
            try {
                const { data } = yield call(query, payload)
                if (data) {
                    yield put({type: 'queryPictureSuccess', payload: data})
                    next()
                }
            } catch (err) {
                message.error(err.message)
            }
        },
        *removePicture({payload}, {call, put}){
            try {
                const { status } = yield call(del, payload._id)
                if (status === 'success') {
                    yield put({type: 'removePictureSuccess', payload})
                }
            } catch (err) {
                message.error(err.message)
            }
        }
    },
    reducers: {
        createPictureSuccess(state, {payload}){
            let { pictrueWall } = state
            pictrueWall.push(payload)
            return {
                ...state, pictrueWall
            }
        },
        queryPictureSuccess(state, {payload}){
            return {
                ...state, pictrueWall: payload
            }
        },
        removePictureSuccess(state, {payload}) {
            let { pictrueWall } = state
            pictrueWall = pictrueWall.filter(item => item._id !== payload._id)
            return {
                ...state, pictrueWall
            }
        }
    }
}