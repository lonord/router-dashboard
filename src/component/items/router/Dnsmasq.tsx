import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red'
import Snackbar from '@material-ui/core/Snackbar'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import React from 'react'
import { httpPut } from '../../../util/http'
import FloatTitlePaper, { Title } from '../../FloatTitlePaper'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		padding: '16px 20px',
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
			<FloatTitlePaper title={<Title title="Dnsmasq" />} titleBackground={red[500]}>
				<div className={classes.buttonWrap}>
					<Button color="primary"
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
			</FloatTitlePaper>
		)
	}
}

export default withStyles(styles)(DnsmasqPaper)
