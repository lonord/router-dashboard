import cyan from '@material-ui/core/colors/cyan'
import Divider from '@material-ui/core/Divider'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import ms from 'ms'
import React from 'react'
import FloatTitlePaper, { Title } from '../../FloatTitlePaper'
import Store, { SSMode } from './data/Store'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		padding: '16px 20px 0',
		[theme.breakpoints.down('xs')]: {
			padding: '10px 10px 0'
		}
	},
	title: {
		paddingBottom: '10px'
	},
	line: {
		display: 'flex',
		height: '48px',
		'line-height': '48px',
		verticalAlign: 'middle'
	},
	textLeft: {
		flexBasis: '66.67%',
		flexShrink: 0,
		'line-height': 'inherit'
	},
	textRight: {
		textAlign: 'right',
		'line-height': 'inherit',
		flexGrow: 1
	},
	textRightTypography: {
		paddingRight: '14px'
	}
})

interface SystemPaperProps {
	handleError(msg: string)
	store?: Store
}

@inject('store')
@observer
class SystemPaper extends React.Component<SystemPaperProps & WithStyles, {}> {

	handleStartStop = (isOn: boolean) => {
		const { handleError, store } = this.props
		const p = isOn ? store.start() : store.stop()
		p.catch(handleError)
	}

	handleSSModeChange = (ssMode: SSMode) => {
		const { handleError, store } = this.props
		store.setSSMode(ssMode).catch(handleError)
	}

	render() {
		const { classes, store } = this.props
		const { version, running, uptime, ssMode, updatingRunningStatus, updatingSSModeStatus } = store
		return (
			<FloatTitlePaper title={<Title title="Outline" />} titleBackground={cyan[500]}>
				<div className={classes.line}>
					<Typography className={classes.textLeft}>Shadowsocks Service</Typography>
					<span className={classes.textRight}>
						<Switch
							disabled={updatingRunningStatus}
							checked={running}
							onChange={(e) => this.handleStartStop(e.target.checked)}
							color="primary"
						/>
					</span>
				</div>
				<Divider light={true}/>
				{running
					? <>
						<div className={classes.line}>
							<Typography className={classes.textLeft}>Up Time</Typography>
							<Typography variant="caption"
								className={classNames(classes.textRight, classes.textRightTypography)}>
								{ms(uptime)}
							</Typography>
						</div>
						<Divider light={true}/>
						<div className={classes.line}>
							<Typography className={classes.textLeft}>Global Mode</Typography>
							<span className={classes.textRight}>
								<Switch
									disabled={updatingSSModeStatus}
									checked={ssMode === 'global'}
									onChange={(e) => this.handleSSModeChange(e.target.checked ? 'global' : 'auto')}
									color="primary"
								/>
							</span>
						</div>
						<Divider light={true}/>
					</>
					: null}
				<div className={classes.line}>
					<Typography className={classes.textLeft}>Version</Typography>
					<Typography variant="caption"
						className={classNames(classes.textRight, classes.textRightTypography)}>
						v{version}
					</Typography>
				</div>
			</FloatTitlePaper>
		)
	}
}

export default withStyles(styles)(SystemPaper)
