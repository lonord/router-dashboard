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

export interface ForwardClientIPPanelProps {
	handleError(msg: string)
	store?: Store
}

@inject('store')
@observer
class ForwardClientIPPanel extends React.Component<ForwardClientIPPanelProps & WithStyles, any> {

	handleAddItem = (item: string) => {
		const { store, handleError } = this.props
		store.addForwardClientList(item).catch(handleError)
	}

	handleRemoveItem = (item: string) => {
		const { store, handleError } = this.props
		store.removeForwardClientList(item).catch(handleError)
	}

	handleRefreshData = () => {
		const { store, handleError } = this.props
		store.reloadForwardClientList().catch(handleError)
	}

	componentDidMount() {
		this.handleRefreshData()
	}

	render() {
		const { store, classes } = this.props
		const { loadingForwardClientList, forwardClientList } = store
		return (
			<div className={classes.root}>
				<DataTable
					type="forward client ip list"
					inputLabel="IP Address"
					dataList={forwardClientList}
					onAddData={this.handleAddItem}
					onRemoveData={this.handleRemoveItem}
					loading={loadingForwardClientList}
					onRefresh={this.handleRefreshData} />
			</div>
		)
	}
}

export default withStyles(styles)(ForwardClientIPPanel)
