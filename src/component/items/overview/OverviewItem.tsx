import cyan from '@material-ui/core/colors/cyan'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard'
import HomeIcon from '@material-ui/icons/Home'
import MemoryIcon from '@material-ui/icons/Memory'
import StorageIcon from '@material-ui/icons/Storage'
import { makeStyles } from '@material-ui/styles'
import { CSSProperties } from '@material-ui/styles/withStyles'
import React, { useEffect, useState } from 'react'
import { httpListen } from '../../../util/http'
import FloatTitlePaper, { Title } from '../../FloatTitlePaper'
import { FrameItem } from '../../Frame'
import CpuPanel from './panels/Cpu'
import MemoryPanel from './panels/Memory'
import StoragePanel from './panels/Storage'

const useStyles = makeStyles(theme => ({
	item: {
		marginBottom: 44
	} as CSSProperties
}))

function OverviewContent() {
	const classes = useStyles()
	const [statData, setStatData] = useState<any>(null)
	useEffect(() => {
		const listener = httpListen('/sys/system', (data) => {
			setStatData(data)
		})
		return () => {
			listener.stop()
		}
	}, [])
	return (
		<div>
			<FloatTitlePaper
				title={<Title title="CPU" icon={<MemoryIcon/>}/>}
				classes={{ root: classes.item }}
				titleBackground={cyan[500]}>
				<CpuPanel data={statData && statData.cpu}/>
			</FloatTitlePaper>
			<FloatTitlePaper
				title={<Title title="Memory" icon={<DeveloperBoardIcon/>}/>}
				classes={{ root: classes.item }}
				titleBackground={orange[500]}>
				<MemoryPanel data={statData && statData.memory}/>
			</FloatTitlePaper>
			<FloatTitlePaper
				title={<Title title="Storage" icon={<StorageIcon/>}/>}
				classes={{ root: classes.item }}
				titleBackground={red[500]}>
				<StoragePanel data={statData && statData.disk}/>
			</FloatTitlePaper>
		</div>
	)
}

const item: FrameItem = {
	title: 'Overview',
	drawerItemIcon: <HomeIcon />,
	content: <OverviewContent />
}

export default item
