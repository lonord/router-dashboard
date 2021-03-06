import { action, computed, configure, observable, runInAction } from 'mobx'
import { httpDel, httpGet, httpPost, httpPut } from '../../../../util/http'

configure({ enforceActions: 'always' })

const SS_API = '/ss/api'

export type SSMode = 'auto' | 'global'

export default class Store {
	@observable version: string = ''
	@observable running: boolean = false
	@observable updatingRunningStatus: boolean = false
	@observable ssMode: SSMode = 'auto'
	@observable updatingSSModeStatus: boolean = false
	@observable uptime: number = 0

	@observable gfwlist: string[] = []
	@observable loadingGfwlist: boolean = false
	@observable updatingStandardGfwlist: boolean = false
	@observable standardGfwlistUpdateDate: number = 0

	@observable forwardIpList: string[] = []
	@observable loadingForwardIpList: boolean = false

	@observable bypassIpList: string[] = []
	@observable loadingBypassIpList: boolean = false

	@observable forwardClientList: string[] = []
	@observable loadingForwardClientList: boolean = false

	@observable bypassClientList: string[] = []
	@observable loadingBypassClientList: boolean = false

	@computed get updatingSystemStatus() {
		return this.updatingRunningStatus && this.updatingSSModeStatus
	}

	@action.bound
	async reload() {
		runInAction(() => {
			this.updatingRunningStatus = true
			this.updatingSSModeStatus = true
		})
		const result = await httpGet(`${SS_API}/status`)
		const ver = await httpGet(`${SS_API}/version`)
		runInAction(() => {
			this.running = !!result.running
			this.uptime = result.uptime
			this.ssMode = result.ssMode
			this.version = ver
			this.updatingRunningStatus = false
			this.updatingSSModeStatus = false
		})
	}

	@action.bound
	async start() {
		runInAction(() => {
			this.updatingRunningStatus = true
		})
		await httpPut(`${SS_API}/action/start`)
		const result = await httpGet(`${SS_API}/status`)
		runInAction(() => {
			this.running = !!result.running
			this.uptime = result.uptime
			this.ssMode = result.ssMode
			this.updatingRunningStatus = false
		})
	}

	@action.bound
	async stop() {
		runInAction(() => {
			this.updatingRunningStatus = true
		})
		await httpPut(`${SS_API}/action/stop`)
		const result = await httpGet(`${SS_API}/status`)
		runInAction(() => {
			this.running = !!result.running
			this.uptime = result.uptime
			this.ssMode = result.ssMode
			this.updatingRunningStatus = false
		})
	}

	@action.bound
	async setSSMode(mode: SSMode) {
		runInAction(() => {
			this.updatingSSModeStatus = true
		})
		await httpPost(`${SS_API}/ssmode`, { mode })
		const sm = await httpGet(`${SS_API}/ssmode`)
		runInAction(() => {
			this.ssMode = sm
			this.updatingSSModeStatus = false
		})
	}

	@action.bound
	async reloadGfwlist() {
		runInAction(() => {
			this.loadingGfwlist = true
		})
		const list = await httpGet(`${SS_API}/gfwlist/user`)
		const updateDate = await httpGet(`${SS_API}/gfwlist/standard/date`)
		runInAction(() => {
			this.gfwlist = list
			this.loadingGfwlist = false
			this.standardGfwlistUpdateDate = parseInt(updateDate)
		})
	}

	@action.bound
	async updateStandardGfwlist() {
		runInAction(() => {
			this.updatingStandardGfwlist = true
		})
		await httpPut(`${SS_API}/action/gfwlist/update`)
		const updateDate = await httpGet(`${SS_API}/gfwlist/standard/date`)
		runInAction(() => {
			this.updatingStandardGfwlist = false
			this.standardGfwlistUpdateDate = parseInt(updateDate)
		})
	}

	@action.bound
	async addGfwlist(domain: string) {
		runInAction(() => {
			this.loadingGfwlist = true
		})
		await httpPut(`${SS_API}/gfwlist/user/${encodeURIComponent(domain)}`)
		await httpPut(`${SS_API}/action/gfwlist/validate`)
		const list = await httpGet(`${SS_API}/gfwlist/user`)
		runInAction(() => {
			this.gfwlist = list
			this.loadingGfwlist = false
		})
	}

