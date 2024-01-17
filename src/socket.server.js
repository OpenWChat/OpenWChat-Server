import {
    socketAppHandlers,
    socketMessagesHandlers,
    socketCallHandlers,
} from './socket/index.js'

let onlineUsersMap = new Map()

export default function (socket, io) {
    // user joins or opens the app
    socket.on('join', socketAppHandlers.joinApp(socket, io, onlineUsersMap))

    // socket is offline
    socket.on(
        'disconnect',
        socketAppHandlers.disconnect(socket, io, onlineUsersMap)
    )

    // join a conversation room
    socket.on(
        'join conversation',
        socketMessagesHandlers.joinConversation(socket)
    )

    // send and receive message
    socket.on('send message', socketMessagesHandlers.sendMessage(socket))

    // is typing...
    socket.on('typing', socketMessagesHandlers.isTyping(socket))

    // stop typing
    socket.on('stop typing', socketMessagesHandlers.stopTyping(socket))

    // call user
    socket.on(
        'call user',
        socketCallHandlers.callUser(socket, io, onlineUsersMap)
    )
}
