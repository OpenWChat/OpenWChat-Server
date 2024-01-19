export function joinConversation(socket) {
    return (conversationId) => {
        socket.join(conversationId)
    }
}
