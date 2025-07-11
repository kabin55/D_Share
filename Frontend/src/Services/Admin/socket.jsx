import { io } from 'socket.io-client'

const SOCKET_URL = `${import.meta.env.VITE_PERFORMANCE_IP}`

export const initSocket = () => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  })

  return socket
}
