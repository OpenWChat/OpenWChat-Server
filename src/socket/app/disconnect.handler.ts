import * as SocketIO from 'socket.io'
export function disconnect(
    socket: SocketIO.Socket,
    io: SocketIO.Server,
    onlineUsersMap: any
) {
    return () => {
        for (const [userId, socketId] of onlineUsersMap) {
            if (socketId === socket.id) {
                onlineUsersMap.delete(userId)
                io.emit('get-online-users', Array.from(onlineUsersMap.keys()))
                break
            }
        }
    }
}
