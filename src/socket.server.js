let onlineUsers = []

export default function (socket, io) {
    // user joins or opens the app
    socket.on('join', (user_id) => {
        socket.join(user_id)
        // add joined user to online users
        if (!onlineUsers.some((user) => user.user_id === user_id)) {
            onlineUsers.push({ userId: user_id, socketId: socket.id })
        }
        io.emit('get-online-users', onlineUsers)
    })

    // socket is offline
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit('get-online-users', onlineUsers)
    })

    // join a conversation room
    socket.on('join conversation', (conversation_id) => {
        socket.join(conversation_id)
    })

    // send and receive message
    socket.on('send message', (message) => {
        let conversation = message.conversation // fix this line should we populate it?
        if (!conversation.users) return
        conversation.users.forEach((user) => {
            if (user._id === message.sender._id) return
            socket
                .in(String(message.conversation))
                .emit('message received', message) // fix this line
        })
    })
}
