import * as SocketIO from 'socket.io'

export function endCall(io: SocketIO.Server) {
    return (id: string) => {
        io.to(id).emit('end call')
    }
}
