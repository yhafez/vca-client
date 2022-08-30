import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

interface iCall {
	isReceivedCall: boolean
	from: string
	name: string
	signal: any
}

interface ISocketContext {
	call: iCall | undefined
	callAccepted: boolean
	myVideo: HTMLVideoElement | undefined
	userVideo: HTMLVideoElement | undefined
	stream: MediaStream | undefined
	name: string
	setName: React.Dispatch<React.SetStateAction<string>>
	callEnded: boolean
	me: string
	callUser: (id: string) => void
	leaveCall: () => void
	answerCall: () => void
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext)

const socket = io('http://localhost:5001')

const ContextProvider = ({ children }: { children?: React.ReactNode }) => {
	const [stream, setStream] = useState<MediaStream>()
	const [me, setMe] = useState('')
	const [call, setCall] = useState<iCall>()
	const [callAccepted, setCallAccepted] = useState(false)
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState('')

	const myVideo = useRef<HTMLVideoElement>(null)
	const userVideo = useRef<HTMLVideoElement>(null)
	const connectionRef = useRef(null)

	useEffect(() => {
		console.log('myVideo', myVideo)

		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
			setStream(currentStream)

			if (myVideo && myVideo.current) myVideo.current.srcObject = currentStream
			else console.error('this myVideo.current.srcObject error')
		})

		socket.on('me', id => setMe(id))

		socket.on('calluser', ({ from, name: callerName, signal }) => {
			setCall({
				isReceivedCall: true,
				from,
				name: callerName,
				signal,
			})
		})
	}, [])

	const answerCall = () => {
		setCallAccepted(true)

		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream,
		})

		peer.on('signal', data => {
			if (call && call.from) {
				socket.emit('answercall', { signal: data, to: call.from })
			} else console.error('call.from error')
		})

		peer.on('stream', currentStream => {
			if (userVideo && userVideo.current) userVideo.current.srcObject = currentStream
			else console.error('userVideo.current error')
		})

		if (call && call.signal) {
			peer.signal(call.signal)
		} else console.error('call.signal error')

		if (connectionRef && connectionRef.current) connectionRef.current = peer
		else console.error('connectionRef.current error')
	}

	const callUser = (id: string) => {
		const peer = new Peer({ initiator: true, trickle: false, stream })

		peer.on('signal', data => {
			socket.emit('calluser', { userToCall: id, signalData: data, from: me, name })
		})

		peer.on('stream', currentStream => {
			if (userVideo && userVideo.current) userVideo.current.srcObject = currentStream
			else console.error('userVideo.current error')
		})

		socket.on('callaccepted', signal => {
			setCallAccepted(true)

			peer.signal(signal)
		})

		if (connectionRef && connectionRef.current) connectionRef.current = peer
		else console.error('connectionRef.current error')
	}

	const leaveCall = () => {
		setCallEnded(true)
		if (connectionRef && connectionRef.current) connectionRef.current.destroy()
		else console.error('connectionRef.current error')

		window.location.reload()
	}

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export { ContextProvider, SocketContext }
