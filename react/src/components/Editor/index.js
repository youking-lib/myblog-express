import React, { Component, PropTypes } from 'react'
import { Layout, Input, Anchor, Icon, Row, Col, Button, Card, message } from 'antd'
import Draft, { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'
import { Map } from 'immutable';
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import PrismDecorator from 'draft-js-prism'

import draftjsToMd from './draftToMd';

import prismPlugin from './prismPlugin'

const EditorPlugins = [
    createMarkdownShortcutsPlugin(),
    prismPlugin
]

import Style from './index.less'

class StyleButton extends React.Component {
    constructor() {
        super();
    }
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

const blockRenderMap = Map({
    'code-block': {
        element: 'code',
        wrapper: <pre className="public-DraftStyleDefault-pre" spellCheck={'false'} />
    }
})


class EditorComponent extends Component {

    constructor(props) {
        super(props)

        this.doPreview = this.doPreview.bind(this)
        this.canclePreview = this.canclePreview.bind(this)
        this.handleTextValueChange = this.handleTextValueChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.onChange = (editorState) => this.setState({editorState})

        this.state = {
            preViewBtn: false,
            contentVaule: null,
            editorState: EditorState.createEmpty()
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func
    }

    PreviewComponent(){
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

    HandlerBar(){
        return (
            <Row type="flex" justify="space-between">
                <Col span={6}>
                    <a onClick={this.doPreview}><Icon type="search" />&nbsp;&nbsp;预览</a>
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                    <a>存草稿</a>&nbsp;&nbsp;&nbsp;
                    <a onClick={this.handleSubmit}><Icon type="upload" /> 提交</a>
                </Col>
            </Row>
            )
    }

    doPreview() {
        console.log(convertToRaw(this.state.editorState.getCurrentContent()))
        this.setState({
            preViewBtn: true
        })
    }

    canclePreview() {
        this.setState({
            preViewBtn: false
        })
    }

    handleSubmit(){
        const { editorState } = this.state
        const rawContent = draftjsToMd(convertToRaw(editorState.getCurrentContent()))
        console.log('rawContent', rawContent)

        if(rawContent !== '') {
            this.props.onSubmit && this.props.onSubmit(rawContent)
        }else{
            message.error('还没有写点内容呢！')
        }
    }

    handleTextValueChange(e){
        this.setState({
            contentVaule: e.target.value
        })
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

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

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
                            <div className={className}>
                                <Editor 
                                    blockStyleFn={getBlockStyle}
                                    customStyleMap={styleMap}
                                    editorState={editorState}
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange}
                                    onTab={this.onTab}
                                    placeholder="内容要真实..."
                                    ref="editor"
                                    spellCheck={true}
                                    plugins={EditorPlugins}
                                    blockRenderMap={blockRenderMap}
                                />
                            </div>
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
