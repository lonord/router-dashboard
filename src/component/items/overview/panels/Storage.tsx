import LinearProgress from '@material-ui/core/LinearProgress'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { CSSProperties } from '@material-ui/styles/withStyles'
import * as Color from 'color'
import React from 'react'

export interface StoragePanelProps {
	data: {
		total: number
		used: number
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	item: {
		marginBottom: 10
	} as CSSProperties,
	progressBarWrap: {
		display: 'flex'
	} as CSSProperties,
	progressBarText: {
		width: 60,
		textAlign: 'center'
	} as CSSProperties,
	progressBar: {
		height: 20,
		borderRadius: 3,
		flexGrow: 1
	} as CSSProperties,
	progressBarSecondColor: {
		backgroundColor: Color(theme.palette.secondary.light).alpha(0.4).toString()
	} as CSSProperties
}))

export default function StoragePanel({ data }: StoragePanelProps) {
	const classes = useStyles()
	const percent = data ? data.used * 100 / data.total : 0
	return (
		<div className={classes.item}>
			<Typography>SD Card</Typography>
			<div className={classes.progressBarWrap}>
				<LinearProgress variant={data ? 'determinate' : 'query'}
					classes={{ root: classes.progressBar }}
					value={percent} />
				<Typography className={classes.progressBarText}>
					{data ? Math.floor(percent) : '--'}
					%
					</Typography>
			</div>
		</div>
	)
}
