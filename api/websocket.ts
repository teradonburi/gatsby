import http from 'http'
import SocketIO from 'socket.io'

export function listen(server: http.Server): SocketIO.Server {
  const io = SocketIO(server)
  io.on('connection', (socket) => {
    socket.on('event', (msg) => {
      io.emit('event', msg)
    })
  })
  return io
}