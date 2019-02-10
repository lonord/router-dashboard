import Button from '@material-ui/core/Button'
import orange from '@material-ui/core/colors/orange'
import Hidden from '@material-ui/core/Hidden'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CloudOffIcon from '@material-ui/icons/CloudOff'
import CloudQueueIcon from '@material-ui/icons/CloudQueue'
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import React from 'react'
import FloatTitlePaper from '../../FloatTitlePaper'
import Store from './data/Store'
import BypassClientIPPanel from './panels/BypassClientIPPanel'
import BypassIPPanel from './panels/BypassIPPanel'
import ForwardClientIPPanel from './panels/ForwardClientIPPanel'
import ForwardIPPanel from './panels/ForwardIPPanel'
import GfwlistPanel from './panels/GfwlistPanel'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '10px',
			paddingRight: '10px'
		}
	},
	titleNode: {
		display: 'flex',
		alignItems: 'center'
	},
	titleNodeTitle: {
		marginRight: theme.spacing.unit
	},
	titleNodeButtonText: {
		marginLeft: theme.spacing.unit,
		fontWeight: 300
	},
	titleNodeButton: {
		marginLeft: 4,
		minWidth: 32,
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
	titleNodeButtonSelect: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.2)'
		}
	},
	titleNodeButtonNoSelect: {
		opacity: 0.7
	},
	itemTitle: {
		paddingBottom: '10px'
	}
})

interface IPListPaperProps {
	handleError(msg: string)
	store?: Store
}

interface IPListPaperState {
	expandIndex: number
}

@inject('store')
@observer
class IPListPaper extends React.Component<IPListPaperProps & WithStyles, IPListPaperState> {

	state = {
		expandIndex: 0
	}

	handlePanelChange = (idx) => {
		this.setState({
			expandIndex: idx
		})
	}

