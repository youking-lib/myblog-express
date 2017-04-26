import React, { Component } from 'react'
import { Layout, Input, Anchor, Icon, message, Select, Col } from 'antd'

import Style from './Admin.less'
import Editor from '../Editor'

const { Header, Content } = Layout
const { Link } = Anchor
const Option = Select.Option
const InputGroup = Input.Group

const MenuAchor = () => {
    return (
        <div id="MenuAchor" className={Style.MenuAchor}>
            <div className={Style.MenuItem}>
                预览
            </div>
            <Anchor offsetTop={8}>
                <Link href="#root" title={<Icon type="up" />} />
            </Anchor>
        </div>
        )
}

class Add extends Component {
    constructor(props) {
        super(props);

        this.onTitleValueChange = this.onTitleValueChange.bind(this)
        this.handleEditorSubmit = this.handleEditorSubmit.bind(this)


        this.state = {
            isEditing: false,
            titleValue: '',
            selectedKeywords: []
        }
    }

    onTitleValueChange(e){
        this.setState({
            titleValue: e.target.value,
            isEditing: true
        })
    }

    handleEditorSubmit(contentValue){
        const { titleValue, selectedKeywords } = this.state
        const { keywords } = this.props
        const _selectedKeywords = selectedKeywords.map(index => keywords[index]._id)

        if(titleValue){
            this.props.postArticle({
                title: titleValue,
                content: contentValue,
                keywords: _selectedKeywords
            }, () => {
                this.setState({
                    titleValue: '',
                    isEditing: false,
                    selectedKeywords: []
                })
            })
        }else{
            message.error('不能没有标题哦！')
        }
    }

    render(){
        const { titleValue } = this.state
        const { keywords } = this.props

        return (
            <div style={{position: 'relative'}}>
                <Header style={{padding: '16px'}}>
                    <InputGroup size="large">
                        <Col span="16">
                            <Input onChange={this.onTitleValueChange} value={ titleValue } placeholder="请输入标题" />
                        </Col>
                        <Col span="8">
                            <Select
                                multiple={true}
                                size="large"
                                style={{ width: '100%', display: 'block' }}
                                placeholder="Please select"
                                onChange={(value) => this.setState({selectedKeywords: value})}
                            >
                                {keywords.map(item => <Option key={item.key}>{item.title}</Option>)}
                            </Select>
                        </Col>
                    </InputGroup>
                </Header>
                <Content style={{}}>
                    <Editor onSubmit={this.handleEditorSubmit} />
                </Content>
            </div>
            )
    }
}


export default Add