import { Socket } from 'socket.io'

export function answerCall(
    _socket: Socket,
    io: {
        connect(url: string): Socket
        to: any
    }
) {
    return (data: { to: string; signal: string }) => {
        io.to(data.to).emit('call accepted', data.signal)
    }
}
