import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import { Router, Link } from 'dva/router'

import Style from './MainLayout.less'
import UserCard from './UserCard'
import LoginModel from './LoginModel'

const { Header, Content, Footer } = Layout

const MainLayout = (props) => {

    const { children, routes, doLogin } = props
    const isUsercardHidden = routes.some((route) => {
        return route.isUsercardHidden
    })

    return (
        <Layout className="layout">
            <Header>
                <Row>
                    <Col span={16}>
                        <div className={Style.logo} />
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            style={{ lineHeight: '64px', backgroundColor: 'transparent' }}
                        >
                            <Menu.Item key="0"><Link to="/">Home</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="archive">Archive</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="about">About me</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="resume">Resume</Link></Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8}>
                        <div style={{ lineHeight: '64px', float: 'right', padding: '0 20px' }}>
                            <LoginModel doLogin={doLogin} />
                        </div>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '24px 100px 0' }}>
                <div style={{ background: '#fff', padding: '0 24px 24px', minHeight: 280, overflow: 'hidden' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={24}>
                        {
                            !isUsercardHidden && 
                            (<Col span={6}>
                                <UserCard />
                            </Col>)
                        }
                        <Col span={isUsercardHidden ? 24 : 18}>
                            {children}
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
        );
}

export default MainLayout