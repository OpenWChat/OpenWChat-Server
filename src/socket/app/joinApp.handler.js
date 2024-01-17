export function joinApp(socket, io, onlineUsersMap) {
    return (userId) => {
        socket.join(userId)

        if (!onlineUsersMap.has(userId)) {
            onlineUsersMap.set(userId, socket.id)
        }

        io.emit('get-online-users', Array.from(onlineUsersMap.keys()))
        io.emit('setup socket', socket.id)
    }
}
