import React from 'react'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'

import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notifications from './components/Notifications'

import './App.css'

function App() {
	return (
		<div
			className="App"
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
		>
			<AppBar
				position="static"
				color="transparent"
				sx={theme => ({
					borderRadius: 15,
					margin: '30px 100px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					width: '600px',
					border: '2px solid black',

					[theme.breakpoints.down('xs')]: {
						width: '90%',
					},
				})}
			>
				<Typography variant="h2" align="center">
					Video Chat App
				</Typography>
			</AppBar>
			<VideoPlayer />
			<Options>
				<Notifications />
			</Options>
		</div>
	)
}

export default App
