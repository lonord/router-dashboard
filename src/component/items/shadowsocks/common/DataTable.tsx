import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

const styles: StyleRulesCallback<string> = theme => ({
	actionWrap: {
		height: '56px',
		lineHeight: '56px',
		padding: '0 8px'
	},
	actionRight: {
		float: 'right'
	},
	dialogPaper: {
		minWidth: '360px',
		[theme.breakpoints.down('xs')]: {
			minWidth: '280px',
			margin: '10px'
		}
	},
	progressWrap: {
		position: 'relative',
		minHeight: '64px'
	},
	progressCover: {
		position: 'absolute',
		top: '0%',
		left: '0%',
		width: '100%',
		height: '100%',
		background: '#fff',
		opacity: 0.3
	},
	progress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -32,
		marginLeft: -32
	},
	emptyText: {
		padding: '24px 24px 0 24px'
	},
	tableCell: {
		[theme.breakpoints.down('xs')]: {
			padding: '4px 16px 4px 12px'
		}
	}
})

export interface DataTableProps {
	type: string
	dataList: string[]
	onAddData(item: string)
	onRemoveData(item: string)
	loading?: boolean
	onRefresh?()
	inputLabel?: string
}

interface DataTableState {
	deleteDialogShow: boolean
	deleteItem: string
	addDialogShow: boolean
	addItem: string
}

class DataTable extends React.Component<DataTableProps & WithStyles, DataTableState> {

	state = {
		deleteDialogShow: false,
		deleteItem: null,
		addDialogShow: false,
		addItem: null
	}

	handleOpenDeleteDialog = (item: string) => {
		this.setState({
			deleteDialogShow: true,
			deleteItem: item
		})
	}

	handleCloseDeleteDialog = (doDelete?: boolean) => {
		const { onRemoveData } = this.props
		const item = this.state.deleteItem
		this.setState({
			deleteDialogShow: false
		}, () => {
			if (doDelete === true && item) {
				onRemoveData(item)
			}
		})
	}

	handleOpenAddDialog = () => {
		this.setState({
			addDialogShow: true,
			addItem: ''
		})
	}

	handleCloseAddDialog = (doAdd?: boolean) => {
		const { onAddData } = this.props
		const item = this.state.addItem
		this.setState({
			addDialogShow: false
		}, () => {
			if (doAdd === true && item) {
				onAddData(item)
			}
		})
	}

	handleAddItemChange = (e) => {
		this.setState({
			addItem: e.target.value
		})
	}

	render() {
		const { dataList, classes, onRefresh, type, inputLabel, loading } = this.props
		const {
			deleteDialogShow,
			deleteItem,
			addDialogShow,
			addItem
		} = this.state
		return (
			<>
				<div className={classes.progressWrap}>
					<div className={classes.actionWrap}>
						<Button color="primary" onClick={this.handleOpenAddDialog}>Add</Button>
						<span className={classes.actionRight}>
							{onRefresh
								? <Button onClick={onRefresh}>Refresh</Button>
								: null}
						</span>
					</div>
					<Divider />
					{dataList && dataList.length > 0
						? <Table>
							<TableBody>
								{dataList.map((item) => (
									<TableRow key={item} hover>
										<TableCell classes={{ root: classes.tableCell }}>{item}</TableCell>
										<TableCell classes={{ root: classes.tableCell }} numeric>
											<IconButton onClick={() => this.handleOpenDeleteDialog(item)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						: <Typography variant="caption" className={classes.emptyText}>No Items</Typography>}
					{loading && <>
						<div className={classes.progressCover}/>
						<CircularProgress size={64} className={classes.progress} />
					</>}
				</div>
				<Dialog classes={{ paper: classes.dialogPaper }}
					open={deleteDialogShow}
					onClose={() => this.handleCloseDeleteDialog()}>
					<DialogTitle>Delete this item?</DialogTitle>
					<DialogContent>
						<DialogContentText>{deleteItem}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.handleCloseDeleteDialog()}>Cancel</Button>
						<Button color="secondary" onClick={() => this.handleCloseDeleteDialog(true)}>Delete</Button>
					</DialogActions>
				</Dialog>
				<Dialog classes={{ paper: classes.dialogPaper }}
					open={addDialogShow}
					onClose={() => this.handleCloseAddDialog()}>
					<DialogTitle>Add</DialogTitle>
					<DialogContent>
						<DialogContentText>Add {type} item</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							label={inputLabel || 'Item'}
							fullWidth
							value={addItem}
							onChange={this.handleAddItemChange}/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.handleCloseAddDialog()}>Cancel</Button>
						<Button color="primary" onClick={() => this.handleCloseAddDialog(true)}>Add</Button>
					</DialogActions>
				</Dialog>
			</>
		)
	}
}

export default withStyles(styles)(DataTable)
