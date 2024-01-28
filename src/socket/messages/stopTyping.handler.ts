import { Socket } from 'socket.io'

export function stopTyping(socket: Socket) {
    return (conversationId: string) => {
        socket.in(conversationId).emit('stop typing')
    }
}
