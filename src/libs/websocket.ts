import io from 'socket.io-client'

let socket: SocketIOClient.Socket

export function connect(): Promise<void> {
  socket = io(process.env.WS_SERVER as string)
  return new Promise((resolve,) => {
    socket.on('connect', () => {
      resolve()
    })
  })
}

export function disconnect(): void {
  if (socket?.connected) {
    socket.disconnect()
  }
}

export function receive(callback: (data: object) => void): void {
  if (socket?.connected) {
    socket.on('event', callback)
  }
}

export function send(data: object): void {
  if (socket?.connected) {
    socket.emit('event', data)
  }
}

