import * as SocketIO from 'socket.io'

export function joinApp(
    socket: SocketIO.Socket,
    io: SocketIO.Server,
    onlineUsersMap: any
) {
    return (userId: string) => {
        socket.join(userId)

        if (!onlineUsersMap.has(userId)) {
            onlineUsersMap.set(userId, socket.id)
        }

        io.emit('get-online-users', Array.from(onlineUsersMap.keys()))
        io.emit('setup socket', socket.id)
    }
}
