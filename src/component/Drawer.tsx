// tslint:disable:no-submodule-imports
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/Inbox'
import React from 'react'

const styles = {
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
}

class TemporaryDrawer extends React.Component<any, any> {
	state = {
		top: false,
		left: false,
		bottom: false,
		right: false
	}

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		})
	}

	render() {
		const { classes } = this.props

		const sideList = (
			<div className={classes.list}>
				<List>
					<ListItem button>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
				</List>
			</div>
		)

		const fullList = (
			<div className={classes.fullList}>
				<List>
					<ListItem button>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
				</List>
			</div>
		)

		return (
			<div>
				<Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
				<Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
				<Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
				<Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
				<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}
					>
						{sideList}
					</div>
				</Drawer>
				<Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('top', false)}
						onKeyDown={this.toggleDrawer('top', false)}
					>
						{fullList}
					</div>
				</Drawer>
				<Drawer
					anchor="bottom"
					open={this.state.bottom}
					onClose={this.toggleDrawer('bottom', false)}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('bottom', false)}
						onKeyDown={this.toggleDrawer('bottom', false)}
					>
						{fullList}
					</div>
				</Drawer>
				<Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('right', false)}
						onKeyDown={this.toggleDrawer('right', false)}
					>
						{sideList}
					</div>
				</Drawer>
			</div>
		)
	}
}

export default withStyles(styles)(TemporaryDrawer)
