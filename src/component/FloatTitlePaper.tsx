import Paper from '@material-ui/core/Paper'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { CSSProperties } from '@material-ui/styles/withStyles'
import classNames from 'classnames'
import * as Color from 'color'
import React from 'react'

interface StyleProps {
	titleBackground?: string
}

export const useStyles = makeStyles((theme: Theme) => ({
	titleWrap: {
		marginLeft: 15,
		marginRight: 15
	} as CSSProperties,
	titleArea: (props: StyleProps) => {
		const bgColor = props.titleBackground || theme.palette.primary.main
		const sc1 = Color(bgColor).alpha(0.28)
		const sc2 = Color(bgColor).alpha(0.12)
		const sc3 = Color(bgColor).alpha(0.2)
		return {
			position: 'relative',
			top: -20,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			boxSizing: 'border-box',
			borderRadius: 3,
			minHeight: 64,
			color: 'white',
			padding: 15,
			background: bgColor,
			boxShadow: `0 12px 20px -10px ${sc1}, 0 4px 20px 0px ${sc2}, 0 7px 8px -5px ${sc3}`
		} as CSSProperties
	},
	titleAreaNonFullWidth: {
		display: 'inline-flex !important'
	} as CSSProperties,
	root: {
		marginTop: 20,
		boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
		color: 'rgba(0, 0, 0, 0.87)',
		borderRadius: 6
	} as CSSProperties,
	content: {
		padding: '0 20px 15px'
	} as CSSProperties
}))

export interface FloatTitlePaperProps {
	title: React.ReactNode
	titleFullWidth?: boolean
	classes?: {
		title?: string,
		root?: string,
		content?: string
	}
	titleBackground?: string
	children?: React.ReactNode
}

export default function FloatTitlePaper(props: FloatTitlePaperProps) {
	const classes = useStyles({
		titleBackground: props.titleBackground
	})
	const { title, titleFullWidth, children } = props
	const customClasses = props.classes || {}
	return (
		<Paper className={classNames(classes.root, customClasses.root)}>
			<div className={classes.titleWrap}>
				<div className={classNames(
					classes.titleArea,
					{ [classes.titleAreaNonFullWidth]: !titleFullWidth },
					customClasses.title
				)}>
					{title}
				</div>
			</div>
			<div className={classNames(classes.content, customClasses.content)}>
				{children}
			</div>
		</Paper>
	)
}
