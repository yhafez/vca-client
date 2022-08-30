import React, { useContext, useState } from 'react'
import { Grid, Typography, Paper, Container, Button, TextField } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

import { SocketContext } from '../socketContext'

const Options = ({ children }: { children?: React.ReactNode }) => {
	const theme = useTheme()

	const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
		useContext(SocketContext)
	const [idToCall, setIdToCall] = useState('')

	return (
		<Container
			sx={{
				width: '600px',
				margin: '35px 0',
				padding: 0,
				[theme.breakpoints.down('xs')]: { flexDirection: 'column' },
			}}
		>
			<Paper elevation={10} sx={{ padding: '10px 20px', border: '2px solid black' }}>
				<form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
					<Grid
						container
						sx={{
							width: '100%',
							justifyContent: 'center',
							[theme.breakpoints.down('xs')]: { flexDirection: 'column' },
						}}
					>
						<Grid item xs={12} md={6} sx={{ padding: '20px' }}>
							<Typography gutterBottom variant="h6">
								Account Info
							</Typography>
							<TextField
								label="Name"
								value={name}
								onChange={e => setName(e.target.value)}
								fullWidth
							/>
							<CopyToClipboard text={me}>
								<Button
									style={{ marginTop: 20 }}
									variant="contained"
									color="primary"
									fullWidth
									startIcon={<Assignment fontSize="large" />}
								>
									Copy Your ID
								</Button>
							</CopyToClipboard>
						</Grid>
						<Grid item xs={12} md={6} sx={{ padding: '20px' }}>
							<Typography gutterBottom variant="h6">
								Make a Call
							</Typography>
							<TextField
								label="ID to Call"
								value={idToCall}
								onChange={e => setIdToCall(e.target.value)}
								fullWidth
							/>
							{callAccepted && !callEnded ? (
								<Button
									style={{ marginTop: 20 }}
									variant="contained"
									color="secondary"
									startIcon={<PhoneDisabled fontSize="large" />}
									fullWidth
									onClick={leaveCall}
								>
									Hang Up
								</Button>
							) : (
								<Button
									style={{ marginTop: 20 }}
									variant="contained"
									color="primary"
									startIcon={<Phone fontSize="large" />}
									fullWidth
									onClick={() => callUser(idToCall)}
								>
									Call
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
				{children}
			</Paper>
		</Container>
	)
}

export default Options
