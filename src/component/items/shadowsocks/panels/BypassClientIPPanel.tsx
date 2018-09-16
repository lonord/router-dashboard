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

export interface BypassClientIPPanelProps {
	handleError(msg: string)
	store?: Store
}

@inject('store')
@observer
class BypassClientIPPanel extends React.Component<BypassClientIPPanelProps & WithStyles, any> {

	handleAddItem = (item: string) => {
		const { store, handleError } = this.props
		store.addBypassClientList(item).catch(handleError)
	}

	handleRemoveItem = (item: string) => {
		const { store, handleError } = this.props
		store.removeBypassClientList(item).catch(handleError)
	}

	handleRefreshData = () => {
		const { store, handleError } = this.props
		store.reloadBypassClientList().catch(handleError)
	}

	componentDidMount() {
		this.handleRefreshData()
	}

	render() {
		const { store, classes } = this.props
		const { loadingBypassClientList, forwardIpList } = store
		return (
			<div className={classes.root}>
				<DataTable
					type="bypass client ip list"
					inputLabel="IP Address"
					dataList={forwardIpList}
					onAddData={this.handleAddItem}
					onRemoveData={this.handleRemoveItem}
					loading={loadingBypassClientList}
					onRefresh={this.handleRefreshData} />
			</div>
		)
	}
}

export default withStyles(styles)(BypassClientIPPanel)
