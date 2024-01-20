export function callUser(io, onlineUsersMap) {
    return (data) => {
        const userId = data.userToCall;
        const user = onlineUsersMap.find((user) => user.userId === userId);
        if (user) {
            io.to(user.socketId).emit('call user', {
                signal: data.signal,
                from: data.from,
                name: data.name,
                picture: data.picture,
            });
        }
    };
}
//# sourceMappingURL=callUser.hanlder.js.map