	@action.bound
	async removeGfwlist(domain: string) {
		runInAction(() => {
			this.loadingGfwlist = true
		})
		await httpDel(`${SS_API}/gfwlist/user/${encodeURIComponent(domain)}`)
		await httpPut(`${SS_API}/action/gfwlist/validate`)
		const list = await httpGet(`${SS_API}/gfwlist/user`)
		runInAction(() => {
			this.gfwlist = list
			this.loadingGfwlist = false
		})
	}

	@action.bound
	async reloadForwardIpList() {
		runInAction(() => {
			this.loadingForwardIpList = true
		})
		const list = await httpGet(`${SS_API}/iplist/forward`)
		runInAction(() => {
			this.forwardIpList = list
			this.loadingForwardIpList = false
		})
	}

	@action.bound
	async addForwardIpList(ip: string) {
		runInAction(() => {
			this.loadingForwardIpList = true
		})
		await httpPut(`${SS_API}/iplist/forward/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/iplist/forward`)
		await this.reloadBypassIpList()
		runInAction(() => {
			this.forwardIpList = list
			this.loadingForwardIpList = false
		})
	}

	@action.bound
	async removeForwardIpList(ip: string) {
		runInAction(() => {
			this.loadingForwardIpList = true
		})
		await httpDel(`${SS_API}/iplist/forward/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/iplist/forward`)
		runInAction(() => {
			this.forwardIpList = list
			this.loadingForwardIpList = false
		})
	}

	@action.bound
	async reloadBypassIpList() {
		runInAction(() => {
			this.loadingBypassIpList = true
		})
		const list = await httpGet(`${SS_API}/iplist/bypass`)
		runInAction(() => {
			this.bypassIpList = list
			this.loadingBypassIpList = false
		})
	}

	@action.bound
	async addBypassIpList(ip: string) {
		runInAction(() => {
			this.loadingBypassIpList = true
		})
		await httpPut(`${SS_API}/iplist/bypass/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/iplist/bypass`)
		await this.reloadForwardIpList()
		runInAction(() => {
			this.bypassIpList = list
			this.loadingBypassIpList = false
		})
	}

	@action.bound
	async removeBypassIpList(ip: string) {
		runInAction(() => {
			this.loadingBypassIpList = true
		})
		await httpDel(`${SS_API}/iplist/bypass/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/iplist/bypass`)
		runInAction(() => {
			this.bypassIpList = list
			this.loadingBypassIpList = false
		})
	}

	@action.bound
	async reloadForwardClientList() {
		runInAction(() => {
			this.loadingForwardClientList = true
		})
		const list = await httpGet(`${SS_API}/clientiplist/forward`)
		runInAction(() => {
			this.forwardClientList = list
			this.loadingForwardClientList = false
		})
	}

	@action.bound
	async addForwardClientList(ip: string) {
		runInAction(() => {
			this.loadingForwardClientList = true
		})
		await httpPut(`${SS_API}/clientiplist/forward/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/clientiplist/forward`)
		await this.reloadBypassClientList()
		runInAction(() => {
			this.forwardClientList = list
			this.loadingForwardClientList = false
		})
	}

	@action.bound
	async removeForwardClientList(ip: string) {
		runInAction(() => {
			this.loadingForwardClientList = true
		})
		await httpDel(`${SS_API}/clientiplist/forward/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/clientiplist/forward`)
		runInAction(() => {
			this.forwardClientList = list
			this.loadingForwardClientList = false
		})
	}

	@action.bound
	async reloadBypassClientList() {
		runInAction(() => {
			this.loadingBypassClientList = true
		})
		const list = await httpGet(`${SS_API}/clientiplist/bypass`)
		runInAction(() => {
			this.bypassClientList = list
			this.loadingBypassClientList = false
		})
	}

	@action.bound
	async addBypassClientList(ip: string) {
		runInAction(() => {
			this.loadingBypassClientList = true
		})
		await httpPut(`${SS_API}/clientiplist/bypass/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/clientiplist/bypass`)
		await this.reloadForwardClientList()
		runInAction(() => {
			this.bypassClientList = list
			this.loadingBypassClientList = false
		})
	}

	@action.bound
	async removeBypassClientList(ip: string) {
		runInAction(() => {
			this.loadingBypassClientList = true
		})
		await httpDel(`${SS_API}/clientiplist/bypass/${encodeURIComponent(ip)}`)
		const list = await httpGet(`${SS_API}/clientiplist/bypass`)
		runInAction(() => {
			this.bypassClientList = list
			this.loadingBypassClientList = false
		})
	}

}
