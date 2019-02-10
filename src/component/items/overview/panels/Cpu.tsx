import LinearProgress from '@material-ui/core/LinearProgress'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/styles'
import { CSSProperties } from '@material-ui/styles/withStyles'
import React from 'react'

const processBarHeight = 280
const processBarHeightSmall = 160
const processBarWidth = 120
const processBarWidthSmall = 60

export interface CpuPanelProps {
	data: {
		usage: number[]
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-around'
	} as CSSProperties,
	loading: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: 60
	} as CSSProperties,
	item: {
		display: 'flex',
		flexDirection: 'column',
		width: processBarWidth,
		[theme.breakpoints.down('xs')]: {
			width: processBarWidthSmall
		}
	} as CSSProperties,
	itemProgressBarWrap: {
		height: processBarHeight,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		width: processBarWidth,
		[theme.breakpoints.down('xs')]: {
			width: processBarWidthSmall,
			height: processBarHeightSmall
		}
	} as CSSProperties,
	itemProgressBar: {
		transform: 'rotate(-90deg)',
		width: processBarHeight,
		height: processBarWidth,
		[theme.breakpoints.down('xs')]: {
			height: processBarWidthSmall,
			width: processBarHeightSmall
		}
	} as CSSProperties,
	itemText: {
		textAlign: 'center'
	} as CSSProperties
}))

export default function CpuPanel({ data }: CpuPanelProps) {
	const classes = useStyles()
	const theme = useTheme<Theme>()
	console.log(theme.breakpoints.down('xs'))
	return (
		<div className={classes.root}>
			{data ? data.usage.map((usage, idx) => (
				<div key={idx} className={classes.item}>
					<Typography className={classes.itemText}>{Math.floor(usage)}%</Typography>
					<div className={classes.itemProgressBarWrap}>
						<LinearProgress variant="determinate"
							className={classes.itemProgressBar}
							value={usage} />
					</div>
					<Typography className={classes.itemText}>{`CPU#${idx}`}</Typography>
				</div>
			)) : (
					<Typography className={classes.loading}>Loading...</Typography>
				)
			}
		</div>
	)
}
