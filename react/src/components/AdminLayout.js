import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'

import HeaderComponent from './Header'
import MainLayout from './MainLayout'
import './AdminLayout.module.less'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class AdminLayout extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
  render() {
    const {children, history, routes} = this.props
    const routePath = (routes[routes.length - 1] || {}).path || '';
    return (
        <MainLayout {...this.props}>
            <div style={{minHeight: 280}}>
                <Layout>
                    <Sider
                      collapsible
                      collapsed={this.state.collapsed}
                      onCollapse={this.onCollapse}
                    >
                        <Menu mode={this.state.mode} defaultSelectedKeys={[routePath]}>
                            <Menu.Item key="add">
                                <Link to="/admin/add">
                                    <Icon type="plus" />
                                    <span className="nav-text">写文章</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="article">
                                <Link to="/admin/article">
                                    <Icon type="file" />
                                    <span className="nav-text">文章列表</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu
                              key="sub1"
                              title={<span><Icon type="setting" /><span className="nav-text">配置</span></span>}
                            >
                                <Menu.Item key="keyword"><Link to="/admin/keyword">关键词</Link></Menu.Item>
                                <Menu.Item key="carousel"><Link to="/admin/carousel">旋转木马</Link></Menu.Item>
                                <Menu.Item key="3">Alex</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{overflow: null}}>
                        {children}
                    </Layout>
                </Layout>
            </div>
        </MainLayout>
    );
  }
}


export default AdminLayout
