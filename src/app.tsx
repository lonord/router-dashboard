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

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
		fontWeightMedium: 300,
		button: {
			fontWeight: 500
		}
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
