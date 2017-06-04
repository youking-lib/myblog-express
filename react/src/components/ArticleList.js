import React from 'react'
import { Tabs, Card, Tag, Icon, Row, Col, Button, Dropdown, Menu } from 'antd'
import { Link } from 'dva/router'

import Style from './ArticleList.module.less'
import { formatTime, generateTagColor } from '../utils'

const { TabPane } = Tabs



const DropDownMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">导出为 Markdown</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">复制</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">分享</a>
    </Menu.Item>
  </Menu>
)

const ArticleList = ({articles}) => {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Lastest" key="1">
                    <div className={Style.articleWrap}>
                        {articles.map(item => 
                            <Card key={item._id}>
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={18}>
                                        <h1><Link to={`/article/${item._id}`}>{item.title}</Link></h1>
                                        <p>
                                            <Icon type="calendar" /> {formatTime(item.meta.updateAt)}
                                            &nbsp;&nbsp;&nbsp;
                                            <Icon type="user" /> whistleyz
                                        </p>
                                        <div>
                                            {
                                                item.keywords.map(keyword => 
                                                    <Tag key={keyword._id} color={generateTagColor()}>{keyword.title}</Tag>
                                                )
                                            }
                                            
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <Button type="defalut"><Link to={`/admin/add/${item._id}`}><Icon type="edit" />Edit</Link></Button>
                                        <Dropdown overlay={DropDownMenu}>
                                            <a className="ant-dropdown-link" href="#">
                                                &nbsp;&nbsp;&nbsp; more<Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Card>
                        )}
                    </div>
                </TabPane>
                <TabPane tab="Javascript" key="2">Javascript</TabPane>
                <TabPane tab="HTML5" key="7">HTML5</TabPane>
                <TabPane tab="Nodejs" key="8">Nodejs</TabPane>
                <TabPane tab="CSS3" key="9">CSS3</TabPane>
            </Tabs>
        </div>
        )
}

export default ArticleList