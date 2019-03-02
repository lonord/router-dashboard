import LinearProgress from '@material-ui/core/LinearProgress'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/styles'
import { CSSProperties } from '@material-ui/styles/withStyles'
import * as Color from 'color'
import React from 'react'

const processBarHeight = 280
const processBarHeightSmall = 160
const processBarWidth = 120
const processBarWidthSmall = 60

export interface CpuPanelProps {
	data: {
		usage: number[],
		temp: number
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-around',
		marginBottom: 10
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
	} as CSSProperties,
	progressBarWrap: {
		display: 'flex',
		marginBottom: 10
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

export default function CpuPanel({ data }: CpuPanelProps) {
	const classes = useStyles()
	const theme = useTheme<Theme>()
	console.log(theme.breakpoints.down('xs'))
	return (
		<div>
			{data && (
				<>
					<Typography>Usage</Typography>
					<div className={classes.root}>
						{data.usage.map((usage, idx) => (
							<div key={idx} className={classes.item}>
								<Typography className={classes.itemText}>{Math.floor(usage)}%</Typography>
								<div className={classes.itemProgressBarWrap}>
									<LinearProgress variant="determinate"
										className={classes.itemProgressBar}
										value={usage} />
								</div>
								<Typography className={classes.itemText}>{`CPU#${idx}`}</Typography>
							</div>
						))}
					</div>
					<Typography>Temp</Typography>
					<div className={classes.progressBarWrap}>
						<LinearProgress variant="determinate"
							classes={{ root: classes.progressBar, colorSecondary: classes.progressBarSecondColor }}
							color="secondary"
							value={data.temp / 1000} />
						<Typography className={classes.progressBarText}>
							{trimDec((data.temp / 1000) + '')}°C
						</Typography>
					</div>
				</>
			)}
			{!data && (
				<div className={classes.root}>
					<Typography className={classes.loading}>Loading...</Typography>
				</div>
			)}
		</div>
	)
}

function trimDec(s: string): string {
	if (!s || s.indexOf('.') === -1) {
		return s
	}
	const idx = s.indexOf('.')
	const decCount = s.length - idx - 1
	if (decCount <= 1) {
		return s
	}
	return s.substr(0, s.length - decCount + 1)
}
