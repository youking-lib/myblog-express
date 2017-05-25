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

        const titleValue = this.props.draft.title || ''

        this.state = {
            isEditing: false,
            titleValue: '',
            selectedKeywords: []
        }
    }

    onTitleValueChange = (e) => {
        this.props.handleEidting({
            ...this.props.draft, 
            title: e.target.value
        })
    }

    onEditorStateChange = (value) => {
        this.props.handleEidting({
            ...this.props.draft, 
            editorState: value
        })   
    }

    onResetDraft = () => {
        const { resetDraft } = this.props
        resetDraft()
    }

    onKeywordsSelect = (value) => {
        this.props.handleEidting({
            ...this.props.draft, 
            keywords: value
        })
    }

    handleEditorSubmit = (contentValue) => {
        const { routeParams, draft } = this.props
        const { keywords } = this.props

        if(draft.title){
            this.props.postArticle({
                ...draft
            })
        }else{
            message.error('不能没有标题哦！')
        }
    }

    render(){
        const { title, content, editorState, keywords } = this.props.draft
        const keywordsOrigin = this.props.keywords
        return (
            <div style={{position: 'relative'}}>
                <Header style={{padding: '16px'}}>
                    <InputGroup size="large">
                        <Col span="16">
                            <Input onChange={this.onTitleValueChange} value={ title } placeholder="请输入标题" />
                        </Col>
                        <Col span="8">
                            <Select
                                multiple={true}
                                size="large"
                                style={{ width: '100%', display: 'block' }}
                                placeholder="Please select"
                                defaultValue={keywords.map(item => item._id)}
                                onChange={(value) => this.onKeywordsSelect(value)}
                            >
                                {keywordsOrigin.map(item => <Option value={item._id} key={item.key}>{item.title}</Option>)}
                            </Select>
                        </Col>
                    </InputGroup>
                </Header>
                <Content style={{}}>
                    <Editor resetEditor={this.onResetDraft} onSubmit={this.handleEditorSubmit} editorState={editorState} onEditorStateChange={this.onEditorStateChange} />
                </Content>
            </div>
            )
    }
}


export default Add