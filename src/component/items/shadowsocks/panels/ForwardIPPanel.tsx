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

export interface ForwardIPPanelProps {
	handleError(msg: string)
	store?: Store
}

@inject('store')
@observer
class ForwardIPPanel extends React.Component<ForwardIPPanelProps & WithStyles, any> {

	handleAddItem = (item: string) => {
		const { store, handleError } = this.props
		store.addForwardIpList(item).catch(handleError)
	}

	handleRemoveItem = (item: string) => {
		const { store, handleError } = this.props
		store.removeForwardIpList(item).catch(handleError)
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
		const { loadingForwardIpList, forwardIpList } = store
		return (
			<div className={classes.root}>
				<DataTable
					type="forward ip list"
					inputLabel="IP Address"
					dataList={forwardIpList}
					onAddData={this.handleAddItem}
					onRemoveData={this.handleRemoveItem}
					loading={loadingForwardIpList}
					onRefresh={this.handleRefreshData} />
			</div>
		)
	}
}

export default withStyles(styles)(ForwardIPPanel)
