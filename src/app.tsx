import blue from '@material-ui/core/colors/blue'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
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
	palette: {
		primary: blue
	}
})

class App extends React.Component<any, any> {
	public render() {
		return (
			<MuiThemeProvider theme={theme}>
				<HashRouter>
					<Frame title="Router Dashboard" version={version} items={[
						indexItem,
						routerItem,
						shadowsocksItem
					]} />
				</HashRouter>
			</MuiThemeProvider>
		)
	}
}

export default hot(module)(App)
