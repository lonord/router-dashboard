import Snackbar from '@material-ui/core/Snackbar'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NearMeIcon from '@material-ui/icons/NearMe'
import { inject, observer, Provider } from 'mobx-react'
import React from 'react'
import { FrameItem } from '../../Frame'
import Store from './data/Store'
import IPListPaper from './IPExpansionPanels'
import LoadingPaper from './Loading'
import SystemPaper from './System'

const store = new Store()

const styles: StyleRulesCallback<string> = theme => ({
	paperWrap: {
		paddingBottom: '24px'
	}
})

interface ShadowsocksContentProps {
	store?: Store
}

interface ShadowsocksContentState {
	snackbarOpen: boolean
	errorMessage: string
}

@inject('store')
@observer
class ShadowsocksContent extends React.Component<ShadowsocksContentProps & WithStyles, ShadowsocksContentState> {

	state = {
		snackbarOpen: false,
		errorMessage: ''
	}

	closeSnackbar = () => {
		this.setState({
			snackbarOpen: false
		})
	}

	handleError = (msg: string) => {
		this.setState({
			errorMessage: msg,
			snackbarOpen: true
		})
	}

	componentDidMount() {
		const { store } = this.props
		store && store.reload().catch(this.handleError)
	}

	render() {
		const { store, classes } = this.props
		const { snackbarOpen, errorMessage } = this.state
		const updatingSystemStatus = store ? store.updatingSystemStatus : true
		return (
			<div>
				{updatingSystemStatus
					? <LoadingPaper/>
					: <>
						<div className={classes.paperWrap}><SystemPaper handleError={this.handleError} /></div>
						<div className={classes.paperWrap}><IPListPaper handleError={this.handleError} /></div>
					</>}
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={snackbarOpen}
					onClose={this.closeSnackbar}
					autoHideDuration={1500}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{errorMessage}</span>}
				/>
			</div>
		)
	}
}

const StyledRouterContent = withStyles(styles)(ShadowsocksContent)

const WrappedShadowsocksContent = () => (
	<Provider store={store}>
		<StyledRouterContent/>
	</Provider>
)

const item: FrameItem = {
	title: 'Shadowsocks',
	drawerItemIcon: <NearMeIcon />,
	content: <WrappedShadowsocksContent />
}

export default item
