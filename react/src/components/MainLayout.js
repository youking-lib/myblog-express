import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from 'antd'
import { Router, Link } from 'dva/router'

import Style from './MainLayout.module.less'
import HeaderComponent from './Header'
import UserCard from './UserCard'
import LoginModel from './LoginModel'

const { Header, Content, Footer } = Layout

const HeaderRight = () => {
    return (
        <div>
            <Link style={{marginRight: 16}} to="/admin">Admin</Link>
            <Link to="/logout" style={{color: 'red'}}><Icon type="logout" /></Link>
        </div>
        )
}

const MainLayout = (props) => {

    const { children, routes, doLogin, isLogin } = props
    const isUsercardHidden = routes.some((route) => {
        return route.isUsercardHidden
    })

    return (
        <Layout className="layout">
            <HeaderComponent {...props}>
                {isLogin ? <HeaderRight /> : <LoginModel doLogin={doLogin} />}
            </HeaderComponent>
                     
            <Content style={{ padding: '24px 100px 0' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
        );
}

export default MainLayout