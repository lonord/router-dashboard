import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import NearMeIcon from '@material-ui/icons/NearMe'
import { inject, observer, Provider } from 'mobx-react'
import React from 'react'
import { FrameItem } from '../../Frame'
import Store from './data/Store'
import LoadingPaper from './Loading'
import SystemPaper from './System'

const store = new Store()

interface ShadowsocksContentProps {
	store?: Store
}

interface ShadowsocksContentState {
	snackbarOpen: boolean
	errorMessage: string
}

@inject('store')
@observer
class ShadowsocksContent extends React.Component<ShadowsocksContentProps, ShadowsocksContentState> {

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
		const { store } = this.props
		const { snackbarOpen, errorMessage } = this.state
		const updatingSystemStatus = store ? store.updatingSystemStatus : true
		return (
			<div>
				{updatingSystemStatus
					? <LoadingPaper/>
					: <div>
						<SystemPaper handleError={this.handleError} />
					</div>}
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

const WrappedShadowsocksContent = () => (
	<Provider store={store}>
		<ShadowsocksContent/>
	</Provider>
)

const item: FrameItem = {
	title: 'Shadowsocks',
	drawerItemIcon: <NearMeIcon />,
	content: <WrappedShadowsocksContent />
}

export default item
