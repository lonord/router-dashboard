import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'

let rootEl = document.getElementById('root')
if (!rootEl) {
	rootEl = document.createElement('div')
	rootEl.id = 'root'
	document.body.appendChild(rootEl)
	const style = document.createElement('style')
	style.innerText = `html,body,#root { height: 100%; }`
	document.head.appendChild(style)
	const link = document.createElement('link')
	link.setAttribute('rel', 'apple-touch-icon')
	link.setAttribute('href', '/images/logo.png')
	document.head.appendChild(link)
}
ReactDOM.render(<App />, rootEl)
