import CircularProgress from '@material-ui/core/CircularProgress'
import orange from '@material-ui/core/colors/orange'
import IconButton from '@material-ui/core/IconButton'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import RefreshIcon from '@material-ui/icons/Refresh'
import React from 'react'
import { httpGet } from '../../../util/http'
import FloatTitlePaper, { Title } from '../../FloatTitlePaper'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		padding: '16px 20px',
		[theme.breakpoints.down('xs')]: {
			padding: '10px'
		}
	},
	title: {
		paddingBottom: '10px'
	},
	tableWrap: {
		paddingBottom: '10px'
	},
	tableCell: {
		[theme.breakpoints.down('xs')]: {
			padding: '4px 16px 4px 12px'
		}
	},
	progressWrap: {
		textAlign: 'center'
	},
	header: {
		padding: '4px 20px'
	},
	refreshButton: {
		marginLeft: '10px'
	}
})

interface ClientDataItem {
	host: string
	ip: string
	mac: string
}

interface ClientsPaperState {
	clientsData: ClientDataItem[]
	loading: boolean
}

class ClientsPaper extends React.Component<WithStyles & WithWidth, ClientsPaperState> {

	state = {
		clientsData: [],
		loading: false
	}

	startLoadData = () => {
		this.setState({
			loading: true
		})
		httpGet('/router/clients').then((data) => {
			this.setState({
				clientsData: data,
				loading: false
			})
		})
	}

	componentDidMount() {
		this.startLoadData()
	}

	render() {
		const { classes, width } = this.props
		const { clientsData, loading } = this.state
		return (
			<FloatTitlePaper title={<Title title="Online Clients" />} titleBackground={orange[500]}>
				{loading
					? <div className={classes.progressWrap}>
						<CircularProgress color="primary"/>
					</div>
					: <div>
						<div className={classes.header}>
							<Typography variant="caption">
								<span>{clientsData.length} items</span>
								<IconButton classes={{ root: classes.refreshButton }} onClick={this.startLoadData}>
									<RefreshIcon fontSize="small" />
								</IconButton>
							</Typography>
						</div>
						<div className={classes.tableWrap}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell classes={{ root: classes.tableCell }}>Host</TableCell>
										<TableCell classes={{ root: classes.tableCell }}>IP</TableCell>
										{isWidthUp('sm', width)
											? <TableCell classes={{ root: classes.tableCell }}>MAC</TableCell>
											: null}
									</TableRow>
								</TableHead>
								<TableBody>
									{clientsData.map((c, idx) => (
										<TableRow key={idx}>
											<TableCell classes={{ root: classes.tableCell }}>{c.host}</TableCell>
											<TableCell classes={{ root: classes.tableCell }}>{c.ip}</TableCell>
											{isWidthUp('sm', width)
												? <TableCell classes={{ root: classes.tableCell }}>{c.mac}</TableCell>
												: null}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				}
			</FloatTitlePaper>
		)
	}
}

export default withStyles(styles)(withWidth()(ClientsPaper))
