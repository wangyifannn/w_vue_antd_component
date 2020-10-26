import io from 'socket.io-client'

export let socket = null

export function connect(token) {
  socket = io(process.env.VUE_APP_WS_URL, {
    query: {
      ns: 'fd/dataview/ask/develop',
      token
    },
    transports: ['websocket'],
    secure: true
  })
  return socket
}

export function closeSocket() {
  socket.close()
  socket = null
}
