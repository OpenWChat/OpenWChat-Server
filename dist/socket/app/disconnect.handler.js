export function disconnect(socket, io, onlineUsersMap) {
    return () => {
        for (const [userId, socketId] of onlineUsersMap) {
            if (socketId === socket.id) {
                onlineUsersMap.delete(userId);
                io.emit('get-online-users', Array.from(onlineUsersMap.keys()));
                break;
            }
        }
    };
}
//# sourceMappingURL=disconnect.handler.js.map