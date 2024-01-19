export function sendMessage(socket) {
    return (message) => {
        let conversation = message.conversation;

        if (!conversation.users) return;

        conversation.users.forEach((user) => {
            if (user._id === message.sender._id) return;

            socket.in(String(message.conversation._id)).emit('message received', message);
        });
    };
}