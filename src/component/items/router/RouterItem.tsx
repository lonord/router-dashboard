import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import RouterIcon from '@material-ui/icons/Router'
import React from 'react'
import { FrameItem } from '../../Frame'
import ClientsPaper from './Clients'
import DnsmasqPaper from './Dnsmasq'
import NetSpeedPaper from './NetSpeed'

const styles: StyleRulesCallback<string> = theme => ({
	paperWrap: {
		paddingBottom: '24px'
	}
})

class RouterContent extends React.Component<WithStyles, any> {
	render() {
		const { classes } = this.props
		return (
			<div>
				<div className={classes.paperWrap}><NetSpeedPaper /></div>
				<div className={classes.paperWrap}><ClientsPaper /></div>
				<div className={classes.paperWrap}><DnsmasqPaper /></div>
			</div>
		)
	}
}

const WrappedRouterContent = withStyles(styles)(RouterContent)

const item: FrameItem = {
	title: 'Router Service',
	drawerItemIcon: <RouterIcon />,
	content: <WrappedRouterContent />
}

export default item
