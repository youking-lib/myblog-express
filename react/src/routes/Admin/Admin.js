import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import AdminLayout from 'components/AdminLayout'

const { Header, Content, Footer, Sider } = Layout


const Admin = (props) => {
    return (
        <AdminLayout {...props}>
            <Content style={{ margin: '0 0 0 16px' }}>
                <div style={{ background: '#fff', minHeight: 360, overflow: 'hidden' }}>
                    {props.children}
                </div>
            </Content>
        </AdminLayout>
        )
}

function mapStateToProps(state) {
    const { app, loading } = state

    return {
        ...app
    }
}

export default connect(mapStateToProps)(Admin)