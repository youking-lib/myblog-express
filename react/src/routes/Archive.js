import React from 'react'
import { connect } from 'dva'

import ArchiveComponent from 'components/Archive'

const Archive = ({timeline, loading}) => {
    return (
        <ArchiveComponent timeline={timeline} loading={loading} />
        )
}

const mapStateToProps = ({archive, loading}) => {
    const { timeline } = archive
    return {
        timeline,
        loading: loading.effects['archive/lazyloadTimeline']
    }
}

export default connect(mapStateToProps)(Archive)