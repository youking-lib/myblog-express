import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import AddComponent from 'components/Admin/Add'

const { Header, Content, Footer, Sider } = Layout


const AdminArticleList = (props) => {

    const { dispatch, keywords } = props

    function handleSubmit(payload, next){
        dispatch({type: 'article/post', payload, next})
    }

    return (
        <AddComponent keywords={keywords} postArticle={handleSubmit} />
        )
}

function mapStateToProps({keyword}) {
    const { keywords } = keyword

    return {
        keywords
    }
}

export default connect(mapStateToProps)(AdminArticleList)