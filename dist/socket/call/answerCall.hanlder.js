export function answerCall(_socket, io) {
    return (data) => {
        io.to(data.to).emit('call accepted', data.signal);
    };
}
//# sourceMappingURL=answerCall.hanlder.js.map