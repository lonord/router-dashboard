import * as React from 'react'
import { hot } from 'react-hot-loader'
import Frame from './component/Frame'

class App extends React.Component<any, any> {
	public render() {
		return (
			<>
				<Frame/>
			</>
		)
	}
}

export default hot(module)(App)
