export function isTyping(socket) {
    return (conversationId) => {
        socket.in(conversationId).emit('typing', conversationId);
    };
}
//# sourceMappingURL=isTyping.handler.js.map