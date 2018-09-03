import 'normalize.css'
import 'typeface-roboto'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'

let rootEl = document.getElementById('root')
if (!rootEl) {
	rootEl = document.createElement('div')
	rootEl.id = 'root'
	document.body.appendChild(rootEl)
}
ReactDOM.render(<App />, rootEl)
