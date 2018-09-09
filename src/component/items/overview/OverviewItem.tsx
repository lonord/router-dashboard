import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { FrameItem } from '../../Frame'

class OverviewContent extends React.Component<any, any> {
	render() {
		return (
			<div>
				<Typography>Welcome to router dashboard</Typography>
			</div>
		)
	}
}

const item: FrameItem = {
	title: 'Overview',
	drawerItemIcon: <HomeIcon />,
	content: <OverviewContent />
}

export default item
