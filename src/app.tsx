import blue from '@material-ui/core/colors/blue'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'
import Frame from './component/Frame'
import indexItem from './component/items/overview/OverviewItem'
import routerItem from './component/items/router/RouterItem'
import shadowsocksItem from './component/items/shadowsocks/ShadowsocksItem'

declare const PKG_VERSION: any
const version = PKG_VERSION

function createFontWeightStyle(weight: number) {
	return {
		fontWeight: weight
	}
}

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
		fontWeightMedium: 300,
		button: createFontWeightStyle(400),
		h1: createFontWeightStyle(500),
		h2: createFontWeightStyle(500),
		h3: createFontWeightStyle(400),
		h4: createFontWeightStyle(400),
		h5: createFontWeightStyle(300),
		h6: createFontWeightStyle(300),
		subtitle1: createFontWeightStyle(300),
		subtitle2: createFontWeightStyle(300),
		body1: createFontWeightStyle(300),
		body2: createFontWeightStyle(300),
		caption: createFontWeightStyle(300),
		overline: createFontWeightStyle(300),
		display4: createFontWeightStyle(400),
		display3: createFontWeightStyle(400),
		display2: createFontWeightStyle(300),
		display1: createFontWeightStyle(300),
		headline: createFontWeightStyle(400),
		title: createFontWeightStyle(400),
		subheading: createFontWeightStyle(300)
	},
	palette: {
		primary: blue,
		background: {
			default: '#eee',
			paper: 'white'
		}
	}
})

class App extends React.Component<any, any> {
	public render() {
		return (
			<ThemeProvider theme={theme}>
				<HashRouter>
					<Frame title="Router Dashboard" version={version} items={[
						indexItem,
						routerItem,
						shadowsocksItem
					]} />
				</HashRouter>
			</ThemeProvider>
		)
	}
}

export default hot(module)(App)
