import React from 'react'
import { connect } from 'dva'

import KeywordComponent from 'components/Admin/Keyword'

const Keyword = (props) => {
    return (
        <KeywordComponent {...props} />
        )
}

function mapStateToProps(state){
    const { keyword } = state
    return {
        keywords: keyword.keywords
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createKeyword(payload){
            dispatch({type: 'keyword/create', payload})
        },
        deleteKeyword(_id){
            dispatch({type: 'keyword/delete', payload: {_id}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyword)