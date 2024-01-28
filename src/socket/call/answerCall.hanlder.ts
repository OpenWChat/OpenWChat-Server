import { Socket } from 'socket.io'
import * as SocketIO from 'socket.io'

export function answerCall(_socket: Socket, io: SocketIO.Server) {
    return (data: { to: string; signal: string }) => {
        io.to(data.to).emit('call accepted', data.signal)
    }
}
