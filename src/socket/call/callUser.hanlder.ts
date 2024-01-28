import * as SocketIO from 'socket.io'
import { Socket } from 'socket.io'

export function callUser(io: SocketIO.Server, onlineUsersMap: any) {
    return (data: any) => {
        const userId = data.userToCall
        const user = onlineUsersMap.find((user: any) => user.userId === userId)

        if (user) {
            io.to(user.socketId).emit('call user', {
                signal: data.signal,
                from: data.from,
                name: data.name,
                picture: data.picture,
            })
        }
    }
}
