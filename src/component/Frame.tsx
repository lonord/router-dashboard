// tslint:disable:no-submodule-imports
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { StyleRulesCallback, withStyles, WithStyles, WithTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'

const drawerWidth = 250

const styles: StyleRulesCallback<string> = theme => ({
	root: {
		flexGrow: 1,
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	navIcon: {
		marginLeft: -12,
		marginRight: 20,
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	toolbar: {
		...theme.mixins.toolbar,
		paddingLeft: '24px'
	},
	toolbarTitle: {
		paddingTop: '10px'
	},
	toolbarVersion: {
		paddingTop: '5px',
		[theme.breakpoints.down('xs')]: {
			paddingTop: '2px'
		}
	},
	drawerDocked: {
		height: '100%'
	},
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		overflowY: 'auto'
	}
})

export interface FrameItem {
	title: string
	drawerItemIcon: JSX.Element
	content: JSX.Element
}

export interface ResponsiveFrameProps {
	title: string
	version: string
	items: FrameItem[]
}

interface ResponsiveFrameState {
	mobileOpen: boolean
	itemIndex: number
}

class ResponsiveFrame extends React.Component<WithStyles & WithTheme & ResponsiveFrameProps, ResponsiveFrameState> {
	state = {
		mobileOpen: false,
		itemIndex: 0
	}

	handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }))
	}

	handleDrawerItemClick = (index: number) => {
		this.setState({
			itemIndex: index
		})
	}

	render() {
		const { classes, title, version, items } = this.props
		const { mobileOpen, itemIndex } = this.state

		const drawer = (
			<div>
				<div className={classes.toolbar}>
					<Typography
						variant="title"
						color="textSecondary"
						noWrap={false}
						className={classes.toolbarTitle}>
						{title}
					</Typography>
					<Typography
						variant="caption"
						color="textSecondary"
						noWrap={false}
						className={classes.toolbarVersion}>
						{version}
					</Typography>
				</div>
				<Divider />
				<List>
					{items.map((item, idx) => (
						<ListItem key={idx}
							onClick={() => this.handleDrawerItemClick(idx)}
							selected={idx === itemIndex} button>
							<ListItemIcon>
								{item.drawerItemIcon}
							</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItem>
					))}
				</List>
			</div>
		)

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIcon}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap>
							{items[itemIndex].title}
						</Typography>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={this.handleDrawerToggle}
						onMouseUp={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
							docked: classes.drawerDocked
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper,
							docked: classes.drawerDocked
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{items[itemIndex].content}
				</main>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(ResponsiveFrame)
