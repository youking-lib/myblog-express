import React, { Component } from 'react'
import { Upload, Icon, Modal, Spin } from 'antd';
import Style from './PictureWall.less'

class PictureWallComponent extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: this.props.pictrueWall,
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }
    handleSuccess = (res) => {
        const file = res.data
        const fileList = this.state.fileList
        const { createPictrueWall } = this.props
        
        typeof createPictrueWall === 'function' && createPictrueWall(file)

        fileList.push(file)
        this.setState({ fileList })
    }
    handleRemove = (file) => {
        const { removePictrueWall } = this.props
        let fileList = this.state.fileList

        typeof removePictrueWall === 'function' && removePictrueWall(file)

        fileList = fileList.filter(item => item._id !== file._id)
        this.setState({ fileList })
    }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix" style={{padding: 16}}>
        <Upload
            action="/api/v1/media"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
            onSuccess={this.handleSuccess}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PictureWallComponent
