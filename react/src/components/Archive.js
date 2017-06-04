import React from 'react'
import { Timeline, Icon, Spin } from 'antd'
import { Link } from 'dva/router'
import Style from './Archive.module.less'
import { formatTime, generateTagColor } from '../utils'

const Archive = ({timeline, loading}) => {

	let result = null
	if (!loading) {
		result = () => {
			return (
				<Timeline>
					{timeline.map(item => {
						if (item.records.length > 0) {
							return (
								<Timeline.Item key={item._id} color={generateTagColor()}>
									<div><Icon type="calendar" /> &nbsp;{formatTime(item.date)}</div>
									<div className={Style.timelineWrap}>
										{item.records.map(record => 
											<div key={record._id} className={Style.timelineArchor}>
												<Link to={`/article/${record.quoteId}`}>{record.title}</Link>
											</div>
										)}
									</div>
								</Timeline.Item>)
						}
					})}
				</Timeline>
			)
		}
	}
	return (
		<div>
			<Spin spinning={loading} />
			{result && result()}
		</div>	
		)
}

export default Archive