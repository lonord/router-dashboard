import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles'
import React from 'react'

const styles: StyleRulesCallback<string> = theme => ({
	paper: {
		padding: '24px',
		textAlign: 'center'
	}
})

class LoadingPaper extends React.Component<WithStyles, any> {
	render() {
		const { classes } = this.props
		return (
			<Paper elevation={1} className={classes.paper}>
				<CircularProgress />
			</Paper>
		)
	}
}

export default withStyles(styles)(LoadingPaper)
