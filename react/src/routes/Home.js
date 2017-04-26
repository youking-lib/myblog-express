import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from './Index.less'
import { Row, Col, Breadcrumb } from 'antd'

import MainLayout from '../components/MainLayout'
import UserCard from '../components/UserCard'

function Home(props) {
	
    const { children, account, isLogin, dispatch, history, route, routes } = props

    const mainProps = {
		children, account, dispatch, route, routes, doLogin, isLogin
	}
    
    function doLogin (data) {
        const { username, password, callback } = data
        dispatch({type: 'app/login', payload: {username, password, callback}})
    }
    

	return (
		<MainLayout {...mainProps}>
            <div style={{ background: '#fff', padding: '0 24px 24px', minHeight: 280, overflow: 'hidden' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={24}>
                    <Col span={6}>
                        <UserCard />
                    </Col>
                    <Col span={18}>
                        {children}
                    </Col>
                </Row>
            </div>
        </MainLayout>
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
