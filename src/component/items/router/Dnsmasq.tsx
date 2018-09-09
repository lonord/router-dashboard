import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { httpPut } from '../../../util/http'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		padding: '16px',
		[theme.breakpoints.down('xs')]: {
			padding: '10px'
		}
	},
	buttonWrap: {
		marginTop: '12px',
		marginBottom: '8px'
	}
})

interface DnsmasqPaperState {
	restarting: boolean
	snackbarOpen: boolean
}

class DnsmasqPaper extends React.Component<WithStyles, DnsmasqPaperState> {

	state = {
		restarting: false,
		snackbarOpen: false
	}

	restart = () => {
		this.setState({
			restarting: true
		})
		httpPut('/router/action/dnsmasq/restart').then(() => {
			this.setState({
				restarting: false,
				snackbarOpen: true
			})
		})
	}

	closeSnackbar = () => {
		this.setState({
			snackbarOpen: false
		})
	}

	render() {
		const { classes } = this.props
		const { restarting, snackbarOpen } = this.state
		return (
			<Paper elevation={1} className={classes.paper}>
				<Typography variant="subheading">Dnsmasq</Typography>
				<div className={classes.buttonWrap}>
					<Button color="primary" variant="contained"
						onClick={this.restart} disabled={restarting}>
						{restarting
							? 'Restarting...'
							: 'Restart Dnsmasq Manually'}
					</Button>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={snackbarOpen}
					onClose={this.closeSnackbar}
					autoHideDuration={1500}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">Dnsmasq process was restarted</span>}
				/>
			</Paper>
		)
	}
}

export default withStyles(styles)(DnsmasqPaper)
