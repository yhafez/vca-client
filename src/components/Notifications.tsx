import React, { useContext } from 'react'
import { Button } from '@mui/material'

import { SocketContext } from '../socketContext'

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext)

	return (
		<>
			{call?.isReceivedCall && !callAccepted && (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<h1>{call.name || 'Unkown Caller'} is calling:</h1>
					<Button
						variant="contained"
						color="primary"
						onClick={answerCall}
						style={{ marginLeft: '40px' }}
					>
						Answer
					</Button>
				</div>
			)}
		</>
	)
}

export default Notifications
