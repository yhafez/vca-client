import React, { useContext } from 'react'
import { Grid, Typography, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { SocketContext } from '../socketContext'

const VideoPlayer = () => {
	const theme = useTheme()
	const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
		useContext(SocketContext)

	return (
		<Grid
			container
			sx={theme => ({
				justifyContent: 'center',
				[theme.breakpoints.down('xs')]: { flexDirection: 'column' },
			})}
		>
			{stream && (
				<Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom>
							{name || 'Name'}
						</Typography>
						<video
							playsInline
							muted
							ref={myVideo}
							autoPlay
							style={{
								width: '550px',
								[theme.breakpoints.down('xs')]: {
									width: '300px',
								},
							}}
						/>
					</Grid>
				</Paper>
			)}
			{callAccepted && !callEnded && (
				<Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom>
							{call?.name || 'Name'}
						</Typography>
						<video
							playsInline
							ref={userVideo}
							autoPlay
							style={{
								width: '550px',
								[theme.breakpoints.down('xs')]: {
									width: '300px',
								},
							}}
						/>
					</Grid>
				</Paper>
			)}
		</Grid>
	)
}

export default VideoPlayer
