import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import FloatTitlePaper from '../../FloatTitlePaper'
import { FrameItem } from '../../Frame'

const useStyles = makeStyles(theme => ({
	//
}))

function OverviewContent() {
	// const classes = useStyles()
	return (
		<div>
			<FloatTitlePaper title="Overview">
				<Typography>Welcome to router dashboard</Typography>
			</FloatTitlePaper>
		</div>
	)
}

const item: FrameItem = {
	title: 'Overview',
	drawerItemIcon: <HomeIcon />,
	content: <OverviewContent />
}

export default item
