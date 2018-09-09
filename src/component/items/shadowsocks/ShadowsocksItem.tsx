import Typography from '@material-ui/core/Typography'
import NearMeIcon from '@material-ui/icons/NearMe'
import React from 'react'
import { FrameItem } from '../../Frame'
class ShadowsocksContent extends React.Component<any, any> {
	render() {
		return (
			<div>
				<Typography>Coming soon</Typography>
			</div>
		)
	}
}

const item: FrameItem = {
	title: 'Shadowsocks',
	drawerItemIcon: <NearMeIcon />,
	content: <ShadowsocksContent />
}

export default item
