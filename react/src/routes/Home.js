import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './Index.less'

import MainLayout from '../components/MainLayout'

function Home(props) {
	
    const { children, account, dispatch, history, route, routes } = props

    const mainProps = {
		children, account, dispatch, route, routes, doLogin
	}

    function doLogin (data) {
        const { username, password, callback } = data
        dispatch({type: 'app/login', payload: {username, password, callback}})
    }
    

	return (
		<MainLayout {...mainProps}>{children}</MainLayout>
	)
}

Home.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
    const { app } = state
    return {
        ...app
    }
}

export default connect(mapStateToProps)(Home)
