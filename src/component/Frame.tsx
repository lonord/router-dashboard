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
import { Route, RouteComponentProps, withRouter } from 'react-router'
import { matchPath } from 'react-router-dom'
import { convertItemName } from '../util/pathutil'

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
		background: 'transparent',
		boxShadow: 'none',
		color: theme.palette.text.primary
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
		paddingLeft: '24px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
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
		overflowY: 'auto'
	},
	contentChildWrap: {
		padding: theme.spacing.unit * 3,
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing.unit
		}
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
}

type AttachedProps = WithStyles & WithTheme & ResponsiveFrameProps & RouteComponentProps

class ResponsiveFrame extends React.Component<AttachedProps, ResponsiveFrameState> {
	state = {
		mobileOpen: false
	}

	handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }))
	}

	handleDrawerItemClick = (index: number) => {
		const { items, history } = this.props
		const newPath = index === 0 ? '' : convertItemName(items[index].title)
		history.push(`/${newPath}`)
	}

	render() {
		const { classes, title, version, items, location } = this.props
		const { mobileOpen } = this.state
		const match = matchPath<any>(location.pathname, '/:itemPath')
		const itemPath = match ? match.params.itemPath : convertItemName(items[0].title)

		const drawer = (
			<div>
				<div className={classes.toolbar}>
					<Typography
						variant="title"
						color="textSecondary"
						noWrap={false}>
						{title}
					</Typography>
					<Typography
						variant="caption"
						color="textSecondary"
						noWrap={false}>
						{version}
					</Typography>
				</div>
				<Divider />
				<List>
					{items.map((item, idx) => (
						<ListItem key={idx}
							onClick={() => this.handleDrawerItemClick(idx)}
							selected={idx === findItemIndex(items, itemPath)} button>
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
					<div className={classes.appBar}>
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
								{items.map((item, idx) => (
									<Route key={item.title}
										path={idx === 0 ? '/' : '/' + convertItemName(item.title)}
										exact={idx === 0}
										render={({ match }) => !!match && item.title} />
								))}
							</Typography>
						</Toolbar>
					</div>
					<div className={classes.contentChildWrap}>
						{items.map((item, idx) => (
							<Route key={item.title}
								path={idx === 0 ? '/' : '/' + convertItemName(item.title)}
								exact={idx === 0}
								render={({ match }) => !!match && items[idx].content} />
						))}
					</div>
				</main>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(ResponsiveFrame))

function findItemIndex(items: FrameItem[], itemPath: string): number {
	for (let i = 0; i < items.length; i++) {
		const item = items[i]
		if (convertItemName(item.title) === itemPath) {
			return i
		}
	}
	return -1
}
