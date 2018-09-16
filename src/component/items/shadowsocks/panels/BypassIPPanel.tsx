import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import React from 'react'
import DataTable from '../common/DataTable'
import Store from '../data/Store'

const styles: StyleRulesCallback<string> = theme => ({
	root: {
		width: '100%'
	}
})

export interface BypassIPPanelProps {
	handleError(msg: string)
	store?: Store
}

@inject('store')
@observer
class BypassIPPanel extends React.Component<BypassIPPanelProps & WithStyles, any> {

	handleAddItem = (item: string) => {
		const { store, handleError } = this.props
		store.addBypassIpList(item).catch(handleError)
	}

	handleRemoveItem = (item: string) => {
		const { store, handleError } = this.props
		store.removeBypassIpList(item).catch(handleError)
	}

	handleRefreshData = () => {
		const { store, handleError } = this.props
		store.reloadForwardIpList().catch(handleError)
	}

	componentDidMount() {
		this.handleRefreshData()
	}

	render() {
		const { store, classes } = this.props
		const { loadingBypassIpList, bypassIpList } = store
		return (
			<div className={classes.root}>
				<DataTable
					type="bypass ip list"
					inputLabel="IP Address"
					dataList={bypassIpList}
					onAddData={this.handleAddItem}
					onRemoveData={this.handleRemoveItem}
					loading={loadingBypassIpList}
					onRefresh={this.handleRefreshData} />
			</div>
		)
	}
}

export default withStyles(styles)(BypassIPPanel)
