import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import ArticleList from 'components/Admin/ArticleList'

const { Header, Content, Footer, Sider } = Layout
let a = 1

const AdminArticleList = ({loading, articles, deleteArticle}) => {
    return (
        <ArticleList loading={loading} articles={articles} deleteArticle={deleteArticle} />
        )
}

function mapStateToProps({article, loading}) {
    const { articles } = article
    return {
        articles,
        loading: loading.effects['article/requireArticles']
    }
}

function mapDispatchToProps(dispatch){
    return {
        deleteArticle(_id){
            dispatch({type: 'article/del', payload: _id})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticleList)