import Paper from '@material-ui/core/Paper'
import { createMuiTheme } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CSSProperties } from '@material-ui/styles/withStyles'
import classNames from 'classnames'
import * as Color from 'color'
import React from 'react'

const colorStyle = {
	color: 'white'
}

const titleTheme = createMuiTheme({
	typography: {
		h1: colorStyle,
		h2: colorStyle,
		h3: colorStyle,
		h4: colorStyle,
		h5: colorStyle,
		h6: { ...colorStyle, fontWeight: 300 },
		subtitle1: { ...colorStyle, fontWeight: 300, lineHeight: 1.5 },
		subtitle2: { ...colorStyle, fontWeight: 300 },
		body1: { color: Color(colorStyle.color).alpha(0.8).toString(), fontWeight: 300 },
		body2: { ...colorStyle, fontWeight: 300 },
		caption: colorStyle,
		overline: colorStyle,
		display4: colorStyle,
		display3: colorStyle,
		display2: colorStyle,
		display1: colorStyle,
		headline: colorStyle,
		title: colorStyle,
		subheading: colorStyle,
		button: colorStyle
	}
})

interface StyleProps {
	titleBackground?: string
}

const useStyles = makeStyles((theme: Theme) => ({
	titleWrap: {
		marginLeft: 15,
		marginRight: 15
	} as CSSProperties,
	titleArea: (props: StyleProps) => {
		const bgColor = props.titleBackground || theme.palette.primary.main
		const bgGradient = `linear-gradient(60deg, ${Color(bgColor).lighten(0.1)}, ${bgColor})`
		const sc1 = Color(bgColor).alpha(0.28)
		const sc2 = Color('#000').alpha(0.12)
		const sc3 = Color(bgColor).alpha(0.2)
		return {
			position: 'relative',
			top: -20,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			boxSizing: 'border-box',
			borderRadius: 3,
			color: 'white',
			padding: '12px 15px',
			background: bgGradient,
			boxShadow: `0 12px 20px -10px ${sc1}, 0 4px 20px 0px ${sc2}, 0 7px 8px -5px ${sc3}`,
			[theme.breakpoints.down('xs')]: {
				padding: '8px 10px'
			}
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
		padding: '0 20px 15px',
		[theme.breakpoints.down('xs')]: {
			padding: '0 10px 10px'
		}
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
				<ThemeProvider theme={titleTheme}>
					<div className={classNames(
						classes.titleArea,
						{ [classes.titleAreaNonFullWidth]: !titleFullWidth },
						customClasses.title
					)}>
						{title}
					</div>
				</ThemeProvider>
			</div>
			<div className={classNames(classes.content, customClasses.content)}>
				{children}
			</div>
		</Paper>
	)
}

export interface TitleProps {
	title: string
	subtitle?: string
	icon?: React.ReactNode
}

const useTitleStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center'
	} as CSSProperties,
	icon: {
		marginRight: 10
	} as CSSProperties,
	titleWrap: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	} as CSSProperties
}))

export function Title(props: TitleProps) {
	const classes = useTitleStyles()
	const { title, icon, subtitle } = props
	return (
		<div className={classes.root}>
			{icon && <div className={classes.icon}>{icon}</div>}
			<div className={classes.titleWrap}>
				<Typography variant="subtitle1">{title}</Typography>
				{subtitle && <Typography>{subtitle}</Typography>}
			</div>
		</div>
	)
}
