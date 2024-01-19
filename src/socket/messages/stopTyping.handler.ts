export function stopTyping(socket) {
    return (conversationId) => {
        socket.in(conversationId).emit('stop typing');
    };
}