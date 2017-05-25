import React from 'react'
import { connect } from 'dva'

import ArticleList from '../components/ArticleList'

const Posts = ({articles}) => {
    return (
        <ArticleList articles={articles} />
        )
}

const mapStateToProps = ({article}) => {
    const { articles } = article
    return {
        articles
    }
}

export default connect(mapStateToProps)(Posts)