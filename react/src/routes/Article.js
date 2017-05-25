import React from 'react'
import { connect } from 'dva'

import ArticleDetail from '../components/ArticleDetail'

const Article = ({preview}) => {
    return (
        <ArticleDetail preview={preview} />
        )
}

const mapStateToProps = ({article}) => {
    const { preview } = article
    return {
        preview
    }
}

export default connect(mapStateToProps)(Article)