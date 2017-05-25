import React from 'react'
import { connect } from 'dva'
import PictureWall from 'components/Admin/PictureWall'

function Carousel ({pictrueWall, loading, createPictrueWall, removePictrueWall}) {
    const props = {
        uploadProps: {
            action: "/api/v1/media",
            data: {
                quote: 'picture-wall'
            }
        },
        createPictrueWall,
        removePictrueWall,
        pictrueWall,
        loading
    }
    return (
        <PictureWall {...props} />
        )
}

const mapStateToProps = ({media, loading}) => {
    const { pictrueWall } = media
    return {
        pictrueWall,
        loading: loading.effects['media/queryPicturWall']
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPictrueWall(data){
            dispatch({type: 'media/createPictureSuccess', payload: data})
        },
        removePictrueWall(data){
            dispatch({type: 'media/removePicture', payload: data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel)