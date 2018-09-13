declare var SERVER_ADDR: string
export const httpAddr = SERVER_ADDR

export const httpGet = async (path: string) => {
	const res = await fetch(httpAddr + path, {
		method: 'GET'
	})
	return handleResult(res)
}

export const httpPost = async (path: string, data: { [x: string]: any }) => {
	const res = await fetch(httpAddr + path, {
		method: 'POST',
		body: parseRequestBody(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return handleResult(res)
}

export const httpPut = async (path: string, data?: { [x: string]: any }) => {
	const res = await fetch(httpAddr + path, {
		method: 'PUT',
		body: parseRequestBody(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return handleResult(res)
}

export const httpDel = async (path: string) => {
	const res = await fetch(httpAddr + path, {
		method: 'DELETE'
	})
	return handleResult(res)
}

export interface HttpListener {
	stop()
}

export const httpListen = (path: string, cb: (data: any, type?: 'string' | 'object') => void): HttpListener => {
	const eventSource = new EventSource(httpAddr + path)
	eventSource.onmessage = (msg) => {
		try {
			const d = JSON.parse(msg.data)
			cb(d, 'object')
		} catch {
			const d = msg.data
			cb(d, 'string')
		}
	}
	return {
		stop: () => {
			eventSource.close()
		}
	}
}

async function handleResult(res: Response): Promise<any> {
	const type = res.headers.get('Content-Type')
	const resultData = type && type.indexOf('json') !== -1
		? (await res.json())
		: (await res.text())
	if (resultData && resultData.data && typeof resultData.status === 'number') {
		return resultData.data
	}
	return resultData
}

function parseRequestBody(data: { [x: string]: any }): string {
	return data ? JSON.stringify(data) : null
}
