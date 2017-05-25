import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Icon, message } from 'antd';

import AddComponent from 'components/Admin/Add'

const { Header, Content, Footer, Sider } = Layout


const AdminArticleAdd = ({ dispatch, keywords, routeParams, draft, postArticle, handleEidting, resetDraft }) => {
    const mapProps = {
        dispatch, keywords, draft, postArticle, handleEidting, resetDraft,
        routeParams: routeParams || {}
    }
    return (
        <AddComponent {...mapProps} />
        )
}

function mapStateToProps({keyword, article}, {routeParams}) {
    const { keywords } = keyword
    const { draft } = article
    
    return {
        keywords, draft
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleEidting(payload){
            dispatch({type: 'article/editDraft', payload})
        },
        postArticle(payload, next){
            dispatch({type: 'article/post', payload, next})
        },
        resetDraft(){
            dispatch({type: 'article/resetDraft'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticleAdd)