export function endCall(io) {
    return (id) => {
        io.to(id).emit('end call');
    };
}
//# sourceMappingURL=endCall.hanlder.js.map