export function joinConversation(socket) {
    return (conversationId) => {
        socket.join(conversationId);
    };
}
//# sourceMappingURL=joinConversation.handler.js.map