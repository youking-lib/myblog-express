import React, { Component, PropTypes } from 'react'
import { Layout, Input, Anchor, Icon, Row, Col, Button, Card, message, Popconfirm } from 'antd'

import Draft, { EditorState, RichUtils, convertFromRaw, convertToRaw, convertFromHTML, Modifier } from 'draft-js'

import EditorArea from './EditorArea'
import Style from './index.less'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

class EditorComponent extends Component {

    constructor(props) {
        super(props)
        let editorState = this.props.editorState ? this.props.editorState : EditorState.createEmpty()
        this.state = {
            preViewBtn: false,
            editorState
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func
    }

    onChange = (editorState) => {
        this.props.onEditorStateChange(editorState)
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.editorState = nextProps.editorState || EditorState.createEmpty()
    }

    PreviewComponent = () => {
        return (
            <div className={Style.preview}>
                <div className={Style.preViewHeader}>
                    <div style={{float: 'right'}}><a onClick={this.canclePreview}><Icon type="close" /></a></div>
                </div>
                <div className={Style.preViewContent}>
                    123
                </div>
            </div>
            )
    }

    onResetEditor = () => {
        const { resetEditor } = this.props
        typeof resetEditor === 'function' && resetEditor()
    }

    HandlerBar = () => {
        return (
            <Row type="flex" justify="space-between">
                <Col span={6}>
                    <a onClick={this.doPreview}><Icon type="search" />&nbsp;&nbsp;预览</a>
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                    <Popconfirm title="Reset editor?" onConfirm={this.onResetEditor} okText="Yes" cancelText="No">
                        <a style={{color: 'red'}}>Reset</a>
                    </Popconfirm>
                    &nbsp;&nbsp;&nbsp;
                    <a onClick={this.handleSubmit}><Icon type="upload" /> Submit</a>
                </Col>
            </Row>
            )
    }

    doPreview = () => {
    }

    canclePreview = () => {
        this.setState({
            preViewBtn: false
        })
    }

    handleSubmit = () => {
        this.props.onSubmit && this.props.onSubmit()
    }

    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    onTab = (e) => {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    handleKeyCommand = (command) => {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    render() {
        const { contentVaule, preViewBtn, editorState } = this.state

        return (
                <div className={Style.editor}>
                    <div className={Style.content}>
                        <div className="RichEditor-root">
                            <BlockStyleControls
                                editorState={editorState}
                                onToggle={this.toggleBlockType}
                            />
                            <InlineStyleControls
                                editorState={editorState}
                                onToggle={this.toggleInlineStyle}
                            />
                            <EditorArea
                                editorState={editorState} 
                                handleKeyCommand={this.handleKeyCommand}
                                onTab={this.onTab}
                                spellCheck={true}
                                onChange={this.onChange}
                                placeholder="内容要真实..."
                            />
                        </div>
                    </div>
                    <div className={Style.footer}>
                        {preViewBtn ? this.PreviewComponent() : this.HandlerBar()}
                    </div>
                </div>
            )
    }
}


export default EditorComponent
