import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { inject, observer } from 'mobx-react'
import React from 'react'
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
		expandIndex: -1
	}

	handlePanelChange = (idx) => (event, expanded) => {
		this.setState({
			expandIndex: expanded ? idx : -1
		})
	}

	render() {
		const { classes, store, handleError } = this.props
		const { expandIndex } = this.state
		return (
			<div>
				<ExpansionPanel expanded={expandIndex === 0} onChange={this.handlePanelChange(0)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
						<Typography variant="subheading">GFW List</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails classes={{ root: classes.paper }}>
						<GfwlistPanel handleError={handleError}/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel expanded={expandIndex === 1} onChange={this.handlePanelChange(1)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
						<Typography variant="subheading">Forward IP List</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails classes={{ root: classes.paper }}>
						<ForwardIPPanel handleError={handleError}/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel expanded={expandIndex === 2} onChange={this.handlePanelChange(2)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
						<Typography variant="subheading">Bypass IP List</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails classes={{ root: classes.paper }}>
						<BypassIPPanel handleError={handleError} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel expanded={expandIndex === 3} onChange={this.handlePanelChange(3)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
						<Typography variant="subheading">Forward Client IP List</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails classes={{ root: classes.paper }}>
						<ForwardClientIPPanel handleError={handleError} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel expanded={expandIndex === 4} onChange={this.handlePanelChange(4)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.paper }}>
						<Typography variant="subheading">Bypass Client IP List</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails classes={{ root: classes.paper }}>
						<BypassClientIPPanel handleError={handleError} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	}
}

export default withStyles(styles)(IPListPaper)
