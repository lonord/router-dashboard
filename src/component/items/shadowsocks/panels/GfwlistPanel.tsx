import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import ms from 'ms'
import React from 'react'
import DataTable from '../common/DataTable'
import Store from '../data/Store'

const styles: StyleRulesCallback<string> = theme => ({
	root: {
		width: '100%'
	},
	itemTitle: {
		paddingBottom: '10px'
	},
	itemTopMargin: {
		marginTop: '32px'
	},
	buttonWrap: {
		height: '36px',
		lineHeight: '36px'
	},
	buttonInfoText: {
		display: 'inline-block',
		marginLeft: '12px'
	}
})

interface GfwlistPanelProps {
	handleError(msg: string)
	store?: Store
}

interface GfwlistPanelState {
	snackbarOpen: boolean
}

@inject('store')
@observer
class GfwlistPanel extends React.Component<GfwlistPanelProps & WithStyles, GfwlistPanelState> {

	state = {
		snackbarOpen: false
	}

	handleAddItem = (item: string) => {
		const { store, handleError } = this.props
		store.addGfwlist(item).catch(handleError)
	}

	handleRemoveItem = (item: string) => {
		const { store, handleError } = this.props
		store.removeGfwlist(item).catch(handleError)
	}

	handleRefreshData = () => {
		const { store, handleError } = this.props
		store.reloadGfwlist().catch(handleError)
	}

	handleUpdateStandardGfwlist = () => {
		const { store, handleError } = this.props
		store.updateStandardGfwlist().then(() => {
			this.setState({
				snackbarOpen: true
			})
		}).catch(handleError)
	}

	closeSnackbar = () => {
		this.setState({
			snackbarOpen: false
		})
	}

	componentDidMount() {
		this.handleRefreshData()
	}

	render() {
		const { classes, store } = this.props
		const { updatingStandardGfwlist, gfwlist, loadingGfwlist, standardGfwlistUpdateDate } = store
		const { snackbarOpen } = this.state
		const lastUpdate = ms(new Date().getTime() - standardGfwlistUpdateDate)
		return (
			<div className={classes.root}>
				<div>
					<Typography className={classes.itemTitle}>Standard Gfwlist</Typography>
					<div className={classes.buttonWrap}>
						<Button color="primary" variant="contained"
							onClick={this.handleUpdateStandardGfwlist}
							disabled={updatingStandardGfwlist}>
							{updatingStandardGfwlist
								? 'Updating...'
								: 'Update Manually'}
						</Button>
						<Typography
							component="span"
							variant="caption"
							className={classes.buttonInfoText}>
							Last updated {lastUpdate} ago
						</Typography>
					</div>
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						open={snackbarOpen}
						onClose={this.closeSnackbar}
						autoHideDuration={1500}
						ContentProps={{
							'aria-describedby': 'message-id'
						}}
						message={<span id="message-id">Standard gfwlist updated</span>}
					/>
				</div>
				<div className={classes.itemTopMargin}>
					<Typography className={classes.itemTitle}>User Defined Gfwlist</Typography>
					<DataTable
						type="user defined gfwlist"
						inputLabel="Domain"
						dataList={gfwlist}
						onAddData={this.handleAddItem}
						onRemoveData={this.handleRemoveItem}
						loading={loadingGfwlist}
						onRefresh={this.handleRefreshData}/>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(GfwlistPanel)
