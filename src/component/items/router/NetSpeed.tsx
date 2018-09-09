import Paper from '@material-ui/core/Paper'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CallMadeIcon from '@material-ui/icons/CallMade'
import CallReceivedIcon from '@material-ui/icons/CallReceived'
import classNames from 'classnames'
import React from 'react'
import { httpListen, HttpListener } from '../../../util/http'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		padding: '16px',
		[theme.breakpoints.down('xs')]: {
			padding: '10px'
		}
	},
	netSpeedArea: {
		fontFamily: theme.typography.fontFamily,
		display: 'flex',
		alignItems: 'center'
	},
	netSpeedColumn: {
		padding: '5px',
		flexBasis: '50%'
	},
	netSpeedColumnSpeed: {
		fontSize: '50px',
		paddingLeft: '10px',
		paddingRight: '10px',
		[theme.breakpoints.down('xs')]: {
			fontSize: '24px',
			paddingLeft: '6px',
			paddingRight: '4px'
		}
	},
	netSpeedRecvStyle: {
		color: '#2196f3'
	},
	netSpeedSendStyle: {
		color: '#4caf50'
	},
	netSpeedIconSize: {
		fontSize: '24px',
		[theme.breakpoints.down('xs')]: {
			fontSize: '14px'
		}
	}
})

interface NetSpeed {
	name: string
	recv: number
	send: number
}

interface NetSpeedPaperState {
	innerNetSpeed: NetSpeed
	outerNetSpeed: NetSpeed
}

class NetSpeedPaper extends React.Component<WithStyles, NetSpeedPaperState> {

	state = {
		innerNetSpeed: {
			name: '-',
			recv: 0,
			send: 0
		},
		outerNetSpeed: {
			name: '-',
			recv: 0,
			send: 0
		}
	}

	httpListener: HttpListener = null

	updateNetSpeedData = (data: { inner: NetSpeed, outer: NetSpeed }) => {
		this.setState({
			innerNetSpeed: data.inner,
			outerNetSpeed: data.outer
		})
	}

	componentWillUnmount() {
		if (this.httpListener) {
			this.httpListener.stop()
			this.httpListener = null
		}
	}

	componentDidMount() {
		this.httpListener = httpListen('/router/netspeed', (data) => {
			this.updateNetSpeedData(data)
		})
	}

	render() {
		const { classes } = this.props
		const { outerNetSpeed } = this.state
		const outerSendSpeed = formatNetSpeed(outerNetSpeed.send)
		const outerRecvSpeed = formatNetSpeed(outerNetSpeed.recv)
		return (
			<Paper elevation={1} className={classes.paper}>
				<Typography variant="subheading">Network Speed</Typography>
				<div className={classes.netSpeedArea}>
					<div className={classNames(classes.netSpeedColumn, classes.netSpeedRecvStyle)}>
						<CallReceivedIcon classes={{
							root: classes.netSpeedIconSize
						}} />
						<span className={classes.netSpeedColumnSpeed}>{outerRecvSpeed.speed}</span>
						<span>{outerRecvSpeed.unit}</span>
					</div>
					<div className={classNames(classes.netSpeedColumn, classes.netSpeedSendStyle)}>
						<CallMadeIcon classes={{
							root: classes.netSpeedIconSize
						}} />
						<span className={classes.netSpeedColumnSpeed}>{outerSendSpeed.speed}</span>
						<span>{outerSendSpeed.unit}</span>
					</div>
				</div>
			</Paper>
		)
	}
}

function formatNetSpeed(n: number): { speed: string, unit: string } {
	let speed = ''
	let unit = 'KB/s'
	if (n > 1024 * 1024) {
		speed = n / 1024 / 1024 + ''
		unit = ' MB/s'
	} else {
		speed = n / 1024 + ''
		unit = ' KB/s'
	}
	const idx = speed.indexOf('.')
	if (idx !== -1) {
		speed += '00'
		speed = speed.substr(0, idx + 3)
	} else {
		speed += '.00'
	}
	return {
		speed,
		unit
	}
}

export default withStyles(styles)(NetSpeedPaper)
