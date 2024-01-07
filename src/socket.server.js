export default function (socket) {
    // user joins or opens the app
    socket.on('join', (user_id) => {
        socket.join(user_id)
    })

    // join a conversation room
    socket.on('join conversation', (conversation_id) => {
        socket.join(conversation_id)
    })

    // send and receive message
    socket.on('send message', (message) => {
        let conversation = message.conversation
        if (!conversation.users) return
        conversation.users.forEach((user) => {
            if (user._id === message.sender._id) return
            socket.in(user._id).emit('message received', message)
        })
    })
}