	render() {
		const { classes, store, handleError } = this.props
		const { expandIndex } = this.state

		const actionName = expandIndex === 1
			? 'Forward IP List'
			: expandIndex === 2
				? 'Bypass IP List'
				: expandIndex === 3
					? 'Forward Client IP List'
					: expandIndex === 4
						? 'Bypass Client IP List'
						: ''

		const titleNode = (
			<div className={classes.titleNode}>
				<Typography className={classes.titleNodeTitle}>Rules:</Typography>
				<Button color="inherit"
					classes={{
						root: classNames(
							classes.titleNodeButton,
							{ [classes.titleNodeButtonSelect]: expandIndex === 0 },
							{ [classes.titleNodeButtonNoSelect]: expandIndex !== 0 }
						)
					}}
					onClick={() => this.handlePanelChange(0)}>
					<VerifiedUserIcon />
					<Hidden mdDown>
						<span className={classes.titleNodeButtonText}>GFW</span>
					</Hidden>
				</Button>
				<Button color="inherit"
					classes={{
						root: classNames(
							classes.titleNodeButton,
							{ [classes.titleNodeButtonSelect]: expandIndex === 1 },
							{ [classes.titleNodeButtonNoSelect]: expandIndex !== 1 }
						)
					}}
					onClick={() => this.handlePanelChange(1)}>
					<CloudQueueIcon />
					<Hidden mdDown>
						<span className={classes.titleNodeButtonText}>Forward IP</span>
					</Hidden>
				</Button>
				<Button color="inherit"
					classes={{
						root: classNames(
							classes.titleNodeButton,
							{ [classes.titleNodeButtonSelect]: expandIndex === 2 },
							{ [classes.titleNodeButtonNoSelect]: expandIndex !== 2 }
						)
					}}
					onClick={() => this.handlePanelChange(2)}>
					<CloudOffIcon />
					<Hidden mdDown>
						<span className={classes.titleNodeButtonText}>Bypass IP</span>
					</Hidden>
				</Button>
				<Button color="inherit"
					classes={{
						root: classNames(
							classes.titleNodeButton,
							{ [classes.titleNodeButtonSelect]: expandIndex === 3 },
							{ [classes.titleNodeButtonNoSelect]: expandIndex !== 3 }
						)
					}}
					onClick={() => this.handlePanelChange(3)}>
					<DesktopWindowsIcon />
					<Hidden mdDown>
						<span className={classes.titleNodeButtonText}>Forward Client</span>
					</Hidden>
				</Button>
				<Button color="inherit"
					classes={{
						root: classNames(
							classes.titleNodeButton,
							{ [classes.titleNodeButtonSelect]: expandIndex === 4 },
							{ [classes.titleNodeButtonNoSelect]: expandIndex !== 4 }
						)
					}}
					onClick={() => this.handlePanelChange(4)}>
					<DesktopAccessDisabledIcon />
					<Hidden mdDown>
						<span className={classes.titleNodeButtonText}>Bypass Client</span>
					</Hidden>
				</Button>
			</div>
		)

		return (
			<FloatTitlePaper title={titleNode} titleBackground={orange[500]}>
				{expandIndex > 0 && (
					<Hidden lgUp>
						<Typography className={classes.itemTitle}>{actionName}</Typography>
					</Hidden>
				)}
				{expandIndex === 0 && <GfwlistPanel handleError={handleError} />}
				{expandIndex === 1 && <ForwardIPPanel handleError={handleError} />}
				{expandIndex === 2 && <BypassIPPanel handleError={handleError} />}
				{expandIndex === 3 && <ForwardClientIPPanel handleError={handleError} />}
				{expandIndex === 4 && <BypassClientIPPanel handleError={handleError} />}
			</FloatTitlePaper>
		)

		// return (
		// 	<div>
		// 		<ExpansionPanel expanded={expandIndex === 0} onChange={this.handlePanelChange(0)}>
		// 			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
		// 				<Typography variant="subheading">GFW List</Typography>
		// 			</ExpansionPanelSummary>
		// 			<ExpansionPanelDetails classes={{ root: classes.paper }}>
		// 				<GfwlistPanel handleError={handleError}/>
		// 			</ExpansionPanelDetails>
		// 		</ExpansionPanel>
		// 		<ExpansionPanel expanded={expandIndex === 1} onChange={this.handlePanelChange(1)}>
		// 			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
		// 				<Typography variant="subheading">Forward IP List</Typography>
		// 			</ExpansionPanelSummary>
		// 			<ExpansionPanelDetails classes={{ root: classes.paper }}>
		// 				<ForwardIPPanel handleError={handleError}/>
		// 			</ExpansionPanelDetails>
		// 		</ExpansionPanel>
		// 		<ExpansionPanel expanded={expandIndex === 2} onChange={this.handlePanelChange(2)}>
		// 			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
		// 				<Typography variant="subheading">Bypass IP List</Typography>
		// 			</ExpansionPanelSummary>
		// 			<ExpansionPanelDetails classes={{ root: classes.paper }}>
		// 				<BypassIPPanel handleError={handleError} />
		// 			</ExpansionPanelDetails>
		// 		</ExpansionPanel>
		// 		<ExpansionPanel expanded={expandIndex === 3} onChange={this.handlePanelChange(3)}>
		// 			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
		// 				<Typography variant="subheading">Forward Client IP List</Typography>
		// 			</ExpansionPanelSummary>
		// 			<ExpansionPanelDetails classes={{ root: classes.paper }}>
		// 				<ForwardClientIPPanel handleError={handleError} />
		// 			</ExpansionPanelDetails>
		// 		</ExpansionPanel>
		// 		<ExpansionPanel expanded={expandIndex === 4} onChange={this.handlePanelChange(4)}>
		// 			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
		// 				<Typography variant="subheading">Bypass Client IP List</Typography>
		// 			</ExpansionPanelSummary>
		// 			<ExpansionPanelDetails classes={{ root: classes.paper }}>
		// 				<BypassClientIPPanel handleError={handleError} />
		// 			</ExpansionPanelDetails>
		// 		</ExpansionPanel>
		// 	</div>
		// )
	}
}

export default withStyles(styles)(IPListPaper)
