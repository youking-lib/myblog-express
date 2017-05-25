import { query } from '../services/archive'
import { message } from 'antd'

export default {
    namespace: 'archive',
    state: {
        timeline: [
            {
                records: [],
                date: null
            },
        ]
    },
    subscriptions: {},
    effects: {
        *lazyloadTimeline({}, {call, put}){
            try {
                const { data } = yield call(query)
                
                if (data) {
                    yield put({type: 'queryTimelineSuccess', payload: data})
                }
            } catch (err) {
                message.error(err.message)
            }

        }
    },
    reducers: {
        queryTimelineSuccess(state, {payload}){
            return {
                ...state, timeline: payload
            }
        }
    }
}