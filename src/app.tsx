import * as React from 'react'
import { hot } from 'react-hot-loader'
import AppBar from './component/AppBar'

class App extends React.Component<any, any> {
	public render() {
		return (
			<>
				<AppBar/>
			</>
		)
	}
}

export default hot(module)(App)
